import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack } from "@chakra-ui/react";
import Swal from 'sweetalert2';

const ComercializadorForm = () => {
  const [nombre, setNombre] = useState('');
  const [sitioWeb, setSitioWeb] = useState('');
  const [contacto, setContacto] = useState('');

  const handleGuardar = async () => {
    if (!nombre || !sitioWeb || !contacto) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacíos',
        text: 'Por favor, completa todos los campos.'
      });
      return;
    }

    try {
      // Verificar si el comercializador ya existe por nombre
      const checkResponse = await fetch(`http://localhost:5000/api/comercializadores?nombre=${nombre}`);
      const checkData = await checkResponse.json();

      if (checkData.existe) {
        Swal.fire({
          icon: 'error',
          title: 'Comercializador Existente',
          text: 'Ya existe un comercializador con ese nombre.'
        });
      } else {
        // Registrar el nuevo comercializador
        const saveResponse = await fetch('http://localhost:5000/api/comercializadores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            sitioweb: sitioWeb, // Asegúrate de que coincida con el nombre en el servidor
            contacto,
          }),
        });

        if (saveResponse.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'El comercializador se ha registrado correctamente.'
          });
          // Limpiar los campos del formulario después de guardar
          setNombre('');
          setSitioWeb('');
          setContacto('');
        } else {
          throw new Error('Error al guardar los datos');
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar el comercializador: ' + error.message
      });
    }
  };

  return (
    <Box p={5} backgroundColor="#f4f4f4">
      <Heading mb={4}>Registrar Comercializador de Energía</Heading>
      <VStack spacing={4} align='flex-start'>
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input 
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el nombre del comercializador"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Sitio Web</FormLabel>
          <Input 
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            value={sitioWeb}
            onChange={(e) => setSitioWeb(e.target.value)}
            placeholder="Ingrese el sitio web del comercializador"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contacto</FormLabel>
          <Input 
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="Ingrese el contacto del comercializador"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleGuardar}>Guardar</Button>
      </VStack>
    </Box>
  );
};

export default ComercializadorForm;
