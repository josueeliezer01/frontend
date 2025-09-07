// src/pages/admin/UserList.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./UserList.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export function UserList() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao carregar usuários");
        return r.json();
      })
      .then(setUsers)
      .catch((err) => {
        alert(err.message);
        // opcional: navegar para outra página se não for admin
        if (user?.role !== "admin") navigate("/");
      });
  }, [navigate, user]);

  const toggleRole = (u) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    fetch(`${API_URL}/users/${u.id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Não foi possível alterar role");
        return r.json();
      })
      .then((updated) =>
        setUsers((us) => us.map((x) => (x.id === updated.id ? updated : x)))
      )
      .catch((err) => alert(err.message));
  };

  return (
    <div className="user-list-wrapper">
      <div className="user-list-card">
        <h1>Usuários</h1>
        <table>
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Nome</th>
              <th>Role</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => toggleRole(u)}>
                    {u.role === "admin" ? "Rebaixar" : "Promover"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
