import { useState } from "react";
import { supabase } from "../services/API/supabase";
import { aestiUrl } from "../services/API/api";
import toast from "react-hot-toast";

function AdminMessages() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl overflow-y-auto font-bold mb-6">
        Messaging System
      </h1>
      <MessagingSystem />
    </div>
  );
}

export default AdminMessages;

function MessagingSystem() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [sender, setSender] = useState("Aestivaults support");
  const [subject, setSubject] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileName = `message-${Date.now()}`;

    if (attachments && attachments.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("messages")
        .upload(`${recipient}/${fileName}`, attachments[0], {
          contentType: attachments[0].type,
        });

      if (storageError) {
        toast.error(
          "there was an error uploading the image please reinitiate!!"
        );
        throw new Error(storageError);
      }
    }
    const filePath = `${aestiUrl}/storage/v1/object/public/messages/${recipient}/${fileName}`;

    const isPdf = attachments[0].type === "application/pdf";
    const image = isPdf ? "" : filePath;
    const pdfUrl = isPdf ? filePath : "";

    const { error: messagesError } = await supabase.from("messages").insert([
      {
        sender,
        subject,
        image,
        pdfUrl,
        message,
        user_id: recipient,
      },
    ]);

    if (messagesError) {
      toast.error("There was an error sending the message");
      throw new Error(messagesError);
    }

    setRecipient("");
    setMessage("");
    setAttachments([]);
    setSubject("");

    toast.success("Message sent successfully!!");
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="recipient"
          className="text-sm font-medium text-gray-700"
        >
          Recipient
        </label>
        <input
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter user ID"
          required
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="recipient"
          className="text-sm font-medium text-gray-700"
        >
          Sender Name
        </label>
        <input
          id="recipient"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Enter name of who is sending the mail"
          required
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="recipient"
          className="text-sm font-medium text-gray-700"
        >
          Message Subject
        </label>
        <input
          id="recipient"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter message title"
          required
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          required
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          rows="4"
        ></textarea>
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="attachments"
          className="text-sm font-medium text-gray-700"
        >
          Attachments
        </label>
        <input
          id="attachments"
          type="file"
          onChange={handleFileChange}
          multiple
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Send Message
      </button>
    </form>
  );
}
