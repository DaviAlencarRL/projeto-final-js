import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Icon } from "../icons/Icon";
import ProductPlaceholder from "./ProductPlaceholder";

export default function Cart() {
  const { items, removeFromCart, updateQty, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleCheckout() {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  }

  return (
    <div className="cart-page">
      <header className="v-header">
        <Link to="/" className="v-logo" style={{ textDecoration: "none" }}>
          VEL<span>O</span>UR
        </Link>
        <Link to="/" className="v-nav-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon.ArrowLeft /> Continuar comprando
        </Link>
      </header>

      <main className="cart-main">
        <h1 className="v-section-title" style={{ marginBottom: 8 }}>
          Meu <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Carrinho</span>
        </h1>
        <p className="v-product-count" style={{ marginBottom: 40 }}>
          {totalItems} item{totalItems !== 1 ? "s" : ""} no carrinho
        </p>

        {items.length === 0 ? (
          <div className="cart-empty">
            <Icon.Cart width={64} height={64} />
            <h3>Seu carrinho está vazio</h3>
            <p>Adicione produtos da nossa coleção para continuar.</p>
            <Link to="/" className="v-hero-btn" style={{ textDecoration: "none", marginTop: 16 }}>
              Ver Coleção
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Lista de itens */}
            <div className="cart-items">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item-img">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <ProductPlaceholder category={item.category} />
                    )}
                  </div>

                  <div className="cart-item-info">
                    <p className="v-card-cat">{item.category}</p>
                    <h3 className="v-card-name">{item.name}</h3>
                    {item.size && <p className="cart-item-size">Tamanho: {item.size}</p>}
                  </div>

                  <div className="cart-item-qty">
                    <button onClick={() => updateQty(item.id, item.size, item.qty - 1)}>
                      <Icon.Minus />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.size, item.qty + 1)}>
                      <Icon.Plus />
                    </button>
                  </div>

                  <div className="cart-item-price">
                    R$ {(item.price * item.qty).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>

                  <button
                    className="v-btn-icon del"
                    onClick={() => removeFromCart(item.id, item.size)}
                    title="Remover"
                  >
                    <Icon.Trash />
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo do pedido */}
            <div className="cart-summary">
              <h3 className="cart-summary-title">Resumo do Pedido</h3>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="cart-summary-row">
                <span>Frete</span>
                <span className="cart-free">Grátis</span>
              </div>
              <div className="cart-summary-divider" />
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>

              <button className="auth-btn" style={{ marginTop: 24 }} onClick={handleCheckout}>
                Finalizar Compra
              </button>

              {!user && (
                <p className="cart-login-hint">
                  Você precisa <Link to="/login" className="auth-link">entrar</Link> para finalizar a compra.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}