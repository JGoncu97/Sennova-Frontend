// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa los componentes de la aplicación
import Presentacion from '../Components/Presentacion';
import Login from '../Components/Login';
import Register from '../Components/Register';
import HomePage from '../Components/HomePage';
BuscarTarifas
import ComercializadorForm from '../Components/Comercializador';
BuscarTarifas
import Tarifas from '../Components/Tarifas';
import BuscarTarifas from '../Components/BuscarTarifas';
import Facturas from '../Components/Facturas'
import BuscarFacturas from '../Components/BuscarFacturas';

const AppRoutes = () => (
  <Routes>
    {/* Ruta principal de la aplicación */}
    <Route path="/" element={<Presentacion />} />

    {/* Rutas para el flujo de autenticación */}
    <Route path="/login" element={<Login />} />
  
    {/* Ruta para la página principal después del login */}
    <Route path="/home" element={<HomePage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/tarifas" element={<Tarifas />} />
    <Route path="/buscar-tarifas" element={<BuscarTarifas />} />
    <Route path="/registro-comercializador" element={<ComercializadorForm />} />
    <Route path="/facturas" element={<Facturas />} />
    <Route path="/buscar-facturas" element={<BuscarFacturas />} />
  </Routes>
);

// Exporta el componente como default
export default AppRoutes;