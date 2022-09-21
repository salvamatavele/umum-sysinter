import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import { DataGrid, ptBR, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Breadcrumbs, Link, Typography } from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";


export default function Courses(props) {
    // states
    const { courses } = usePage().props
    const [confirm, setConfirm] = useState(false);
    const [id, setId] = useState(null);
    // datagrid colums and rows

    const columns = [
        { field: "name", headerName: "Nome", width: 400 },
        { field: "slug", headerName: "Sigla", width: 150 },
        {
            field: 'actions',
            headerName: 'Acção',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <>
                    <Button size="small" href={route('courses.edit', params.row.id)}>
                        <img src="https://img.icons8.com/material-outlined/24/undefined/edit--v1.png" />
                    </Button>
                    <Button size="small" onClick={() => {
                        confirmDelete(params.row.id)
                    }}>
                        <img src="https://img.icons8.com/plasticine/24/undefined/filled-trash.png" />
                    </Button>
                </>
            ),
        },
    ];

    function confirmDelete(id) {
        setConfirm(true);
        setId(id)
    }
    function destroy() {
        Inertia.delete(route('courses.destroy', id));
        setConfirm(false)
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Cursos">
            <Head title="Courses" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>

                <Typography color="text.primary">Cursos</Typography>
            </Breadcrumbs>
            <Flash />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="contained" color="primary" LinkComponent='a' href={route('courses.create')}>Novo Curso</Button>
            </Box>
            <div style={{ height: 400, }}>
                <DataGrid
                    components={{ Toolbar: GridToolbar }}
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={courses}
                    columns={columns}
                    pageSize={5}
                    // loading={!portfolios}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <ConfirmDialog open={confirm} onClose={() => { setConfirm(false) }} onClick={destroy} z />
            <Copyright />
        </Authenticated>
    );
}
