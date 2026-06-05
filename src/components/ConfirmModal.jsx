import { Icon } from "../icons/Icon";

export default function ConfirmModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="v-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="v-modal v-modal-sm">
        <div className="v-confirm-body">
          <div className="v-confirm-icon">
            <Icon.Alert />
          </div>
          <h3 className="v-confirm-title">Remover produto?</h3>
          <p className="v-confirm-text">
            Esta ação não pode ser desfeita.<br />
            O produto será removido permanentemente da coleção.
          </p>
          <div className="v-confirm-actions">
            <button className="v-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button className="v-btn-delete" onClick={onConfirm}>
              Sim, remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}