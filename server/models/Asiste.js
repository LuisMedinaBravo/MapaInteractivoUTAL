//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AsisteSchema =mongoose.Schema({
    estudiantes: 
    [
        {
            type: Schema.Types.ObjectId,
            ref: "estudiantes"
        }
    ],
    id_sala: 
        {
            type: Schema.Types.ObjectId, 
            ref: "salas"
        },
    id_curso: 
    {
        type: Schema.Types.ObjectId,
        ref: "cursos"
    },
    seccion: String,
    hora_inicio: String,
    hora_final: String,
    dia: String

},{
    versionKey:false
})

module.exports = mongoose.model("asistes",AsisteSchema)