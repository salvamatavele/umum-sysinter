import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Todos Direitos Autorais Reservados  © '}
            <Link color="inherit" href="http://127.0.0.1">
                UMUM Sysinter
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}