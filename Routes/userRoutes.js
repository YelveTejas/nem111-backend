const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Usermodel } = require('../modules/login')
const UserRoute = express.Router()
UserRoute.post('/register', async (req, res) => {
    const {name,email,pass,age} = req.body
    try {
        bcrypt.hash(pass,5,async (err, hash_password)=> {
            // Store hash in your password DB.
            if(err){
                console.log(err)
            }else{
                const user = new Usermodel({name,email,pass:hash_password,age})
                await user.save()
                res.send('Registered')
            }
        });
      

    } catch (err) {
        console.log(err)
        response.send('Error While Registering')
    }
})


UserRoute.post('/login', async (req, res) => {
    const { email, pass } = req.body
  
    try {
        const user = await Usermodel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(pass,user[0].pass, (err, result)=> {
                if(result){
                    var token = jwt.sign({userID:user[0]._id}, 'masai');
                    res.send({"msg":'Login Successful',"token":token})
                }else{
                    res.send('Wrong Credentials')
                }
            });
            
        } else {
            res.send('login Fail')
        }
    } catch (err) {
        console.log(err)
    }
})


// UserRoute.get('/data',(req,res)=>{
//     const token = req.headers.authorization
//    jwt.verify(token,'masai',(err,decode)=>{
//     if(err){
//         res.send('Invalid token')
//     }else{
//         res.send('data....')
//     }
//    })
// })



module.exports = {
    UserRoute
}
