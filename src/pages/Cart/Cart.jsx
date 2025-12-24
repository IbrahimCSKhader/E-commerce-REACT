import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';

export default function Cart() {
  const { userName, setUserName } = useContext(UserContext);
  return (
    <div>
      <h1>Cart Page - {userName} </h1>
      <button onClick={() => setUserName("soso")}> Change name in Cart</button>
    </div>
  )
}
