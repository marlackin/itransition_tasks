import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'
import axios from "axios";
import { useNavigate} from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate();
    const [form,setForm] = useState({email:'' ,password:'' })
    const [visibleModel,setVisibleModel] = useState({view:false,text:''})
    
    const onCloseModal = ()=>{
      setVisibleModel({view:false,text:''})
    }
    
    const handleSubmit = (event) => {
      event.preventDefault()
      axios.post('http://localhost:5000/login',form)
      .then(res=>{
         if(res.status === 200){
          localStorage.setItem("token",res.data.token)
          localStorage.setItem("userId",res.data._id)
          navigate('/home');
        }
      })
      .catch(err=>{if(err.response){
        setVisibleModel({view:true,text:'Ошибка авторизации'})
      }})
  }
  return (
    <Container>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control onChange={ e => setForm({...form,email: e.target.value}) } type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control onChange={ e => setForm({...form,password: e.target.value}) } type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Войти
    </Button>
  </Form>
  <Modal show={visibleModel.view} onHide={onCloseModal}>
    <Modal.Body>
    {visibleModel.text}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCloseModal}>
        Закрыть
      </Button>
    </Modal.Footer>
  </Modal>
  </Container>
  )
}

export default LoginPage