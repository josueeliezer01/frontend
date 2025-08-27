import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { id, image, name, description, price, stock, category } = product;
  const priceNum = parseFloat(price);
  const { add } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = async (e) => {
    // Impede que o clique no botão navegue via Link
    e.preventDefault();
    e.stopPropagation();

    await add(id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="product-card">
      {/* Apenas imagem e nome são link para a página de detalhe */}
      <Link
        to={`/product/${id}`}
        className="product-image-link">
        <img
          src={image}
          alt={name}
          className="product-image"
        />
        <h3 className="product-name">{name}</h3>
      </Link>

      <p className="product-description">{description}</p>
      <div className="product-tags">
        <span className="product-tag">{category}</span>
      </div>
      <div className="product-footer">
        <span className="product-price">€{priceNum.toFixed(2)}</span>
        <span
          className={`product-stock ${stock > 0 ? "in-stock" : "out-stock"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </span>
      </div>

      <button
        className="btn-add"
        onClick={handleAdd}>
        Adicionar ao carrinho
      </button>

      {justAdded && <div className="toast">Produto adicionado!</div>}
    </div>
  );
}
