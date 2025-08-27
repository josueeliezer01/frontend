// src/pages/RegisterPage.jsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:3333/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (res.ok) {
      alert("Cadastro realizado! Faça login.");
      navigate("/login");
    } else {
      alert(body.error || body.errors?.[0].msg);
    }
  };

  return (
    <main
      className="profile-container"
      style={{ paddingTop: "6rem" }}>
      <h1>Registrar Conta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input
            {...register("firstName", { required: "Nome é obrigatório" })}
            type="text"
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>

        <div>
          <label>Sobrenome:</label>
          <input
            {...register("lastName", { required: "Sobrenome é obrigatório" })}
            type="text"
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>

        <div>
          <label>Endereço:</label>
          <input
            {...register("address", { required: "Endereço é obrigatório" })}
            type="text"
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div>
          <label>E-mail:</label>
          <input
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "E-mail inválido",
              },
            })}
            type="email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Senha:</label>
          <input
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha precisa ter ao menos 6 caracteres",
              },
            })}
            type="password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}>
          Registrar
        </button>
      </form>

      <p>
        Já tem conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </main>
  );
}
