import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import { CalendarMonth, EventNote, School, SupervisedUserCircle } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

export const mainListItems = (
    <>
        <Tooltip title="Painel" placement="right">
            <ListItemButton LinkComponent='a' href={route('dashboard')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Painel" />
            </ListItemButton>
        </Tooltip>
        <Tooltip title="Cursos" placement="right">
            <ListItemButton LinkComponent='a' href={route('courses.index')}>
                <ListItemIcon>
                    <School />
                </ListItemIcon>
                <ListItemText primary="Cursos" />
            </ListItemButton>
        </Tooltip>
        <Tooltip title="Usuários" placement="right">
            <ListItemButton LinkComponent='a' href={route('users.index')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
            </ListItemButton>
        </Tooltip>
        <Tooltip title="Alocar Supervisor" placement="right">
            <ListItemButton LinkComponent='a' href={route('supervisions.index')}>
                <ListItemIcon>
                    <SupervisedUserCircle />
                </ListItemIcon>
                <ListItemText primary="Alocar Supervisor" />
            </ListItemButton>
        </Tooltip>
        <Tooltip title="TCC" placement="right">
            <ListItemButton LinkComponent='a' href={route('projects.index')}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="TCC" />
            </ListItemButton>
        </Tooltip>
    </>
);

export const secondaryListItems = (
    <>
        <ListSubheader component="div" inset>
            Actividades
        </ListSubheader>
        <Tooltip title="Calendários" placement="right">
            <ListItemButton LinkComponent='a' href={route('calendars.index')}>
                <ListItemIcon>
                    <CalendarMonth />
                </ListItemIcon>
                <ListItemText primary="Calendários" />
            </ListItemButton>
        </Tooltip>
        <Tooltip title="Agendas" placement="right">
            <ListItemButton LinkComponent='a' href={route('schedules.index')}>
                <ListItemIcon>
                    <EventNote />
                </ListItemIcon>
                <ListItemText primary="Agendas" />
            </ListItemButton>
        </Tooltip>
    </>
);
