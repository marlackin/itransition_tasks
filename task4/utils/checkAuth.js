import jwt from "jsonwebtoken";

export default (req,res,next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');
    
    if(token){
        try{
            const decoded = jwt.verify(token, 'secret123');
            //Сделать обращение к бд (проверка по статусу юзера)
           // if(user.status =="banned" || user.status =="delete")
            req.userId= decoded._id;
            if(decoded.status =="banned" || decoded.status =="delete"){
                return res.status(401).json({
                    message: "Пользователь заблокирован или удален"
                })
            }
            next();
        }catch(e){
            return res.status(403).json({
                message:'Нет доступа',
            })
        }
    }else{
          return res.status(403).json({
                message:'Нет доступа',
            })
        }

}