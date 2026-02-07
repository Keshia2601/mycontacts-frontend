import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
const Contacts = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

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
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      showSuccess("Contact deleted");
    } catch {
      showError("Failed to delete contact");
    }
  };

  if (loading) return <div>Loading Contacts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <div>No contacts found</div>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button onClick={() => navigate(`/contacts/${c._id}/edit`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Contacts;
