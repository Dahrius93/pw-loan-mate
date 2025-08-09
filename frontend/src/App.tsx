import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import UserUpdate from "./pages/UserUpdate";
import Header from "./components/Header";
import { setAuthToken, logout, getProfile } from "./services/api";
import "./App.css";

function AppRoutes() {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nome, setNome] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");

    if (savedToken) {
      setAuthToken(savedToken);

      getProfile()
        .then((user) => {
          setToken(savedToken);
          setIsAdmin(user.is_staff);
          setNome(user.nome);
        })
        .catch((err) => {
          console.error("Token non valido o scaduto", err);
          handleLogout();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    setAuthToken("");
    setToken(null);
    setIsAdmin(false);
    setNome(null);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Header nome={token && nome ? nome : undefined} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              onLogged={(t, admin, _mail, nome) => {
                void _mail;
                setAuthToken(t);
                setToken(t);
                setIsAdmin(admin);
                setNome(nome);
                sessionStorage.setItem("token", t);
                navigate("/home");
              }}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              onRegistered={(t, _mail) => {
                void _mail;
                setAuthToken(t);
                setToken(t);
                setIsAdmin(false);
                sessionStorage.setItem("token", t);
                navigate("/home");
              }}
            />
          }
        />
        <Route
          path="/profile"
          element={token ? <UserUpdate /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/home"
          element={
            token ? (
              isAdmin ? <AdminHomePage /> : <UserHomePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

