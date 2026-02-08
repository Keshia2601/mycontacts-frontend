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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    if (!isEdit) return;

    const fetchContact = async () => {
      setLoading(true);
      try {
        const res = await getContactById(id);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
        });
      } catch {
        showError("Failed to load contact");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await updateContact(id, form);
        showSuccess("Contact updated");
      } else {
        await createContact(form);
        showSuccess("Contact created");
      }
      navigate("/contacts", { replace: true });
    } catch {
      showError("Failed to save contact");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
