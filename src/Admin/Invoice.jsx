import { useLocation } from "react-router-dom";
import BankInvoice from "./BankInvoice";
import TagInvoice from "./TagInvoice";

function Invoice() {
  const location = useLocation();
  const state = location.state[0];
  const [details] = state.details;
  const ethPrice = details.amountinEth;

  const invoiceDate = new Date().toDateString();
  const inovoiceId = `${Math.floor(Math.random() * 10)}-${state.transaction_id
    .split("-")[0]
    .replace(/[^0-9.]/g, "")}`;

  return (
    <>
      {state.type === "Bank Transfer" ? (
        <BankInvoice
          transaction={state}
          invoice_id={inovoiceId}
          ethPrice={ethPrice}
          invoiceDate={invoiceDate}
        />
      ) : (
        <TagInvoice
          transaction={state}
          invoice_id={inovoiceId}
          ethPrice={ethPrice}
          invoiceDate={invoiceDate}
        />
      )}
    </>
  );
}

export default Invoice;
