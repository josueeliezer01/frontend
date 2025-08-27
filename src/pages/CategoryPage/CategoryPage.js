// frontend/src/pages/CategoryPage/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./CategoryPage.css";

const categoryKeyMap = {
  "sport-nutrition": "sportNutrition",
  "healthy-eating": "healthyEating",
  wellness: "wellness",
  "weight-loss": "weightLoss",
  "sexual-health": "sexualHealth",
  beauty: "beautyCare",
  activewear: "activewear",
  accessories: "sportAccessories",
  "tech-home": "techHome",
  "pet-nutrition": "petNutrition",
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const propKey = categoryKeyMap[categoryId];

  useEffect(() => {
    if (!propKey) return;

    setLoading(true);
    // aqui passamos o slug (categoryId), que bate com a coluna `category` do banco
    fetch(`http://localhost:3333/products/category/${propKey}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [propKey]);

  if (!propKey) {
    return (
      <p>
        Categoria “<strong>{categoryId}</strong>” não encontrada.
      </p>
    );
  }
  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (products.length === 0) {
    return <p>Sem produtos nesta categoria.</p>;
  }

  const title = categoryId
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className="container category-container">
      <h1>{title}</h1>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
          />
        ))}
      </div>
    </main>
  );
}
