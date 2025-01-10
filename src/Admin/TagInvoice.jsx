import html2pdf from "html2pdf.js";
import { useState } from "react";
import { supabase } from "../services/API/supabase";
import useSendMail from "./useSendMail";
import FormGroup from "./FormGroup";

function TagInvoice({ transaction, ethPrice, invoice_id, invoiceDate }) {
  const messageInfo = `Please find attached the invoice for the ${transaction.type} payment of $${transaction.amount}. Kindly click the link below to confirm the payment and upload the payment receipt at your earliest convenience.`;
  const [details] = transaction.details;

  const { name } = transaction.user_data;

  const [isInvoiceVisible, setInvoiceVisible] = useState(false);
  const [formData, setFormData] = useState({
    customerName: details.name,
    customerEmail: details.handle,
    receiving_tag_email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateInvoice = () => {
    setInvoiceVisible(true);
  };

  const { customerName, customerEmail, receiving_tag_email } = formData;

  const generatePDF = () => {
    const element = document.getElementById("invoice-content");

    // Options for html2pdf
    const options = {
      margin: 1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 200, letterRendering: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  const EmailPdf = async () => {
    const element = document.getElementById("invoice-content");

    // Options for html2pdf
    const options = {
      margin: 1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 200, letterRendering: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF as a Blob
    const pdfBlob = await html2pdf()
      .from(element)
      .set(options)
      .outputPdf("blob");

    try {
      const fileName = `invoice-${Date.now()}.pdf`;
      const { data, error } = await supabase.storage
        .from("invoice")
        .upload(`invoices/${fileName}`, pdfBlob, {
          contentType: "application/pdf",
        });

      if (error) throw error;

      const { data: fileLink } = supabase.storage
        .from("invoice")
        .getPublicUrl(data.path);

      const { error: messagesError } = await supabase
        .from("messages")
        .insert([
          {
            sender: "Aestivaults inc.",
            subject: "Invoice and Payment Confirmation Request",
            pdfUrl: fileLink.publicUrl,
            message: messageInfo,
            user_id: transaction.user_id,
          },
        ])
        .select();

      if (messagesError) throw messagesError;
    } catch (error) {
      console.error("Error uploading PDF:", error);
      return null;
    }
  };

  const { isPending, SendMail } = useSendMail(EmailPdf);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!isInvoiceVisible && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            client Details
          </h2>
          <form className="space-y-4" onSubmit={handleGenerateInvoice}>
            <FormGroup
              name={"customerName"}
              label={"Customer Name"}
              handleChange={handleInputChange}
              value={customerName}
              placeholder="Please input customer name"
            />

            <FormGroup
              name={"customerEmail"}
              label={"Customer Handle/Email"}
              handleChange={handleInputChange}
              value={customerEmail}
              placeholder="Please input the customer tag or email address"
            />

            <hr />
            <h2>Receiving {transaction.type} Account</h2>

            <FormGroup
              label={`Receiving ${transaction.type} account`}
              name={"receiving_tag_email"}
              value={receiving_tag_email}
              handleChange={handleInputChange}
              type="text"
              placeholder={`Enter ${transaction.type} handle/email`}
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Generate Invoice
            </button>
          </form>
        </div>
      )}

      {/* Invoice Section */}
      {isInvoiceVisible && (
        <div
          className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-8"
          id="invoice-content"
        >
          {/* Invoice Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-300">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="AestiVaults Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold text-gray-800">
                AestiVaults
              </span>
            </div>
            <div className="text-right">
              <h5 className="text-2xl font-bold text-gray-800">Invoice</h5>
              <h6 className="text-sm text-gray-600">
                Invoice no: {invoice_id}
              </h6>
              <h6 className="text-sm text-gray-600">
                Invoice Date: {invoiceDate}
              </h6>
            </div>
          </div>

          {/* Amount Section */}
          <div className="py-6 border-b border-gray-300">
            <h5 className="text-lg font-semibold text-gray-700">
              Amount: ${transaction.amount}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Amount in Ethereum: {ethPrice}
            </h5>
          </div>

          {/* Customer Details */}
          <div className="py-6 border-b border-gray-300">
            <h4 className="text-lg font-bold text-gray-800 pb-2">
              Customer Details
            </h4>
            <h5 className="text-lg font-semibold text-gray-700">
              Name: {name}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Email: {transaction.user_email}
            </h5>
          </div>

          {/* Sender Details */}
          <div className="py-6 border-b border-gray-300">
            <h4 className="text-lg font-bold text-gray-800 pb-2">
              Sender Details
            </h4>
            <h5 className="text-lg font-semibold text-gray-700">
              Name: {customerName}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              {transaction.type === "paypal"
                ? "Paypal Email "
                : `${transaction.type} handle`}
              :
              {transaction.type === "cashapp"
                ? `$${customerEmail}`
                : customerEmail}
            </h5>
          </div>

          {/* Recipient Details */}
          <div className="py-6 border-b border-gray-300">
            <h4 className="text-lg font-bold text-gray-800 pb-2">
              Recipient Details
            </h4>
            <h5 className="text-lg font-semibold text-gray-700">
              {transaction.type === "paypal"
                ? "Paypal Email/handle: "
                : `${transaction.type} handle `}
              {transaction.type === "cashapp"
                ? `$${receiving_tag_email}`
                : receiving_tag_email}
            </h5>
          </div>

          <div className="py-6 border-b border-gray-300">
            <h4 className="text-lg font-bold text-gray-800 pb-2">
              Payment Details
            </h4>
            <h5 className="text-lg font-semibold text-gray-700">
              Method of Payment: {transaction.type}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Transaction ID: {transaction.transaction_id}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Reference ID: {transaction.reference_id}
            </h5>
          </div>
        </div>
      )}

      {isInvoiceVisible && (
        <div className="flex flex-col  items-center space-x-4 mt-6">
          <button
            className="px-6 py-2 max-w-xl bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
            onClick={generatePDF}
          >
            Download Invoice
          </button>
          <button
            onClick={SendMail}
            className="px-6 py-2 max-w-xl bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            {isPending ? "Emailing Invoice......" : "Email invoice"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TagInvoice;
