import  jwt  from 'jsonwebtoken';
import  bcrypt  from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js'
import { ObjectId } from 'mongodb';


export const register = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
    
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt);
    
        const doc = new UserModel({
            email:req.body.email,
            fullName:req.body.fullName,
            passwordHash:hash,
            createdDate:new Date(),
            status:req.body.status,
            lastLoginDate:new Date()
        })
        const user = await doc.save()

        const token = jwt.sign({
            _id:user._id,
            status:user.status,
        },
        'secret123',
        {
            expiresIn:'90d',
        }
        )
        
        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
            token,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать пользователя'
        })
    }
}

export const login = async(req,res)=>{
    try{
        const user = await UserModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password,user._doc.passwordHash)
        if(!isValidPass){
            return res.status(401).json({
                message: 'Неверный пароль',
            })
        }
        if(user.status =="banned" || user.status =="delete"){
            return res.status(401).json({
                message: 'Пользователь заблокирован или удален'
            })
        }
        user.lastLoginDate = Date.now()
        await user.save()
        
        const token = jwt.sign({
            _id:user._id,
            status:user.status,
        },
        'secret123',
        {
            expiresIn:'90d',
        }
        )
        const {passwordHash,...userData} = user._doc
        
        res.json({
            ...userData,
            token,
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
}

// export const getMe = async (req, res) => {
//     try{
//         const user = await UserModel.findById(req.userId);

//         if(!user){
//             return res.status(404).json({
//                 message: 'Такого пользователя не существует',
//             })
//         }
//         const {passwordHash,...userData} = user._doc

//         res.json(userData)
//     } catch(err){
//         console.log(err)
//         res.status(500).json({
//             message: 'Не удалось авторизоваться',
//         })
//     } 
// }

export const getAllUsers = async(req, res) => {
    try{
        const users = await UserModel.find({}).lean().orFail()
        res.json(users)
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Нет пользователей',
        })

    }
}

export const blockUnblock = async(req, res) => {
    try{
        await UserModel.updateMany({_id:{$in:req.body.usersIds.map(id=>new ObjectId(id))}},{$set:{status:req.body.status}})//пример:['1','2','3'] прогоняет каждый элемент массива и преобразовывает их в монгоайди соотв юзера
        // if(user.status =="banned" || user.status =="delete"){
        //     const token = jwt.sign({
        //         _id:user._id,
        //         status:user.status,
        //     },
        //     'secret123',
        //     {
        //         expiresIn:'90d',
        //     }
        //     )
        //     const {passwordHash,...userData} = user._doc
        // res.json({
        //     ...userData,
        //     token,
        // })
        // }
        res.json({
            success: true
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Ошибка, не удалось заблокировать'
        })
    }
}

export const deleteUser = async(req, res) => {
    try{
        await UserModel.deleteMany({_id:{$in:req.body.usersIds.map(id=>new ObjectId(id))}})
            res.status(200).json({message: 'Пользователь удален',})
    }catch(e){
        console.log(e)
        res.status(500).json({
            message: 'Не удалось удалить, ошибка',

        })
    }
}

// export const unLogin
