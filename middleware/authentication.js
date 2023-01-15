const jwt = require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decode= jwt.verify(token,'masai')
        if(decode){
            const userID = decode.userID
            req.body.userID = userID
            next()
        }
        else{
            res.send('Please Login First')
        }
    }else{
        res.send({"msg":"Please log in"})
    }
}

module.exports={
    authenticate
}