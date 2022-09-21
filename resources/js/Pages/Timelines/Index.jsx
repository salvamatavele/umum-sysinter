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
    IconButton,
} from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";
import { Delete, Edit, Visibility } from "@mui/icons-material";

export default function Timeline(props) {
    // states
    const [id, setId] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [studentId, setStudentId] = useState("");
    const { timelines, auth, users } = usePage().props;

    function onSearch(event, query) {
        event.preventDefault();
        setStudentId(query);
        if (query) {
            Inertia.get(
                route(route().current()),
                { query: query },
                {
                    replace: true,
                    preserveState: true,
                }
            );
        }
    }

    function confirmDelete(id) {
        setConfirm(true);
        setId(id);
    }

    function destroy() {
        Inertia.delete(route("timelines.destroy", id));
        setConfirm(false);
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header="Cronogramas"
        >
            <Head title="Cronogramas" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href={route("dashboard")}
                >
                    Painel
                </Link>
                <Typography color="text.primary">Cronogramas</Typography>
            </Breadcrumbs>
            <Toolbar />
            <Flash />
            {auth.user.admin === 3 && (
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        LinkComponent="a"
                        href={route("timelines.create")}
                    >
                        Partilhar cronograma
                    </Button>
                </Box>
            )}

            {(auth.user.admin === 0 || auth.user.admin === 1) && (
                <>
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        value={studentId}
                        id="student_id"
                        label="Selecione o supervisando"
                        select
                        onChange={(event) =>
                            onSearch(event, event.target.value)
                        }
                        variant="standard"
                    >
                        <MenuItem>Selecione o supervisando</MenuItem>
                        {users.map((student) => (
                            <MenuItem key={student.id} value={student.id}>
                                {student.name} {student.last_name}
                            </MenuItem>
                        ))}
                        {!users && (
                            <MenuItem>
                                Nenhum supervisando foi encontrado.
                            </MenuItem>
                        )}
                    </TextField>
                </>
            )}
            {auth.user.admin === 2 && (
                <>
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        value={studentId}
                        id="student_id"
                        label="Selecione o supervisando"
                        select
                        onChange={(event) =>
                            onSearch(event, event.target.value)
                        }
                        variant="standard"
                    >
                        <MenuItem>Selecione o supervisando</MenuItem>
                        {users.supervisor.map((student) => (
                            <MenuItem
                                key={student.student.id}
                                value={student.student.id}
                            >
                                {student.student.name}{" "}
                                {student.student.last_name}
                            </MenuItem>
                        ))}
                        {!users.supervisor && (
                            <MenuItem>
                                Nenhum supervisando foi encontrado.
                            </MenuItem>
                        )}
                    </TextField>
                </>
            )}
            {timelines.length === 0 && (
                <Typography padding={2} textAlign="center" variant="h6">
                    Nenhum cronograma foi partilhado ainda.
                </Typography>
            )}

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {timelines.map((timeline) => (
                        <Grid key={timeline.id} item sm={12} md={5}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt="cronograma"
                                    height="140"
                                    image="/images/calendar.png"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {timeline.title}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="caption"
                                        component="div"
                                    >
                                        Partilhado aos {timeline.created_at} .
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {timeline.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {auth.user.admin === 3 && (
                                        <IconButton
                                            onClick={() =>
                                                confirmDelete(timeline.id)
                                            }
                                            aria-label="apagar"
                                        >
                                            <Delete color="error" />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        LinkComponent="a"
                                        href={`/${timeline.timeline_path}`}
                                        target="_blank"
                                        aria-label="ver"
                                    >
                                        <Visibility />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <ConfirmDialog
                open={confirm}
                onClose={() => {
                    setConfirm(false);
                }}
                onClick={destroy}
            />

            <Copyright />
        </Authenticated>
    );
}
