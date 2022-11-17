import jwt from "jsonwebtoken";
import UserModel from '../models/User.js'

export default async (req,res,next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');
    if(token){
        try{
            const decoded = jwt.verify(token, 'secret123');
            console.log(decoded)
            const user = await UserModel.findOne({email:decoded.email})
            if(user.status =="banned" || user.status =="delete" == decoded.status){
               user.status = decoded.status
               await user.save()
               console.log('gfdgd')
            }
            //Сделать обращение к бд (проверка по статусу юзера)
           // if(user.status =="banned" || user.status =="delete")
            // req.userId= decoded._id;
            next();
        }catch(e){
            return res.status(402).json({
                message:'Нет доступа',
            })
        }
    }else{
          return res.status(403).json({
                message:'Нет доступа',
            })
        }

}