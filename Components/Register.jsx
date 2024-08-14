import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack } from "@chakra-ui/react";
import Swal from 'sweetalert2';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargo, setCargo] = useState('');

  const handleRegister = async () => {
    if (!nombre || !email || !password || !cargo) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacíos',
        text: 'Por favor, completa todos los campos.'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          cargo,
          estado: 'A', // Estado por defecto
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar el usuario');
      }

      const data = await response.json();
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: data.message
        });
        // Limpia los campos después del registro exitoso
        setNombre('');
        setEmail('');
        setPassword('');
        setCargo('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado: ' + error.message
      });
    }
  };

  return (
    <Box p={5}>
      <Heading  mb={4}>Registro de Usuario</Heading>
      <VStack spacing={4} align='flex-start'>
        <FormControl>
          <FormLabel  style={{ fontWeight: 'bold' }}>Nombre</FormLabel>
          <Input
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel  style={{ fontWeight: 'bold' }}>Email</FormLabel>
          <Input
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel  style={{ fontWeight: 'bold' }}>Contraseña</FormLabel>
          <Input
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel  style={{ fontWeight: 'bold' }}>Cargo</FormLabel>
          <Input
            backgroundColor={'white'}
            borderColor='#525252' // Color del borde
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </FormControl>
        <Button
          backgroundColor='#007832' 
          color={'white'}
          marginLeft={'19.5rem'}
          colorScheme="teal"
          onClick={handleRegister}
        >
          Registrar
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
