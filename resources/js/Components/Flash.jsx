import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

export default function Flash(props) {
    const { error, success } = usePage().props;
    const [open, setOpen] = useState(success ? true : false);
    useEffect(() => {
        setOpen(true)
    }, [success])
    return (
        <>
            {success && (
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={open}
                    autoHideDuration={9000}
                    onClose={() => {
                        setOpen(false);
                    }}
                    key={"top" + "right"}
                >
                    <Alert variant="filled" severity="success">
                        <AlertTitle>Sucesso!</AlertTitle>
                        {success}
                    </Alert>
                </Snackbar>
            )}
            {error && (
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => {
                        setOpen(false);
                    }}
                    key={"top" + "right"}
                >
                    <Alert variant="filled" severity="error">
                        <AlertTitle>Ooops! Tivemos um erro.</AlertTitle>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}
