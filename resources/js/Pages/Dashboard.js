import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, usePage } from '@inertiajs/inertia-react';
import Copyright from '@/Components/Footer';
import { Alert, Badge, Box, Grid, Paper, Typography } from '@mui/material';
import { People } from '@mui/icons-material';

export default function Dashboard(props) {
    const { auth, students, users, tccDone, tccPeding } = usePage().props
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header="Painel"
        >
            <Head title="Dashboard" />

            <Alert severity="success">Ola {auth.user.name}, seja bem vindo/a de volta.</Alert>
            <Grid container spacing={12}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ backgroundColor: "blueviolet" }} elevation={16}>
                        <Box sx={{ display: "flex", m: 2, justifyContent: "center" }}>
                            <img src="https://img.icons8.com/officel/80/000000/select-users.png" />
                            <Badge sx={{ textAlign: "center" }} badgeContent={users.length} color="success" />
                        </Box>

                        <Typography textAlign="center" variant="body1" component="div" > Total de Usuarios</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ backgroundColor: "steelblue" }} elevation={16}>
                        <Box sx={{ display: "flex", m: 2, justifyContent: "center" }}>
                            <img src="https://img.icons8.com/fluency/96/000000/project.png" />
                            <Badge sx={{ textAlign: "center" }} badgeContent={tccPeding.length} color="success" />
                        </Box>

                        <Typography textAlign="center" variant="body1" component="div" > TCCs em progresso</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ backgroundColor: "greenyellow" }} elevation={16}>
                        <Box sx={{ display: "flex", m: 2, justifyContent: "center" }}>
                            <img src="https://img.icons8.com/fluency/96/000000/project.png" />
                            <Badge sx={{ textAlign: "center" }} badgeContent={tccDone.length} color="success" />
                        </Box>

                        <Typography textAlign="center" variant="body1" component="div" > TCCs concluidos</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ backgroundColor: "brown" }} elevation={16}>
                        <Box sx={{ display: "flex", m: 2, justifyContent: "center" }}>
                            <img src="https://img.icons8.com/officel/80/000000/student-male.png" />
                            <Badge sx={{ textAlign: "center" }} badgeContent={students.length} color="success" />
                        </Box>

                        <Typography textAlign="center" variant="body1" component="div" > Total de Estudantes</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Copyright />
        </Authenticated>
    );
}
