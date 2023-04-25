import { Grid } from '@mui/material';
import React from 'react'
import { createRoot } from "react-dom/client";
import Card from './Card';
import SnkHTML5 from './SnkHTML5';

export default function MonthsCards(props: {
  onClick?: (month: number) => void,
}) {

  const generateCardsMonths = () => {
    const months: string[][] =
      [
        ['Janeiro', '1'],
        ['Fevereiro', '2'],
        [`Mar${String.fromCharCode(231)}o`, '3'],
        ['Abril', '4'],
        ['Maio', '5'],
        ['Junho', '6'],
        ['Julho', '7'],
        ['Agosto', '8'],
        ['Setembro', '9'],
        ['Outubro', '10'],
        ['Novembro', '11'],
        ['Dezembro', '12'],
      ];
    let cards: JSX.Element[] = [];

    for (let i of months) {
      cards.push(<Card title={i[0]} xs={2} onClick={() => {
        if (props.onClick !== undefined) {
          try {
            props.onClick(Number(i[1]));
          } catch (error) { }
        }
      }}></Card >)
    }

    return cards;
  };


  return (
    <SnkHTML5>
      <Grid
        container
        direction={'row'}
      >
        {generateCardsMonths()}
      </Grid>
    </SnkHTML5>
  )
}