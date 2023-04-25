import React from 'react'
import Header from '../components/Header';

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