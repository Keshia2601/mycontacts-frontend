import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEdit) {
        await api.put(`/contacts/${id}`, { name, email, phone });
      } else {
        await api.post("/contacts", { name, email, phone });
      }

      navigate("/contacts", { replace: true });
    } catch (err) {
      setError("failed to dave contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>{isEdit ? "Edit Contact" : "New Contact"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={setName(e.target.value)}
          value={name}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={setPhone(e.target.value)}
          value={phone}
          required
        />
        <button type="submit">{loading ? "Saving" : "Save"}</button>
      </form>
    </>
  );
};

export default ContactForm