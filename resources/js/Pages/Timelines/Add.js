import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import {
    Box,
    Breadcrumbs,
    FormControl,
    FormHelperText,
    FormLabel,
    Link,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import Flash from "@/Components/Flash";
import { LoadingButton } from "@mui/lab";
import { FileUploader } from "react-drag-drop-files";

export default function Add(props) {
    const { auth } = usePage().props;
    const { data, errors, post, processing, setData } = useForm({
        user_id: auth.user.id,
        title: "",
        description: "",
        timeline_path: "",
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    const handleChange = (file) => {
        setData("timeline_path", file);
    };
    function store(e) {
        e.preventDefault();
        post(route("timelines.store"));
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header="Partilhar Cronograma"
        >
            <Head title="Partilhar Cronograma" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href={route("dashboard")}
                >
                    Painel
                </Link>

                <Typography color="text.primary">
                    Partilhar Cronograma
                </Typography>
            </Breadcrumbs>
            <Flash />
            <Box
                component="div"
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <Flash />
                <Box component="form" sx={{ width: 550 }} p={4}>
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
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <FormLabel>Cronograma</FormLabel>
                        <FileUploader
                            handleChange={handleChange}
                            name="timeline_path"
                            types={["pdf"]}
                            label="Carregue ou solte um arquivo aqui"
                        />
                        <FormHelperText sx={{ color: "red" }}>
                            {errors?.timeline_path}
                        </FormHelperText>
                    </FormControl>

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
                            Partilhar
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>

            {/* <Copyright /> */}
        </Authenticated>
    );
}
