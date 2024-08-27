import { Box, VStack, Image, Heading, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import logoEmpresa from '../assests/logoECommergy2-removebg-preview.png';
import logoInstitucional from '../assests/logo-sena-verde-complementario-png-2022.png';
import imagenRelleno from '../assests/ingenieros.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Register from './Register'; // Asegúrate de importar tu componente Register
import ComercializadorForm from './Comercializador';
import Facturas from './Facturas'; 
import BuscarFacturas from './BuscarFacturas';
export default function HomePage() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showComercializador, setShowComercializador] = useState(false);
  const [showFactura, setShowFactura] = useState(false);
  const [showRegisterFactura, setShowRegisterFactura] = useState(false); // Añadido

  const handleFacturasClick = () => {
    setShowRegisterFactura(true);
    setShowRegister(false);
    setShowComercializador(false);
    setShowFactura(true); // Añadido si necesitas que el estado 'showFactura' se actualice
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowComercializador(false);
    setShowRegisterFactura(false); // Añadido si necesitas que el estado 'showRegisterFactura' se actualice
  };

  const handleComercializadorClick = () => {
    setShowRegister(false);
    setShowComercializador(true);
    setShowRegisterFactura(false); // Añadido si necesitas que el estado 'showRegisterFactura' se actualice
  };

  const handleFacturaClick = () => {
    navigate('/buscar-facturas'); // Redirige a la página de BuscarFacturas
  };

  const handleTarifasClick = () => {
    navigate('/buscar-tarifas'); // Cambia la ruta a la página de "Buscar tarifas"
  };

  const handleCloseForm = () => {
    setShowRegister(false);
    setShowComercializador(false);
    setShowRegisterFactura(false); // Añadido
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box fontFamily={''}>
      <VStack spacing={4} align='flex-start' w='full'>
        <Heading
          display='flex'
          justifyContent='space-between'
          padding={'0.5rem'}
          w={['full', 'mb']}
          backgroundColor='white'
          color={'#4a4745'}
        >
          <Image src={logoEmpresa} alt="Logo de la empresa" boxSize="50px" />
          <h1>eCommergy2</h1>
          <Image src={logoInstitucional} alt="Logo Institucional" boxSize="50px" />
        </Heading>
      </VStack>

      <Box
        display='flex'
        justifyContent='space-between'
        alignContent='center'
        alignItems='center'
        backgroundColor='#39A900'
        w={['full', 'mb']}
        padding={'0.5rem'}
        textAlign='center'
      >
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Menu
          </MenuButton>
          <MenuList backgroundColor='#39A900' color={'#003916'}>
            <MenuItem icon={<PeopleOutlineIcon style={{ fontSize: 20 }} />} onClick={handleComercializadorClick}>
              Comercializador de energía
            </MenuItem>
            <MenuItem icon={<ManageSearchOutlinedIcon style={{ fontSize: 20 }} />}>Sedes del centro</MenuItem>
            <MenuItem icon={<AppRegistrationOutlinedIcon style={{ fontSize: 20 }} />} onClick={handleRegisterClick}>
              Registro de usuarios
            </MenuItem>
            <MenuItem icon={<TrendingUpOutlinedIcon style={{ fontSize: 20 }} />} onClick={handleTarifasClick}>
              Tarifas por comercializador
            </MenuItem>
            <MenuItem icon={<AddchartOutlinedIcon style={{ fontSize: 20 }} />} onClick={handleFacturaClick}>Registro de facturas</MenuItem>
            <MenuItem icon={<AnalyticsOutlinedIcon style={{ fontSize: 20 }} />}>Análisis de costos</MenuItem>
          </MenuList>
        </Menu>
        <h2
          style={{
            fontWeight: 'bold',
            marginLeft: 'auto',
            marginRight: '28rem',
            color: 'white'
          }}
        >
          Welcome Usuario
        </h2>
        <Box display='flex' justifyContent='space-around'>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Menu Usuario
            </MenuButton>
            <MenuList backgroundColor='#39A900' color={'#003916'}>
              <MenuItem icon={<PersonOutlinedIcon style={{ fontSize: 20 }} />}>Perfil</MenuItem>
              <MenuItem icon={<SettingsOutlinedIcon style={{ fontSize: 20 }} />}>Cambio de contraseña</MenuItem>
              <MenuItem icon={<ExitToAppOutlinedIcon style={{ fontSize: 20 }} />} onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Fondo opaco y formularios */}
      {(showRegister || showComercializador || showRegisterFactura) && (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex={1}
            onClick={handleCloseForm}
          />
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="90vw"
             h="auto"
            maxWidth="800px"
            backgroundColor="white"
            padding="0.5rem"
            borderRadius="8px"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
            zIndex={2}
          >
            <Button
              position="absolute"
              top="1rem"
              right="1rem"
              onClick={handleCloseForm}
              backgroundColor="#39A900"
              color="white"
            >
              <CloseOutlinedIcon />
            </Button>
            {showRegister && <Register />}
            {showComercializador && <ComercializadorForm />}
            {showRegisterFactura && <BuscarFacturas />} {/* Asegúrate de que el componente Facturas está importado y definido */}
          </Box>
        </>
      )}

      <Box>
        <Image src={imagenRelleno} alt="Imagen de relleno" w='100vw' h='81.1vh' />
      </Box>
    </Box>
  );
}