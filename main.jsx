// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes'; // Importa las rutas
import theme from './theme/theme'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <Router>
      <AppRoutes /> {/* Usa el componente de rutas aquí */}
    </Router>
  </ChakraProvider>
);
