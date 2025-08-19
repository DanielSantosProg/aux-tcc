import "./App.css";
import "flowbite";
import { ThemeConfig } from "flowbite-react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";

//Pages
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import Progress from "./pages/Progress/Progress";
import Solicitacoes from "./pages/Solicitacoes/Solicitacoes";
import Documents from "./pages/Documents/Documents";
import Orientadores from "./pages/Orientadores/Orientadores";
import Orientador from "./pages/Orientador/Orientador";
import UserConfigModal from "./components/UserConfigModal";

//Hooks
import useFetch from "./hooks/useFetch";

//Context
import { AuthContext } from "./context/AuthContext";

function App() {
  const { data, isPending, error } = useFetch(
    `${import.meta.env.VITE_API_BASE}/api/users`
  );
  const { user, login, logout } = useContext(AuthContext);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  if (error) {
    return <div>Erro: {error.message}</div>;
  }
  if (isPending) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex-row">
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar
            user={user}
            login={login}
            logout={logout}
            onLoginClick={() => setLoginModalOpen(true)}
          />
          <UserConfigModal />
          <ThemeConfig dark={false} />
          <div className="ml-2 sm:ml-64">
            <LoginModal
              open={loginModalOpen}
              setOpen={setLoginModalOpen}
              login={login}
            />
            <RegisterModal />
            <Routes>
              <Route path="/" element={<Home data={data} />} />
              <Route
                path="/progresso"
                element={<Progress data={data} user={user} />}
              />
              <Route path="/solicitacoes" element={<Solicitacoes />} />
              <Route path="/documentos" element={<Documents />} />
              <Route
                path="/orientadores"
                element={<Orientadores data={data} />}
              />
              <Route
                path="/orientador/:nome"
                element={<Orientador data={data} user={user} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
