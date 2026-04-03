import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";

export default function LoginPage() {
  const { login } = useAppData();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(email, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Company Legal Management</h1>
        <p>Sign in to access matters, documents, contracts, and legal operations.</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <div className="error-box">{error}</div> : null}

          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </form>

        <div className="login-note">
          Demo Admin: <strong>admin@company.com</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}