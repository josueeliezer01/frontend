import  { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoriesSection.css";

const categories = [
  {
    id: "sport-nutrition",
    name: "Nutrição Desportiva",
    src: "/categories/sport-nutrition.png",
    href: "/categories/sport-nutrition",
  },
  {
    id: "healthy-eating",
    name: "Alimentação Saudável",
    src: "/categories/healthy-eating.png",
    href: "/categories/healthy-eating",
  },
  {
    id: "wellness",
    name: "Saúde e Bem‑Estar",
    src: "/categories/wellness.png",
    href: "/categories/wellness",
  },
  {
    id: "weight-loss",
    name: "Emagrecimento",
    src: "/categories/weight-loss.png",
    href: "/categories/weight-loss",
  },
  {
    id: "sexual-health",
    name: "Vida Sexual",
    src: "/categories/sexual-health.png",
    href: "/categories/sexual-health",
  },
  {
    id: "beauty",
    name: "Beleza e Cuidado",
    src: "/categories/beauty.png",
    href: "/categories/beauty",
  },
  {
    id: "activewear",
    name: "Activewear",
    src: "/categories/Activewear.png",
    href: "/categories/activewear",
  },
  {
    id: "accessories",
    name: "Acessórios",
    src: "/categories/accessories.png",
    href: "/categories/accessories",
  },
  {
    id: "tech-home",
    name: "Tecnologia e Casa",
    src: "/categories/tech-home.png",
    href: "/categories/tech-home",
  },
  {
    id: "pet-nutrition",
    name: "Nutrição Animal",
    src: "/categories/pet-nutrition.png",
    href: "/categories/pet-nutrition",
  },
];

export default function CategoriesSection() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [origScroll, setOrigScroll] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e) => {
      container.setPointerCapture(e.pointerId);
      setIsDragging(true);
      setStartX(e.clientX);
      setOrigScroll(container.scrollLeft);
      container.classList.add("dragging");
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      let newScroll = origScroll - delta;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (newScroll < 0) newScroll = 0;
      if (newScroll > maxScroll) newScroll = maxScroll;
      container.scrollLeft = newScroll;
    };

    const onPointerUp = (e) => {
      container.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      container.classList.remove("dragging");
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
    };
  }, [isDragging, startX, origScroll]);

  return (
    <section className="categories-section">
      <h2 className="categories-title">Categorias</h2>
      <div
        ref={containerRef}
        className="categories-container">
        {categories.map((cat) => (
          <div
            className="category-item"
            key={cat.id}>
            <Link
              to={cat.href}
              className="category-link">
              <img
                src={cat.src}
                alt={cat.name}
              />
              <p className="category-label">{cat.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
