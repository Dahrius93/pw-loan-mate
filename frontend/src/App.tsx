import { useEffect, useState, type ReactElement } from "react";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import UserUpdate from "./pages/UserUpdate";
import Header from "./components/Header";
import { setAuthToken, logout, getProfile } from "./services/api";
import "./App.css";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nome, setNome] = useState<string | null>(null);
  const [mode, setMode] = useState<
    "welcome" | "login" | "register" | "profile"
  >("welcome");

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
  }, []);

  const handleLogout = () => {
    logout();
    setAuthToken("");
    setToken(null);
    setIsAdmin(false);
    setMode("welcome");
    setNome(null);
    sessionStorage.removeItem("token");
  };

  let content: ReactElement;
  if (!token) {
    if (mode === "login") {
      content = (
        <>
          <LoginPage
            onLogged={(t, admin, _mail, nome) => {
              setAuthToken(t);
              setToken(t);
              setIsAdmin(admin);
              setNome(nome);
              sessionStorage.setItem("token", t);
            }}
            onBackToHome={() => setMode("welcome")}
          />
          <button
            onClick={() => setMode("register")}
            className="mt-4 text-white bg-green-600 hover:bg-green-700 px-12 py-2 rounded"
          >
            Registrati
          </button>
        </>
      );
    } else if (mode === "register") {
      content = (
        <>
          <RegisterPage
            onRegistered={(t, _mail) => {
              setAuthToken(t);
              setToken(t);
              setIsAdmin(false);
              sessionStorage.setItem("token", t);
            }}
          />
          <button
            onClick={() => setMode("login")}
            className="mt-4 text-white bg-green-600 hover:bg-green-700 px-12 py-2 rounded"
          >
            Accedi
          </button>
        </>
      );
    } else {
      content = <WelcomePage />;
    }
  } else {
    if (mode === "profile") {
      content = <UserUpdate />;
    } else {
      content = isAdmin ? <AdminHomePage /> : <UserHomePage />;
    }
  }

  return (
    <div>
      <Header
        nome={token && nome ? nome : undefined}
        onLogin={() => setMode("login")}
        onLogout={handleLogout}
        onProfile={() => setMode("profile")}
      />
      {content}
    </div>
  );
}

export default App;
