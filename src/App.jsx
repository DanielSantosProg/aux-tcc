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
        <div className="flex min-h-screen">
          <Sidebar />
          <div className='ml-2 sm:ml-64'>
            <LoginModal />
            <RegisterModal />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
