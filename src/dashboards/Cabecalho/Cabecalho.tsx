import { Grid } from '@mui/material';
import React from 'react'
import { createRoot } from "react-dom/client";
import Header from '../../components/Header';
import './Cabecalho.css'

export default function Cabecalho() {
  const titleDash = parent.document.getElementsByClassName('DashWindow-TopBar-Title')[0] as HTMLDivElement

  return (
      <Header title={titleDash !== undefined ? titleDash!.title : 'Basso Pancotte'}></Header>
  )
}

const root = createRoot(document.getElementById('root-Cabecalho') as HTMLElement)
root.render(Cabecalho())