const mongoose = require('mongoose')

const notes_Schema=mongoose.Schema({
    title:String,
    note:String,
    userID:String
})

const Notemodel = mongoose.model('notes',notes_Schema)

module.exports={
    Notemodel
}