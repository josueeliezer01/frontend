import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./OutletPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export default function OutletPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/products/outlet`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar promoção");
        return res.json();
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando ofertas...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (products.length === 0)
    return <p>Nenhum produto em promoção no momento.</p>;

  return (
    <main className="container outlet-container">
      <h1>Outlet – Promoções</h1>
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
