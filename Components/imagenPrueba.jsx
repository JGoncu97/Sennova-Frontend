import { Box, VStack, Heading, Image } from "@chakra-ui/react";
import logoEmpresa from '../assests/logoECommergy2.png'; // Asegúrate de que la ruta sea correcta

export default function ImagenPrueba() { // Usa un nombre de componente con mayúscula
  return (
    <Box 
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white" // Cambia a un color sólido para verificar si el fondo funciona
    > 
      <VStack spacing={4}>
        <Image src={logoEmpresa} alt="Logo de la empresa" boxSize="100px" mb={4} />
        <Heading as='h1' size='xl' color="#003916">
          eCommergy2
        </Heading>
      </VStack>
    </Box>
  );
}
