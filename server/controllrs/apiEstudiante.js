const EstudianteSchema = require('../models/Estudiante')
const bcrypt = require('bcryptjs')

module.exports = class API{
    // Descripcion:Crea usuario y encripta su contraseña, para asi poder tener un poco mas de seguridad.
    //Entradas:Resive un json con nombre, dni,contraseña y carrera. En resumen resive El esquema completa definido para un estudiante. 
    //Salida:Guarda al usuario en la DB
    static async createEstudiante( req,res){
        const {body} =req
        const {nombre,usuario,contraseña,carrera} = body
        const contra = await bcrypt.hash(contraseña,3)
        
        const estudiante = new EstudianteSchema({
            nombre,
            contraseña:contra,
            carrera,
            usuario,
        })
        const usuarioGuardado = await estudiante.save()
        res.json(usuarioGuardado)
    } 
    // Descripcion: Ayuda a validar el usuario. Busca si existe el usuario , si existe desencripta la contraseña enviada y valida si es correcta.
    // Entrada:Resive un Json con la contraseña y usuario a validar.
    //Saldias: SI el usuario y contraseña son Validos: Devuelve un JSON con un mensaje de acceso valido
            //Si el usuario no existe : JSON con mensaje de que el usuario no se encontro.
            //Si el usuario es correcto y la contraseña invalida: JSON con un mensaje de que la contraseña
    static async validarUsuario(req,res){
        const user = req.body.nombreusuario
        const contra = req.body.contraseña

        const datos = await EstudianteSchema.find({usuario:user})
        if(datos.length>0){
            const match = await bcrypt.compare(contra,datos[0].contraseña)
            if(match){
                if(datos[0].carrera!="N/A"){
                    res.json(
                        {
                            "msg":true,
                            "nombre":datos[0].nombre,
                            "idUsuario":datos[0]._id,
                            "tipoUsuario":"estudiante"
                        })   
                }else{
                    res.json(
                        {
                            "msg":true,
                            "nombre":datos[0].nombre,
                            "idUsuario":datos[0]._id,
                            "tipoUsuario":"Administrador"
                        })   
                }
                
            }else{
                res.json({"msg":false})
            }
               
        }else{
            res.json({"msg":false})
        }
    }


    //Obtener todos
    static async getAllEstudiantes( req,res){
        EstudianteSchema
        .find()    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener usuario
    static async getEstudiante( req,res){
        
        const userdni = req.params.dni
        EstudianteSchema
        .find({dni:userdni})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar usario mediante ID
    static async putEstudiante( req,res){
        const {id} =req.params;
        const{nombre,edad} = req.body
        EstudianteSchema
        .updateOne({_id:id},{$set:{nombre,edad}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar usario mediante ID
    static async deleteEstudiante( req,res){
        const {id} = req.params;
        EstudianteSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}