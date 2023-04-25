import { Grid } from '@mui/material'
import React from 'react'

export default function Center(props: { children: JSX.Element | JSX.Element[] }) {
    return (
        <Grid
            alignContent={'center'}
            alignItems={'center'}
            alignSelf={'center'}
            textAlign={'center'}
            container
            direction="row"
            minHeight={'100vh'}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid>{props.children}</Grid>
            </Grid >
        </Grid>
    )
}
