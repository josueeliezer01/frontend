// src/components/AdminRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // ainda não sabemos se o token era válido
    return null; // ou um <Spinner /> se preferir
  }
  if (!user) {
    // sem login -> vai para login
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  if (user.role !== "admin") {
    // logado mas não é admin -> vai pra home
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  // é admin, libera as rotas-filhas
  return <Outlet />;
}
