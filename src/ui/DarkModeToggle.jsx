import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

import { useDarkMode } from "../hooks/DarkModeContext";

function DarkModeToggle({ className }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div onClick={toggleDarkMode} style={{ padding: "20px 0" }}>
      {isDarkMode ? (
        <HiOutlineSun className={className} />
      ) : (
        <HiOutlineMoon className={className} />
      )}
    </div>
  );
}

export default DarkModeToggle;
