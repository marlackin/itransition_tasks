import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Routes, Router, BrowserRouter} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import axios from "axios";
import { useState,useEffect } from 'react'
import { Navigate,useNavigate } from 'react-router-dom';

function App() {
  const [isAuth,setIsAuth] =useState(false)
  const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem("token") !== null)
        axios.get('http://localhost:5000/accessResource',{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
            if(res.data.success){
                localStorage.setItem('userId', res.data.data.id);
                setIsAuth(true)
                console.log('первый иф после локал стор')
            }

        })
        .catch(e => {
            setIsAuth(false)
            localStorage.removeItem('token');
            console.log(e);
        })
    }, [isAuth])
    useEffect(() =>{
      if(isAuth){
        navigate("/home" )
      }
    },[isAuth])
  return (
      <Routes>
        <Route  path="/registration" element =  {<RegisterPage />} />
        <Route  path="/login" element = {<LoginPage />}/>
        <Route  path="/home" element =  {<MainPage/>} />
      </Routes>
  )
}

export default App;
