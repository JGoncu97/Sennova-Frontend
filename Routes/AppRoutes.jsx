// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa los componentes de la aplicación
import Presentacion from '../Components/Presentacion';
import Login from '../Components/Login';
import Register from '../Components/Register';
import HomePage from '../Components/HomePage';
import TarifasComercializadoras from '../Components/Tarifas';
import ComercializadorForm from '../Components/Comercializador';


const AppRoutes = () => (
  <Routes>
    {/* Ruta principal de la aplicación */}
    <Route path="/" element={<Presentacion />} />

    {/* Rutas para el flujo de autenticación */}
    <Route path="/login" element={<Login />} />
  
    {/* Ruta para la página principal después del login */}
    <Route path="/home" element={<HomePage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/tarifas" element={<TarifasComercializadoras />} />
    <Route path="/registro-comercializador" element={<ComercializadorForm />} />

  </Routes>
);

export default AppRoutes;
