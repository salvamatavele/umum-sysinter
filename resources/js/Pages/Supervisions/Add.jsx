import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import { Box, Button, Breadcrumbs, Link, Typography, Tooltip, Grid, Paper, TextField, MenuItem, Toolbar, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, ListItemButton, ListItemIcon, Divider } from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";
import { AddLink, Delete, Edit, Visibility } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function Add(props) {
    // states
    const [id, setId] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const { supervisor, students } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        supervisor_id: supervisor.id || '',
        supervisor_name: supervisor.name + ' ' + supervisor.last_name || '',
        student_id: '',
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    function store(event) {
        event.preventDefault();
        post(route('supervisions.store'));
    }
    function confirmDelete(id) {
        setConfirm(true);
        setId(id)
    }
    function destroy() {
        Inertia.delete(route('supervisions.destroy', id));
        setConfirm(false)
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Alocar Supervisor">
            <Head title="Alocar Supervisor" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>
                <Link underline="hover" color="inherit" href={route('supervisions.index')}>
                    Supervisores
                </Link>
                <Typography color="text.primary">Alocar Supervisor</Typography>
            </Breadcrumbs>
            <Toolbar />
            <Flash />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <Paper sx={{ m: 1 }}>
                            <Typography textAlign="center" component="h2">Vincular Supervisor ao Estudante</Typography>
                            <Box
                                component="form"
                                p={4}
                            >

                                <TextField
                                    required
                                    disabled
                                    margin="normal"
                                    id="name"
                                    value={data.supervisor_name}
                                    name="name"
                                    label="Supervisor"
                                    type="text"
                                    onChange={onHandleChange}
                                    fullWidth
                                    variant="standard"
                                    error={Boolean(errors.supervisor_id)}
                                    helperText={errors.supervisor_id}
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="student_id"
                                    value={data.student_id}
                                    label="Estudante"
                                    select
                                    onChange={(event) => setData('student_id', event.target.value)}
                                    variant="standard"
                                    error={Boolean(errors.student_id)}
                                    helperText={errors.student_id}
                                >
                                    <MenuItem >
                                        Selecione o estudante
                                    </MenuItem>
                                    {students.map((student) =>
                                        <MenuItem key={student.id} value={student.id}>
                                            {student.name} {student.last_name}
                                        </MenuItem>
                                    )}

                                </TextField>

                                <Box
                                    component="div"
                                    sx={{ display: "flex", justifyContent: "end" }}
                                >
                                    <LoadingButton
                                        loading={processing}
                                        variant="outlined"
                                        onClick={store}
                                    >
                                        Atribuir
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper sx={{ m: 1 }}>
                            <Typography textAlign="center" component="h2">Supervisandos</Typography>
                            {supervisor.supervisor.length == 0 && <Typography textAlign="center" component="div" >Nenhum supervisando atribuido.</Typography>}
                            <List>
                                {supervisor.supervisor.map((student) => <div key={student.id}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => confirmDelete(student.id)}>
                                                <Delete color="error" />
                                            </IconButton>
                                        }
                                        disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar>{student.student.name[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={student.student.name + ' ' + student.student.last_name}
                                                secondary={<>
                                                    {student.student.email}<br />
                                                    {student.student.phone}<br />
                                                    {student.student.student.course_code}
                                                </>}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>)}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <ConfirmDialog open={confirm} onClose={() => { setConfirm(false) }} onClick={destroy} />

            <Copyright />
        </Authenticated>
    )
}