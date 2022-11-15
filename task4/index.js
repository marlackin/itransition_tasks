import express from 'express';
import  jwt  from 'jsonwebtoken';
import  bcrypt  from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import {registerValidation} from './validations/auth.js'


import UserModel from './models/User.js'

mongoose.connect('mongodb+srv://admin:admin@cluster0.d2py2e4.mongodb.net/task4?retryWrites=true&w=majority')
.then(()=> console.log('DB OK'))
.catch((err)=>console.log('DB ERROR',err))

const app = express();

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.post('/register',registerValidation ,async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
    
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password,salt);
    
        const doc = new UserModel({
            email:req.body.email,
            fullName:req.body.fullName,
            passwordHash,
            createdDate:new Date(),
            status:req.body.status,
            lastLoginDate:new Date()
        })
        const user = await doc.save()
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать пользователя'
        })
    }
})

app.listen(3000,(err) =>{
    if (err) {
        console.error(err);
    }
    console.log('server listening on port',3000)
})