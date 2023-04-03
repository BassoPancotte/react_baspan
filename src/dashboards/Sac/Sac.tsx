import React from 'react'
import { createRoot } from "react-dom/client";
import './Sac.css'

export default function Sac() {
  return (
    <div>Sac</div>
  )
}

const root = createRoot(document.getElementById('root-Sac') as HTMLElement)
root.render(Sac())