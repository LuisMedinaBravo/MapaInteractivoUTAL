const { log } = require('console')
const SalaSchema = require('../models/Sala')


module.exports = class API{
    //Descripcion: Crea una instancia de sala y la agrega a la DB
    //Entradas: JSON con la informacion de Sala.
    //Salidas: JSON con la informacion ingresada.
    static async createSala( req,res){
        
        const sala = SalaSchema(req.body)
        
        
        sala.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

   //Descripcion: Busca todas las instancias de Sala
    //Entradas: N/A
    //Salidas: JSON con todas las instancias de Sala
    static async getAllSalas( req,res){
        await SalaSchema
        .find()     
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion:Busca una instancia de Sala mediante su ID
    //Entradas: ID de la Sala  en especifico
    //Salidas: JSON con la instancia de  Sala .
    static async getSala( req,res){
        
        const id_sala = req.params.id
        await SalaSchema
        .find() 
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion: ...
    //Entradas:...
    //Salidas:...
    static async putSala( req,res){
        const {id} =req.params;
        const{nombre,edad} = req.body
        SalaSchema
        .updateOne({_id:id},{$set:{nombre,edad}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion: ...
    //Entradas:...
    //Salidas:...
    static async deleteSala( req,res){
        const {id} = req.params;
        SalaSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}