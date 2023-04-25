import React from 'react'
import { createRoot } from "react-dom/client";
import Cabecalho from '../../components/Cabecalho';
import Center from '../../components/Center';
import MonthsCards from '../../components/MonthsCards';
import './AnaliseVolumeComprasXEntrega.css'

export default function AnaliseVolumeComprasXEntrega() {

  const refreshDetailsMonth = (month: number) => {
    try {
      (window as any).refreshDetails('tabela_1', {
        'A_MONTH': month
      });
    } catch (e) { }
  }

  return (
    <Center>
      <Cabecalho></Cabecalho>
      <MonthsCards onClick={refreshDetailsMonth}></MonthsCards>
    </Center>
  )
}

const root = createRoot(document.getElementById('root-AnaliseVolumeComprasXEntrega') as HTMLElement)
root.render(AnaliseVolumeComprasXEntrega())