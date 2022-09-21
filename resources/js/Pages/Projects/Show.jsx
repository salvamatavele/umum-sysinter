import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import Copyright from "@/Components/Footer";
import { DataGrid, ptBR, GridToolbar } from "@mui/x-data-grid";
import {
    Box,
    Button,
    Breadcrumbs,
    Link,
    Typography,
    Badge,
    Chip,
} from "@mui/material";
import Flash from "@/Components/Flash";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Inertia } from "@inertiajs/inertia";

export default function Courses(props) {
    // states
    const { tccs } = usePage().props;
    const [id, setId] = useState(null);
    // datagrid colums and rows

    const columns = [
        { field: "title", headerName: "Titulo", width: 400 },
        { field: "description", headerName: "Descrição", width: 150 },
        {
            field: "status",
            headerName: "Estado do TCC",
            width: 150,
            renderCell: (params) => (
                <>
                    {params.row.status === 1 ? (
                        <Chip label="Concluido" size="small" color="success" />
                    ) : (
                        <Chip label="Em progresso" size="small" />
                    )}
                </>
            ),
        },
        {
            field: "done",
            headerName: "Estado da defesa",
            width: 150,
            renderCell: (params) => (
                <>
                    {params.row.done === 1 ? (
                        <Chip label="Defendido" size="small" color="success" />
                    ) : (
                        <Chip label="Nao Defendido" size="small" />
                    )}
                </>
            ),
        },
    ];

    return (
        <Authenticated auth={props.auth} errors={props.errors} header="TCCs">
            <Head title="TCCs" />
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href={route("dashboard")}
                >
                    Painel
                </Link>

                <Typography color="text.primary">TCCs</Typography>
            </Breadcrumbs>
            <Flash />
            <div style={{ height: 400 }}>
                <DataGrid
                    components={{ Toolbar: GridToolbar }}
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={tccs}
                    columns={columns}
                    pageSize={5}
                    // loading={!portfolios}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <Copyright />
        </Authenticated>
    );
}
