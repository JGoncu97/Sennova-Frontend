import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Select, Text } from "@chakra-ui/react";
import Swal from 'sweetalert2';

const TarifasComercializadoras = () => {
  const [operadores, setOperadores] = useState([]);
  const [operadorSeleccionado, setOperadorSeleccionado] = useState('');
  const [anioSeleccionado, setAnioSeleccionado] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [valorKwh, setValorKwh] = useState('');
  const [tarifasRegistradas, setTarifasRegistradas] = useState([]);
  const [filteredTarifas, setFilteredTarifas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Objeto para mapear números de meses a nombres de meses
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

  useEffect(() => {
    // Obtener tarifas registradas
    fetch('http://localhost:5000/api/tarifas')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTarifasRegistradas(data);
          setFilteredTarifas(data);
        } else {
          console.error('Datos de tarifas no son un arreglo:', data);
        }
      })
      .catch(error => console.error('Error fetching tarifas:', error));
  }, []);

  useEffect(() => {
    // Filtrar tarifas registradas en base al término de búsqueda
    if (Array.isArray(tarifasRegistradas)) {
      const filtered = tarifasRegistradas.filter(tarifa =>
        (tarifa.nombreOperador && tarifa.nombreOperador.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tarifa.anio && tarifa.anio.toString().includes(searchTerm)) ||
        (tarifa.mes && meses[tarifa.mes]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tarifa.valorkh && tarifa.valorkh.toString().includes(searchTerm))
      );
      setFilteredTarifas(filtered);
    }
  }, [searchTerm, tarifasRegistradas]);

  const anios = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2000; year--) { // Cambia 2000 por el año mínimo deseado
    anios.push(year);
  }

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
      const response = await fetch('http://localhost:5000/api/tarifas', {
        method: 'POST',
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
          title: 'Tarifa Existente',
          text: 'Ya existe una tarifa registrada para ese operador en el mes y año seleccionados.'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'La tarifa se ha registrado correctamente.'
        });
        // Limpiar los campos del formulario después de guardar
        setOperadorSeleccionado('');
        setAnioSeleccionado('');
        setMesSeleccionado('');
        setValorKwh('');
        // Actualizar la lista de tarifas registradas
        fetch('http://localhost:5000/api/tarifas')
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data)) {
              setFilteredTarifas(data);
            } else {
              console.error('Datos de tarifas no son un arreglo:', data);
            }
          })
          .catch(error => console.error('Error fetching tarifas:', error));
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar la tarifa: ' + error.message
      });
    }
  };

  return (
    <Box p={5} backgroundColor="#f4f4f4">
      <Heading mb={4}>Tarifas Comercializadoras</Heading>
      <VStack spacing={4} align='flex-start'>
        <FormControl>
          <FormLabel>Operador de Energía</FormLabel>
          <Select 
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            placeholder="Seleccione un operador"
            value={operadorSeleccionado}
            onChange={(e) => setOperadorSeleccionado(e.target.value)}
          >
            {operadores.map((operador) => (
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
            borderColor='#525252' // Color del borde
            placeholder="Seleccione un año"
            value={anioSeleccionado}
            onChange={(e) => setAnioSeleccionado(e.target.value)}
          >
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Mes</FormLabel>
          <Select 
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            placeholder="Seleccione un mes"
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(e.target.value)}
          >
            {Object.entries(meses).map(([valor, nombre]) => (
              <option key={valor} value={valor}>
                {nombre}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Valor de KWh</FormLabel>
          <Input 
            type="number"
            value={valorKwh}
            onChange={(e) => setValorKwh(e.target.value)}
            borderColor="#525252"
          />
        </FormControl>
        <Button backgroundColor='#007832' 
                color={'white'} colorScheme="teal" onClick={handleGuardar}
                marginLeft={"20rem"}>Guardar</Button>
      </VStack>

      {/* Buscador */}
      <Box mt={6}>
        <Input 
          backgroundColor={'white'}
          borderColor='#525252' // Color del borde
          placeholder="Buscar tarifas registradas..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log('Search Term:', e.target.value); // Para depuración
          }}
        />
        <VStack mt={4} align='flex-start'>
          {Array.isArray(filteredTarifas) && filteredTarifas.length > 0 ? (
            filteredTarifas.map((tarifa, index) => (
              <Box key={index} p={2} border="1px solid #525252" w="full">
                {tarifa.nombreOperador} - {tarifa.anio} - {meses[tarifa.mes] || tarifa.mes} - {tarifa.valorkh} kWh
              </Box>
            ))
          ) : (
            <Text>No existen tarifas registradas para la búsqueda realizada.</Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default TarifasComercializadoras;
