import { Grid } from '@mui/material';
import React from 'react'
import { createRoot } from "react-dom/client";
import Header from '../../components/Header';
import './Cabecalho.css'

export default function Cabecalho() {
  let titleDash: string;

  try {
    titleDash = parent.parent.document.getElementsByClassName("AppItem-selected")[0].textContent as string;
  } catch (error) {
    titleDash = 'Basso Pancotte';
  }


  return (
    <Header title={titleDash}></Header>
  )
}

const root = createRoot(document.getElementById('root-Cabecalho') as HTMLElement)
root.render(Cabecalho())