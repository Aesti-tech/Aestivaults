import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Resources() {
  const [expanded, setExpanded] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const questions = [
    {
      id: 2,
      question: "What is an NFT?",
      answer:
        "An NFT (Non-Fungible Token) is a unique digital asset that represents ownership of a specific item or piece of content, such as art, music, or videos, using blockchain technology.",
    },
    {
      id: 4,
      question: "How do i mint an NFT on Aestivaults?",
      answer: (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Minting on Aestivaults
            </h2>
            <p className="text-gray-600 leading-relaxed">
              First, create an account if you do not have one, then proceed to
              your dashboard and move to collections. Create a new collection,
              then click on that collection and click on &quot;mint a new
              NFT.&quot; There, you can input the details and upload the image
              to be minted. After that, click on proceed, and that&apos;s it—you
              would have minted your first NFT!
            </p>

            <h3 className="text-xl mt-4 font-semibold text-gray-700">
              What&apos;s next?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You can now list your NFT on the marketplace and set a price for
              it. There, you will receive bids on it. When you find one that
              suits your needs, click &quot;approve&quot; and the buyer will
              make the transfer. The amount will be transferred to you, and the
              ownership of the NFT will now change to the new user.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 3,
      question: "What is a Gas Fee?",
      answer: (
        <>
          <h2 className="text-2xl font-bold text-gray-800">
            What are Gas Fees?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The term, “gas fees” refers to the transaction costs required to
            operate on a blockchain. These fees serve as compensation for
            network validators (or node operators) who ensure every transaction
            is securely processed and permanently recorded. This process
            guarantees the integrity, immutability, and reliability of the
            blockchain, creating a safe and transparent environment for digital
            assets.
          </p>
          <p className="text-gray-600 leading-relaxed">
            It’s important to see gas fees as the key to transforming your
            artwork into a one-of-a-kind digital asset. When you mint an artwork
            on the blockchain, gas fees ensure your creation is securely
            encoded, making it unique, verifiable, and highly valuable in the
            digital art marketplace.
          </p>
          <h3 className="text-xl mt-2 font-semibold text-gray-700">
            Gas Fees at Aestivaults
          </h3>
          <p className="text-gray-600 leading-relaxed">
            At Aestivaults, we understand that gas fees can vary across
            blockchain networks based on their specific methods of transaction
            validation. To address this, we’ve established a regulated fee
            structure designed to provide a smooth, transparent, and
            beginner-friendly experience for artists exploring the digital
            space.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Gas fees go beyond just minting—they also play a crucial role in
            maintaining market flow and accessibility. They help ensure seamless
            transactions, allowing your art to reach a global audience and
            attract serious collectors and high-value bidders.
          </p>
        </>
      ),
    },
    {
      id: 4,
      question: "How do I mint an NFT?",
      answer:
        "Minting an NFT involves creating and uploading your digital asset onto the blockchain via an NFT marketplace. You'll typically pay a gas fee during this process.",
    },
    {
      id: 5,
      question: "What are smart contracts?",
      answer:
        "Smart contracts are self-executing contracts with terms directly written into code. They run on the blockchain and automatically execute actions when predetermined conditions are met.",
    },

    {
      id: 6,
      question: "What is a Crypto Wallet?",
      answer: (
        <p>
          A crypto wallet is a digital tool used to buy, sell, and store
          cryptocurrencies and NFTs (Non-Fungible Tokens). It acts as your
          gateway to the blockchain, allowing you to send and receive payments,
          including minting fees for NFTs or withdrawing funds from your
          account.
          <br />
          <br />
          While your cryptocurrency and NFTs are technically stored on the
          blockchain, your wallet provides secure access to them through a
          private key. Think of it as a key to a digital safe—it doesn’t hold
          your assets directly but gives you the ability to access, manage, and
          control them securely.
        </p>
      ),
    },
    {
      id: 7,
      question: "What can Crypto Wallets be used for?",
      answer: (
        <div>
          <p>A crypto wallet can be used for:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Buying and selling cryptocurrencies and NFTs</li>
            <li>Paying minting fees for NFTs</li>
            <li>Withdrawing and transferring funds</li>
          </ul>
          <p className="mt-2">
            However, it’s essential to pay close attention to the network and
            currency you are using for transactions. Different networks and
            tokens are not always compatible, and a mismatch could result in
            failed or lost transactions.
          </p>
        </div>
      ),
    },
    {
      id: 8,
      question: "What is Aestivaults' primary network?",
      answer: (
        <div>
          <p>
            At Aestivaults, our primary network for transactions is Ethereum
            (ERC-20 standard). This ensures smooth and secure processing of all
            payments and withdrawals.
          </p>
          <p className="mt-2">
            While Ethereum is our primary network, you can use any compatible
            crypto wallet for deposits, payments, and withdrawals. Whether
            you’re paying minting fees, purchasing art, or withdrawing earnings,
            always ensure your wallet is set to the Ethereum (ERC-20) network to
            avoid any complications.
          </p>
        </div>
      ),
    },
    {
      id: 9,
      question: "Why should you use a Crypto Wallet?",
      answer: (
        <div>
          <p>
            Your crypto wallet is your key to the blockchain world—handle it
            with care, keep your private key and seed phrase secure, and always
            double-check the network and currency before making a transaction.
          </p>
          <p className="mt-2">
            At Aestivaults, we are here to ensure your experience is safe,
            transparent, and seamless as you explore the exciting world of
            digital art and blockchain technology.
          </p>
        </div>
      ),
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative bg-blue-100">
        <img
          src="/faq.jpeg"
          alt="FAQ Banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-10 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Commonly Asked Questions
        </h2>
        <div className="space-y-4">
          {questions.map(({ id, question, answer }) => (
            <div
              key={id}
              className="space-y-2"
              id={question === "What is a Crypto Wallet" ? "crypto" : ""}
              onClick={() => toggleExpand(id)}
            >
              <div
                className={`flex justify-between items-center items-center py-2 bg-gray-50 rounded-lg shadow-sm ${
                  expanded === id ? "border border-blue-300" : ""
                }`}
              >
                <h3 className="text-lg w-full font-medium text-gray-800">
                  {question}
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="w-28 text-blue-600 hover:text-blue-700 font-medium text-md focus:outline-none">
                    {expanded === id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>
              {/* Expanded Info */}
              {expanded === id && (
                <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-blue-300">
                  <h3 className="text-lg w-full font-medium text-gray-800">
                    {answer}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources Section */}
      <div className="py-10 bg-gray-100 px-4 md:px-8 lg:px-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Explore More Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/community/guides"
            className="bg-white shadow-md rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <h4 className="text-lg font-semibold text-blue-600 mb-2">Guides</h4>
            <p className="text-gray-600">
              Step-by-step instructions on blockchain basics and NFT creation.
            </p>
          </Link>

          <a
            href="https://nftnow.com/the-gateway/snowfro-sam-spratt-a-discussion-on-navigating-the-nft-jungle/"
            className="bg-white shadow-md rounded-lg p-4 hover:bg-blue-50 transition"
            target="#"
          >
            <h4 className="text-lg font-semibold text-blue-600 mb-2">Blogs</h4>
            <p className="text-gray-600">
              Read in-depth articles on blockchain, NFTs, and the crypto space.
            </p>
          </a>
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

export default Resources;
