const EdificioSchema = require('../models/Edificio')


module.exports = class API{
    //Crear
    static async createEdificio( req,res){
        const edificio = EdificioSchema(req.body)
        edificio.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }
    
    //Obtener todos con datos.
    static async getAllEdificios( req,res){
        const nombreEdificios = []
        try {
            const data = await EdificioSchema.find()  
            data.forEach(element => {
                nombreEdificios.push(element.nombre)
            });
            console.log(nombreEdificios)
            res.json(nombreEdificios)
        } catch (error) {
            res.json(error)
        }
        
    }
    static async getEdificio( req,res){
        
        const id = req.params.id
        EdificioSchema
        .find({_id:id})
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener edificio mediante ID de sala 
    static async getEdificioBySalaID( req,res){
        try {
            const nombre = req.params.nombre
            const data = await EdificioSchema.findOne({nombre:nombre}).populate("salasID") 
            const salas =[]
    
            data.salasID.forEach(element => {
                
                salas.push(element.nombre)
            }); 
            
        
            res.json(salas)
        } catch (error) {
            res.json(error)
        }
        
    }static async getEdificioBySalaNombre( req,res){
        const nombre = req.params.nombre
       
        try {
            const nombre = req.params.nombre
            const data = await EdificioSchema.find().populate("salasID") 
            
            data.forEach(element => {
                
                const nombreEdicio = element.nombre

                element.salasID.forEach(element2 => {
                    if(nombre==element2.nombre){
                        
                        return res.json(nombreEdicio)
                    }
                });
            });
            
        
            
        } catch (error) {
            return res.json(error)
        }
        
    }
    
    //Actualizar  mediante ID
    static async putEdificio( req,res){
        const {id} =req.params;
        const{nombre} = req.body
        EdificioSchema
        .updateOne({_id:id},{$set:{nombre}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    static async actualizarSalas(req,res){
        
        const nombre =req.body.nombreEdificio
        const edificio = await EdificioSchema.findOne({nombre:nombre})
        
        
       
       await EdificioSchema.updateOne({_id:edificio._id},{$push:{"salasID":req.body.idSala}})
       .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Eliminar  mediante ID
    static async deleteEdificio( req,res){
        const {id} = req.params;
        EdificioSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}