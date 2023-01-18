//ESQUEMAS DE MONGOSEE
const { Int32 } = require('bson')
const mongoose = require('mongoose')
const EstudianteSchema =mongoose.Schema({
    nombre:String,
    contraseña:String,
    carrera:String,
    usuario:String

},{
    versionKey:false
})

module.exports = mongoose.model("estudiantes",EstudianteSchema)