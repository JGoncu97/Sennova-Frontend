import { Box, VStack, Image, HStack, Checkbox, Button, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import imagenFondo from '../assests/imagenLogin.jpg'; 
import imagenLogo from '../assests/StockCake-Eco-Friendly Energy Concept_1722381068.jpg'; 
import logoEmpresa from '../assests/logoECommergy2-removebg-preview.png';
import logoSena from '../assests/logo-sena-verde-complementario-png-2022.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor, ingresa un email válido que contenga "@"',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: data.message,
        }).then(() => {
          navigate('/home');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado: ' + error.message,
      });
    }
  };

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        backgroundImage={`url(${imagenFondo})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Box
          width="100%"
          height="100%"
          backdropFilter="blur(8px)" 
          backgroundColor="rgba(255, 255, 255, 0.1)" 
          zIndex={-1}
        />
      </Box>
      <Image
        src={logoEmpresa}
        alt="Logo de la empresa"
        position="absolute"
        top="10px" 
        left="10px" 
        boxSize="50px" 
        zIndex={1}
      />
      
      <Image
        src={logoSena}
        alt="Logo de la empresa"
        position="absolute"
        top="10px" 
        left="1300px" 
        boxSize="50px" 
        zIndex={1} 
      />
      <VStack spacing={4} zIndex={1} position="relative">
        <Box
          display="flex"
          justifyContent="space-between"
          border={['none', '0px']}
          borderRadius={12}
          backgroundColor="white"
        >
          <Box 
            w={['full','md']}
            h={['400px']}
            maxW="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTopLeftRadius="13px"
            borderBottomLeftRadius="13px"
            backgroundImage={`url(${imagenLogo})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems="center"
              justifyContent="center"
              padding='0px'
            >
              <Heading as='h1' size='xl' mb={4} color="white">
                eCommergy2
              </Heading>
            </Box>
          </Box>
          <Box 
            w={['full', 'md']} 
            maxW="md"
            p={[8, 10]} 
            borderTopRightRadius="13px"
            borderBottomRightRadius="13px"
            backgroundColor="white"
            zIndex={1}
          >
            <VStack spacing={4} align='flex-start' w='full'>
              <VStack spacing={1} align={['flex-start', 'center']} w='full'>
                <Heading>Bienvenidos</Heading>
              </VStack>
              <FormControl>
                <FormLabel>Dirección de E-mail</FormLabel>
                <Input 
                  rounded='none' 
                  variant='filled' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input 
                  rounded='none' 
                  variant='filled' 
                  type='password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </FormControl>
              <HStack w='full' justify='space-between'>
                <Checkbox>Recuérdame.</Checkbox>
                <Button variant='link' colorScheme='blue'>
                  ¿Olvidaste tu contraseña?
                </Button>
              </HStack>
              <Button 
                rounded='none' 
                backgroundColor='#007832' 
                w='full' 
                color='white' 
                _hover={{ backgroundColor: '#02652d' }}
                _active={{ backgroundColor: '#003916' }} 
                onClick={handleLogin}
              >
                Login
              </Button>
            </VStack>
          </Box>
        </Box>
      </VStack>
      <Box
        position="absolute"
        top="85%"
        left="calc(31% - 125px)"
        zIndex={1}
        color="white"
        fontSize="0.8rem"
        fontWeight="bold"
        textAlign='center'
        backgroundColor="rgba(0, 0, 0, 0.5)"
        padding="0.5rem"
        borderRadius="md"
      >
        PROYECTO SENNOVA
        <br />
        ANALISIS DE AHORRO EN EL COSTO DE LA ENERGIA A PARTIR DEL kWh
        <br /> 
        OFRECIDO POR DOS COMERCIALIZADORES EN 2 SEDES DEL CENTRO DE COMERCIO Y TURISMO REGIONAL QUINDIO
      </Box>
    </Box>
  );
}
