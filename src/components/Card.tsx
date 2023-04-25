import { Card as MuiCard, CardActionArea, CardContent, CardMedia, Grid, GridSize, Typography } from '@mui/material'
import React from 'react'

export default function Card(props: { title?: string, body?: string, image?: string, xs?: GridSize , onClick?: Function}) {
    return (
        <Grid xs={props.xs} spacing={0}>
            <MuiCard>
                <CardActionArea onClick={() => props.onClick !== undefined ? props.onClick() : null}>
                    <CardMedia
                        component="img"
                        style={{ maxHeight: 100 }}
                        image={props.image}
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" margin={0} padding={0}>
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </MuiCard>
        </Grid>
    )
}
