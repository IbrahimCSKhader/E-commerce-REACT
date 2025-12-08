import React from 'react'
import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <>
        <Outlet />
        <div className='footer'> Auth Layout Footer</div> 
    </>
  )
}
