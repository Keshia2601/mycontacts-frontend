import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts, deleteContact } from "../services/contactService";
import { useNotification } from "../context/NotificationContext";
import "./Contacts.css";
import { useAuth } from "../auth/AuthContext";
const Contacts = () => {
  const navigate = useNavigate();

  const {logout} = useAuth();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchContacts = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await getContacts();
        setContacts(response.data?.contacts || []);
      } catch (err) {
        setError("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    setDeletingId(true);
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      showSuccess("Contact deleted");
    } catch {
      showError("Failed to delete contact");
    } finally {
      setDeletingId(false);
    }
  };

  if (loading) return <div className="state-text">Loading Contacts...</div>;
  if (error) return <div className="state-text error">{error}</div>;

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>Contacts</h2>
        <button onClick={() => navigate("/contacts/new")} disabled={loading}>New Contact</button>
      </div>
      {contacts.length === 0 && !loading ? (
        <div className="empty-contacts">No contacts found. Create one</div>
      ) : (
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td className="actions">
                  <button onClick={() => navigate(`/contacts/${c._id}/edit`)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    disabled={deletingId === c._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(c._id);
                    }}
                  >
                    {deletingId === c._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={ logout}>Logout</button>
    </div>
  );
};

export default Contacts;
