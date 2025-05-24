import React, { useState } from 'react';
import { Home, FileText, Gauge, Speech, LogOutIcon, Lock, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
          fixed sm:relative z-40 w-64 h-screen transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
          flex-shrink-0
        `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 border-r border-gray-200">
          <a href="/" className="flex items-center ps-2.5 mb-8">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-emerald-500">
              Aux TCC
            </span>
          </a>
          
          <nav>
            <ul className="space-y-2 font-medium">
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-emerald-100 hover:text-emerald-700 transition-colors group"
                >
                  <Home className="text-emerald-500" size={22} />
                  <span className="ms-3 text-emerald-600 font-medium">Home</span>
                </a>
              </li>
              
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <Gauge className="text-gray-400" size={22} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Progresso</span>
                  <Lock className="text-gray-400" size={16} />
                </a>
              </li>
              
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <FileText className="text-gray-400" size={22} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Documentos</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 ms-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                    3
                  </span>
                </a>
              </li>
              
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <Speech className="text-gray-400" size={22} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Orientadores</span>
                </a>
              </li>
              
              <li className="pt-4 mt-4 border-t border-gray-200">
                <a 
                  href="#" 
                  className="flex items-center p-3 text-red-500 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors group"
                >
                  <LogOutIcon className="text-red-500" size={22} />
                  <span className="flex-1 ms-3 whitespace-nowrap font-medium">Sair</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;