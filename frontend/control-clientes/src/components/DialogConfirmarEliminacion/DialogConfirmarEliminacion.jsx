import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';

function DialogConfirmarEliminacion({ open, onClose, onDelete, cliente }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar a {cliente?.nombre}? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={onDelete} color="secondary">Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirmarEliminacion;
