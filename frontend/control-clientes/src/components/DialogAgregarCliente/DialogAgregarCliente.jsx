import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

function DialogAgregarCliente({ open, onClose, onSave }) {
  const [newData, setNewData] = useState({ nombre: '', telefono: '', email: '', direcciones: [''] });

  const handleNewChange = (prop) => (event) => {
    setNewData({ ...newData, [prop]: event.target.value });
  };

  const handleNewDireccionChange = (index) => (event) => {
    const nuevasDirecciones = [...newData.direcciones];
    nuevasDirecciones[index] = event.target.value;
    setNewData({ ...newData, direcciones: nuevasDirecciones });
  };

  const handleAddNewDireccion = () => {
    setNewData({ ...newData, direcciones: [...newData.direcciones, ''] });
  };

  const handleRemoveNewDireccion = (index) => () => {
    const nuevasDirecciones = newData.direcciones.filter((_, i) => i !== index);
    setNewData({ ...newData, direcciones: nuevasDirecciones });
  };

  const handleSave = () => {
    const newCliente = {
      id: Math.floor(Math.random() * 10000),
      ...newData
    };
    onSave(newCliente);
    setNewData({ nombre: '', telefono: '', email: '', direcciones: [''] });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Cliente</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          value={newData.nombre}
          onChange={handleNewChange('nombre')}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          type="text"
          fullWidth
          variant="standard"
          value={newData.telefono}
          onChange={handleNewChange('telefono')}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={newData.email}
          onChange={handleNewChange('email')}
        />
        <Typography variant="h6" component="div" style={{ marginTop: 20 }}>
          Direcciones
        </Typography>
        {newData.direcciones.map((direccion, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              margin="dense"
              label={`Dirección ${index + 1}`}
              type="text"
              fullWidth
              variant="standard"
              value={direccion}
              onChange={handleNewDireccionChange(index)}
            />
            <IconButton onClick={handleRemoveNewDireccion(index)}>
              <Remove />
            </IconButton>
          </div>
        ))}
        <Button onClick={handleAddNewDireccion} color="primary" startIcon={<Add />}>
          Añadir Dirección
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAgregarCliente;
