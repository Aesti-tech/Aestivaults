import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../modules/MessageDetails.module.css";
import Button from "../../../ui/Button";
import dayjs from "dayjs";
import { supabase } from "../../../services/API/supabase";
import toast from "react-hot-toast";
import Modal from "../../../ui/Modal";
import AcceptBid from "./AcceptBid";
import useFetchData from "../../../hooks/useFetchData";
import SpinnerFullPage from "../../../ui/SpinnerFullPage";

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchData("messages", {
    column: "id",
    value: id,
  });

  if (isLoading) return <SpinnerFullPage />;

  const [message] = data || {};

  const formatTime = (isoString) => dayjs(isoString).format("h:mm A");

  async function handleReject() {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", message.id);

    if (error) throw new Error(error);

    const { error: messagesError } = await supabase.from("messages").insert([
      {
        sender: "Aestivaults inc.",
        subject: "Bid Rejected",
        image: message.image,
        message: `your bid for the below NFT with token ID ${message.bid_details[0].NFT_token} has been rejected please make a higher bid if still interested`,
        user_id: message.bid_details[0]?.user_id,
        bid_details: message.bid_details,
      },
    ]);

    if (messagesError)
      throw new Error("Error updating messages", messagesError);

    toast.success("Bid rejected successfully!");
    navigate("/dashboard/messages");
  }

  if (!message) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Message Not Found</h1>
        <button onClick={() => navigate(-1)} className={styles.goBackButton}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Message Details</h1>
      <div className={styles.card}>
        <p className={styles.sender}>
          <span className={styles.label}>Sender:</span> {message.sender}
        </p>
        <p className={styles.subject}>
          <span className={styles.label}>Subject:</span> {message.subject}
        </p>
        <p className={styles.time}>
          <span className={styles.label}>Sent at:</span>{" "}
          {formatTime(message.created_at)}
        </p>
        <p className={styles.time}>{message.message}</p>
        {message.image && (
          <div className={styles.imageSection}>
            <h2 className={styles.imageTitle}>Attached Images</h2>
            <div className={styles.imageGrid}>
              <img
                src={message.image}
                alt="Attachment"
                className={styles.image}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
        {message.pdfUrl && (
          <>
            <iframe
              id="pdf-preview"
              width="100%"
              height="500px"
              src={message.pdfUrl}
            ></iframe>
            <a
              href={message.pdfUrl}
              download="invoice.pdf" // Specify a default filename
              className="mt-[50px] text-blue-600 font-semibold hover:underline transition duration-300"
            >
              Download Invoice
            </a>
          </>
        )}

        {message.subject === "New Bid Received: Action Required" &&
          !message.bid_details[0].accepted && (
            <div className="flex gap-x-2 px-6">
              <Modal>
                <Modal.Open opens={"medium"}>
                  <Button sizes={"medium"} variations={"primary"}>
                    Accept
                  </Button>
                </Modal.Open>

                <AcceptBid message={message} />
              </Modal>

              <Button
                onClick={handleReject}
                sizes={"medium"}
                variations={"danger"}
              >
                Reject
              </Button>
            </div>
          )}

        {message.subject === "Bid Accepted: Action Required" && (
          <Button
            onClick={() => navigate("/purchaseNft", { state: message })}
            variations={"primary"}
            sizes={"medium"}
          >
            Purchase Nft
          </Button>
        )}

        {message.subject === "New Bid Received: Action Required" &&
          message.bid_details[0].accepted && (
            <p className="font-bold text-2xl p-6">Bid accepted</p>
          )}
      </div>
    </div>
  );
};

export default MessageDetails;
