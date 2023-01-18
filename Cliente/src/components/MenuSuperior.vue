<template>
<div>
    <div class="contenedor">
        <div @click="cerrarSesion" class="cerrarSesion" v-if="mostrarLogin && estadoMensaje">
            <p>Cerrar Sesion</p>
        </div>
        <!-- <img  @click="mostrarIzquierda" class="menu" src="https://i.ibb.co/BBJKGTk/menu.png" alt=""  height="37">
         -->
        <img  class="logo" src="https://puropellet.cl/wp-content/uploads/2019/02/utalca-puropellet.png" alt=""  height="37">
       
        <button class="botoniniciar" small elevation="" @click="mostrar" >
            <img class="user" src="https://i.ibb.co/VLJ6CsC/user.png" alt="" width="40">
            
        </button>

        <div @click="mostrar"  class="textIniciar">{{nombreUsuario}}</div>
            <button @click="mostrarMiscursos" v-if="estadoBotonMisCursos" class="botonMisCursos"> 
                Cursos 
                <ion-icon name="add-circle-outline"></ion-icon>
            </button>
            <div class="bloqueAdmin">
                <button @click="mostrarEdificios"  v-if="estadoBotonAdmin" class="botonMisCursos">
                    
                    Gestionar Edificios
                    <ion-icon name="briefcase"></ion-icon>
                </button>
                <button @click="mostrarEditarCursos"  v-if="estadoBotonAdmin" class="botonMisCursos">
                    
                    Editar Cursos
                    <ion-icon name="book"></ion-icon>
                </button>
            </div>
        
        <div v-if="mostrarLogin && estadoMensaje===false">
            <FormularioLogin
                @notifica="validar"
            />
        </div>

        <div v-if="estadoIzquierda">
            <MenuIzquierda
                :nombre="posicionMono"
                @generarRutaMisCursos="rutasMisCursos"          
            />
        </div>

        <div v-if="estadoMiscursos">
            <VistaEstudiante
            :idUsuario="idUsuario"
            @generarRutaMisCursos="rutasMisCursos"
            />
        </div>
        <div v-if="estadoEditarCursos">
            <GestionarCursos/>
        </div>
        <div v-if="estadoMisEdificios">
            <VistaAdmin/>
        </div>

        
    </div>
    <div>
        <MapaMapBox
        :nombreEdificioCurso = "nombreEdificioMisCursos"
        
        />
        </div>

</div>

     
</template>

