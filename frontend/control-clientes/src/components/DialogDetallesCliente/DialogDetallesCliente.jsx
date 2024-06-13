import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, Divider, Typography } from '@mui/material';

function DialogDetallesCliente({ open, onClose, cliente }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles del Cliente</DialogTitle>
      <DialogContent>
        {cliente && (
          <List>
            <ListItem>Nombre: {cliente.nombre}</ListItem>
            <ListItem>Teléfono: {cliente.telefono}</ListItem>
            <ListItem>Email: {cliente.email}</ListItem>
            <Divider />
            <Typography variant="h6" component="div" style={{ marginTop: 20 }}>
              Direcciones
            </Typography>
            {cliente.direcciones.map((direccion, index) => (
              <ListItem key={index}>{direccion}</ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDetallesCliente;
