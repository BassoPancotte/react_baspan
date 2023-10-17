import React from 'react'
import { createRoot } from "react-dom/client";
import './Sac.css'
import ScheduleSac from '../../components/SheduleSac/ScheduleSac';

export default function Sac() {
  return (
    <ScheduleSac />
  )
}

const root = createRoot(document.getElementById('root-Sac') as HTMLElement)
root.render(Sac())