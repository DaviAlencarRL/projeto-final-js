export default function Hero({ count, onScrollDown }) {
  return (
    <div className="v-hero">
      <div className="v-hero-text">
        <p className="v-hero-eyebrow">Coleção Primavera · 2025</p>
        <h1 className="v-hero-title">
          Moda que<br />
          <em>inspira</em>
        </h1>
        <p className="v-hero-sub">
          Peças cuidadosamente selecionadas que combinam elegância
          contemporânea com conforto do dia a dia.
        </p>
        <button className="v-hero-btn" onClick={onScrollDown}>
          Ver Coleção
        </button>
      </div>

      <div className="v-hero-stats">
        <div className="v-stat-item">
          <span className="v-stat-num">{count}</span>
          <span className="v-stat-label">Produtos</span>
        </div>
        <div className="v-stat-item">
          <span className="v-stat-num">5</span>
          <span className="v-stat-label">Categorias</span>
        </div>
        <div className="v-stat-item">
          <span className="v-stat-num">∞</span>
          <span className="v-stat-label">Estilo</span>
        </div>
      </div>
    </div>
  );
}