import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { INITIAL_PRODUCTS, CATEGORIES } from "./data/products";
import { Icon } from "./icons/Icon";
import { useAuth } from "./context/AuthContext";

import Header          from "./components/Header";
import Hero            from "./components/Hero";
import ProductGrid     from "./components/ProductGrid";
import ProductModal    from "./components/ProductModal";
import ConfirmModal    from "./components/ConfirmModal";
import ToastContainer  from "./components/ToastContainer";
import Footer          from "./components/Footer";
import ProtectedRoute  from "./components/ProtectedRoute";
import Login           from "./components/Login";
import Register        from "./components/Register";
import Profile         from "./components/Profile";

let _nextId = INITIAL_PRODUCTS.length + 1;

function StorePage() {
  const { isAdmin } = useAuth();

  const [products, setProducts]         = useState(INITIAL_PRODUCTS);
  const [search, setSearch]             = useState("");
  const [activeFilter, setActiveFilter] = useState("todos");
  const [modalOpen, setModalOpen]       = useState(false);
  const [editData, setEditData]         = useState(null);
  const [confirmOpen, setConfirmOpen]   = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts]             = useState([]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") { setModalOpen(false); setConfirmOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const showToast = useCallback((message, type = "") => {
    const id = Date.now();
    setToasts((ts) => [...ts, { id, message, type }]);
    setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), 3000);
  }, []);

  const handleAddClick = () => { setEditData(null); setModalOpen(true); };

  const handleEdit = (id) => {
    const p = products.find((x) => x.id === id);
    if (p) { setEditData(p); setModalOpen(true); }
  };

  const handleSave = (form) => {
    const { name, category, price } = form;
    if (!name.trim())            { showToast("Informe o nome do produto.", "error"); return; }
    if (!category)               { showToast("Selecione uma categoria.", "error"); return; }
    const parsedPrice = parseFloat(price);
    if (!parsedPrice || parsedPrice <= 0) { showToast("Informe um preço válido.", "error"); return; }

    if (editData) {
      setProducts((ps) => ps.map((p) => p.id === editData.id ? { ...p, ...form, price: parsedPrice } : p));
      showToast("Produto atualizado com sucesso!", "success");
    } else {
      setProducts((ps) => [{ ...form, price: parsedPrice, id: _nextId++ }, ...ps]);
      showToast("Produto adicionado à coleção!", "success");
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => { setDeleteTarget(id); setConfirmOpen(true); };

  const handleConfirmDelete = () => {
    const p = products.find((x) => x.id === deleteTarget);
    setProducts((ps) => ps.filter((x) => x.id !== deleteTarget));
    setConfirmOpen(false);
    setDeleteTarget(null);
    if (p) showToast(`"${p.name}" removido da coleção.`, "error");
  };

  const filteredCount = products.filter((p) => {
    const matchCat = activeFilter === "todos" || p.category === activeFilter;
    const q = search.toLowerCase();
    return matchCat && (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }).length;

  const scrollToMain = () =>
    document.getElementById("v-main")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Header onAddClick={handleAddClick} />
      <Hero count={products.length} onScrollDown={scrollToMain} />

      <main className="v-main" id="v-main">
        <div className="v-section-header">
          <div>
            <h2 className="v-section-title">Nossa <span>Coleção</span></h2>
            <p className="v-product-count">
              {filteredCount} produto{filteredCount !== 1 ? "s" : ""} disponíve{filteredCount !== 1 ? "is" : "l"}
            </p>
          </div>
          {/* Botão de adicionar só aparece para admin */}
          {isAdmin && (
            <button className="v-btn-add" onClick={handleAddClick}>
              <Icon.Plus /> Adicionar Produto
            </button>
          )}
        </div>

        <div className="v-controls">
          <div className="v-search-wrap">
            <span className="v-search-icon"><Icon.Search /></span>
            <input
              className="v-search-input"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="v-filter-bar">
          {["todos", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              className={`v-filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === "todos" ? "Todos" : cat}
            </button>
          ))}
        </div>

        <ProductGrid
          products={products}
          search={search}
          activeFilter={activeFilter}
          onEdit={isAdmin ? handleEdit : undefined}
          onDelete={isAdmin ? handleDelete : undefined}
        />
      </main>

      <Footer />

      {isAdmin && (
        <>
          <ProductModal open={modalOpen} editData={editData} onClose={() => setModalOpen(false)} onSave={handleSave} />
          <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmDelete} />
        </>
      )}

      <ToastContainer toasts={toasts} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<StorePage />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}