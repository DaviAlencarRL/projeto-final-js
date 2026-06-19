import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Icon } from "../icons/Icon";

const EMPTY_ADDRESS = { cep: "", street: "", number: "", city: "", state: "" };
const EMPTY_CARD    = { number: "", name: "", expiry: "", cvv: "" };

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [card, setCard]       = useState(EMPTY_CARD);
  const [placing, setPlacing] = useState(false);
  const [done, setDone]       = useState(false);

  const setAddr = (field) => (e) => setAddress((a) => ({ ...a, [field]: e.target.value }));
  const setCardField = (field) => (e) => setCard((c) => ({ ...c, [field]: e.target.value }));

  function handlePlaceOrder(e) {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setDone(true);
      clearCart();
    }, 1500);
  }

  if (items.length === 0 && !done) {
    navigate("/cart");
    return null;
  }

  if (done) {
    return (
      <div className="cart-page">
        <header className="v-header">
          <Link to="/" className="v-logo" style={{ textDecoration: "none" }}>
            VEL<span>O</span>UR
          </Link>
        </header>
        <main className="checkout-success">
          <div className="checkout-success-icon"><Icon.Check /></div>
          <h1 className="v-section-title">Pedido confirmado!</h1>
          <p className="v-product-count" style={{ marginBottom: 32 }}>
            Obrigado, {profile?.name || "cliente"}! Seu pedido foi recebido e já está sendo preparado.
          </p>
          <Link to="/" className="v-hero-btn" style={{ textDecoration: "none" }}>
            Voltar à loja
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="v-header">
        <Link to="/" className="v-logo" style={{ textDecoration: "none" }}>
          VEL<span>O</span>UR
        </Link>
        <Link to="/cart" className="v-nav-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon.ArrowLeft /> Voltar ao carrinho
        </Link>
      </header>

      <main className="cart-main">
        <h1 className="v-section-title" style={{ marginBottom: 40 }}>
          Finalizar <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Compra</span>
        </h1>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          <div className="checkout-form-col">
            {/* Endereço */}
            <div className="checkout-section">
              <h3 className="cart-summary-title">Endereço de entrega</h3>
              <div className="v-form-grid">
                <div className="v-form-group">
                  <label className="v-label">CEP</label>
                  <input className="v-input" value={address.cep} onChange={setAddr("cep")} required />
                </div>
                <div className="v-form-group">
                  <label className="v-label">Número</label>
                  <input className="v-input" value={address.number} onChange={setAddr("number")} required />
                </div>
                <div className="v-form-group full">
                  <label className="v-label">Endereço</label>
                  <input className="v-input" value={address.street} onChange={setAddr("street")} required />
                </div>
                <div className="v-form-group">
                  <label className="v-label">Cidade</label>
                  <input className="v-input" value={address.city} onChange={setAddr("city")} required />
                </div>
                <div className="v-form-group">
                  <label className="v-label">Estado</label>
                  <input className="v-input" value={address.state} onChange={setAddr("state")} maxLength={2} required />
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div className="checkout-section">
              <h3 className="cart-summary-title">Pagamento</h3>
              <div className="v-form-grid">
                <div className="v-form-group full">
                  <label className="v-label">Número do cartão</label>
                  <input className="v-input" placeholder="0000 0000 0000 0000" value={card.number} onChange={setCardField("number")} required />
                </div>
                <div className="v-form-group full">
                  <label className="v-label">Nome no cartão</label>
                  <input className="v-input" value={card.name} onChange={setCardField("name")} required />
                </div>
                <div className="v-form-group">
                  <label className="v-label">Validade</label>
                  <input className="v-input" placeholder="MM/AA" value={card.expiry} onChange={setCardField("expiry")} required />
                </div>
                <div className="v-form-group">
                  <label className="v-label">CVV</label>
                  <input className="v-input" placeholder="000" value={card.cvv} onChange={setCardField("cvv")} required />
                </div>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="cart-summary">
            <h3 className="cart-summary-title">Resumo do Pedido</h3>
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-summary-row" style={{ fontSize: 12 }}>
                <span>{item.qty}x {item.name}{item.size ? ` (${item.size})` : ""}</span>
                <span>R$ {(item.price * item.qty).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="cart-summary-divider" />
            <div className="cart-summary-row">
              <span>Frete</span>
              <span className="cart-free">Grátis</span>
            </div>
            <div className="cart-summary-divider" />
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>

            <button className="auth-btn" type="submit" disabled={placing} style={{ marginTop: 24 }}>
              {placing ? "Processando..." : "Confirmar Pedido"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}