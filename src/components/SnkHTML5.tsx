import { Grid } from '@mui/material'
import React from 'react'

export default function SnkHTML5(props: { children: JSX.Element }) {
    return (
        <Grid container
            direction={'row'}
            maxHeight={'100%'}
            overflow={'clip'}>
            <Grid container
                direction={'column'}
                maxWidth={'100%'}
                overflow={'clip'}>
                {props.children}
            </Grid>
        </Grid>
    )
}
