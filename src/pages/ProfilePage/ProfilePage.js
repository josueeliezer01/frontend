// src/pages/ProfilePage/ProfilePage.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./ProfilePage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export default function ProfilePage() {
  const [user, setLocalUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || "Erro ao buscar perfil");
        }
        return res.json();
      })
      .then((u) => {
        setLocalUser(u);
        setForm({
          firstName: u.firstName,
          lastName: u.lastName,
          address: u.address,
          password: "",
        });
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
    };
    if (form.password) payload.password = form.password;

    const res = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const updated = await res.json();
      setLocalUser(updated);
      setUser(updated);
      setEditing(false);
      alert("Perfil atualizado!");
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Erro ao atualizar perfil");
    }
  };

  if (loading) return <p>Carregando perfil...</p>;
  if (!user) return null;

  return (
    <div className="profile-page-wrapper">
      <main className="profile-container">
        <h1>Minha Conta</h1>

        {editing ? (
          <>
            <div>
              <label>Nome</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Sobrenome</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Endereço</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Nova Senha (opcional)</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button onClick={handleSave}>Salvar</button>
              <button onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Nome:</strong> {user.firstName}
            </p>
            <p>
              <strong>Sobrenome:</strong> {user.lastName}
            </p>
            <p>
              <strong>E-mail:</strong> {user.email}
            </p>
            <p>
              <strong>Endereço:</strong> {user.address}
            </p>

            <div className="button-group">
              <button onClick={() => setEditing(true)}>Editar</button>
              <button
                className="logout-btn"
                onClick={handleLogout}>
                Logout
              </button>
            </div>

            {user.role === "admin" && (
              <div className="admin-buttons">
                <button onClick={() => navigate("/admin/products")}>
                  Gerenciar Produtos
                </button>
                <button onClick={() => navigate("/admin/users")}>
                  Gerenciar Usuários
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
