import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import {
    Box,
    Button,
    Breadcrumbs,
    Link,
    Typography,
    Tooltip,
    Grid,
    Paper,
    TextField,
    MenuItem,
    Toolbar,
    List,
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Divider,
    FormControl,
    FormLabel,
    FormHelperText,
    Card,
    CardHeader,
    CardMedia,
    CardActions,
} from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";
import { AddLink, Delete, Edit, Visibility } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { FileUploader } from "react-drag-drop-files";

export default function Calendar(props) {
    // states
    const [id, setId] = useState(null);
    const [calendarQry, setCalendarQry] = useState("");
    const [confirm, setConfirm] = useState(false);
    const { calendars, courses, auth } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        course: "",
        calendar: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    const handleChange = (file) => {
        setData("calendar", file);
    };

    function store(event) {
        event.preventDefault();
        post(route("calendars.store"));
        reset();
    }

    function onSearchCalendar(event, query) {
        event.preventDefault();
        setCalendarQry(query);
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
        Inertia.delete(route("calendars.destroy", id));
        setConfirm(false);
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header="Calendarios"
        >
            <Head title="Calendarios" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href={route("dashboard")}
                >
                    Painel
                </Link>
                <Typography color="text.primary">Calendarios</Typography>
            </Breadcrumbs>
            <Toolbar />
            <Flash />

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {auth.user.admin === 1 && (
                        <Grid item sm={12} md={5}>
                            <Paper sx={{ m: 1 }}>
                                <Typography textAlign="center" component="h2">
                                    Publicar Calendario
                                </Typography>
                                <Box component="form" p={4}>
                                    <TextField
                                        required
                                        margin="normal"
                                        id="title"
                                        value={data.title}
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
                                        fullWidth
                                        id="course"
                                        value={data.course}
                                        label="Selecione o curso"
                                        select
                                        onChange={(event) =>
                                            setData(
                                                "course",
                                                event.target.value
                                            )
                                        }
                                        variant="standard"
                                        error={Boolean(errors.course)}
                                        helperText={errors.course}
                                    >
                                        <MenuItem>Selecione o curso</MenuItem>
                                        {courses.map((course) => (
                                            <MenuItem
                                                key={course.id}
                                                value={course.name}
                                            >
                                                {course.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <FormLabel>Calenadario</FormLabel>
                                        <FileUploader
                                            handleChange={handleChange}
                                            name="calendar"
                                            types={["pdf"]}
                                            label="Carregue ou solte um arquivo aqui"
                                        />
                                        <FormHelperText sx={{ color: "red" }}>
                                            {errors?.calendar}
                                        </FormHelperText>
                                    </FormControl>

                                    <Box
                                        component="div"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "end",
                                        }}
                                    >
                                        <LoadingButton
                                            loading={processing}
                                            variant="outlined"
                                            onClick={store}
                                        >
                                            Publicar
                                        </LoadingButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    )}
                    <Grid item sm={12} md={auth.user.admin === 1 ? 7 : 12}>
                        <Paper sx={{ m: 1 }}>
                            <Typography textAlign="center" component="h2">
                                Calandarios
                            </Typography>
                            <TextField
                                required
                                margin="dense"
                                fullWidth
                                value={calendarQry}
                                id="student_id"
                                label="Filtrar por curso"
                                select
                                onChange={(event) =>
                                    onSearchCalendar(event, event.target.value)
                                }
                                variant="outlined"
                            >
                                <MenuItem value="all">Ver todos</MenuItem>
                                {courses.map((course) => (
                                    <MenuItem
                                        key={course.id}
                                        value={course.name}
                                    >
                                        {course.name}
                                    </MenuItem>
                                ))}
                                {!courses && (
                                    <MenuItem>
                                        Nenhum supervisando lhe foi atribuido
                                        ainda.
                                    </MenuItem>
                                )}
                            </TextField>
                            {calendars.length == 0 && (
                                <Typography
                                    padding={2}
                                    textAlign="center"
                                    variant="h6"
                                >
                                    Nenhum calendario publicado.
                                </Typography>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                }}
                            >
                                {calendars.map((calendar) => (
                                    <Card
                                        key={calendar.id}
                                        sx={{ maxWidth: 345 }}
                                    >
                                        <CardHeader
                                            title={calendar.title}
                                            subheader={`Publicado aos ${calendar.created_at}`}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="50"
                                            image="/images/calendar.png"
                                            alt="calendar"
                                        />
                                        <CardActions disableSpacing>
                                            {auth.user.admin === 1 && (
                                                <IconButton
                                                    onClick={() =>
                                                        confirmDelete(
                                                            calendar.id
                                                        )
                                                    }
                                                    aria-label="apagar"
                                                >
                                                    <Delete color="error" />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                LinkComponent="a"
                                                href={`/${calendar.calendar}`}
                                                target="_blank"
                                                aria-label="ver"
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
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
