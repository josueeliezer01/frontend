// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../ArrowIcon/ArrowIcon";


export function BackButton({ className, ...props }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={className}
      {...props}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      aria-label="Voltar">
      <ArrowIcon
        width={44}
        height={44}
      />
    </button>
  );
}
