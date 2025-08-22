import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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

const Sidebar = ({ user, logout, onLoginClick, onConfigClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [erro, setErro] = useState(null);
  const [numberOfTasks, setNumberOfTasks] = useState(0);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
    const fetchTasksCount = async () => {
      try {
        let id = user?.id || 0;
        let url = `${import.meta.env.VITE_API_BASE}/api/tasks`;
        const response = await fetch(`${url}?orientando_id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok) {
          setErro(result.message || "Erro ao buscar contagem de tarefas.");
          return;
        }

        const pendentesCount = result.reduce((count, task) => {
          return task.status === "pendente" ? count + 1 : count;
        }, 0);

        setNumberOfTasks(pendentesCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasksCount();
  }, [user]);

  const getNavLinkClasses = (path) => {
    const isActive = location.pathname === path;
    const base =
      "flex items-center p-3 rounded-lg transition-colors group aux-nav-link";
    const link = isActive
      ? `${base} bg-white shadow-sm aux-active`
      : `${base} hover:bg-white hover:shadow-sm`;

    return {
      link,
      icon: "aux-icon text-gray-400",
      text: "aux-text ms-3 whitespace-nowrap text-gray-500 pr-4",
    };
  };

  return (
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <linearGradient id="sidebar-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#818cf8" />
        </linearGradient>
      </svg>

      {/* CSS local para controlar o comportamento do gradiente no texto e no SVG */}
      <style>{`
          /* default: ícone usa stroke=currentColor (herda color), texto usa cor sólida (tailwind) */
          .aux-nav-link svg { stroke: currentColor; }

          /* Hover ou active: aplicar gradiente no SVG e no texto */
          .aux-nav-link:hover svg,
          .aux-nav-link.aux-active svg {
            /* usa o gradiente definido em <defs> */
            stroke: url(#sidebar-grad);
          }

          .aux-nav-link:hover .aux-text,
          .aux-nav-link.aux-active .aux-text {
            /* aplica o mesmo gradiente visual do AuxTCC ao texto (bg-clip) */
            background-image: linear-gradient(90deg, #22d3ee, #818cf8);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 700;
          }
        `}</style>

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
                <a href="/" className={getNavLinkClasses("/").link}>
                  <Home size={22} className={getNavLinkClasses("/").icon} />
                  <span className={getNavLinkClasses("/").text}>Home</span>
                </a>
              </li>

              <li>
                <a
                  href="/progresso"
                  className={getNavLinkClasses("/progresso").link}
                >
                  <Gauge
                    size={22}
                    className={getNavLinkClasses("/progresso").icon}
                  />
                  <span className={getNavLinkClasses("/progresso").text}>
                    Progresso
                  </span>
                  {user ? (
                    <span className="inline-flex items-center justify-center w-5 h-5 ms-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                      {numberOfTasks > 0 ? numberOfTasks : "0"}
                    </span>
                  ) : (
                    <Lock className="text-gray-400" size={16} />
                  )}
                </a>
              </li>

              {user?.userType === "orientador" && (
                <li>
                  <a
                    href="/solicitacoes"
                    className={getNavLinkClasses("/solicitacoes").link}
                  >
                    <UserRoundPlus
                      size={22}
                      className={getNavLinkClasses("/solicitacoes").icon}
                    />
                    <span className={getNavLinkClasses("/solicitacoes").text}>
                      Solicitações
                    </span>
                  </a>
                </li>
              )}

              <li>
                <a
                  href="/documentos"
                  className={getNavLinkClasses("/documentos").link}
                >
                  <FileText
                    size={22}
                    className={getNavLinkClasses("/documentos").icon}
                  />
                  <span className={getNavLinkClasses("/documentos").text}>
                    Documentos
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="/orientadores"
                  className={getNavLinkClasses("/orientadores").link}
                >
                  <Speech
                    size={22}
                    className={getNavLinkClasses("/orientadores").icon}
                  />
                  <span className={getNavLinkClasses("/orientadores").text}>
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
                <button
                  type="button"
                  className="focus:outline-none inline-flex text-gray-700 hover:bg-gray-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-1 me-2 mb-2"
                  onClick={onConfigClick}
                >
                  <UserRoundCog
                    className="text-gray-700 mr-2 mt-0.5"
                    size={16}
                  />
                  Configurações
                </button>

                <Link
                  to="/"
                  onClick={handleLogout}
                  className="focus:outline-none inline-flex items-center text-red-500 hover:bg-red-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-1 me-2 mb-2"
                >
                  <LogIn className="text-red-500 mr-2 mt-0.5" size={16} />
                  <p className="text-red-500">Sair</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <p>
                Olá, <span className="text-emerald-500">visitante</span>!<br />
                <span>Já tem conta?</span>
              </p>
              <button
                type="button"
                onClick={onLoginClick}
                className="focus:outline-none inline-flex text-white bg-emerald-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                <LogIn className="text-white mr-2 mt-0.5" size={16} />
                Login
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
