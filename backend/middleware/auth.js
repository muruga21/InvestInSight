const jwt = require('jsonwebtoken')
const Cookie = require('js-cookie')

const checkUser = async(req, res, next) =>{
    try{
        console.log(req.headers.authorization)
        if(req.headers.authorization === undefined){
            return res.status(401).json({error:true, message:"invalid user"});
        }
        const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
        console.log(decoded)
        if(decoded?.userType === 'user'){
            req.user = decoded?.userName;
            console.log(req.user)
            next();
        }
        else{
            return res.status(401).json({error:true, message:"not a valid user"});
        }
    }
    catch(err){
        return res.status(400).json({error:true, message:err.message});
    }
}

module.exports = {checkUser}