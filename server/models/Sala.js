//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SalaSchema =mongoose.Schema({
    nombre:String,
},{
    versionKey:false
})

module.exports = mongoose.model("salas",SalaSchema)