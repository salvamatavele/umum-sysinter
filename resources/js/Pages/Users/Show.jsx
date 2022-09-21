import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import { Box, Button, Breadcrumbs, Link, Typography, Card, CardContent } from "@mui/material";
import Flash from "@/Components/Flash";

export default function Users(props) {
    // states
    const { user } = usePage().props

    return (
        <Authenticated auth={props.auth} errors={props.errors} header={user.name + ' ' + user.last_name}>
            <Head title={user.name} />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={route('users.index')}
                >
                    Usuarios
                </Link>
                <Typography color="text.primary">Usuario</Typography>
            </Breadcrumbs>
            <Flash />
            <Box sx={{ width: 475, }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {user.name} {user.last_name}
                        </Typography>
                        <Typography variant="body2">
                            <b>E-mail: </b>{user.email}.
                            <br />
                            <b>Contacto: </b>{user.phone}
                            <br />
                            <b>Tipo de usuario: </b>{user.type}
                        </Typography>
                        <Typography variant="body2">
                            <b>E-mail: </b>{user.email}.
                            <br />
                            <b>Contacto: </b>{user.phone}
                            <br />
                            <b>Tipo de usuario: </b>{user.type}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Copyright />
        </Authenticated>
    )
}