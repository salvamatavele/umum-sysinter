import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
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

export default function Edit(props) {
    const { course } = usePage().props
    const { data, errors, put, processing, setData } = useForm({
        name: course.name || "",
        slug: course.slug || "",
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    function update(e) {
        e.preventDefault();
        put(route("courses.update", course.id));
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Editar curso">
            <Head title={`Editar ${course.slug}`} />
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
                <Typography color="text.primary">Editar Curso</Typography>
            </Breadcrumbs>
            <Flash />
            <Container >
                <Flash />
                <Box
                    component="form"
                    sx={{ width: 600, }}
                    p={4}
                >
                    <Typography component="h6">Edite os campos abaixo para actualizar o curso.</Typography>
                    <TextField
                        required
                        margin="normal"
                        id="name"
                        name="name"
                        label="Nome do curso"
                        value={data.name}
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
                        value={data.slug}
                        error={Boolean(errors.slug)}
                        helperText={errors.slug}
                    />
                    <Box
                        component="div"
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <Button onClick={update}>Gardar</Button>
                    </Box>
                </Box>
            </Container>

            {/* <Copyright /> */}
        </Authenticated>
    );
}
