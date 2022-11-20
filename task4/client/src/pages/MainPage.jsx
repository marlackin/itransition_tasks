import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'
import block from '../icons/block.png'
import unblock from '../icons/unblock.png'

const MainPage = () => {
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState()
  const [isCheacked,setIsCheacked] = useState([])
  const [isCheackedAll,setIsCheackedAll] = useState(false)
  const navigate = useNavigate();


 

  


  const deleteUsers = () =>{
    let arrId = []
    localStorage.getItem('userId')
    data.filter((user,index)=> { 
      if(isCheacked[index]){
      arrId.push(user._id)
    }
  } 
    )
    console.log(arrId)
    axios.delete('http://localhost:5000/deleteUser',{data:{usersIds:arrId},headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(res=>{
      console.log(arrId.includes(localStorage.getItem('userId')))
      if(arrId.includes(localStorage.getItem('userId'))){
        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        return res
      }
      if(res.status === 200){
        axios.get('http://localhost:5000/',{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(res=>{
         if(res.status === 200){
          setData(res.data);
          setIsCheacked(Array(res.data.length).fill(false))
          setIsLoading(false)
        }
      }) 
      .catch(console.log("fasfasf"))
     }
   }) 
  }


 
 const blockUsers = () =>{
   let arrId = []
    data.filter((user,index)=> { 
      if(isCheacked[index]){
      arrId.push(user._id)
    }
  } 
    )
    console.log(arrId)
    axios.put('http://localhost:5000/block',{usersIds:arrId,status:"banned"},{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(res=>{
      if(res.status === 200){
        axios.get('http://localhost:5000/',{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(res=>{
         if(res.status === 200){
          setData(res.data);
          setIsCheacked(Array(res.data.length).fill(false))
          setIsLoading(false)
          console.log('я тут')
        }
        if(arrId.includes(localStorage.getItem('userId'))){
          navigate('/login')
          localStorage.removeItem('token')
        }
      }) 
      .catch(console.log("fasfasf"))
     }
   }) 
  }

  const unBlockUsers = () =>{
    let arrId = []
    data.filter((user,index)=> { 
      if(isCheacked[index]){
      arrId.push(user._id)
    }
  } 
    )
    console.log(arrId)
    axios.put('http://localhost:5000/block',{usersIds:arrId,status:"active"},{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(res=>{
      if(res.status === 200){
        axios.get('http://localhost:5000/',{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(res=>{
         if(res.status === 200){
          setData(res.data);
          setIsCheacked(Array(res.data.length).fill(false))
          setIsLoading(false)
        }
      }) 
      .catch(console.log("fasfasf"))
     }
   }) 
  }
  

  useEffect(() =>{
    if(!localStorage.getItem('token')){
        navigate('/login')
    }else{
      axios.get('http://localhost:5000/',{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(res=>{
         if(res.status === 200){
          setData(res.data);
          setIsCheacked(Array(res.data.length).fill(false))
          setIsLoading(false)
        }
      }) 
      .catch(console.log("fasfasf"))
    }
   },[localStorage.getItem('token')])

  const onChecked = (index) =>{
   let updateChecked =  isCheacked.map((check,checkIndex)=>
   checkIndex == index ? !check : check
  )  
  setIsCheacked(updateChecked)
  }

  const onChangeCheckedAll =() => {
    setIsCheackedAll(!isCheackedAll)
    let updateChecked =  isCheacked.map((check,checkIndex)=>
   isCheackedAll == false ? true : false
  )  
  setIsCheacked(updateChecked)

  }


  if(isLoading){
    return <Container>{isLoading}</Container>
  }

  return (
    <>
    <Container>
    
    <Button variant="outline-dark" onClick={blockUsers}><Image src={block} style={{width:30,height:30}}/>Block</Button>
    <image src="../icons/1.png"/>
    <Button variant="outline-dark" onClick={unBlockUsers}><Image src={unblock} style={{width:30,height:30}}/>Unblock</Button>
    <Button variant="outline-dark" onClick={deleteUsers}>Delete</Button>
    <Table striped bordered hover variant="dark">
    <thead >
      <tr>
        <th><Form.Check aria-label="option 1"  checked={isCheackedAll} onChange={()=>onChangeCheckedAll()}/></th>
        <th>id</th>
        <th>Fullname</th>
        <th>Email</th>
        <th>status</th>
        <th>CreatedDate</th>
        <th>LastloginDate</th>
      </tr>
    </thead>
    <tbody>{data.map((users,index)=>
      <tr key={users._id}>
        <td><Form.Check aria-label="option 1" checked={isCheacked[index]} onChange={()=>onChecked(index)}/></td>
        <td>{users._id}</td>
        <td>{users.fullName}</td>
        <td>{users.email}</td>
        <td>{users.status}</td>
        <td>{users.createdDate}</td>
        <td>{users.lastLoginDate}</td>
      </tr>)
      }</tbody>
  </Table>
  </Container>

  </>
  
  )
}

export default MainPage

