import { Icon } from "../icons/Icon";
 
export default function ToastContainer({ toasts }) {
  return (
    <div className="v-toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`v-toast ${t.type}`}>
          {t.type === "success" ? <Icon.Check /> : <Icon.X />}
          {t.message}
        </div>
      ))}
    </div>
  );
}