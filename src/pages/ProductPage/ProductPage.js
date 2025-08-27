import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./ProductPage.css";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { add } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3333/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produto não encontrado");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p>Erro: {error}</p>;

  const handleAdd = async () => {
    await add(product.id, qty);
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <main className="container category-container">
      <h1>{product.name}</h1>
      <div className="product-detail">
        <img
          src={product.image}
          alt={product.name}
          className="detail-image"
        />
        <div className="detail-info">
          <p>
            <strong>Preço:</strong> €{parseFloat(product.price).toFixed(2)}
          </p>
          <p>
            <strong>Descrição:</strong> {product.description}
          </p>
          <p>
            <strong>Categoria:</strong> {product.category}
          </p>
          <p>
            <strong>Disponibilidade:</strong>{" "}
            {product.stock > 0 ? `${product.stock} em estoque` : "Esgotado"}
          </p>
        </div>
      </div>

      <div className="add-to-cart-controls">
        <label>
          Quantidade:
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
          />
        </label>
        <button
          className="btn-add-page"
          onClick={handleAdd}>
          Adicionar ao carrinho
        </button>
      </div>
    </main>
  );
}
