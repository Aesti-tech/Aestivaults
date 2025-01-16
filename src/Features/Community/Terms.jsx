import { useDarkMode } from "../../hooks/DarkModeContext";

function Terms() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="p-4 md:p-12 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto shadow-lg rounded-md p-6 md:p-10">
        <h1
          className={`text-3xl font-bold text-center mb-6 ${
            isDarkMode ? "text-white" : "text-blue-700"
          }`}
        >
          Terms and Conditions
        </h1>

        <p className={`mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
          By accessing our website, creating an account, or engaging in
          transactions on our platform, you confirm that you have read,
          understood, and agreed to be bound by these Terms and Conditions and
          our Privacy Policy.
        </p>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            1. Acceptance of Terms
          </h2>
          <p
            className={`text-lg leading-7 mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            By accessing our website, creating an account, or engaging in
            transactions on our platform, you confirm that you have read,
            understood, and agreed to be bound by these Terms and Conditions and
            our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            2. Eligibility
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              You must be at least 18 years old or the legal age of majority in
              your jurisdiction to use our platform.
            </li>
            <li className="text-[16px]">
              By accessing our services, you represent and warrant that you meet
              these eligibility requirements.
            </li>
            <li className="text-[16px]">
              Young artists may participate under the supervision of a legal
              guardian or mentor who will be responsible for their account and
              activities.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            3. User Accounts
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              You are solely responsible for maintaining the confidentiality of
              your account credentials.
            </li>
            <li className="text-[16px]">
              Any activity conducted through your account is your full
              responsibility.
            </li>
            <li className="text-[16px]">
              Notify us immediately if you suspect unauthorized access or
              activity on your account.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            4. NFT Ownership
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              Purchasing an NFT grants you ownership of the digital asset on the
              blockchain.
            </li>
            <li className="text-[16px]">
              Ownership does not include intellectual property rights unless
              explicitly stated by the creator.
            </li>
            <li className="text-[16px]">
              You may not use NFTs in ways that violate the creator’s rights or
              any applicable laws.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            5. Prohibited Activities
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            You agree not to:
          </p>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              Engage in fraudulent, illegal, or unauthorized activities.
            </li>
            <li className="text-[16px]">
              Use the platform for money laundering, hacking, or malicious
              actions.
            </li>
            <li className="text-[16px]">
              Interfere with the operation of the platform, including deploying
              harmful software or disrupting services.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            6. Fees and Payments
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              All transactions are subject to applicable fees, which will be
              clearly disclosed during the purchase process.
            </li>
            <li className="text-[16px]">
              Payments made via blockchain are irreversible; please double-check
              all transaction details before proceeding.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            7. Platform Modifications
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            We reserve the right to modify, suspend, or terminate the platform
            or any of its features at any time, without prior notice.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            8. No Financial Advice
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              Aestivaults does not provide financial, investment, or legal
              advice.
            </li>
            <li className="text-[16px]">
              All transactions are conducted at your own risk.
            </li>
            <li className="text-[16px]">
              Our support system is readily available to assist you whenever
              needed.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            9. Intellectual Property
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              All content, trademarks, and logos displayed on the platform are
              the property of their respective owners.
            </li>
            <li className="text-[16px]">
              You may not use, reproduce, or distribute any content without
              explicit authorization.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            10. Limitation of Liability
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              We are not liable for losses caused by technical errors,
              unauthorized access, or blockchain issues.
            </li>
            <li className="text-[16px]">
              We are not responsible for fluctuations in the value of NFTs or
              cryptocurrencies.
            </li>
            <li className="text-[16px]">
              We are not responsible for third-party actions or service
              interruptions beyond our control.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            11. Termination
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            We reserve the right to suspend or terminate your access to the
            platform at our sole discretion if you violate these Terms or engage
            in prohibited activities.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            12. Governing Law
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            These Terms are governed by applicable laws, and any disputes
            arising from them will be resolved in the exclusive jurisdiction of
            the appropriate courts. Immediate legal action will be taken against
            violators if necessary.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            13. Changes to Terms
          </h2>
          <ul
            className={`list-disc list-inside space-y-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <li className="text-[16px]">
              We may update these Terms periodically.
            </li>
            <li className="text-[16px]">
              Continued use of the platform after updates constitutes acceptance
              of the revised Terms.
            </li>
            <li className="text-[16px]">
              You will also be notified via email using the contact information
              provided in your account.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            14. Contact Us
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            For any questions or concerns regarding these Terms, please reach
            out to our support team via email. Alternatively, our customer
            service team is available to assist you directly.
          </p>
        </section>

        <p
          className={`text-center text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Effective Date:{" "}
          <span className="font-semibold">12th october, 2024</span>
        </p>
      </div>
    </div>
  );
}

export default Terms;
