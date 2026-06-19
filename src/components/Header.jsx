import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Icon } from "../icons/Icon";

export default function Header({ onAddClick }) {
  const { user, profile, signOut } = useAuth();
  const { totalItems } = useCart();
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

        {/* admin */}
        {user && profile?.is_admin && (
          <button className="v-nav-link v-nav-cta" onClick={onAddClick}>
            + Novo Produto
          </button>
        )}

        {/* Carrinho */}
        <Link to="/cart" className="header-cart-btn" title="Carrinho">
          <Icon.Cart />
          {totalItems > 0 && <span className="header-cart-badge">{totalItems}</span>}
        </Link>

        {user ? (
          <>
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