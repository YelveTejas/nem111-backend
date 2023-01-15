const express = require('express')
const {connect} = require('./confing/db')
const app = express()
require('dotenv').config()
const  {noteRoute} = require('./Routes/notesRoute')
const {UserRoute} =  require('./Routes/userRoutes')
app.use(express.json())
const {authenticate} = require('./middleware/authentication')




app.use('/user',UserRoute)
app.use(authenticate)
app.use('/note',noteRoute)

app.get('/',(req,res)=>{
res.send('Welcome Home')
})


app.listen(process.env.port,async()=>{
    try{
  await  connect
  console.log('Connected to Mongodb')
  console.log('3300')
    }catch(err){
   console.log(err)
    }
  
})