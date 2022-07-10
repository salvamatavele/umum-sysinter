import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import Flash from "@/Components/Flash";

export default function New(props) {
    const { data, errors, post, processing, setData } = useForm({
        name: "",
        slug: "",
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    function store(e) {
        e.preventDefault();
        post(route("courses.store"));
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Novo Curso">
            <Head title="Novos Cursos" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={route('courses.index')}
                >
                    Cursos
                </Link>
                <Typography color="text.primary">Novo Curso</Typography>
            </Breadcrumbs>
            <Flash />
            <Container >
                <Flash/>
                <Box
                    component="form"
                    sx={{ width: 600, }}
                    p={4}
                >
                    <Typography component="h6">Preencha os campos abaixo para registar novo curso.</Typography>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="name"
                        name="name"
                        label="Nome do curso"
                        type="text"
                        onChange={onHandleChange}
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />

                    <TextField
                        required
                        margin="normal"
                        id="slug"
                        name="slug"
                        label="Sigla do curso"
                        type="text"
                        onChange={onHandleChange}
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.slug)}
                        helperText={errors.slug}
                    />
                    <Box
                        component="div"
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <Button onClick={store}>Gardar</Button>
                    </Box>
                </Box>
            </Container>

            {/* <Copyright /> */}
        </Authenticated>
    );
}
