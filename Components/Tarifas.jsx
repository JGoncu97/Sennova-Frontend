import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Select, VStack } from "@chakra-ui/react";
import Swal from 'sweetalert2';

const Tarifas= ({ tarifa, onClose }) => {
  const [operadores, setOperadores] = useState([]);
  const [operadorSeleccionado, setOperadorSeleccionado] = useState(tarifa ? tarifa.operador : '');
  const [anioSeleccionado, setAnioSeleccionado] = useState(tarifa ? tarifa.anio : '');
  const [mesSeleccionado, setMesSeleccionado] = useState(tarifa ? tarifa.mes : '');
  const [valorKwh, setValorKwh] = useState(tarifa ? tarifa.valorkh : '');

  const meses = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre'
  };

  useEffect(() => {
    // Obtener la lista de operadores de la base de datos
    fetch('http://localhost:5000/api/operadores')
      .then(response => response.json())
      .then(data => setOperadores(data))
      .catch(error => console.error('Error fetching operadores:', error));
  }, []);

  const handleGuardar = async () => {
    if (!operadorSeleccionado || !anioSeleccionado || !mesSeleccionado || !valorKwh) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacíos',
        text: 'Por favor, completa todos los campos.'
      });
      return;
    }

    try {
      const method = tarifa ? 'PUT' : 'POST';
      const url = tarifa ? `http://localhost:5000/api/tarifas/${tarifa.id}` : 'http://localhost:5000/api/tarifas';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operador: operadorSeleccionado,
          anio: anioSeleccionado,
          mes: mesSeleccionado,
          valorkh: valorKwh,
        }),
      });

      const data = await response.json();
      if (data.success === false) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: tarifa ? 'Error al actualizar la tarifa.' : 'Ya existe una tarifa registrada para ese operador en el mes y año seleccionados.'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: tarifa ? 'Actualización Exitosa' : 'Registro Exitoso',
          text: tarifa ? 'La tarifa se ha actualizado correctamente.' : 'La tarifa se ha registrado correctamente.'
        });
        onClose(); // Cerrar el modal después de guardar
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar la tarifa: ' + error.message
      });
    }
  };

  const anios = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2000; year--) {
    anios.push(year);
  }

  return (
    <Box>
      <VStack spacing={4} align='flex-start'>
        <FormControl>
          <FormLabel>Operador de Energía</FormLabel>
          <Select 
            backgroundColor={'white'}
            borderColor='#525252'
            placeholder="Seleccione un operador"
            value={operadorSeleccionado}
            onChange={(e) => setOperadorSeleccionado(e.target.value)}
          >
            {operadores.map(operador => (
              <option key={operador.idoperador} value={operador.idoperador}>
                {operador.nombre}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Año</FormLabel>
          <Select
            backgroundColor={'white'}
            borderColor='#525252'
            placeholder="Seleccione un año"
            value={anioSeleccionado}
            onChange={(e) => setAnioSeleccionado(e.target.value)}
          >
            {anios.map(anio => (
              <option key={anio} value={anio}>{anio}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Mes</FormLabel>
          <Select 
            backgroundColor={'white'}
            borderColor='#525252'
            placeholder="Seleccione un mes"
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(e.target.value)}
          >
            {Object.keys(meses).map(mes => (
              <option key={mes} value={mes}>{meses[mes]}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Valor kWh</FormLabel>
          <Input
            backgroundColor={'white'}
            borderColor='#525252'
            type="number"
            placeholder="Ingrese el valor kWh"
            value={valorKwh}
            onChange={(e) => setValorKwh(e.target.value)}
          />
        </FormControl>

        <Button 
        color={'white'}
        backgroundColor='#007832' 
        _hover={{ backgroundColor: '#02652d' }}
        _active={{ backgroundColor: '#003916' }}
          onClick={handleGuardar}>
          {tarifa ? "Actualizar Tarifa" : "Registrar Tarifa"}
        </Button>
      </VStack>
    </Box>
  );
};

export default Tarifas;
