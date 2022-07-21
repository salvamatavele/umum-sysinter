import React, { useEffect } from 'react';
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import {
    Box,
    Breadcrumbs,
    Link,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import Flash from "@/Components/Flash";
import { LoadingButton } from "@mui/lab";
import ChangePassword from './ChangePassword';


export default function Profile(props) {
    const {auth } = usePage().props
    const { data, errors, put, processing, setData, reset } = useForm({
        name: auth.user.name || "",
        last_name: auth.user.last_name || "",
        email: auth.user.email || "",
        phone: auth.user.phone || "",
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

        put(route('profile.update'));

        reset();
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Minha Conta">
            <Head title="Minha Conta" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>
                <Typography color="text.primary">Minha Conta</Typography>
            </Breadcrumbs>
            <Flash />
            <Box
                component="div"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <Flash />
                <Box
                    component="form"
                    sx={{ width: 800 }}
                    p={4}
                >
                    <Typography component="h6">Pode alterar as suas informacaoes pessoais aqui como nome, email e outros.</Typography>
                    <TextField
                        required
                        margin="normal"
                        id="name"
                        name="name"
                        label="Nome"
                        type="text"
                        value={data.name}
                        onChange={onHandleChange}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />

                    <TextField
                        required
                        margin="normal"
                        id="last_name"
                        name="last_name"
                        label="Apelido"
                        type="text"
                        value={data.last_name}
                        onChange={onHandleChange}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.last_name)}
                        helperText={errors.last_name}
                    />
                    <TextField
                        required
                        margin="normal"
                        id="email"
                        name="email"
                        label="E-mail"
                        type="email"
                        value={data.email}
                        onChange={onHandleChange}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        required
                        margin="normal"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        label="Contacto"
                        type="tel"
                        onChange={onHandleChange}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
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
                            Gardar
                        </LoadingButton>
                    </Box>
                </Box>
                <ChangePassword/>
            </Box>

            {/* <Copyright /> */}
        </Authenticated>
    );
}
