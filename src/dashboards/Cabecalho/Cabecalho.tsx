import React from 'react'
import { createRoot } from "react-dom/client";
import CabecalhoComponent from '../../components/Cabecalho';
import './Cabecalho.css'

export default function Cabecalho() {
  return (
    <CabecalhoComponent></CabecalhoComponent>
  )
}

const root = createRoot(document.getElementById('root-Cabecalho') as HTMLElement)
root.render(Cabecalho())