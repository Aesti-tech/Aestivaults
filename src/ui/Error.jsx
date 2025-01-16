import { useRouteError } from "react-router-dom";
import { useDarkMode } from "../hooks/DarkModeContext";

function Error() {
  const error = useRouteError(); // Access the error object
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg mb-6">
        It seems there was an issue. If this is a network-related problem,
        please check your connection and try again.
      </p>
      {error && (
        <div className="bg-red-400 text-white p-4 rounded-lg max-w-lg w-full">
          <h2 className="font-bold">Error Details:</h2>
          <p className="mt-2 break-words">
            {error.status
              ? `Error ${error.status}: ${error.statusText}`
              : error.message || "Unknown error occurred"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Error;
