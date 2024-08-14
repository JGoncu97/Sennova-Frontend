import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Carrusel from './Components/Carrusel';
import Login from './Components/Login';
import Presentacion from './Presentacion';

Presentacion
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Presentacion />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
