// src/components/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import NavBar from "../NavBar/NavBar";
import { BackButton } from "../BackButton/BackButton";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();
  const showBack = pathname !== "/";

  return (
    <>
      <TopNav />
      <NavBar />
      {showBack && (
        <div className="layout-back-button">
          <BackButton />
        </div>
      )}
      <main className="layout-container">
        <Outlet />
      </main>
    </>
  );
}
