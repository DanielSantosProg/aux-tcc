import React from 'react'
import { Home, FileText, Gauge, Speech, LogOutIcon, Lock } from 'lucide-react'
import styles from './Sidebar.module.css';
const Sidebar = () => {
  return (
    <>
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>

        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
            <a href="/" className="flex items-center ps-2.5 mb-5">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-emerald-500">Aux TCC</span>
            </a>
            <ul className="space-y-2 font-medium">
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-emerald-500 group">
                    <Home color="green" size={26} />
                    <span className="ms-3 text-emerald-500">Home</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                    <Gauge color="grey" size={26} />
                    <span className="flex-1 ms-3 whitespace-nowrap text-gray-500">Progresso</span>
                    <Lock color="black" size={20} />
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                    <FileText color="grey" size={26} />
                    <span className="flex-1 ms-3 whitespace-nowrap text-gray-500">Documentos</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">3</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                    <Speech color="grey" size={26} />
                    <span className="flex-1 ms-3 whitespace-nowrap text-gray-500">Orientadores</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                    <LogOutIcon color="red" size={26} />
                    <span className="flex-1 ms-3 whitespace-nowrap text-red-500">Sair</span>
                    </a>
                </li>
            </ul>
        </div>
        </aside>
    </>
  )
}

export default Sidebar