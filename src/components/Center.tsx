import { Grid } from '@mui/material'
import React from 'react'

export default function Center(props: { children: JSX.Element }) {
    return (
        <Grid
            container
            direction="column">
            <Grid
                alignContent={'center'}
                alignItems={'center'}
                alignSelf={'center'}
                textAlign={'center'}
                container
                direction="row"
                minHeight={'100vh'}
            >
                {props.children}
            </Grid >
        </Grid >
    )
}
