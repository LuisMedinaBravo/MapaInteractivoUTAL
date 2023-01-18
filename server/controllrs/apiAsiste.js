const { log } = require('console')
const AsisteSchema = require('../models/Asiste')


module.exports = class API{
    //Descripcion: Crea una instancia de Asiste y la agrega a la DB
    //Entradas: JSON con la informacion de asiste.
    //Salidas: JSON con la informacion ingresada.
    static async createAsiste( req,res){
        const Asiste = AsisteSchema(req.body)
        Asiste.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Descripcion: Busca todas las instancias de Asiste
    //Entradas: N/A
    //Salidas: JSON con todas las instancias de Asiste
    static async getAllAsistes( req,res){
        AsisteSchema
        .find().populate(
            [
                {
                    path:"id_sala",
                    select: ['nombre']
                }
            ]   
 
        ).populate(
            [
                {
                    path:"id_curso",
                    select: ['nombre']
                }
            ]   
 
        )        
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion:Busca una instancia de asiste mediante su ID
    //Entradas: ID de asiste en especifico
    //Salidas: JSON con la instancia de asiste.
    static async getAsiste( req,res){
        
        const id = req.params.id
        AsisteSchema
        .find({_id:id})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion:Busca todas las instancias de asiste en la que un estudiante en especifico esta, mediante su _id
    //Entradas: Recibe la ID del estudiante a buscar sus asiste
    //Salida: JSON con toda la informacion del Asiste, en la cual el estudiante esta.
    static async getAsisteByIdEstudiante( req,res){
        
        const id = req.params.id
        const datos = await AsisteSchema
        .find({estudiantes:id}).populate(
            [
                {
                    path:"estudiantes",
                    select: ['nombre','dni']
                }
            ]   
        ).populate(
            [
                {
                    path:"id_sala",
                    select: ['nombre']
                }
            ]   

        ).populate(
            [
                {
                    path:"id_curso",
                    select: ['nombre']
                }
            ]   

        ).then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
        
        
    }
    //Descripcion: ...
    //Entradas:...
    //Salidas:...
    static async putAsiste( req,res){
        const {id} =req.params;
        const{nombre} = req.body
        AsisteSchema
        .updateOne({_id:id},{$set:{nombre}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Descripcion:..
    //Entradas:..
    //Salidas:...
    static async deleteAsiste( req,res){
        const {id} = req.params;
        AsisteSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}