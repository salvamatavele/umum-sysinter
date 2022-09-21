import React, { useEffect } from 'react';
import {  useForm, usePage } from "@inertiajs/inertia-react";
import {
    Box,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";


export default function ChangePassword() {

    const { data, errors, put, processing, setData, reset } = useForm({
        password_current:"",
        password: "",
        password_confirmation: ""
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const update = (e) => {
        e.preventDefault();

        put(route('profile.password'));
    };

    return (

                <Box
                    component="form"
                    sx={{ width: 800 }}
                    p={4}
                >
                    <Typography component="h6">Pode alterar a sua senha aqui para dar mais seguraca as suas informacaoes.</Typography>
                    <TextField
                        required
                        margin="normal"
                        id="current_password"
                        name="password_current"
                        label="Senha actual"
                        type="password"
                        value={data.password_current}
                        onChange={onHandleChange}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.password_current)}
                        helperText={errors.password_current}
                    />

                    <TextField
                        required
                        margin="normal"
                        id="password"
                        name="password"
                        label="Nova senha"
                        type="password"
                        value={data.password}
                        onChange={onHandleChange}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <TextField
                        required
                        margin="normal"
                        id="password_confirmation"
                        name="password_confirmation"
                        label="Confirmar senha"
                        type="password"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.password_confirmation)}
                        helperText={errors.password_confirmation}
                    />


                    <Box
                        component="div"
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <LoadingButton
                            loading={processing}
                            variant="outlined"
                            onClick={update}
                        >
                            Actualizar
                        </LoadingButton>
                    </Box>
                </Box>
    );
}
