import React from "react";
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

export default function Edit(props) {
    const { courses, auth, user } = usePage().props
    const { data, errors, put, processing, setData } = useForm({
        name: user.name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        type: user.type || "",
        process_nr: user.student?.process_nr || "",
        course: user.student?.course || "",
        course_code: user.student?.course_code || "",
        role: user.employer?.role || "",
        school_degree: user.employer?.school_degree || "",

    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    function update(e) {
        e.preventDefault();
        put(route("users.update", user.id));
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Editar Usuario">
            <Head title="Editar Usuarios" />
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
                <Typography color="text.primary">Editar Usuario</Typography>
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
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        id="type"
                        value={data.type}
                        label="Tipo de Usuario"
                        select
                        onChange={(event) => setData('type', event.target.value)}
                        variant="standard"
                        error={Boolean(errors.type)}
                        helperText={errors.type}
                    >
                        {auth.user.admin == 0 && <MenuItem value="cordenador">
                            Cordenador
                        </MenuItem>}
                        <MenuItem value="supervisor">
                            Supervisor
                        </MenuItem>
                        <MenuItem value="estudante">
                            Estudante
                        </MenuItem>
                    </TextField>
                    {data.type == "estudante" && <>
                        <TextField
                            required
                            margin="normal"
                            id="process_nr"
                            name="process_nr"
                            label="Nr. de Processo"
                            value={data.process_nr}
                            type="text"
                            onChange={onHandleChange}
                            fullWidth
                            variant="standard"
                            error={Boolean(errors.process_nr)}
                            helperText={errors.process_nr}
                        />
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            id="course"
                            label="Curso"
                            value={data.course}
                            select
                            onChange={(event) => setData('course', event.target.value)}
                            variant="standard"
                            error={Boolean(errors.course)}
                            helperText={errors.course}
                        >
                            <MenuItem>
                                Selecione o curso
                            </MenuItem>
                            {courses.map((course) =>
                                <MenuItem key={course.id} value={course.name}>
                                    {course.name}
                                </MenuItem>
                            )}

                        </TextField>
                        <TextField
                            required
                            margin="normal"
                            id="course_code"
                            name="course_code"
                            label="Codigo do curso"
                            type="text"
                            value={data.course_code}
                            onChange={onHandleChange}
                            fullWidth
                            variant="standard"
                            error={Boolean(errors.course_code)}
                            helperText={errors.course_code}
                        />
                    </>}
                    {(data.type == "cordenador" || data.type == "supervisor") && <>
                        <TextField
                            required
                            margin="normal"
                            id="school_degree"
                            name="school_degree"
                            label="Área de formacao"
                            type="text"
                            value={data.school_degree}
                            onChange={onHandleChange}
                            fullWidth
                            variant="standard"
                            error={Boolean(errors.school_degree)}
                            helperText={errors.school_degree}
                        />
                        <TextField
                            required
                            margin="normal"
                            id="role"
                            name="role"
                            label="Cargo"
                            value={data.role}
                            type="text"
                            onChange={onHandleChange}
                            fullWidth
                            variant="standard"
                            error={Boolean(errors.role)}
                            helperText={errors.role}
                        />
                    </>}
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
            </Box>

            {/* <Copyright /> */}
        </Authenticated>
    );
}
