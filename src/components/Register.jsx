import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { signUp } = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await signUp({ name: form.name, email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">VEL<span>O</span>UR</div>
        <p className="auth-subtitle">Crie sua conta</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="v-form-group">
            <label className="v-label">Nome completo</label>
            <input className="v-input" type="text" placeholder="Seu nome" value={form.name} onChange={set("name")} required />
          </div>
          <div className="v-form-group">
            <label className="v-label">Email</label>
            <input className="v-input" type="email" placeholder="seu@email.com" value={form.email} onChange={set("email")} required />
          </div>
          <div className="v-form-group">
            <label className="v-label">Senha</label>
            <input className="v-input" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={set("password")} required />
          </div>
          <div className="v-form-group">
            <label className="v-label">Confirmar senha</label>
            <input className="v-input" type="password" placeholder="Repita a senha" value={form.confirm} onChange={set("confirm")} required />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="auth-switch">
          Já tem conta?{" "}
          <Link to="/login" className="auth-link">Entrar</Link>
        </p>
      </div>
    </div>
  );
}