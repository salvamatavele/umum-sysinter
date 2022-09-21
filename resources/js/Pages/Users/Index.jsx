import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import { DataGrid, ptBR, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Breadcrumbs, Link, Typography, Tooltip } from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";
import { Delete, Edit, Visibility } from "@mui/icons-material";

export default function Users(props) {
    // states
    const { users } = usePage().props
    const [confirm, setConfirm] = useState(false);
    const [id, setId] = useState(null);
    // datagrid colums and rows

    const columns = [
        { field: "name", headerName: "Nome", width: 150 },
        { field: "last_name", headerName: "Apelido", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Contacto", width: 150 },
        { field: "type", headerName: "Tipo", width: 150 },
        {
            field: 'actions',
            headerName: 'Acção',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <>
                    <Tooltip title="Ver">
                        <Link underline="hover" sx={{ m: 1, }} href={route('users.edit', params.row.id)}>
                            <Visibility />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Editar">
                        <Link underline="hover" sx={{ m: 1, }} href={route('users.edit', params.row.id)}>
                            <Edit color='secondary' />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Apagar">
                        <Link underline="hover" sx={{ m: 1, }} onClick={() => {
                            confirmDelete(params.row.id)
                        }}>
                            <Delete color='error' />
                        </Link>
                    </Tooltip>
                </>
            ),
        },
    ];

    function confirmDelete(id) {
        setConfirm(true);
        setId(id)
    }
    function destroy() {
        Inertia.delete(route('users.destroy', id));
        setConfirm(false)
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors} header="Usuarios">
            <Head title="Usuarios" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={route('dashboard')}>
                    Painel
                </Link>

                <Typography color="text.primary">Usuarios</Typography>
            </Breadcrumbs>
            <Flash />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="contained" color="primary" LinkComponent='a' href={route('users.create')}>Registar Usuario</Button>
            </Box>
            <div style={{ height: 400, }}>
                <DataGrid
                    components={{ Toolbar: GridToolbar }}
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    // loading={!portfolios}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <ConfirmDialog open={confirm} onClose={() => { setConfirm(false) }} onClick={destroy} />
            <Copyright />
        </Authenticated>
    )
}