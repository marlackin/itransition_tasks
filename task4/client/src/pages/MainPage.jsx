import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const MainPage = () => {
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState()
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const navigate = useNavigate();
  useEffect(() =>{
    if(!localStorage.getItem('token')){
        navigate('/login')
    }else{
      axios.get('http://localhost:5000/',{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(res=>{
         if(res.status === 200){
          setData(res.data);
          // const listUsers = res.data.map((user)=>
          // 
          // )
          // return (
          //   <ul>{listUsers}</ul>
          // )
          setIsLoading(false)
        }
      }) 
      .catch(console.log("fasfasf"))
    }
   },[localStorage.getItem('token')])

   console.log(data)

  if(isLoading){
    return <Container>{isLoading}</Container>
  }
  const listUsers = data.map((users)=>
      <tr key={users._id}>
        <td><Form.Check aria-label="option 1" key={users._id}/></td>
        <td>{users._id}</td>
        <td>{users.fullName}</td>
        <td>{users.email}</td>
        <td>{users.status}</td>
        <td>{users.createdDate}</td>
        <td>{users.lastLoginDate}</td>
      </tr>
  )

  // const handleSelectAll = e => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(listUsers.map(li => li.id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  const deleteUsers = (checkDelete) =>{
    axios.delete('http://localhost:3000/deleteUser',[checkDelete])
    .then(res=>{
      if(res.status === 200){

     }
   }) 
  }

  const blockUsers = (CheckPut) =>{
    axios.put('http://localhost:3000/deleteUser',[CheckPut])
    .then(res=>{
      if(res.status === 200){
        
     }
   }) 
  }

  const unBlockUsers = (CheckPut) =>{
    axios.put('http://localhost:3000/deleteUser',[CheckPut])
    .then(res=>{
      if(res.status === 200){
        
     }
   }) 
  }


  return (
    <>
    <Container>
    <Button variant="outline-dark" onClick={blockUsers}>Block</Button>
    <Button variant="outline-dark" onClick={unBlockUsers}>UnBlock</Button>
    <Button variant="outline-dark" onClick={deleteUsers}>Delete</Button>
    <Table striped bordered hover variant="dark">
    <thead >
      <tr>
        <th><Form.Check aria-label="option 1" /></th>
        <th>id</th>
        <th>Fullname</th>
        <th>Email</th>
        <th>status</th>
        <th>CreatedDate</th>
        <th>LastloginDate</th>
      </tr>
    </thead>
    <tbody>{listUsers}</tbody>
  </Table>
  </Container>

  </>
  
  )
}

export default MainPage

