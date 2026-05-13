import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Email is invalid";
    if (!form.message) err.message = "Message is required";

    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://127.0.0.1:8000/contact-messages/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error("Failed to submit contact message");
        }

        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1><hr/>

      <div className="contact-wrapper">
    
        <div className="contact-form-section">
          <h2>Send a Message</h2>

          {submitted && (
            <p className="success">Message sent successfully!</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <span>{errors.message}</span>}

            <button type="submit">Send Message</button>
          </form>
        </div>


        <div className="contact-info">
          <h2>Contact Info</h2>
          <p><strong>Email:</strong> onlineeventbooking@official.com</p>
          <p><strong>Phone:</strong> +91 7402796312</p>
          <p><strong>Address:</strong> Coimbatore, Tamil Nadu, India</p>

        </div>
      </div>
    </div>
  );
}