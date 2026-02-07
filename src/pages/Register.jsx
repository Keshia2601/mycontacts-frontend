import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/users/register', {
        username, email, password
      });
      navigate("/", {replace : true})
    } catch(err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          disabled={loading}
          required
        />
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
          required
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
      <div>
        Already registered? <Link to="/">Login</Link>
      </div>
    </>
  );
};

export default Register;