<script>
import FormularioLogin from "./MenuArriba/FormularioLogin.vue";
import MenuIzquierda from './MenuIzquierda.vue';
import VistaEstudiante from "./MenuArriba/VistaEstudiante.vue";
import GestionarCursos from "./MenuArriba/GestionarCursos.vue";
import API from "@/api"
import swal from "sweetalert";
import Swal from "sweetalert2"
import VistaAdmin from "./MenuArriba/VistaAdmin.vue";
export default {
    components: {
    FormularioLogin,
    MenuIzquierda,
    VistaEstudiante,
    GestionarCursos,
    VistaAdmin
},
    data(){
        return{
            datosusuario: {
                nombreusuario: "Iniciar Sesion",
                contraseña: ""
            },
            estado: false,
            estadoIzquierda: false,
            estadoMiscursos: false,
            estadoMisEdificios:false,
            estadoValidar:null,
            estadoBotonMisCursos:false,
            estadoBotonAdmin:false,
            estadoMensaje:false,
            mostrarLogin:false,
            nombreUsuario:"",
            estadoEditarCursos:false,
            idUsuario:"",
            nombreEdificioMisCursos:""


        }
    },
    props:{
        
        menuEstudiante: Boolean,
        menuAdministrador: Boolean,
        posicionMono: String,
        
    },
    methods:{
        mostrar(){

            if(this.mostrarLogin && this.estadoBotonMisCursos==false || this.mostrarLogin &&  this.estadoBotonAdmin==false || this.mostrarLogin==false && this.estadoEditarCursos ){
            console.log("SE CERRO ESTE MENU SE SUPONE PARA ACOMDODAR EL EDITAR CURSOS")    
                this.mostrarLogin = false;
            }
            else{
                
                this.mostrarLogin = true;
            }
            
        },

      /*   mostrarIzquierda(){
            if(this.estadoIzquierda){

                this.estadoIzquierda = false;
            }
            else{
                this.estadoIzquierda = true;
            }
            
        }, */
        mostrarMiscursos(){
            if(this.estadoMiscursos){
                console.log("FUNCAAAAA3");
                this.estadoMiscursos = false;
            }
            else{
                console.log("FUNCAAAAA4");
                this.estadoMiscursos = true;
            }
            
        },
        mostrarEditarCursos(){
            if(this.estadoEditarCursos){
                console.log("OCULTAR CURSOS");
                this.estadoEditarCursos = false;
               
            }
            else{
                console.log("MOSTRAR CURSOS");
                
                this.estadoEditarCursos = true;
                
                this.estadoMisEdificios = false;
            }
            
        },
            mostrarEdificios(){
            if(this.estadoMisEdificios){
                 console.log("OCULTAR EDIFICIOS");
                this.estadoMisEdificios = false;
                
            }
            else{
                console.log("MOSTRAR EDIFICIOS");
                this.estadoMisEdificios = true;
                this.estadoEditarCursos = false;
            }
            
        },
        async validar(e) {
            
            const res = await API.validarusuario(e);
           
            console.log(res)
            this.estadoMensaje = res.msg;
            
            if (this.estadoMensaje) {
                swal("Listo", "Validacion exitosa.", "success");
            }
            else {
                swal("Oops", "Datos invalidos.", "error");
            }

            if(res.tipoUsuario=='estudiante'){
                console.log('Soy estudiante');
                this.nombreUsuario = res.nombre
                this.estadoBotonMisCursos = true
                this.mostrarLogin=false
                this.idUsuario=res.idUsuario
            }
            if(res.tipoUsuario=='Administrador'){
                this.nombreUsuario = res.nombre
                this.estadoBotonAdmin =true
                this.mostrarLogin=false
                
                
            }
        },
        cerrarSesion(){
            this.datosusuario.nombreUsuario = "Iniciar Sesion";
            this.datosusuario.contraseña= "";

            this.estado= false;
            this.estadoIzquierda= false;
            this.estadoMiscursos= false;
            this.estadoMisEdificios=false;
            this.estadoValidar=null;
            this.estadoBotonMisCursos=false;
            this.estadoBotonAdmin=false;
            this.estadoMensaje=false;
            this.mostrarLogin=false;
            this.nombreUsuario="Iniciar Sesion";

            swal("Sesion cerrada", "Cierre de sesion exitoso.", "success");
        },
        rutasMisCursos(nombreEdificioMisCursos,nombre){
            console.log(nombre)
            Swal.fire({
                icon: 'info',
                title: 'Edificio Seleccionado',
                text: 'Ahora puedes mover y precionar el popup rojo para generar la ruta de la posicion que tu elijas.',
            })

            this.nombreEdificioMisCursos = nombreEdificioMisCursos;

            if(nombre==="menuIzquierda"){
                console.log("menuIzquierda")
                this.mostrarIzquierda()
            }
            if(nombre==="vistaEstudiante"){
                console.log("vistaEstudiante")
                this.mostrarMiscursos()
            }
            
            

        }
    },
}
</script>

<style scoped>

.contenedor{
    display: inline-block;

    position: relative;
    top: 0;
    margin: 0;
    width: 100%;
    z-index: 31;
    background-color: #151721;
    height: 90px;
    color: aliceblue ;
}

.logo{
    margin-left: 15px;
    margin-top: 10px;
    position: relative;
    z-index: 7;
    height: 70px;
}
.menu{
    margin: 5px;
    position: relative;
    z-index: 7;
    cursor: pointer;
    transition: 0.5s;
}
.menu:hover{
    margin: 5px;
    position: relative;
    z-index: 7;
    cursor: pointer;
    background: #677EF5;
    transition: 0.5s;
}
.botoniniciar{
    float: right;
    background: #313C75;
    position: relative;
    margin: 5px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transition: 0.5s;
    z-index: 6;
}

.botoniniciar:hover {

    background: #677EF5;
    transition: 0.5s;

}

.textIniciar{

    display: inline-block;
    position: relative;
    margin: 12px 0 0 0;
    width: auto;
    cursor: pointer;
    transition: 0.5s;
}
.botonMisCursos{
    float: right;
    width: auto;
    height: auto;
    margin: 12px 50px 0 0;
    
}
.botonMisCursos ion-icon{
    width: 30px;
    height: 30px;
    position: absolute;
} 
.botonMisCursos:hover ion-icon{
    background: #677EF5;
} 

/*BLOQUE LITERAL DE LOS BOTONES */
.bloqueAdmin{
    display: flex;
    float: right;
    position: relative;
}

.cerrarSesion{
    float: right;
    position: absolute;
    z-index: 6000;
    cursor: pointer;
    top: 52px;
    right: 0;
    
}
.cerrarSesion p{
    
    background: rgba(255, 255, 255, 0.666);
    padding: 5px;
    border-radius: 5%;
    border: 2px solid #313C75;
    color: #313C75;
}

ion-icon{
    position: absolute;
    margin: 0px 0 0 5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    transition: 0.5s;
}
ion-icon:hover{
    background: #677EF5;
}

</style>