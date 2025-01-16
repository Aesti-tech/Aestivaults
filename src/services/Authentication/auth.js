import toast from "react-hot-toast";
import { aestiUrl } from "../API/api";
import { supabase } from "../API/supabase";

export async function signupUser({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  if (data?.user?.role === "authenticated") return data?.user;
}
export async function updateCurrentUser({
  password,
  fullName,
  avatar,
  username,
}) {
  try {
    let updatedUserData; // Declare variable in outer scope

    // Combine updateData fields
    const updateData = {};
    if (password) updateData.password = password;
    if (fullName)
      updateData.data = { ...(updateData.data || {}), name: fullName };
    if (username) updateData.data = { ...(updateData.data || {}), username };

    // Update the user
    if (Object.keys(updateData).length > 0) {
      const { data, error } = await supabase.auth.updateUser(updateData);
      if (error) throw new Error(error.message);
      updatedUserData = data; // Assign to the outer-scoped variable
    }

    // Handle username logic
    if (username) {
      const { data: userCreated, error: userPresent } = await supabase
        .from("usernames")
        .select("*")
        .eq("user_id", updatedUserData.user.id);

      if (userPresent) throw new Error(userPresent.message);

      if (userCreated[0]?.username === username) {
        toast.error("Username already exists!");
        return;
      }

      if (userCreated.length === 0) {
        const { error: usernamesError } = await supabase
          .from("usernames")
          .insert([
            {
              user_id: updatedUserData.user.id,
              username,
              verified: "False",
              full_name: fullName || updatedUserData.user.user_metadata?.name,
              rating: "0",
            },
          ]);

        if (usernamesError) throw new Error(usernamesError.message);
      }
    }

    // Handle avatar upload
    if (avatar) {
      const fileName = `avatar-${updatedUserData.user.id}-${Math.random()}`;
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

      if (storageError) throw new Error(storageError.message);

      // Update avatar in the user
      const avatarUrl = `${aestiUrl}/storage/v1/object/public/avatars/${fileName}`;
      const { data: finalUpdatedUser, error: error2 } =
        await supabase.auth.updateUser({
          data: {
            avatar: avatarUrl,
          },
        });

      if (error2) throw new Error(error2.message);

      return finalUpdatedUser;
    }

    const { error } = await supabase
      .from("usernames")
      .update({
        user_data: [updatedUserData.user.user_metadata],
        owner_id: updatedUserData.user.user_metadata.owner_nft_id,
        full_name: updatedUserData.user.user_metadata.name,
        updated_at: Date.now().toLocaleString(),
      })
      .eq("user_id", updatedUserData.user.id);

    if (error) throw new Error(error.message);

    return updatedUserData;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}

export async function createCollection({ name, description, image }) {
  const data = await getCurrentUser();
  if (!data?.id) {
    throw new Error("User ID is required to create a folder.");
  }

  const folderName = `user-${data.id}`;
  const fileName = `${folderName}/collection-profile-image-${Math.random()}`;

  const { data: collection, error } = await supabase
    .from("collections")
    .insert([
      {
        featuredimage: `${aestiUrl}/storage/v1/object/public/collection/${fileName}`,
        userid: data.id,
        description: description,
        collectionName: name,
      },
    ])
    .select();

  if (error) throw new Error(error.message, "there was an error");

  if (!image) return collection;

  const uploadImage = image[0];

  const { error: storageError } = await supabase.storage
    .from("collection")
    .upload(fileName, uploadImage);
  if (storageError) throw new Error(storageError.message);
  return collection;
}

export async function MintArtWork({
  name,
  royalty,
  description,
  collectionId,
  image,
}) {
  const data = await getCurrentUser();
  if (!data?.id) {
    throw new Error("User ID is required to create a folder.");
  }

  const folderName = `user-${data.id}`;
  const fileName = `${folderName}/collection-image-${Math.random()}`;

  const id = Math.floor(Math.random() * 100);

  const { error: storageError } = await supabase.storage
    .from("mint")
    .upload(fileName, image);
  if (storageError) throw new Error(storageError.message);

  let { data: collections, error } = await supabase
    .from("collections")
    .select("images")
    .eq("id", collectionId);
  const [datanew] = collections;

  if (error) throw new Error(error.message, "there was an error");

  if (datanew.images) {
    const { data: collection, error } = await supabase
      .from("collections")
      .update([
        {
          images: [
            ...datanew.images,
            {
              id,
              name,
              alt: description,
              url: `${aestiUrl}/storage/v1/object/public/mint/${fileName}`,
              royalty: royalty.value,
            },
          ],
        },
      ])
      .eq("id", collectionId)
      .select();

    if (error) throw new Error(error.message, "there was an error");

    return collection;
  } else {
    const { data: collection, error } = await supabase
      .from("collections")
      .update([
        {
          images: [
            {
              id,
              name,
              alt: description,
              url: `${aestiUrl}/storage/v1/object/public/mint/${fileName}`,
              royalty: royalty.value,
            },
          ],
        },
      ])
      .eq("id", collectionId)
      .select();

    if (error) throw new Error(error.message, "there was an error");

    return collection;
  }
}
