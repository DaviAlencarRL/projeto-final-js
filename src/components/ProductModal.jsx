// src/components/ProductModal.jsx

import { useState, useEffect } from "react";
import { Icon } from "../icons/Icon";
import { CATEGORIES } from "../data/products";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  sizes: "",
  badge: "",
  desc: "",
  image: "",
};

export default function ProductModal({ open, editData, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);

  // Preenche o formulário ao editar
  useEffect(() => {
    if (editData) {
      setForm({ ...editData, price: editData.price.toString() });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editData, open]);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  if (!open) return null;

  return (
    <div
      className="v-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="v-modal">
        <div className="v-modal-header">
          <h3 className="v-modal-title">
            {editData ? "Editar Produto" : "Novo Produto"}
          </h3>
          <button className="v-modal-close" onClick={onClose}>
            <Icon.X />
          </button>
        </div>

        <div className="v-modal-body">
          <div className="v-form-grid">
            <div className="v-form-group full">
              <label className="v-label">Nome do Produto *</label>
              <input
                className="v-input"
                value={form.name}
                onChange={set("name")}
                placeholder="Ex: Vestido Midi Floral"
              />
            </div>

            <div className="v-form-group">
              <label className="v-label">Categoria *</label>
              <select
                className="v-select"
                value={form.category}
                onChange={set("category")}
              >
                <option value="">Selecione...</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="v-form-group">
              <label className="v-label">Preço (R$) *</label>
              <input
                className="v-input"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={set("price")}
                placeholder="0,00"
              />
            </div>

            <div className="v-form-group">
              <label className="v-label">Tamanhos disponíveis</label>
              <input
                className="v-input"
                value={form.sizes}
                onChange={set("sizes")}
                placeholder="PP, P, M, G, GG"
              />
            </div>

            <div className="v-form-group">
              <label className="v-label">Badge</label>
              <select
                className="v-select"
                value={form.badge}
                onChange={set("badge")}
              >
                <option value="">Nenhum</option>
                <option value="new">Novo</option>
                <option value="sale">Oferta</option>
              </select>
            </div>

            <div className="v-form-group full">
              <label className="v-label">Descrição</label>
              <textarea
                className="v-textarea"
                value={form.desc}
                onChange={set("desc")}
                placeholder="Descreva o produto, tecido, estilo..."
              />
            </div>

            <div className="v-form-group full">
              <label className="v-label">URL da Imagem (opcional)</label>
              <input
                className="v-input"
                type="url"
                value={form.image}
                onChange={set("image")}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="v-form-actions">
            <button className="v-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button className="v-btn-save" onClick={() => onSave(form)}>
              Salvar Produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}