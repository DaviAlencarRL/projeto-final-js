import { useState } from "react";
import { Icon } from "../icons/Icon";
import ProductPlaceholder from "./ProductPlaceholder";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index, onEdit, onDelete }) {
  const { id, name, category, price, desc, sizes, badge, image } = product;
  const delay = `${(index * 0.06).toFixed(2)}s`;
  const isAdmin = !!onEdit && !!onDelete;

  const { addToCart } = useCart();
  const sizeList = sizes ? sizes.split(",").map((s) => s.trim()) : [];
  const [selectedSize, setSelectedSize] = useState(sizeList[0] || null);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="v-card" style={{ animationDelay: delay }}>
      <div className="v-card-img-wrap">
        {image ? (
          <img src={image} alt={name} className="v-real-img" onError={(e) => (e.target.style.display = "none")} />
        ) : (
          <ProductPlaceholder category={category} />
        )}
        {badge && (
          <span className={`v-badge ${badge === "new" ? "v-badge-new" : "v-badge-sale"}`}>
            {badge === "new" ? "Novo" : "Oferta"}
          </span>
        )}
      </div>

      <div className="v-card-body">
        <p className="v-card-cat">{category}</p>
        <h3 className="v-card-name">{name}</h3>
        <p className="v-card-desc">{desc}</p>

        {sizeList.length > 0 && (
          <div className="v-sizes v-sizes-selectable">
            {sizeList.map((s) => (
              <button
                key={s}
                type="button"
                className={`v-size-tag v-size-pick ${selectedSize === s ? "active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="v-card-footer">
          <div className="v-price">
            <span className="v-price-cur">R$</span>
            {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>

          <div className="v-actions">
            {isAdmin ? (
              <>
                <button className="v-btn-icon" onClick={() => onEdit(id)} title="Editar"><Icon.Edit /></button>
                <button className="v-btn-icon del" onClick={() => onDelete(id)} title="Remover"><Icon.Trash /></button>
              </>
            ) : (
              <button
                className={`v-btn-icon v-btn-cart ${added ? "added" : ""}`}
                onClick={handleAddToCart}
                title="Adicionar ao carrinho"
              >
                {added ? <Icon.Check /> : <Icon.Cart width={15} height={15} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}