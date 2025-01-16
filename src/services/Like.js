import { supabase } from "./API/supabase";

const like = async (id) => {
  let { data, error: galleryError } = await supabase
    .from("gallery")
    .select("likes")
    .eq("id", id);

  if (galleryError) throw new Error(galleryError);
  const [likes] = data;

  const { error } = await supabase
    .from("gallery")
    .update({ likes: likes.likes + 1 })
    .eq("id", id);

  if (error) throw new Error(error);
};

const dislike = async (id) => {
  let { data, error: galleryError } = await supabase
    .from("gallery")
    .select("likes")
    .eq("id", id);

  if (galleryError) throw new Error(galleryError);
  const [likes] = data;

  const { error } = await supabase
    .from("gallery")
    .update({ likes: likes.likes - 1 })
    .eq("id", id);

  if (error) throw new Error(error);
};

export { like, dislike };
