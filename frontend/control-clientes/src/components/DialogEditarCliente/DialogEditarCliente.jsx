import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

function DialogEditarCliente({ open, onClose, cliente, onSave }) {
  const [editData, setEditData] = useState(cliente);

  useEffect(() => {
    setEditData(cliente);
  }, [cliente]);

  const handleChange = (prop) => (event) => {
    setEditData({ ...editData, [prop]: event.target.value });
  };

  const handleDireccionChange = (index) => (event) => {
    const nuevasDirecciones = [...editData.direcciones];
    nuevasDirecciones[index] = event.target.value;
    setEditData({ ...editData, direcciones: nuevasDirecciones });
  };

  const handleAddDireccion = () => {
    setEditData({ ...editData, direcciones: [...editData.direcciones, ''] });
  };

  const handleRemoveDireccion = (index) => () => {
    const nuevasDirecciones = editData.direcciones.filter((_, i) => i !== index);
    setEditData({ ...editData, direcciones: nuevasDirecciones });
  };

  const handleSave = () => {
    onSave(editData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          value={editData.nombre}
          onChange={handleChange('nombre')}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          type="text"
          fullWidth
          variant="standard"
          value={editData.telefono}
          onChange={handleChange('telefono')}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={editData.email}
          onChange={handleChange('email')}
        />
        <Typography variant="h6" component="div" style={{ marginTop: 20 }}>
          Direcciones
        </Typography>
        {editData.direcciones.map((direccion, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              margin="dense"
              label={`Dirección ${index + 1}`}
              type="text"
              fullWidth
              variant="standard"
              value={direccion}
              onChange={handleDireccionChange(index)}
            />
            <IconButton onClick={handleRemoveDireccion(index)}>
              <Remove />
            </IconButton>
          </div>
        ))}
        <Button onClick={handleAddDireccion} color="primary" startIcon={<Add />}>
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

export default DialogEditarCliente;
