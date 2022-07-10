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

export default function Add(props) {
    const { users, auth } = usePage().props
    const { data, errors, post, processing, setData } = useForm({
        user_id: auth.user.admin === 2 ? "" : auth.user.id,
        title: "",
        description: "",
        url: "",
        date: "",
        time: "",
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    function store(e) {
        e.preventDefault();
        post(route("schedules.store"));
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Agendar Reuniao/Encontro">
            <Head title="Agendar Reuniao/Encontro" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>

                <Typography color="text.primary">Agendar Reuniao/Encontro</Typography>
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
                    <Typography component="h6">Preencha os campos abaixo para agendar nova reuniao/ encontro.</Typography>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="title"
                        name="title"
                        label="Assunto"
                        type="text"
                        onChange={onHandleChange}
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />

                    <TextField
                        required
                        margin="normal"
                        id="url"
                        name="url"
                        label="Url/Link de acesso"
                        type="url"
                        onChange={onHandleChange}
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.url)}
                        helperText={errors.url}
                    />
                    <TextField
                        required
                        margin="normal"
                        id="date"
                        name="date"
                        label="Data de inicio"
                        type="date"
                        onChange={onHandleChange}
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.date)}
                        helperText={errors.date}
                    />
                    <TextField
                        required
                        margin="normal"
                        id="time"
                        name="time"
                        label="Hora de inicio"
                        type="time"
                        onChange={onHandleChange}
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.time)}
                        helperText={errors.time}
                    />
                    {auth.user.admin === 2 &&
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            id="user_id"
                            value={data.user_id}
                            label="Selecione com que pretende agendar"
                            select
                            onChange={(event) => setData('user_id', event.target.value)}
                            variant="standard"
                            error={Boolean(errors.user_id)}
                            helperText={errors.user_id}
                        >
                            <MenuItem value="">
                                Selecione o supervisando
                            </MenuItem>
                            {users.supervisor?.map((user) =>
                                <MenuItem key={user.student.id} value={user.student.id}>
                                    {user.student.name} {user.student.last_name}
                                </MenuItem>
                            )}
                        </TextField>
                    }

                    <TextField
                        margin="normal"
                        id="description"
                        name="description"
                        label="Descricao (optional)"
                        type="text"
                        onChange={onHandleChange}
                        fullWidth
                        multiline
                        rows={2}
                        variant="standard"
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />
                    <Box
                        component="div"
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <LoadingButton
                            loading={processing}
                            variant="outlined"
                            onClick={store}
                        >
                            Agendar
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>

            {/* <Copyright /> */}
        </Authenticated>
    );
}
