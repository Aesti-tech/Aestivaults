import { useState } from "react";
import { Link } from "react-router-dom";

function Community() {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="/Team.jpeg"
          alt="Community Team"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            Welcome to Our Community
          </h1>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-10 px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 break-words">
          Discover Aestivaults: Your Gateway to the Digital Art World
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {showFullText
            ? `At Aestivaults, we’re more than just an NFT marketplace—we’re a dedicated platform built to empower artists and help them unlock their full potential in the digital space.

We understand that navigating the blockchain world can feel complex, especially for emerging artists. That’s why we’ve implemented a transparent and regulated fee structure to ensure a seamless, beginner-friendly experience. By optimizing gas fees and minimizing unnecessary costs, we make it easier for you to mint, showcase, and sell your art to a global audience without financial barriers.

We believe that creativity should have no limits, which is why we offer special discounts on gas fees to support growing artists. This initiative allows you to mint more artworks, expand your reach, and share your unique vision with collectors worldwide.

At Aestivaults, your art is valued, your journey is supported, and your success is our priority. We’re committed to creating a safe, transparent, and inclusive space where artists can thrive, connect with collectors, and build lasting success in the digital art market.

Our mission is clear: to bridge the gap between creators and collectors while redefining how art, culture, and technology intersect in a decentralized world. We envision a future where digital ownership empowers creativity and drives innovation without boundaries.

When you join Aestivaults, you’re not just entering a marketplace—you’re becoming part of a global movement dedicated to shaping the future of art in the digital era.

Your art deserves to be seen, valued, and celebrated. At Aestivaults, we ensure it is.

We invite you to join us, grow with us, and let your creativity thrive in a space designed just for you.`
            : `At Aestivaults, we’re more than just an NFT marketplace—we’re a dedicated platform built to empower artists and help them unlock their full potential in the digital space.

We understand that navigating the blockchain world can feel complex, especially for emerging artists. That’s why we’ve implemented a transparent and regulated fee structure to ensure a seamless, beginner-friendly experience.`}
        </p>
        <button
          onClick={toggleText}
          className="mt-4 text-blue-600 underline focus:outline-none hover:text-blue-800"
        >
          {showFullText ? "Read Less" : "Read More"}
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mx-4 md:mx-8 lg:mx-16">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
          Join Our Community
        </h3>
        <p className="text-gray-600 mb-6">
          Be part of a vibrant community of professionals and entrepreneurs who
          share your passion. Discover opportunities, attend events, and
          participate in meaningful conversations.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </div>

      <div className="py-10 px-4 md:px-8 lg:px-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          What Our Community Offers
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li className="bg-white shadow-md rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Verified Sellers
            </h4>
            <p className="text-gray-600">
              Trade confidently with vetted and verified sellers in our
              community.
            </p>
          </li>
          <li className="bg-white shadow-md rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Networking Opportunities
            </h4>
            <p className="text-gray-600">
              Connect with like-minded professionals and expand your network.
            </p>
          </li>
          <li className="bg-white shadow-md rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Resources and Tools
            </h4>
            <p className="text-gray-600">
              Access valuable resources and tools to grow your business and
              skills.
            </p>
          </li>
        </ul>
      </div>

      {/* Explore Links */}
      <div className="py-10 bg-gray-100 px-4 md:px-8 lg:px-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Explore the Community
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/community/Subscription"
            className="bg-white shadow-md rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <h4 className="text-lg font-semibold text-blue-600 mb-2">
              Verified Badge
            </h4>
            <p className="text-gray-600">
              Stand out with a verified badge and build instant trust with your
              audience.
            </p>
          </Link>
          <Link
            to="/resources"
            className="bg-white shadow-md rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <h4 className="text-lg font-semibold text-blue-600 mb-2">
              Resources
            </h4>
            <p className="text-gray-600">
              Discover guides, articles, and tools to help you succeed.
            </p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-gray-200">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Aestivaults. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Community;
