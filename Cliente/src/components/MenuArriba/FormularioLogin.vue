<template> 

    <div class="container">
        <div class="formBx">
            <div class="form singinForm">
                <form >
                    <h3 >Iniciar sesion</h3>
                    <input type="usuario" placeholder="Usuario" v-model="datosusuario.nombreusuario">
                    <input type="password" placeholder="Contraseña" v-model="datosusuario.contraseña">
                    <h4>¿Olvidaste tu contraseña?</h4>
                    <br>
                    <p class="iniciar" @click="$emit('notifica',datosusuario)"> Validar</p>
                </form>
            </div>
            
        </div>
    </div>
  
</template>

<script>

export default {
    data() {
        return {
            datosusuario: {
                nombreusuario: null,
                contraseña: ""
            },
        };
    },
    props: {
        estado: Boolean,
        prueba:Boolean
    },
    methods: {
        notifica(){
        }
        
    },
    components: {
    }
}


</script>

<style scoped>

.container{
    float: right;
    display: inline-block;
    box-sizing: border-box;
    width: auto;
    height: 350px;
    z-index: 50;
    transition: 0.5s;
}

.formBx{
    display: inline-block;
    background: rgba(255, 255, 255, 0.7);
    position: relative;
    margin: 10px;
    z-index: 32;
    transition: 0.5s;

    border-radius: 5%;
    
}

.formBx .form{

    padding: 50px;
    transition: 0.5s;
}

.formBx .form form{
    float: center;
    display: flex;
    flex-direction: column;
}

.formBx .form form h3{
    font-size: 1.5em;
    color: #313C75;
    margin-bottom: 20px;
    font-weight: 500;
}

.formBx .form form input{
    margin-bottom: 20px;
    padding: 10px;
    outline: none;
    font-size:16px;
    border: 1px solid #313C75;
    color:#313C75;
    
}
.iniciar{
    background: #313C75;
    border: none;
    cursor: pointer;
    margin: 0 50px 0 50px;
    text-align: center;
    width: 150px;
    padding: 10px;
    outline: none;
    font-size:16px;
    color:rgb(255, 255, 255);

}

.formBx .form form input::placeholder{
    color: #485077;
}

h4{
    color: rgb(0, 132, 255);
    font-size: 14px;
    cursor: pointer;
}

</style>