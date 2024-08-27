import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Heading, Img} from "@chakra-ui/react";
import Tarifas from './Tarifas';
import {PaginationTable} from "table-pagination-chakra-ui"
import logoEmpresa from '../assests/logoECommergy2-removebg-preview.png';
import logoInstitucional from '../assests/logo-sena-verde-complementario-png-2022.png';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const BuscarFacturas = () => {
  const [tarifasRegistradas, setTarifasRegistradas] = useState([]);
  const [filteredTarifas, setFilteredTarifas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTarifa, setSelectedTarifa] = useState(null);
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    const fetchTarifas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tarifas');
        const data = await response.json();
        if (Array.isArray(data)) {
          const validData = data.map(item => ({
            nombreOperador: typeof item.nombreOperador === 'string' ? item.nombreOperador : '',
            anio: typeof item.anio === 'number' ? item.anio : 0,
            mes: typeof item.mes === 'number' ? item.mes : 0,
            valorkh: typeof item.valorkh === 'number' ? item.valorkh : 0
          }));
          setTarifasRegistradas(validData);
          setFilteredTarifas(validData);
        } else {
          console.error('Datos de tarifas no son un arreglo:', data);
        }
      } catch (error) {
        console.error('Error fetching tarifas:', error);
      }
    };

    fetchTarifas();
  }, []);

  useEffect(() => {
    const filtered = tarifasRegistradas.filter(tarifa =>
      (tarifa.nombreOperador && tarifa.nombreOperador.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tarifa.anio && tarifa.anio.toString().includes(searchTerm)) ||
      (tarifa.mes && tarifa.mes.toString().includes(searchTerm)) ||
      (tarifa.valorkh && tarifa.valorkh.toString().includes(searchTerm))
    );
    console.log('Tarifas Filtradas:', filtered);
    setFilteredTarifas(filtered);
  }, [searchTerm, tarifasRegistradas]);

  const handleEdit = (tarifa) => {
    setSelectedTarifa(tarifa);
    onOpen();
  };

  const handleDelete = async (tarifa) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarifa?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/tarifas/${tarifa.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          Swal.fire('Eliminado!', 'La tarifa ha sido eliminada.', 'success');
          setTarifasRegistradas(tarifasRegistradas.filter(t => t.id !== tarifa.id));
        } else {
          Swal.fire('Error', 'No se pudo eliminar la tarifa.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al eliminar la tarifa: ' + error.message, 'error');
      }
    }
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
          <Img src={logoEmpresa} alt="Logo de la empresa" boxSize="50px" />
          <h1>eCommergy2</h1>
          <Img src={logoInstitucional} alt="Logo Institucional" boxSize="50px" />
        </Heading>
      </VStack>
      <Box p={5} backgroundColor="#98fe58" h="36.1rem">
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Input 
            backgroundColor={'white'}
            borderColor='#525252'
            placeholder="Buscar tarifas registradas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button marginLeft={'1rem'} color={'white'} backgroundColor='#007832' _hover={{backgroundColor:'#02652d'}} _active={{ backgroundColor: '#003916' }}  onClick={() => { setSelectedTarifa(null); onOpen(); }}>Nuevo</Button>
        </Box>
        <TableContainer backgroundColor={''}>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr backgroundColor={'#3bb000'}>
                <Th color={'white'}>Comercializador</Th>
                <Th color={'white'}>Año</Th>
                <Th color={'white'}>Mes</Th>
                <Th color={'white'} isNumeric>Valor KwH</Th>
                <Th color={'white'}></Th>
              </Tr>
            </Thead>
            <Tbody backgroundColor={'white'}>
              {filteredTarifas.length > 0 ? (
                filteredTarifas.map((tarifa, index) => (
                  <Tr key={index}>
                    <Td>{tarifa.nombreOperador}</Td>
                    <Td>{tarifa.anio}</Td>
                    <Td>{meses[tarifa.mes - 1]}</Td>
                    <Td isNumeric>{tarifa.valorkh}</Td>
                    <Td>
                      <Button 
                        size="sm" 
                        color={'white'} 
                        backgroundColor='#007832' 
                        _hover={{backgroundColor:'#02652d'}} 
                        _active={{ backgroundColor: '#003916' }} 
                        onClick={() => handleEdit(tarifa)}
                      >
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        color={'white'} 
                        backgroundColor='#FF0000' 
                        _hover={{backgroundColor:'#CC0000'}} 
                        _active={{ backgroundColor: '#990000' }} 
                        onClick={() => handleDelete(tarifa)}
                        marginLeft={'1rem'}
                      >
                        Borrar
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">No se encontraron tarifas registradas.</Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              {/* Puedes agregar pie de tabla si es necesario */}
            </Tfoot>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedTarifa ? "Editar Tarifa" : "Nueva Tarifa"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tarifas tarifa={selectedTarifa} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default BuscarFacturas;