import { Container, Grid } from '@mui/material'
import { height } from '@mui/system';
import Center from './Center';
import React from 'react'

export default function Header(props: { title: string }) {
    const title = props.title;

    return (
        <Center>
            <>
                <Grid
                    width={'30%'}
                    maxWidth={'30%'}
                    textAlign={'left'}
                >
                    <img src="https://bassopancotte.websiteseguro.com/images/logo_basso.png" alt="logo" height={'90vw'} />
                </Grid>
                <Grid
                    width={'70%'}
                    minWidth={'70%'}
                    direction='column'
                    alignContent={'center'}
                    alignItems={'center'}
                    alignSelf={'center'}
                    textAlign={'center'}
                >
                    <span
                        style={{ fontSize: '300%' }}
                        id='title-dashboard'
                    >
                        {title}
                    </span>
                </Grid>
            </>
        </Center>
    )
}
