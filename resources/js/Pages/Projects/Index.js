import React, { useEffect, useState } from "react";
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
    Input,
    FormControl,
    FormHelperText,
    FormLabel,
    ToggleButtonGroup,
    ToggleButton,
    InputBase
} from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";
import { Delete, Download, } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { FileUploader } from "react-drag-drop-files";
import Comment from "./Comment";

export default function Projects(props) {
    // states
    const [id, setId] = useState(null);
    const [studentId, setStudentId] = useState("");
    const [confirm, setConfirm] = useState(false);
    const { project, auth, tcc, supervisor, students } = usePage().props
    const created_at = new Date(tcc.created_at)
    const updated_at = new Date(tcc.updated_at)
    const [alignment, setAlignment] = useState(tcc?.status ? '1' : '0');

    const { data, setData, post, processing, errors } = useForm({
        user_id: project?.user_id || auth.user.id,
        title: project?.title || '',
        description: project?.description || '',
        project_path: undefined,
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    const handleChange = (file) => {
        setData('project_path', file);
    };

    const onToggleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        newAlignment === '1' || newAlignment === '0' ?
            Inertia.put(route('projects.status', tcc?.id), { 'status': newAlignment }) : '';
    };

    function store(event) {
        event.preventDefault();
        project?.id ?
            post(route('projects.update', project.id))
            :
            post(route('projects.store'));
    }

    function onSearchStudentTCC(event, query) {
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
        Inertia.delete(route('comments.destroy', id));
        setConfirm(false)
    }

    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Trabalho de Conclusão de Curso">
            <Head title="Trabalho de Conclusão de Curso" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>
                <Typography color="text.primary">Trabalho de Conclusão de Curso</Typography>
            </Breadcrumbs>
            <Toolbar />
            <Flash />
            {auth.user.admin === 2 && <>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="student_id"
                    value={studentId}
                    label="Selecione o supervisando"
                    select
                    onChange={(event) => onSearchStudentTCC(event, event.target.value)}
                    variant="standard"
                >
                    <MenuItem>
                        Selecione o supervisando
                    </MenuItem>
                    {students.map((student) =>
                        <MenuItem key={student.student.id} value={student.student.id}>
                            {student.student.name} {student.student.last_name}
                        </MenuItem>
                    )}
                    {!students && <MenuItem>
                        Nenhum supervisando lhe foi atribuido ainda.
                    </MenuItem>}

                </TextField>

            </>}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item sm={12} md={5}>
                        <Paper sx={{ m: 1 }}>
                            {(auth.user.admin === 3 || auth.user.admin === 2) &&
                                <>
                                    <Typography textAlign="center"
                                        variant="h6">{!project ? 'Enviar o TCC.' : 'Editar o TCC'}</Typography>
                                    <Box
                                        component="form"
                                        onSubmit={store}
                                        p={4}
                                    >
                                        <TextField
                                            required
                                            margin="normal"
                                            id="title"
                                            value={data.title}
                                            name="title"
                                            label="Titulo do TCC"
                                            type="text"
                                            onChange={onHandleChange}
                                            fullWidth
                                            variant="standard"
                                            error={Boolean(errors.title)}
                                            helperText={errors.title}
                                        />
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <FormLabel>Ficheiro do projecto</FormLabel>
                                            <FileUploader handleChange={handleChange} name="project_path"
                                                types={['pdf', 'doc', 'docx']}
                                                label="Carregue ou solte um arquivo aqui" />
                                            <FormHelperText sx={{ color: 'red' }}>{errors?.project_path}</FormHelperText>
                                        </FormControl>
                                        <TextField
                                            margin="normal"
                                            id="description"
                                            value={data.description}
                                            name="description"
                                            label="Descricao do TCC"
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
                                                type="submit"
                                            >
                                                {!project ? 'Enviar' : 'Editar'}
                                            </LoadingButton>
                                        </Box>
                                    </Box>
                                </>
                            }
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Paper sx={{ m: 1 }}>
                            <Typography textAlign="center" variant="h5">Trabalho de Conclusão de Curso</Typography>
                            {!project &&
                                <Typography textAlign="center" variant="div">Ainda nao foi enviado o TCC.</Typography>}
                            {Object.keys(tcc).length > 0 &&
                                <Box sx={{ m: 1 }}>
                                    <Typography variant="h6">{tcc.title}</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Criado
                                        aos {created_at.toLocaleDateString()} - {created_at.getHours() + ':' + created_at.getMinutes() + ':' + created_at.getSeconds()},
                                        Ultima
                                        actualizacao {updated_at.toLocaleDateString()} - {updated_at.getHours() + ':' + updated_at.getMinutes() + ':' + updated_at.getSeconds()}.
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {tcc?.description}
                                    </Typography>
                                    <Box
                                        component="div"
                                        sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
                                    >
                                        <Button target='_blank' LinkComponent='a' href={tcc.project_path}
                                            variant="outlined" startIcon={<Download fontSize="large" />}>Abrir/baixar
                                            o TCC.</Button>
                                        <ToggleButtonGroup
                                            disabled={auth.user.admin === 3}
                                            color="success"
                                            value={alignment}
                                            exclusive
                                            title="Estado do TCC"
                                            onChange={onToggleChange}
                                        >
                                            <ToggleButton value="0">Em andamento</ToggleButton>
                                            <ToggleButton value="1">Concluida</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                    <Divider textAlign="left">Autores</Divider>
                                    <Box
                                        component="div"
                                        sx={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2">Autor:</Typography>
                                            <ListItem
                                                disablePadding>
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar>{tcc.user.name[0]}</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={tcc.user.name + ' ' + tcc.user.last_name}
                                                        secondary={<>
                                                            {tcc.user.email}<br />
                                                            {tcc.user.phone}<br />
                                                            {tcc.user.student.course_code}
                                                        </>}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2">Supervisor:</Typography>
                                            <List>
                                                <ListItem
                                                    disablePadding>
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar>{supervisor.user.supervision.supervisor.name[0]}</Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={supervisor.user.supervision.supervisor.name + ' ' + supervisor.user.supervision.supervisor.last_name}
                                                            secondary={<>
                                                                {supervisor.user.supervision.supervisor.email}<br />
                                                                {supervisor.user.supervision.supervisor.phone}<br />
                                                            </>}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Box>
                                    <Divider textAlign="left">Comentarios</Divider>

                                    <Paper sx={{ m: 1 }}>
                                        {!tcc.comments &&
                                            <Typography sx={{ ml: 1 }} variant="body1">Nenhum comentario seja o primeiro a
                                                comentar.</Typography>}
                                        {tcc.comments.map((comment) =>
                                            <Paper sx={{ m: 1 }} key={comment.id}>
                                                <List>
                                                    <ListItem
                                                        secondaryAction={comment.user.id === auth.user.id &&
                                                            <IconButton edge="end" aria-label="delete"
                                                                onClick={() => confirmDelete(comment.id)}>
                                                                <Delete color="error" />
                                                            </IconButton>
                                                        }
                                                        disablePadding>
                                                        <ListItemAvatar>
                                                            <Avatar>{comment.user.name[0]}</Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={comment.user.name + ' ' + comment.user.last_name}
                                                            secondary={comment.user.email}
                                                        />
                                                    </ListItem>
                                                    <Typography sx={{ ml: 1 }}
                                                        variant="body1">{comment.comment}</Typography>
                                                </List>
                                            </Paper>
                                        )}


                                    </Paper>
                                    <Comment userId={auth.user.id} projectId={project.id} />
                                </Box>}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <ConfirmDialog open={confirm} onClose={() => {
                setConfirm(false)
            }} onClick={destroy} />

            <Copyright />
        </Authenticated>
    )
}
