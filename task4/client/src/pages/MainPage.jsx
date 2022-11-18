import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();
   useEffect(() =>{
    if(!localStorage.getItem('token')){
        navigate('/login')
    }
   },[localStorage.getItem('token')])
  return (
    <div>MainPage</div> 
  )
}

export default MainPage