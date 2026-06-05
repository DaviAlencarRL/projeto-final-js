import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({ onAddClick }) {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <header className="v-header">
      <Link to="/" className="v-logo" style={{ textDecoration: "none" }}>
        VEL<span>O</span>UR
      </Link>

      <nav className="v-nav">
        <button className="v-nav-link">Coleções</button>
        <button className="v-nav-link">Tendências</button>
        <button className="v-nav-link">Sobre</button>

        {user ? (
          <>
            {/* Botão de adicionar produto — só admin vê */}
            {profile?.is_admin && (
              <button className="v-nav-link v-nav-cta" onClick={onAddClick}>
                + Novo Produto
              </button>
            )}

            {/* Avatar com link pro perfil */}
            <Link to="/profile" className="header-avatar-btn" title="Meu perfil">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" className="header-avatar-img" />
              ) : (
                <div className="header-avatar-placeholder">
                  {(profile?.name || user.email)[0].toUpperCase()}
                </div>
              )}
            </Link>

            <button className="v-nav-link" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <Link to="/login" className="v-nav-link v-nav-cta" style={{ textDecoration: "none" }}>
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}