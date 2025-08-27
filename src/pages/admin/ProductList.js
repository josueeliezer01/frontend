import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3333/products", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => alert("Erro ao carregar produtos"));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Confirma exclusão?")) return;
    fetch(`http://localhost:3333/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      if (res.status === 204) {
        setProducts((ps) => ps.filter((p) => p.id !== id));
      } else {
        alert("Erro ao excluir");
      }
    });
  };

  return (
    <div className="product-list-wrapper">
      <div className="product-list-card">
        <h1>Produtos</h1>
        <div className="toolbar">
          <button onClick={() => navigate("/admin/products/new")}>
            Novo Produto
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>R$ {Number(p.price).toFixed(2)}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/products/${p.id}/edit`)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
