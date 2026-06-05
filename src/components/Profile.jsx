import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { profile, updateProfile, uploadAvatar, signOut } = useAuth();
  const navigate = useNavigate();

  const [name, setName]         = useState(profile?.name || "");
  const [preview, setPreview]   = useState(profile?.avatar_url || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState("");
  const fileRef = useRef();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);
    try {
      let avatar_url = profile?.avatar_url || "";
      if (avatarFile) {
        avatar_url = await uploadAvatar(avatarFile);
      }
      await updateProfile({ name, avatar_url });
      setSuccess(true);
    } catch (err) {
      setError("Erro ao salvar perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="auth-card profile-card">
        {/* Avatar */}
        <div className="profile-avatar-wrap" onClick={() => fileRef.current.click()}>
          {preview ? (
            <img src={preview} alt="Avatar" className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar-placeholder">
              {(name || "U")[0].toUpperCase()}
            </div>
          )}
          <div className="profile-avatar-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}>
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span>Alterar foto</span>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        <div className="auth-logo" style={{ marginTop: 16 }}>VEL<span>O</span>UR</div>
        <p className="auth-subtitle">Meu Perfil</p>

        <form className="auth-form" onSubmit={handleSave}>
          <div className="v-form-group">
            <label className="v-label">Nome</label>
            <input className="v-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="v-form-group">
            <label className="v-label">Email</label>
            <input className="v-input" type="email" value={profile?.email || ""} disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
          </div>
          <div className="v-form-group">
            <label className="v-label">Tipo de conta</label>
            <input className="v-input" value={profile?.is_admin ? "Administrador" : "Cliente"} disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
          </div>

          {error   && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">Perfil atualizado com sucesso!</p>}

          <button className="auth-btn" type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>

        <button className="auth-logout" onClick={handleLogout}>
          Sair da conta
        </button>
      </div>
    </div>
  );
}