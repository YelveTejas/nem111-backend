const express = require('express')
const {Notemodel} = require('../modules/notes')
const noteRoute=express.Router()

noteRoute.get('/',async(req,res)=>{
try{
    const notes = await Notemodel.find()
    res.send(notes)
    console.log(notes)
}catch(err){
    res.send('Something went Wrong')
    console.log(err)
}
})


noteRoute.post("/create",async(req,res)=>{
    const payload = req.body
   try{
   const note = new Notemodel(payload)
   await note.save()
   res.send('Added Note')

   }catch(err){
  console.log(err)
  res.send('Error while adding')
   }
})

noteRoute.patch('/update/:id',async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const note = await Notemodel.findOne({'_id':id})
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID

    try{
        if(userID_in_note!==userID_making_req){
           res.send({"mas":"You are not Authorized"})
        }else{
            await Notemodel.findByIdAndUpdate({'_id':id},payload)
            res.send('Updated Notes')
        }
        
    }catch(err){
        console.log(err)
        res.send({'msg':"Something went wrong"})
    }
   
})




noteRoute.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    try{
     await Notemodel.findByIdAndDelete({"_id":id})
     res.send('Deleted the Note')
    }catch(err){
    console.log(err)
    res.send({"msg":'Somethin went wrong'})
    }

})


module.exports={
    noteRoute
}