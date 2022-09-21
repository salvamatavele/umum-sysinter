import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import {
    Alert,
    Badge,
    Box,
    Grid,
    Link,
    Paper,
    Typography,
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";

export default function Dashboard(props) {
    const { auth, students, users, tccDone, tccPeding, tccArchived } = usePage().props;
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Painel">
            <Head title="Dashboard" />

            <Alert severity="success">
                Ola {auth.user.name}, seja bem vindo/a de volta.
            </Alert>
            <Grid container spacing={12}>
                <Grid item xs={12} sm={6} md={4}>
                    <Link href={route('users.index')} underline="hover">
                        <Paper
                            sx={{ backgroundColor: "#FFEDED" }}
                            elevation={16}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    m: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <img src="https://img.icons8.com/officel/80/000000/select-users.png" />
                                <Badge
                                    sx={{ textAlign: "center" }}
                                    badgeContent={users.length}
                                    color="success"
                                />
                            </Box>

                            <Typography
                                textAlign="center"
                                variant="body1"
                                component="div"
                            >
                                {"Total de Usuários "}                             
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link href={route('projects.show')} underline="hover">
                        <Paper
                            sx={{ backgroundColor: "#0f0f0f" }}
                            elevation={16}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    m: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <img src="https://img.icons8.com/nolan/64/in-progress.png" />
                                <Badge
                                    sx={{ textAlign: "center" }}
                                    badgeContent={tccPeding.length}
                                    color="success"
                                />
                            </Box>

                            <Typography
                                textAlign="center"
                                color="white"
                                variant="body1"
                                component="div"
                            >
                                {"TCCs em progresso "}                              
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link href={route('projects.show')} underline="hover">
                        <Paper
                            sx={{ backgroundColor: "#B8E986" }}
                            elevation={16}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    m: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <img src="https://img.icons8.com/external-modern-lines-kalash/64/000000/external-Done-business-and-marketing-modern-lines-kalash.png" />
                                <Badge
                                    sx={{ textAlign: "center" }}
                                    badgeContent={tccDone.length}
                                    color="success"
                                />
                            </Box>

                            <Typography
                                textAlign="center"
                                variant="body1"
                                component="div"
                            >
                                {"TCCs concluidos "}                            
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ backgroundColor: "brown" }} elevation={16}>
                        <Box
                            sx={{
                                display: "flex",
                                m: 2,
                                justifyContent: "center",
                            }}
                        >
                            <img src="https://img.icons8.com/officel/80/000000/student-male.png" />
                            <Badge
                                sx={{ textAlign: "center" }}
                                badgeContent={students.length}
                                color="success"
                            />
                        </Box>

                        <Typography
                            textAlign="center"
                            variant="body1"
                            component="div"
                        >
                            {"Total de Estudantes "}                         
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link href={route('projects.show')} underline="hover">
                        <Paper
                            sx={{ backgroundColor: "#FFEDED" }}
                            elevation={16}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    m: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <img src="https://img.icons8.com/cute-clipart/64/000000/double-tick.png" />
                                <Badge
                                    sx={{ textAlign: "center" }}
                                    badgeContent={tccArchived.length}
                                    color="success"
                                />
                            </Box>

                            <Typography
                                textAlign="center"
                                variant="body1"
                                component="div"
                            >
                                {"TCCs Defendidos "}                            
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
            <Copyright />
        </Authenticated>
    );
}
