// frontend/src/components/NavBar/NavBar.jsx
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "../Logo/logo";
import SearchIcon from "../SearchICon/SearchIcon";
import CartIcon from "../CartIcon/CartIcon";
import UserIcon from "../UserIcon/UserICon";
import { AuthContext } from "../../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // stickiness
  useEffect(() => {
    const onScroll = () =>
      window.scrollY > 100 ? setSticky(true) : setSticky(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fetch suggestions with debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetch(
        `${API_URL}/products?search=${encodeURIComponent(
          searchTerm
        )}`,
        { signal: controller.signal }
      )
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => setSuggestions(data))
        .catch(() => setSuggestions([]));
    }, 300);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchTerm]);

  // close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/product/${id}`);
  };

  const initials =
    user && user.firstName && user.lastName
      ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
      : null;

  return (
    <header className={`navbar ${sticky ? "dark-nav" : ""}`}>
      <div className="navbar-left">
        <Link
          to="/"
          className="logo-link">
          <Logo
            width={120}
            height={36}
          />
        </Link>
      </div>

      <button
        className={`nav-toggle ${isOpen ? "open" : ""}`}
        aria-label="Menu"
        onClick={() => setIsOpen((o) => !o)}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <nav className={`nav-bar ${isOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <span className="nav-heading">CATEGORIAS</span>
            <ul className="dropdown">
              <li>
                <Link to="/categories/sport-nutrition">
                  Nutrição Desportiva
                </Link>
              </li>
              <li>
                <Link to="/categories/healthy-eating">
                  Alimentação Saudável
                </Link>
              </li>
              <li>
                <Link to="/categories/wellness">Saúde e Bem-Estar</Link>
              </li>
              <li>
                <Link to="/categories/weight-loss">Emagrecimento</Link>
              </li>
              <li>
                <Link to="/categories/sexual-health">Vida Sexual</Link>
              </li>
              <li>
                <Link to="/categories/beauty">Beleza e cuidado pessoal</Link>
              </li>
              <li>
                <Link to="/categories/activewear">Activewear</Link>
              </li>
              <li>
                <Link to="/categories/accessories">Acessórios Desportivos</Link>
              </li>
              <li>
                <Link to="/categories/tech-home">Tecnologia e Casa</Link>
              </li>
              <li>
                <Link to="/categories/pet-nutrition">Nutrição Animal</Link>
              </li>
            </ul>
          </li>

          <li>
            <span className="nav-heading">MARCAS</span>
            <ul className="dropdown">
              <li>
                <Link to="/brands/vitafuel">VitaFuel</Link>
              </li>
              <li>
                <Link to="/brands/promax-nutrition">ProMax Nutrition</Link>
              </li>
              <li>
                <Link to="/brands/energiapure">EnergiaPure</Link>
              </li>
              <li>
                <Link to="/brands/powerzen">PowerZen</Link>
              </li>
              <li>
                <Link to="/brands/nutriedge">NutriEdge</Link>
              </li>
              <li>
                <Link to="/brands/activewave">ActiveWave</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/about">SOBRE NÓS</Link>
          </li>
          <li>
            <Link to="/outlet">OUTLET</Link>
          </li>
        </ul>

        <div className="navbar-right">
          <div
            className="search-wrapper"
            ref={dropdownRef}>
            <input
              type="text"
              className="search-input"
              placeholder="PROCURAR"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="search-icon" />
            {suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => handleSelect(p.id)}>
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {user ? (
            <Link
              to="/profile"
              className="icon-button"
              aria-label="Minha conta">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="user-initials-avatar"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="16"
                  cy="16"
                  r="16"
                  fill="#007cf7"
                />
                <text
                  x="16"
                  y="20"
                  textAnchor="middle"
                  fontSize="13"
                  fill="#fff"
                  fontFamily="Arial, sans-serif">
                  {initials}
                </text>
              </svg>
            </Link>
          ) : (
            <Link
              to="/login"
              className="icon-button"
              aria-label="Minha conta">
              <UserIcon />
            </Link>
          )}

          <Link
            to="/cart"
            className="icon-button"
            aria-label="Carrinho">
            <CartIcon />
          </Link>
        </div>
      </nav>
    </header>
  );
}
