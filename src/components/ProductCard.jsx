import { Icon } from "../icons/Icon";
import ProductPlaceholder from "./ProductPlaceholder";

export default function ProductCard({ product, index, onEdit, onDelete }) {
  const { id, name, category, price, desc, sizes, badge, image } = product;
  const delay = `${(index * 0.06).toFixed(2)}s`;
  const isAdmin = !!onEdit && !!onDelete;

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
        {sizes && (
          <div className="v-sizes">
            {sizes.split(",").map((s) => (
              <span key={s} className="v-size-tag">{s.trim()}</span>
            ))}
          </div>
        )}
        <div className="v-card-footer">
          <div className="v-price">
            <span className="v-price-cur">R$</span>
            {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          {isAdmin && (
            <div className="v-actions">
              <button className="v-btn-icon" onClick={() => onEdit(id)} title="Editar"><Icon.Edit /></button>
              <button className="v-btn-icon del" onClick={() => onDelete(id)} title="Remover"><Icon.Trash /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}