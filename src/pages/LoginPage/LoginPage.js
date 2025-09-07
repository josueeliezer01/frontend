// src/pages/LoginPage/LoginPage.jsx
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    // 1. Login e obtenção do token
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) {
      alert(body.error || body.errors?.[0]?.msg);
      return;
    }

    const token = body.token;
    localStorage.setItem("token", token);

    // 2. Buscar perfil com o token
    try {
      const profileRes = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profileRes.ok) throw new Error();
      const profile = await profileRes.json();
      setUser(profile);

      // 3. Redirecionar de acordo com role
      if (profile.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      alert("Não foi possível carregar dados do perfil.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <main className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>E-mail: </label>
            <input
              {...register("email", { required: true })}
              type="email"
            />
          </div>
          <div>
            <label>Senha: </label>
            <input
              {...register("password", { required: true })}
              type="password"
            />
          </div>
          <button
            type="submit"
            disabled={formState.isSubmitting}>
            Entrar
          </button>
        </form>
        <p>
          Não tem conta? <Link to="/register">Registre-se aqui</Link>
        </p>
      </main>
    </div>
  );
}
