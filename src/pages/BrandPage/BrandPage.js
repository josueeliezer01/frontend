// src/pages/BrandPage/BrandPage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./BrandPage.css";

// mapeia slug da URL para o valor guardado no banco (marca)
const brandKeyMap = {
  vitafuel: "VitaFuel",
  "promax-nutrition": "ProMax Nutrition",
  energiapure: "EnergiaPure",
  powerzen: "PowerZen",
  nutriedge: "NutriEdge",
  activewave: "ActiveWave",
};

export default function BrandPage() {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const brandKey = brandKeyMap[brandId];

  useEffect(() => {
    if (!brandKey) return;
    setLoading(true);
    fetch(`http://localhost:3333/products/brand/${brandKey}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [brandKey]);

  if (!brandKey) {
    return (
      <p>
        Marca “<strong>{brandId}</strong>” não encontrada.
      </p>
    );
  }
  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (products.length === 0) {
    return <p>Sem produtos para a marca {brandKey}.</p>;
  }

  // título formatado
  const title = brandKey;

  return (
    <main className="container brand-container">
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
