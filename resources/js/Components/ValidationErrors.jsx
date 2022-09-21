import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <Alert severity="error">
                <AlertTitle>Opa! Algo deu errado</AlertTitle>
                {Object.keys(errors).map(function (key, index) {
                    return <li key={index}>{errors[key]}</li>;
                })}
            </Alert>
        )
    );
}
