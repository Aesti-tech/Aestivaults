import { useDarkMode } from "../../hooks/DarkModeContext";

const Privacy = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`container mx-auto px-4 py-10 ${
        isDarkMode ? "text-white" : "bg-white text-gray-800"
      }`}
    >
      <h1
        className={`text-4xl font-bold text-center ${
          isDarkMode ? "text-white" : "text-gray-800"
        } mb-6`}
      >
        Privacy Policy
      </h1>
      <p
        className={`text-gray-600 mb-6 text-center ${
          isDarkMode ? "text-white" : "text-gray-600"
        }`}
      >
        <strong>Effective Date: 12th october, 2024</strong>
      </p>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          1. Information We Collect
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We collect the following types of information when you use our
          services:
        </p>
        <ul
          className={`list-disc pl-8 mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <li className="text-[1.2rem]">
            Personal Information: When you sign up for an account, we collect
            personal details such as your name, email address, phone number, and
            other identifying information.
          </li>
          <li className="text-[1.2rem]">
            Account Information: We collect information related to your account,
            including login credentials, transaction history, and NFT collection
            details.
          </li>
          <li className="text-[1.2rem]">
            Payment Information: If you make a purchase or engage in any
            transaction, we may collect payment details such as credit card
            information, billing address, and other necessary payment processing
            details.
          </li>
          <li className="text-[1.2rem]">
            Device and Usage Data: We collect information related to the device
            you use to access our website, including IP address, browser type,
            operating system, referring URLs, and other technical information
            related to your use of our platform.
          </li>
          <li className="text-[1.2rem]">
            Cookies and Tracking Technologies: We use cookies, web beacons, and
            other tracking technologies to enhance your experience, personalize
            content, and track website usage.
          </li>
        </ul>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          2. How We Use Your Information
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We use the collected information for the following purposes:
        </p>
        <ul
          className={`list-disc pl-8 mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <li className="text-[1.2rem]">
            To provide our services: To allow you to create and manage your
            account, facilitate transactions, and process payments.
          </li>
          <li className="text-[1.2rem]">
            To improve our platform: To analyze and improve the performance,
            functionality, and usability of our platform, services, and website.
          </li>
          <li className="text-[1.2rem]">
            To communicate with you: To send you account updates, transaction
            confirmations, and promotional offers (if you have opted in to
            receive such communication).
          </li>
          <li className="text-[1.2rem]">
            To ensure security: To monitor and prevent fraudulent activities and
            to ensure the security of our platform and your account.
          </li>
          <li className="text-[1.2rem]">
            To comply with legal obligations: To comply with applicable laws and
            regulations, including legal requests from government authorities.
          </li>
        </ul>

        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          3. Sharing Your Information
        </h2>

        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We do not sell, rent, or trade your personal information to third
          parties. However, we may share your information in the following //
          circumstances:
        </p>

        <ul
          className={`list-disc pl-8 mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <li className="text-[1.2rem]">
            Service Providers: We may share your information with third-party
            vendors, contractors, and service providers who perform services for
            us, such as payment processing, data analysis, email communication,
            and website hosting. These service providers are only authorized to
            use your information as necessary to perform their services.
          </li>

          <li className="text-[1.2rem]">
            Legal Compliance: We may disclose your information to law
            enforcement or other government authorities if required by law, in
            response to legal processes, or to protect our rights or the rights
            of others.
          </li>

          <li className="text-[1.2rem]">
            Business Transfers: If Aestivaults is involved in a merger,
            acquisition, or sale of assets, your information may be transferred
            as part of the transaction.
          </li>
        </ul>

        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          4. Data Retention
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We will retain your personal information for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy, comply with
          legal obligations, resolve disputes, and enforce our agreements. When
          your data is no longer needed, we will securely delete or anonymize
          it.
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          5. Your Data Protection Rights
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          Depending on your location, you may have the following rights
          regarding your personal information:
        </p>
        <ul
          className={`list-disc pl-8 mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <li className="text-[1.2rem]">
            Access: You have the right to request access to the personal
            information we hold about you.
          </li>
          <li className="text-[1.2rem]">
            Correction: You have the right to request corrections to any
            inaccuracies in your personal information.
          </li>
          <li className="text-[1.2rem]">
            Deletion: You have the right to request the deletion of your
            personal information, subject to certain conditions.
          </li>
          <li className="text-[1.2rem]">
            Opt-Out: You may opt out of receiving promotional emails and
            communications from us at any time by following the unsubscribe
            instructions in those emails.
          </li>
          <li className="text-[1.2rem]">
            Portability: You may request a copy of your personal information in
            a structured, machine-readable format.
          </li>
        </ul>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          To exercise any of these rights, please contact us at{" "}
          <strong>
            <a href="mailto:Aestivaults@gmail.com">Aestivaults@gmail.com</a>
          </strong>
          .
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          6. Security of Your Information
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We take the security of your personal information seriously and
          implement a variety of security measures to protect it. This includes
          using encryption, firewalls, and secure socket layer (SSL) technology
          to safeguard your data. However, no method of data transmission over
          the internet or method of electronic storage is 100% secure, and we
          cannot guarantee absolute security.
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          7. Cookies and Tracking Technologies
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We use cookies and similar tracking technologies to:
        </p>

        <ul
          className={`list-disc pl-8 mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <li className="text-[1.2rem]">
            Enhance your overall user experience.{" "}
          </li>

          <li className="text-[1.2rem]">
            Analyze website traffic and understand usage patterns.{" "}
          </li>

          <li className="text-[1.2rem]">
            Personalize content based on user preferences.
          </li>
        </ul>

        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          You can manage your cookie preferences through your browser settings
          at any time.
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          8. Blockchain Data and Public Information
        </h2>

        <ul
          className={`list-disc pl-8 mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <li className="text-[1.2rem]">
            Transactions, including wallet addresses and NFT purchases, are
            publicly recorded on the blockchain.
          </li>

          <li className="text-[1.2rem]">
            This data is permanent and cannot be altered or deleted due to the
            immutable nature of blockchain technology.
          </li>
        </ul>

        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          9. Data Security
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We implement industry-standard security measures to safeguard your
          personal data from unauthorized access, alteration, or disclosure.
        </p>

        <ul
          className={`list-disc pl-8 mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <p
            className={`leading-relaxed mb-4 ${
              isDarkMode ? "text-white" : "text-gray-600"
            }`}
          >
            However:
          </p>
          <li className="text-[1.2rem]">
            No method of data transmission or storage is 100% secure.
          </li>
          <li className="text-[1.2rem]">
            We cannot guarantee absolute security, and users are encouraged to
            take personal measures to secure their accounts and assets.
          </li>
        </ul>

        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          10. International Data Transfers
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          Aestivaults is based in United Kingdom, and your personal data may be
          transferred to, and maintained on, servers located outside of your
          country of residence. By using our platform, you consent to the
          transfer of your data to countries that may have different data
          protection laws than your own.
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          11. Children’s Privacy
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          Aestivaults does not knowingly collect or solicit personal information
          from individuals under the age of 18. If we discover that we have
          collected personal information from a child under the age of 18, we
          will take immediate steps to delete that information.
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          12. Updates to This Privacy Policy
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any material changes to this policy by
          posting the updated version on our website and updating the “Effective
          Date” at the top of this page.
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          13. Third-Party Links
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          Our platform may contain links to third-party websites or services.
          Please note that we are not responsible for the privacy practices or
          content of these third-party sites. We encourage you to review the
          privacy policies of any third-party websites you visit.
        </p>
        <hr
          className={`border-t-2 ${
            isDarkMode ? "border-blue-600" : "border-gray-300"
          } mb-8`}
        />
      </section>
      <section className="mb-8">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          } mb-4`}
        >
          14. Contact Us
        </h2>
        <p
          className={`leading-relaxed mb-4 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at:
        </p>
        <p className={` mb-4 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
          <strong>Email:</strong>{" "}
          <a href="mailto:Aestivaults@gmail.com">Aestivaults@gmail.com</a>
        </p>
        <p className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
          <strong>Phone:</strong>{" "}
          <a href="tel:+44456676575675">+44 556 7676 76</a>
        </p>
      </section>
    </div>
  );
};

export default Privacy;
