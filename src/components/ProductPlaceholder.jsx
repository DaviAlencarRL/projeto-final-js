import { Icon } from "../icons/Icon";
import { CATEGORY_COLORS } from "../data/products";

export default function ProductPlaceholder({ category }) {
  const bg = CATEGORY_COLORS[category] || "#E8E8E8";

  return (
    <div className="v-placeholder" style={{ background: bg }}>
      <Icon.Bag />
      <span>{category || "Sem categoria"}</span>
    </div>
  );
}