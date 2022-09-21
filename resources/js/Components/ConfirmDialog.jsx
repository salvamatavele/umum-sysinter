import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
export default function ConfirmDialog({ open, onClick, onClose }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"!Tem certeza que deseja eliminar?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Apos confirmar, esse item sera eliminado permanentemente do
                    sistema.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Nao</Button>
                <Button onClick={onClick} autoFocus color="error">
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}
