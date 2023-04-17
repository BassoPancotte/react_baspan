import { Container, Grid } from '@mui/material'
import { height } from '@mui/system';
import Center from './Center';
import React, { useRef } from 'react'
import SnkHTML5 from './SnkHTML5';

export default function Header(props: { title: string }) {
    const title = props.title;

    return (
        <SnkHTML5>
            <Grid container>
                <Grid
                    container
                    width={'30%'}
                    maxWidth={'30%'}
                    height={'100%'}
                    textAlign={'left'}
                    alignContent={'center'}
                    alignItems={'center'}
                    alignSelf={'center'}
                >
                    <img src="https://bassopancotte.websiteseguro.com/images/logo_basso.png" style={{ marginLeft: '1%', maxWidth: '300px' }} alt="logo" width={'90%'} />
                </Grid>
                <Grid
                    container
                    width={'70%'}
                    minWidth={'70%'}
                    height={'100%'}
                    direction='column'
                    alignContent={'center'}
                    alignItems={'center'}
                    alignSelf={'center'}
                    textAlign={'center'}
                >
                    <span
                        style={{ fontSize: calculateFontSize(title) }}
                        id='title-dashboard'
                    >
                        {title}
                    </span>
                </Grid>
            </Grid>
        </SnkHTML5>
    )
}

const calculateFontSize = (text: string): string => {
    if (text.length < 20) {
        return '5vw'
    }
    else if (text.length < 30) {
        return '4vw'
    }
    else if (text.length < 50){
        return '3vw'
    }
    else {
        return '2vw'
    }
}