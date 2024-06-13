import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DialogAgregarCliente from '../DialogAgregarCliente/DialogAgregarCliente';
import DialogEditarCliente from '../DialogEditarCliente/DialogEditarCliente';
import DialogDetallesCliente from '../DialogDetallesCliente/DialogDetallesCliente';
import DialogConfirmarEliminacion from '../DialogConfirmarEliminacion/DialogConfirmarEliminacion';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: "#049ae0",
    color: "white",
  }));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const AlignTopTableCell = styled(TableCell)({
    verticalAlign: 'top',
    paddingBottom: '4px',
  });

function ClienteTable() {
    const [clientes, setClientes] = useState([
      { id: 1, nombre: 'Juan', telefono: '+1-123-456-7890', email: 'juan@example.com', direcciones: ['Dirección 1', 'Dirección 2'] },
      { id: 2, nombre: 'María', telefono: '+1-234-567-8901', email: 'maria@example.com', direcciones: ['Dirección 3'] },
      // Más clientes...
    ]);
    const [openDetails, setOpenDetails] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [editData, setEditData] = useState({ nombre: '', telefono: '', email: '', direcciones: [] });
  
    const handleOpenDetails = (cliente) => {
      setSelectedCliente(cliente);
      setOpenDetails(true);
    };
  
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };
  
    const handleOpenConfirm = (cliente) => {
      setSelectedCliente(cliente);
      setOpenConfirm(true);
    };
  
    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };
  
    const handleDelete = () => {
      setClientes(prev => prev.filter(cliente => cliente.id !== selectedCliente.id));
      setOpenConfirm(false);
    };
  
    const handleOpenEdit = (cliente) => {
      setEditData(cliente);
      setSelectedCliente(cliente);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };
  
    const handleOpenAdd = () => {
      setOpenAdd(true);
    };
  
    const handleCloseAdd = () => {
      setOpenAdd(false);
    };
  
    const handleSaveEdit = (updatedCliente) => {
      setClientes(prev => prev.map(cliente => cliente.id === selectedCliente.id ? { ...cliente, ...updatedCliente } : cliente));
      setOpenEdit(false);
    };
  
    const handleSaveNew = (newCliente) => {
      setClientes([...clientes, newCliente]);
      setOpenAdd(false);
    };
  
    return (
      <div>
       <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button sx={{backgroundColor: '#049ae0' }} variant="contained" color="primary" onClick={handleOpenAdd} style={{ marginBottom: '20px' }}>
            Agregar Cliente
        </Button>
       </div>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Teléfono</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Direcciones</StyledTableCell>
                <StyledTableCell align="left" ><MoreHorizIcon /></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <AlignTopTableCell>{cliente.id}</AlignTopTableCell>
                  <AlignTopTableCell>{cliente.nombre}</AlignTopTableCell>
                  <AlignTopTableCell>{cliente.telefono}</AlignTopTableCell>
                  <AlignTopTableCell>{cliente.email}</AlignTopTableCell>
                  <AlignTopTableCell>
                    <ul style={{ paddingLeft: 20, margin: 0, listStylePosition: 'inside' }}>
                      {cliente.direcciones.map((direccion, index) => (
                        <li key={index} style={{ padding: 0, margin: 0 }}>{direccion}</li>
                      ))}
                    </ul>
                  </AlignTopTableCell>
                  <AlignTopTableCell align="left">
                    <Button sx={{ marginRight: "10px" }} variant='contained' size="small" color="primary" onClick={() => handleOpenDetails(cliente)}>Ver</Button>
                    <Button sx={{ marginRight: "10px", backgroundColor: 'green' }} variant='contained' size="small" color="primary" onClick={() => handleOpenEdit(cliente)}>Editar</Button>
                    <Button sx={{ backgroundColor: 'red' }} variant='contained' size="small" color="secondary" onClick={() => handleOpenConfirm(cliente)}>Eliminar</Button>
                  </AlignTopTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <DialogAgregarCliente open={openAdd} onClose={handleCloseAdd} onSave={handleSaveNew} />
        <DialogEditarCliente open={openEdit} onClose={handleCloseEdit} cliente={editData} onSave={handleSaveEdit} />
        <DialogDetallesCliente open={openDetails} onClose={handleCloseDetails} cliente={selectedCliente} />
        <DialogConfirmarEliminacion open={openConfirm} onClose={handleCloseConfirm} onDelete={handleDelete} cliente={selectedCliente} />
      </div>
    );
  }
  
  export default ClienteTable;