import { Icon } from "../icons/Icon";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, search, activeFilter, onEdit, onDelete }) {
  const filtered = products.filter((p) => {
    const matchCat = activeFilter === "todos" || p.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    return (
      <div className="v-grid">
        <div className="v-empty">
          <Icon.Empty />
          <h3>Nenhum produto encontrado</h3>
          <p>Tente ajustar o filtro ou adicione um novo produto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="v-grid">
      {filtered.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          index={i}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}