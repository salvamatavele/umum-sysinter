import React from "react";
import { AddCommentRounded } from "@mui/icons-material";
import { Divider, FormHelperText, IconButton, Input, InputBase, Paper, Tooltip } from "@mui/material";
import { useForm } from "@inertiajs/inertia-react";
import Flash from "@/Components/Flash";

export default function Comment({ userId, projectId }) {
    const { data, setData, errors, post, reset } = useForm({
        project_id: projectId,
        user_id: userId,
        comment: '',
    })
    function store(e) {
        e.preventDefault()
        post(route('projects.comment'));
        reset('comment')
    }
    return (
        <>
            <Paper
                component="form"
                onSubmit={store}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
            >
                <Input
                    required
                    autoFocus
                    value={data.comment}
                    onChange={(event) => setData('comment', event.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Escreva o comentario aqui"
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title="Comentar">
                    <IconButton type="submit" color="primary" sx={{ p: '10px' }} aria-label="comentar">
                        <AddCommentRounded />
                    </IconButton>
                </Tooltip>
            </Paper>
            <FormHelperText sx={{ color: 'red' }}>{errors?.comment}</FormHelperText>

        </>
    )
}