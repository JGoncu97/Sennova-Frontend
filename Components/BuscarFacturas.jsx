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
import Facturas from './Facturas';

const BuscarFacturas = () => {
  const [facturasRegistradas, setFacturasRegistradas] = useState([]);
  const [filteredFacturas, setFilteredFacturas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFactura, setSelectedFactura] = useState(null);
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/facturas');
        const data = await response.json();
        if (Array.isArray(data)) {
          const validData = data.map(item => ({
            numeroFactura: typeof item.numero_factura === 'string' ? item.numero_factura : '',
            fecha: typeof item.fecha === 'string' ? item.fecha : '',
            sede: typeof item.sede === 'string' ? item.sede : '',
            anio: typeof item.anio === 'number' ? item.anio : 0,
            mes: typeof item.mes === 'number' ? item.mes : 0,
            cantidadKh: typeof item.cantidadkh === 'number' ? item.cantidadkh : 0,
            valorFactura: typeof item.valor_factura === 'number' ? item.valor_factura : 0,
            idfactura: item.idfactura // Asegúrate de que el idfactura esté presente
          }));
          setFacturasRegistradas(validData);
          setFilteredFacturas(validData);
        } else {
          console.error('Datos de facturas no son un arreglo:', data);
        }
      } catch (error) {
        console.error('Error fetching facturas:', error);
      }
    };

    fetchFacturas();
  }, []);

  useEffect(() => {
    const filtered = facturasRegistradas.filter(factura =>
      (factura.numeroFactura && factura.numeroFactura.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (factura.sede && factura.sede.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (factura.anio && factura.anio.toString().includes(searchTerm)) ||
      (factura.mes && factura.mes.toString().includes(searchTerm)) ||
      (factura.valorFactura && factura.valorFactura.toString().includes(searchTerm))
    );
    setFilteredFacturas(filtered);
  }, [searchTerm, facturasRegistradas]);

  const handleEdit = (factura) => {
    setSelectedFactura(factura);
    onOpen();
  };

  const handleDelete = async (factura) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta factura?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/facturas/${factura.idfactura}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          Swal.fire('Eliminado!', 'La factura ha sido eliminada.', 'success');
          setFacturasRegistradas(facturasRegistradas.filter(f => f.idfactura !== factura.idfactura));
        } else {
          Swal.fire('Error', 'No se pudo eliminar la factura.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al eliminar la factura: ' + error.message, 'error');
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
            placeholder="Buscar facturas registradas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button marginLeft={'1rem'} color={'white'} backgroundColor='#007832' _hover={{backgroundColor:'#02652d'}} _active={{ backgroundColor: '#003916' }} onClick={() => { setSelectedFactura(null); onOpen(); }}>Nuevo</Button>
        </Box>
        <TableContainer backgroundColor={''}>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr backgroundColor={'#3bb000'}>
                <Th color={'white'}>Número Factura</Th>
                <Th color={'white'}>Fecha</Th>
                <Th color={'white'}>Sede</Th>
                <Th color={'white'}>Año Consumo</Th>
                <Th color={'white'}>Mes Consumo</Th>
                <Th color={'white'} isNumeric>Cantidad kWh</Th>
                <Th color={'white'} isNumeric>Valor Factura</Th>
                <Th color={'white'}></Th>
              </Tr>
            </Thead>
            <Tbody backgroundColor={'white'}>
              {filteredFacturas.length > 0 ? (
                filteredFacturas.map((factura, index) => (
                  <Tr key={index}>
                    <Td>{factura.numeroFactura}</Td>
                    <Td>{factura.fecha}</Td>
                    <Td>{factura.sede}</Td>
                    <Td>{factura.anio}</Td>
                    <Td>{meses[factura.mes - 1]}</Td>
                    <Td isNumeric>{factura.cantidadKh}</Td>
                    <Td isNumeric>{factura.valorFactura}</Td>
                    <Td>
                      <Button 
                        size="sm" 
                        color={'white'} 
                        backgroundColor='#007832' 
                        _hover={{backgroundColor:'#02652d'}} 
                        _active={{ backgroundColor: '#003916' }} 
                        onClick={() => handleEdit(factura)}
                      >
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        color={'white'} 
                        backgroundColor='#FF0000' 
                        _hover={{backgroundColor:'#CC0000'}} 
                        _active={{ backgroundColor: '#990000' }} 
                        onClick={() => handleDelete(factura)}
                        marginLeft={'1rem'}
                      >
                        Borrar
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center">No se encontraron facturas registradas.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedFactura ? "Editar Factura" : "Nueva Factura"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Facturas factura={selectedFactura} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default BuscarFacturas;