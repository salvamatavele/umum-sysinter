import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import {
    Box,
    Breadcrumbs,
    Link,
    Typography,
    Grid,
    Toolbar,
    Button,
    TextField,
    MenuItem,
    Card,
    CardMedia,
    CardContent,
    CardActions,

} from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";
import { Delete, Edit, } from "@mui/icons-material";

export default function Schedule(props) {
    // states
    const [id, setId] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [studentId, setStudentId] = useState("");
    const { schedules, auth, users } = usePage().props


    function onSearch(event, query) {
        event.preventDefault();
        setStudentId(query)
        if (query) {
            Inertia.get(route(route().current()), { query: query }, {
                replace: true,
                preserveState: true
            });
        }
    }

    function confirmDelete(id) {
        setConfirm(true);
        setId(id)
    }

    function destroy() {
        Inertia.delete(route('schedules.destroy', id));
        setConfirm(false)
    }

    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Agendas">
            <Head title="Agendas" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>
                <Typography color="text.primary">Agendas</Typography>
            </Breadcrumbs>
            <Toolbar />
            <Flash />
            {(auth.user.admin === 2 || auth.user.admin === 3) &&
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="contained" color="primary" LinkComponent='a' href={route('schedules.create')}>Agendar Encontro</Button>
                </Box>
            }

            {auth.user.admin === 2 && <>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    value={studentId}
                    id="student_id"
                    label="Selecione o supervisando"
                    select
                    onChange={(event) => onSearch(event, event.target.value)}
                    variant="standard"
                >
                    <MenuItem>
                        Selecione o supervisando
                    </MenuItem>
                    {users.supervisor.map((student) =>
                        <MenuItem key={student.student.id} value={student.student.id}>
                            {student.student.name} {student.student.last_name}
                        </MenuItem>
                    )}
                    {!users.supervisor && <MenuItem>
                        Nenhum supervisando lhe foi atribuido ainda.
                    </MenuItem>}

                </TextField>

            </>}
            {schedules.length === 0 && <Typography textAlign="center" variant="div">Nenhuma reuniao agendada. Seja o primeiro a agendar.</Typography>}

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {schedules.map((schedule) =>
                        <Grid key={schedule.id} item sm={12} md={5}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt="agenda"
                                    height="140"
                                    image="/images/login-bg.png"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {schedule.title}
                                    </Typography>
                                    <Typography gutterBottom variant="caption" component="div">
                                        Agendada para {schedule.date} as {schedule.time} hora de Mocambique.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {schedule.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button LinkComponent="a" href={route('schedules.edit', schedule.id)} size="small">Editar</Button>
                                    <Button onClick={() => confirmDelete(schedule.id)} size="small">Apagar</Button>
                                    <Button LinkComponent="a" target="_blank" href={schedule.url} size="small">Entar na reuniao</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <ConfirmDialog open={confirm} onClose={() => {
                setConfirm(false)
            }} onClick={destroy} />

            <Copyright />
        </Authenticated>
    )
}
