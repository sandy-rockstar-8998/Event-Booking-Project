import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/contact-messages/");
      const result = await res.json();
      setMessages(result);
      const initialReplies = {};
      result.forEach((item) => {
        initialReplies[item.id] = item.reply_message || "";
      });
      setReplies(initialReplies);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSendReply = async (id) => {
    try {
      await fetch("http://127.0.0.1:8000/contact-messages/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          reply_message: replies[id] || "",
        }),
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Contact Messages</h3>
      <hr />
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td>
                  <textarea
                    rows={3}
                    style={{ width: "240px", marginBottom: "8px" }}
                    value={replies[item.id] || ""}
                    onChange={(e) => handleReplyChange(item.id, e.target.value)}
                    placeholder="Type reply message"
                  />
                  <br />
                  <Button size="sm" onClick={() => handleSendReply(item.id)}>
                    Send Reply
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No contact messages found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ContactMessages;
