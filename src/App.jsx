import './App.css';
import 'flowbite';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//Pages
import Home from './pages/Home/Home';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';


function App() {
  return (
    <div className="min-h-screen flex-row">
      <BrowserRouter>        
        <div className="flex">
          <Sidebar />
          <LoginModal />
          <RegisterModal />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
