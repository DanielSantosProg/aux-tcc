import './App.css';
import 'flowbite';
import { ThemeConfig } from 'flowbite-react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//Pages
import Home from './pages/Home/Home';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import Progress from './pages/Progress/Progress';
import Documents from './pages/Documents/Documents';
import Orientadores from './pages/Orientadores/Orientadores';


function App() {
  return (
    <div className="min-h-screen flex-row">
      <BrowserRouter>        
        <div className="flex min-h-screen">
          <Sidebar />
          <ThemeConfig dark={false} />
          <div className='ml-2 sm:ml-64'>
            <LoginModal />
            <RegisterModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/progresso" element={<Progress />} />
              <Route path="/documentos" element={<Documents />} />
              <Route path="/orientadores" element={<Orientadores />} />
            </Routes>
          </div>          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
