// src/pages/admin/ProductForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductForm.css";

const CATEGORY_OPTIONS = [
  "sportNutrition",
  "healthyEating",
  "wellness",
  "weightLoss",
  "sexualHealth",
  "beautyCare",
  "activewear",
  "sportAccessories",
  "techHome",
  "petNutrition",
];

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    images: "",
    onSale: false,
  });
  const [file, setFile] = useState(null);

  // Load existing product when editing
  useEffect(() => {
    if (!isEditing) return;
    fetch(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          brand: data.brand || "",
          stock: data.stock,
          images: data.image || "",
          onSale: data.on_sale || false,
        });
      })
      .catch(() => {
        alert("Erro ao carregar produto.");
        navigate("/admin/products");
      });
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.images;
    if (file) {
      const data = new FormData();
      data.append("image", file);
      const uploadRes = await fetch(`${API_URL}/upload/product-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: data,
      });
      const uploadBody = await uploadRes.json();
      if (!uploadRes.ok) {
        alert(uploadBody.error || "Erro no upload da imagem");
        return;
      }
      imageUrl = uploadBody.imageUrl;
    }

    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      brand: form.brand,
      stock: parseInt(form.stock, 10),
      images: imageUrl ? [imageUrl] : [],
      on_sale: form.onSale,
    };

    const url = isEditing ? `${API_URL}/products/${id}` : `${API_URL}/products`;
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      navigate("/admin/products");
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Erro ao salvar produto");
    }
  };

  return (
    <div className="product-form-wrapper">
      <div className="product-form-card">
        <h1>{isEditing ? "Editar Produto" : "Novo Produto"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Preço</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          <div>
            <label>Categoria</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required>
              <option
                value=""
                disabled>
                Selecione...
              </option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option
                  key={cat}
                  value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Marca</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Digite a marca"
              required
            />
          </div>
          <div>
            <label>Estoque</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Em promoção?</label>
            <input
              type="checkbox"
              name="onSale"
              checked={form.onSale}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Imagem atual</label>
            {form.images ? (
              <img
                src={form.images}
                alt="Produto"
                style={{ maxWidth: "100%", marginBottom: "0.5rem" }}
              />
            ) : (
              <p>Nenhuma</p>
            )}
          </div>
          <div>
            <label>Nova imagem (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="button-group">
            <button type="submit">Salvar</button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
