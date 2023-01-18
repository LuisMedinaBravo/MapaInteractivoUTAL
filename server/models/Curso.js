//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const CursoSchema =mongoose.Schema({
    nombre:String
    ,asisteID:[ 
        {
              type: mongoose.Types.ObjectId, 
              ref: 'asistes'  
      }],

},{
    versionKey:false
})

module.exports = mongoose.model("cursos",CursoSchema)