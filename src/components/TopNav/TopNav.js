import { useState, useEffect } from "react";
import "./TopNav.css";

const messages = [
  "FRETE GRÁTIS EM COMPRAS ACIMA DE 30€",
  "ENCONTRE A SUA SUPLEMENTAÇÃO AQUI",
  "ENTREGAS EM 24H",
];

export default function TopNav() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-nav">
      <span className="message">{messages[currentIndex]}</span>
    </div>
  );
}
