import { useDarkMode } from "../../hooks/DarkModeContext";

function Subscription() {
  const plans = [
    {
      title: "Gold",
      price: "$200",
      features: ["Verification badge", "$50 earnings per 1000 likes on NFT"],
    },
    {
      title: "Platinum",
      price: "$500",
      features: [
        "Everything in Basic",
        "Increased support",
        "Ability to reply to messages",
        "$100 earnings per 1000 likes",
        "Increased visibility on mints",
      ],
    },
    {
      title: "Diamond",
      price: "$1000",
      features: [
        "Everything in Pro",
        "No withdrawal limits",
        "Access to early listings from verified sellers",
      ],
    },
  ];

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`py-10 px-5 `}>
      <div className="text-center mb-10">
        <h1
          className={`text-4xl font-extrabold mb-4 ${
            isDarkMode ? "text-blue-400" : "text-indigo-600"
          }`}
        >
          Get Verified
        </h1>
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } max-w-2xl mx-auto`}
        >
          Build trust, unlock exclusive features, and stand out in the
          marketplace. Your journey to credibility starts here!
        </p>
      </div>

      <h2
        className={`text-3xl font-bold text-center mb-8 ${
          isDarkMode ? "text-blue-400" : "text-gray-800"
        }`}
      >
        Choose Your Plan
      </h2>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg p-5 flex flex-col justify-between transition-transform duration-300 shadow-md border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 hover:scale-105"
                : "bg-white border-black hover:scale-105"
            }`}
          >
            <div>
              <h3
                className={`text-xl font-semibold text-center mb-4 ${
                  isDarkMode ? "text-blue-300" : "text-gray-800"
                }`}
              >
                {plan.title}
              </h3>
              <div
                className={`text-center text-4xl font-bold mb-6 ${
                  isDarkMode ? "text-blue-400" : "text-indigo-600"
                }`}
              >
                {plan.price}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className={`w-6 h-6 ${
                        isDarkMode ? "text-blue-400" : "text-green-500"
                      } mr-3`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={` text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`mt-6 py-2 px-4 rounded-lg shadow-md transition ${
                isDarkMode
                  ? "bg-blue-500 text-gray-100 hover:bg-blue-400 focus:ring-blue-300"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            >
              Choose {plan.title}
            </button>
          </div>
        ))}
      </div>

      <div
        className={`rounded-lg shadow-lg p-6 mt-8 max-w-4xl mx-auto ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        } border`}
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            isDarkMode ? "text-blue-300" : "text-indigo-600"
          }`}
        >
          Why Get Verified?
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <svg
              className={`w-6 h-6 flex-shrink-0 mt-1 ${
                isDarkMode ? "text-blue-400" : "text-green-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p
              className={`ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Enhanced Credibility: Gain a badge of trust that assures buyers
              and sellers of your authenticity.
            </p>
          </li>
          <li className="flex items-start">
            <svg
              className={`w-6 h-6 flex-shrink-0 mt-1 ${
                isDarkMode ? "text-blue-400" : "text-green-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p
              className={`ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Boosted Support: Get priority assistance in resolving disputes and
              navigating challenges.
            </p>
          </li>
          <li className="flex items-start">
            <svg
              className={`w-6 h-6 flex-shrink-0 mt-1 ${
                isDarkMode ? "text-blue-400" : "text-green-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p
              className={`ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Exclusive Features: Access premium tools like advanced analytics
              and early listing insights from trusted sellers.
            </p>
          </li>
          <li className="flex items-start">
            <svg
              className={`w-6 h-6 flex-shrink-0 mt-1 ${
                isDarkMode ? "text-blue-400" : "text-green-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p
              className={`ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Increased Visibility: Appear at the top of search results and
              attract more buyers to your listings.
            </p>
          </li>
          <li className="flex items-start">
            <svg
              className={`w-6 h-6 flex-shrink-0 mt-1 ${
                isDarkMode ? "text-blue-400" : "text-green-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p
              className={`ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Trustworthy Profile: Build confidence in your brand and make
              transactions smoother and safer.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Subscription;
