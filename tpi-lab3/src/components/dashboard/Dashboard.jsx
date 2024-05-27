import React from 'react'
import Carrousel from '../carrousel/Carrousel'
import { listProduct } from "../../data/Data";


const Dashboard = () => {
  return (
    <>
    <Carrousel listProducts={listProduct}></Carrousel>
    </>
  )
}

export default Dashboard