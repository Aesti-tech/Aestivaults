import { AiFillMail } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "../../../modules/Messages.module.css";
import useGetMessage from "../../../hooks/useGetMessage";

import dayjs from "dayjs";

const Messages = () => {
  const { messages } = useGetMessage();
  const messagesArray = [...messages].reverse();

  const navigate = useNavigate();

  const location = useLocation();

  const formatTime = (isoString) => {
    return dayjs(isoString).format("h:mm A");
  };

  // Navigate to full message details
  const viewMessage = (id) => {
    const message = messagesArray.find((msg) => msg.id === id);

    navigate(`/dashboard/messages/${id}`, { state: { message } });
  };

  if (location.pathname !== "/dashboard/messages") return <Outlet />;
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Messages</h1>
      <div className={styles.messageBox}>
        {messagesArray.map((msg) => (
          <div
            key={msg.id}
            className={styles.messageItem}
            onClick={() => {
              viewMessage(msg.id);
            }}
          >
            <div className={styles.messageLeft}>
              <div className={styles.icon}>
                {msg.unread ? <FiMail /> : <AiFillMail />}
              </div>
              <div>
                <p className={styles.sender}>{msg.sender}</p>
                <p className={styles.subject}>{msg.subject}</p>
              </div>
            </div>
            <p className={styles.time}>{formatTime(msg.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
