import React, { useState } from 'react';
import { Home, FileText, Gauge, Speech, Lock, Menu, X } from 'lucide-react';
import AvatarDropdown from './AvatarDropdown';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarDropdownToggled, setIsAvatarDropdownToggled] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAvatarDropdown = () => {
    setIsAvatarDropdownToggled(!isAvatarDropdownToggled);
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
          flex flex-col justify-between fixed z-40 w-64 min-h-screen max-h-screen transition-transform duration-300 ease-in-out bg-gray-50 border-r border-gray-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
          flex-shrink-0
        `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto ">
          <a href="/" className="flex items-center ps-2.5 mb-8">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-emerald-500">
              Aux TCC
            </span>
          </a>
          
          <nav>
            <ul className="space-y-2 font-medium">
              <li>
                <a 
                  href="/" 
                  className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-emerald-100 hover:text-emerald-700 transition-colors group"
                >
                  <Home className="text-emerald-500" size={22} />
                  <span className="ms-3 text-emerald-600 font-medium">Home</span>
                </a>
              </li>
              
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-emerald-100 transition-colors group"
                >
                  <Gauge className="text-gray-400" size={22} />
                  <span className="flex-1 text-gray-500 ms-3 whitespace-nowrap">Progresso</span>
                  <Lock className="text-gray-400" size={16} />
                </a>
              </li>
              
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-emerald-100 transition-colors group"
                >
                  <FileText className="text-gray-400" size={22} />
                  <span className="flex-1 text-gray-500 ms-3 whitespace-nowrap">Documentos</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 ms-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                    3
                  </span>
                </a>
              </li>
              
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-emerald-100 transition-colors group"
                >
                  <Speech className="text-gray-400" size={22} />
                  <span className="flex-1 text-gray-500 ms-3 whitespace-nowrap">Orientadores</span>
                </a>
              </li>
              
            </ul>
          </nav>          
        </div>
        <div className="border-t border-green-200 p-4">
          <AvatarDropdown />
          <a 
            href="#"
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
          >
            <div className="flex items-center gap-3 rounded-md bg-green-50 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span className="text-sm font-medium">DS</span>
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium text-gray-900">Daniel Santos</span>
                <span className="text-xs text-gray-500">danielsantosprog@gmail.com</span>
              </div>
            </div>
          </a>          
        </div>
      </aside>
    </>
  );
};

export default Sidebar;