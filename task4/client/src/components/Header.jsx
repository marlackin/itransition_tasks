import React from 'react'
import { Button, Container, Form, Modal,Nav,Navbar } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';



const Header = () => {
    const [isAuth,setIsAuth] =useState(false)
    const navigate = useNavigate()
    useEffect(() =>{
      if(localStorage.getItem('token')){
          setIsAuth(false)
      }else{
        setIsAuth(true)
      }
     },[localStorage.getItem('token')])

    
    const handleLogOut = ()=>{
       localStorage.removeItem('token')
       localStorage.removeItem('userId')
       navigate("/login")
    }

  return (
    
    isAuth?
    <Container>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          {/* <Nav.Link href={"/home"}>Home</Nav.Link> */}
          <Nav.Link href={"/registration"}>Sign up</Nav.Link>
          <Nav.Link href={"/login"}>Sign in</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </Container>
    :
    <Container>
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        <Nav.Link href={"/home"} onClick={handleLogOut}>Log Out</Nav.Link>
      </Nav>
    </Navbar>
    </Container>
    
  )
}

export default Header