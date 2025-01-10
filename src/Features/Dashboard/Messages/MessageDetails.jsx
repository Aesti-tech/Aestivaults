import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../../modules/MessageDetails.module.css";
import dayjs from "dayjs";

const MessageDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message } = location.state || {};

  const formatTime = (isoString) => dayjs(isoString).format("h:mm A");

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
          {formatTime(message.time)}
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
        <button onClick={() => navigate(-1)} className={styles.goBackButton}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MessageDetails;
