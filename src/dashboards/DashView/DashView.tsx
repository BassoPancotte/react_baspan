import { minHeight } from '@mui/system';
import React from 'react'
import { createRoot } from "react-dom/client";
import Center from '../../components/Center';
import './DashView.css'

export default function DashView() {
  return (
    <Center>
      <iframe src="http://localhost:3000" allow="autoplay" style={{ minWidth: '99%', minHeight: '99%' }}></iframe>
    </Center>
  )
}

const root = createRoot(document.getElementById('root-DashView') as HTMLElement)
root.render(DashView())
