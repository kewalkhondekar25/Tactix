import React from 'react'
import DashboardButton from './DashboardButton'

const Navbar = () => {
  return (
    <header className='fixed top-0 flex justify-between items-center px-2 py-2 bg-black backdrop-blur-lg w-full border-b-[1px] border-neutral-900 z-50'>
      <h3 className='text-2xl'>Tactix</h3>
      <DashboardButton/>
    </header>
  )
}

export default Navbar