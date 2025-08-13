import React, { useEffect, useState } from "react";
import {
  Home,
  FileText,
  Gauge,
  Speech,
  Lock,
  Menu,
  X,
  LogIn,
  UserRoundCog,
  UserRoundPlus,
  GraduationCap,
} from "lucide-react";

const Sidebar = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [erro, setErro] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (user) {
      logout(user);
      setErro(null);
    } else {
      setErro("Email ou senha inválidos");
      console.log(erro);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Usuário:", user.name);
    }
  }, [user]);

  return (
    <>
      {/* Botão para mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Toggle sidebar</span>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          flex flex-col justify-between fixed z-40 w-64 min-h-screen max-h-screen transition-transform duration-300 ease-in-out bg-gray-50 border-r border-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          flex-shrink-0
        `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto ">
          <a href="/" className="flex items-center ps-2.5 mb-8">
            <div className="flex flex-row items-center gap-3 ">
              <div className="flex w-[40px] h-[40px] items-center justify-center bg-gradient-to-r rounded-md from-teal-500 via-teal-400 to-teal-200">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="self-center text-xl font-semibold whitespace-nowrap  bg-gradient-to-r from-cyan-500 to-indigo-600 text-transparent bg-clip-text">
                AuxTCC
              </span>
            </div>
          </a>

          <nav>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/"
                  className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-emerald-100 hover:text-emerald-700 transition-colors group"
                >
                  <Home className="text-emerald-500" size={22} />
                  <span className="ms-3 text-emerald-600 font-medium">
                    Home
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/progresso"
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-emerald-100 transition-colors group"
                >
                  <Gauge className="text-gray-400" size={22} />
                  <span className="flex-1 text-gray-500 ms-3 whitespace-nowrap">
                    Progresso
                  </span>
                  {user ? (
                    <span className="inline-flex items-center justify-center w-5 h-5 ms-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                      3
                    </span>
                  ) : (
                    <Lock className="text-gray-400" size={16} />
                  )}
                </a>
              </li>
              {user?.userType == "orientador" && (
                <li>
                  <a
                    href="/solicitacoes"
                    className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-emerald-100 transition-colors group"
                  >
                    <UserRoundPlus className="text-gray-400" size={22} />
                    <span className="flex-1 text-gray-500 ms-3 whitespace-nowrap">
                      Solicitações
                    </span>
                  </a>
                </li>
              )}

              <li>
                <a
                  href="/documentos"
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-emerald-100 transition-colors group"
                >
                  <FileText className="text-gray-400" size={22} />
                  <span className="flex-1 text-gray-500 ms-3 whitespace-nowrap">
                    Documentos
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/orientadores"
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-emerald-100 transition-colors group"
                >
                  <Speech className="text-gray-400" size={22} />
                  <span className="flex-1 text-gray-500 ms-3 whitespace-nowrap">
                    Orientadores
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-green-200 p-4">
          {user ? (
            <div className="flex flex-col">
              <a href="#">
                <div className="flex items-center gap-3 rounded-md bg-green-50 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <span className="text-sm font-medium">DS</span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </div>
              </a>
              <div className="flex flex-row justify-center py-2">
                <a href="#">
                  <button
                    type="button"
                    class="focus:outline-none inline-flex text-gray-700 hover:bg-gray-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-1 me-2 mb-2"
                  >
                    <UserRoundCog
                      className="text-gray-700 mr-2 mt-0.5"
                      size={16}
                    />
                    Configurações
                  </button>
                </a>
                <a href="#" onClick={handleLogout}>
                  <button
                    type="button"
                    class="focus:outline-none inline-flex text-red-500 hover:bg-red-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-1 me-2 mb-2"
                  >
                    <LogIn className="text-red-500 mr-2 mt-0.5" size={16} />
                    Sair
                  </button>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <p>
                Olá, <span className="text-emerald-500">visitante</span>!<br />
                <span>Já tem conta?</span>
              </p>
              <a
                href="#"
                data-modal-target="login-modal"
                data-modal-toggle="login-modal"
              >
                <button
                  type="button"
                  class="focus:outline-none inline-flex text-white bg-emerald-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <LogIn className="text-white mr-2 mt-0.5" size={16} />
                  Login
                </button>
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
