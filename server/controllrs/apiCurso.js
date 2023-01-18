const { populate } = require('../models/Curso')
const CursoSchema = require('../models/Curso')


module.exports = class API{
    //Descripcion: Crea una instancia de Asiste y la agrega a la DB
    //Entradas: JSON con la informacion de asiste.
    //Salidas: JSON con la informacion ingresada.
    static async createCurso( req,res){
        const Curso = CursoSchema(req.body)
        Curso.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Descripcion: Crea una instancia de Asiste y la agrega a la DB
    //Entradas: JSON con la informacion de asiste.
    //Salidas: JSON con la informacion ingresada.
    static async getAllCursos( req,res){
        CursoSchema
        .find().populate(
            [
                {
                    path:"asisteID",
                    populate:{
                        path:"id_sala"
                    }
                    
                }
            ]   
        )    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion: Crea una instancia de Asiste y la agrega a la DB
    //Entradas: JSON con la informacion de asiste.
    //Salidas: JSON con la informacion ingresada.
    static async getCurso( req,res){
        
        const id = req.params.id
        CursoSchema
        .findById()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion: Crea una instancia de Asiste y la agrega a la DB
    //Entradas: JSON con la informacion de asiste.
    //Salidas: JSON con la informacion ingresada.
    static async putCurso( req,res){
        const {id} =req.params;
        const{nombre} = req.body
        CursoSchema
        .updateOne({_id:id},{$set:{nombre}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion: Crea una instancia de Asiste y la agrega a la DB
    //Entradas: JSON con la informacion de asiste.
    //Salidas: JSON con la informacion ingresada.
    static async deleteCurso( req,res){
        const {id} = req.params;
        CursoSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}