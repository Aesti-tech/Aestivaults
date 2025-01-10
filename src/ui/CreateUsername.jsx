import { useEffect, useState } from "react";
import { useDarkMode } from "../hooks/DarkModeContext";
import styles from "../modules/CreateUsername.module.css";
import useFetchData from "../hooks/useFetchData";
import { FaX } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../services/Authentication/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function CreateUsername() {
  const { isDarkMode } = useDarkMode();
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user.user_metadata.username) navigate("/");
  }, [user, navigate]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["username"],
    mutationFn: (data) => updateCurrentUser(data),
    onSuccess: () => {
      toast.success("username created successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("there was an error", error);
    },
  });

  const { data } = useFetchData("usernames", {
    column: "username",
    value: username,
  });

  const USEREGEX = /^[a-zA-Z0-9._-]{3,20}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!USEREGEX.test(username)) {
      toast.error(
        "Invalid username! Use 3-20 characters with only letters, numbers, dots (.), underscores (_), or hyphens (-)."
      );
      return;
    }

    if (data.length === 0) {
      setErrors("");

      const data = { username };
      mutate(data);
    } else {
      setErrors(`${username} is taken`);
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${isDarkMode ? "dark" : "light"}`}>
      <div className={styles.modal}>
        <h2>Create Your Username</h2>
        <p>Welcome! Please create your username to continue.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isPending}
          />
          {errors && (
            <p className={styles.error}>
              {errors} <FaX />
            </p>
          )}
          <button disabled={isPending} type="submit">
            {isPending ? "creating username" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUsername;
