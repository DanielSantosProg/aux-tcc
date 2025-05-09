import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//Pages
import Home from './pages/Home/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
