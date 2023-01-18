//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EdificioSchema =mongoose.Schema({
    nombre:String,
    salasID:[ 
      {
            type: mongoose.Types.ObjectId, 
            ref: 'salas'  
    }],

},{
    versionKey:false
})

module.exports = mongoose.model("edificios",EdificioSchema)