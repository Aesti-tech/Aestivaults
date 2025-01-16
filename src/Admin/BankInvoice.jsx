import { useState } from "react";
import { supabase } from "../services/API/supabase";
import FormGroup from "./FormGroup";
import html2pdf from "html2pdf.js";
import useSendMail from "./useSendMail";

function BankInvoice({ transaction, ethPrice, invoice_id, invoiceDate }) {
  const messageInfo = `Please find attached the invoice for the ${transaction.type} payment of $${transaction.amount}. Kindly click the link below to confirm the payment and upload the payment receipt at your earliest convenience.`;

  const { name } = transaction.user_data;
  const [details] = transaction.details;

  const [isInvoiceVisible, setInvoiceVisible] = useState(false);
  const [formData, setFormData] = useState({
    customerName: name,
    customerAcctName: details.account_name,
    customerBank: details.customer_bank,
    customerAcctNo: details.account_number,
    accountBank: "",
    accountNo: "",
    accountName: "",
  });

  const {
    customerName,
    customerAcctName,
    customerBank,
    customerAcctNo,
    accountBank,
    accountNo,
    accountName,
  } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateInvoice = () => {
    setInvoiceVisible(true);
  };

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
      return;
    }
  };

  const { isPending, SendMail } = useSendMail(EmailPdf);

  return (
    <div className="p-6 w-full  bg-gray-100 min-h-screen">
      {!isInvoiceVisible && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Sender/client Details
          </h2>
          <form className="space-y-4" onSubmit={handleGenerateInvoice}>
            <FormGroup
              label={"Customer Name"}
              name={"customerName"}
              value={customerName}
              handleChange={handleInputChange}
              type="text"
              placeholder="Enter Customer Name"
            />
            <FormGroup
              label={"Customer Bank"}
              name={"customerBank"}
              value={customerBank}
              handleChange={handleInputChange}
              type="text"
              placeholder="Enter Customer Bank"
            />

            <FormGroup
              label={"customer Account name"}
              name={"customerAcctName"}
              value={customerAcctName}
              handleChange={handleInputChange}
              type="text"
              placeholder="Enter customer acct Name"
            />

            <FormGroup
              label={"customer account No"}
              name={"customerAcctNo"}
              value={customerAcctNo}
              handleChange={handleInputChange}
              type="number"
              placeholder="Enter customer Account number"
            />

            <hr />
            <h2>Receiving bank</h2>

            <FormGroup
              label={"Account Name"}
              name={"accountName"}
              value={accountName}
              handleChange={handleInputChange}
              type="text"
              placeholder="Enter Acct name"
            />

            <FormGroup
              label={"Account No"}
              name={"accountNo"}
              value={accountNo}
              handleChange={handleInputChange}
              type="number"
              placeholder="Enter Account No"
            />

            <FormGroup
              label={"Bank Name"}
              name={"accountBank"}
              value={accountBank}
              handleChange={handleInputChange}
              type="text"
              placeholder="Enter Bank Name"
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
              Name: {customerName}
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
              Name: {details.account_name}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Account Number: {details.account_number}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Bank: {details.customer_bank}
            </h5>
          </div>

          {/* Recipient Details */}
          <div className="py-6 border-b border-gray-300">
            <h4 className="text-lg font-bold text-gray-800 pb-2">
              Recipient Details
            </h4>
            <h5 className="text-lg font-semibold text-gray-700">
              Account Name: {accountName}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Account Number: {accountNo}
            </h5>
            <h5 className="text-lg font-semibold text-gray-700">
              Bank: {accountBank}
            </h5>
          </div>

          {/* Payment Details */}
          <div className="py-6 border-b border-gray-300">
            <h4 className="text-lg font-bold text-gray-800 pb-2">
              Payment Details
            </h4>
            <h5 className="text-lg font-semibold text-gray-700">
              Method of Payment: Bank Transfer
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
            {isPending ? "Emialing....." : "Email Invoice"}
          </button>
        </div>
      )}
    </div>
  );
}

export default BankInvoice;
