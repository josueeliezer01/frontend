import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./CartPage.css";

export default function CartPage() {
  const { items, add, decrement, remove, clear } = useContext(CartContext);

  const total = items.reduce(
    (sum, i) => sum + parseFloat(i.price) * i.quantity,
    0
  );

  const handleFinalize = () => {
    clear();
    alert("Compra finalizada! Obrigado pelo pedido.");
  };

  return (
    <main className="container cart-page">
      <h1>Meu Carrinho</h1>
      {items.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((i) => (
              <li
                key={i.product_id}
                className="cart-item">
                <img
                  src={i.image}
                  width={50}
                  alt={i.name}
                />
                <span className="item-name">{i.name}</span>
                <span className="item-price">
                  €{parseFloat(i.price).toFixed(2)}
                </span>
                <div className="item-qty">
                  <button onClick={() => decrement(i.product_id, 1)}>–</button>
                  <span>{i.quantity}</span>
                  <button onClick={() => add(i.product_id, 1)}>+</button>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => remove(i.product_id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              <strong>Total:</strong> €{total.toFixed(2)}
            </p>

            <label>Forma de Pagamento:</label>
            <select className="payment-select">
              <option value="credit">Cartão de Crédito</option>
              <option value="paypal">PayPal</option>
              <option value="pix">PIX</option>
            </select>

            <button
              onClick={handleFinalize}
              className="btn-finalize">
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </main>
  );
}
