import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Select, VStack } from "@chakra-ui/react";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Facturas = ({ factura, onClose }) => {
  const [operadores, setOperadores] = useState([]);
  const [valoresKH, setValoresKH] = useState([]);
  const [sedes, setSedes] = useState([]); // Estado para las sedes

  const [numeroFactura, setNumeroFactura] = useState(factura ? factura.numero_fac : '');
  const [operadorSeleccionado, setOperadorSeleccionado] = useState(factura ? factura.operador : '');
  const [sedeSeleccionada, setSedeSeleccionada] = useState(factura ? factura.sede : ''); // Estado para la sede seleccionada
  const [fecha, setFecha] = useState(factura ? new Date(factura.fecha) : new Date());
  const [anio, setAnio] = useState(factura ? factura.anio : new Date().getFullYear());
  const [mes, setMes] = useState(factura ? factura.mes : '');
  const [cantidadKH, setCantidadKH] = useState(factura ? factura.cantidadkh : '');
  const [valorFactura, setValorFactura] = useState(factura ? factura.valor_factura : '');

  useEffect(() => {
    fetch('http://localhost:5000/api/operadores')
      .then(response => response.json())
      .then(data => setOperadores(data))
      .catch(error => console.error('Error fetching operadores:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/sedes') // Petición para obtener las sedes
      .then(response => response.json())
      .then(data => setSedes(data))
      .catch(error => console.error('Error fetching sedes:', error));
  }, []);

  useEffect(() => {
    if (operadorSeleccionado) {
      fetch(`http://localhost:5000/api/operadores_tarifa/${operadorSeleccionado}`) // Filtrar valores de kWh por operador
        .then(response => response.json())
        .then(data => setValoresKH(data))
        .catch(error => console.error('Error fetching valores kWh:', error));
    }
  }, [operadorSeleccionado]);

  const handleSave = async () => {
    const data = {
      numero_fac: numeroFactura,
      operador: operadorSeleccionado,
      sede: sedeSeleccionada,
      fecha,
      anio,
      mes,
      cantidadkh: cantidadKH,
      valor_factura: valorFactura,
    };

    try {
      let response;
      if (factura) {
        response = await fetch(`http://localhost:5000/api/facturas/${factura.idfactura}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch('http://localhost:5000/api/facturas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        Swal.fire('Éxito', 'Factura guardada correctamente.', 'success');
        onClose();
      } else {
        Swal.fire('Error', 'No se pudo guardar la factura.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error: ' + error.message, 'error');
    }
  };

  return (
    <Box>
      <VStack spacing={4}>
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
          <FormLabel>Sede</FormLabel>
          <Select
            backgroundColor={'white'}
            borderColor='#525252'
            placeholder="Seleccione una sede"
            value={sedeSeleccionada}
            onChange={(e) => setSedeSeleccionada(e.target.value)}
          >
            {sedes.map(sede => (
              <option key={sede.idsede} value={sede.idsede}>
                {sede.nombre}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Número de Factura</FormLabel>
          <Input
            value={numeroFactura}
            onChange={(e) => setNumeroFactura(e.target.value)}
            placeholder="Ingrese número de factura"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Fecha</FormLabel>
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="dd/MM/yyyy"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Año de Consumo</FormLabel>
          <Input
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            placeholder="Ingrese año de consumo"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Mes de Consumo</FormLabel>
          <Select
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            placeholder="Seleccione un mes"
          >
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Cantidad kWh</FormLabel>
          <Input
            type="number"
            value={cantidadKH}
            onChange={(e) => setCantidadKH(e.target.value)}
            placeholder="Ingrese cantidad en kWh"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Valor kWh</FormLabel>
          <Select
            placeholder="Seleccione un valor de kWh"
            value={valorFactura}
            onChange={(e) => setValorFactura(e.target.value)}
          >
            {valoresKH.map(valor => (
              <option key={valor.idtarifa} value={valor.valorkh}>
                {valor.valorkh}
              </option>
            ))}
          </Select>
        </FormControl> 
        <FormControl>
          <FormLabel>Valor Factura</FormLabel>
          <Input
            type="number"
            value={valorFactura}
            onChange={(e) => setValorFactura(e.target.value)}
            placeholder="Ingrese valor de factura"
          />
        </FormControl>
        <Button onClick={handleSave} colorScheme="green">Guardar</Button>
      </VStack>
    </Box>
  );
};

export default Facturas;