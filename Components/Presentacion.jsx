import React, { useState, useEffect } from 'react';
import { Box, Image, IconButton, Button, useBreakpointValue } from "@chakra-ui/react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import imagen1 from '../assests/carrucel 1.jpg';
import imagen2 from '../assests/carrucel 2.jpg';
import imagen3 from '../assests/carrucel 3.jpg';
import logoEmpresa from '../assests/logoECommergy2-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

const images = [imagen1, imagen2, imagen3];

export default function Presentacion() { // Asegúrate de que este nombre de componente es correcto
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia la imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Box 
      background="black" 
      width="100%" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <Box position="relative" width="full" maxW="1365px" mx="auto" marginTop='0.1rem'>
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          borderRadius="md"
          objectFit="cover"
          width="full"
          height="640px"
        />
        <IconButton
          aria-label="Previous Slide"
          icon={<FaArrowCircleLeft />}
          position="absolute"
          left={useBreakpointValue({ base: '10px', md: '20px' })}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={prevSlide}
        />
        <IconButton
          aria-label="Next Slide"
          icon={<FaArrowCircleRight />}
          position="absolute"
          right={useBreakpointValue({ base: '10px', md: '20px' })}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={nextSlide}
        />
          <Box
              position="absolute"
              top="7%"
              left="43%"
              transform="translate(-15%, -50%)"
              zIndex={3}
              textAlign="center"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              color="white"
              padding="0.6rem"
              borderRadius="md"
              fontSize='1rem'
              >
           <h1>
            PROYECTO SENNOVA SGPS-12446-2024
           </h1>
        </Box>
        <Image
          src={logoEmpresa}
          alt="Logo Empresa"
          position="absolute"
          top="16%"
          left="50%"
          transform="translateX(-50%)"
          zIndex={3}
          boxSize="140px" // Ajusta el tamaño del logo según tus necesidades
        />
        <Box
          position="absolute"
          top="50%"
          left="20%"
          transform="translate(-11%, -50%)"
          zIndex={3}
          textAlign="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          color="white"
          padding="0.5rem"
          borderRadius="md"
          fontSize='1.3rem'
        >
          <h1>
            ECONOMIA CIRCULAR COMO APORTE A LA SOSTENIBLIDAD DE DOS SEDES DEL CENTRO DE COMERCIO Y TURISMO A PARTIR DE FUENTES NO CONVENCIONALES DE ENERGIA REOVABLE, EN SENA QUINDIO
          </h1>
        </Box>
        <Button
          position="absolute"
          top="65%"
          left="50%"
          transform="translate(-50%, -50%)"
          backgroundColor='#007832'
          color="white"
          _hover={{ backgroundColor: '#02652d' }}
          _active={{ backgroundColor: '#003916' }}
          zIndex={3}
          onClick={() => navigate('/login')}
        >
          Bienvenidos 
        </Button>
      </Box>
    </Box>
  );
}