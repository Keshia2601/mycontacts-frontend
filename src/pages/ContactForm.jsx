import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import {
  getContactById,
  createContact,
  updateContact,
} from "../services/contactService";

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await api.put(`/contacts/${id}`, { name, email, phone });
      } else {
        await createContact(form);
        showSuccess("Contact created");
      }

      navigate("/contacts", { replace: true });
    } catch (err) {
      showError("Failed to save contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>{isEdit ? "Edit Contact" : "New Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          disabled={loading}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          disabled={loading}
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          onChange={handleChange}
          value={form.phone}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading
            ? isEdit
              ? "Updating"
              : "Creating"
            : isEdit
              ? "Update"
              : "Create"}
        </button>
        <button type="button" onClick={() => navigate("/contacts")}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default ContactForm;
