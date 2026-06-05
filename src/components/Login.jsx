import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(form);
      navigate("/");
    } catch {
      setError("Email ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">VEL<span>O</span>UR</div>
        <p className="auth-subtitle">Bem-vindo de volta</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="v-form-group">
            <label className="v-label">Email</label>
            <input className="v-input" type="email" placeholder="seu@email.com" value={form.email} onChange={set("email")} required />
          </div>
          <div className="v-form-group">
            <label className="v-label">Senha</label>
            <input className="v-input" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} required />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-switch">
          Não tem conta?{" "}
          <Link to="/register" className="auth-link">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}