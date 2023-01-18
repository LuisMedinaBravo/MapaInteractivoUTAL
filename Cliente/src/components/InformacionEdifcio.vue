<template>
 <div class="contenedor" >
    <div class="carta">
        
      <div>

        <button @click="$emit('reserve')" class="botonCerrar">X</button>

        <img height="150" :src="urlFoto">
        
        <div class="infoSuperior">
          <h2>{{ texto }}</h2>
          <div>• {{ texto }}. Curico, los Niches</div>
          <br />
          <div>Descripcion: {{ descripcion }}</div>
        </div>

        <div v-if="salas != '---'" class="infoSala">
          <h3>Salas</h3>
          <div class="contButton" v-for="item in salas" :key="item.id">
            <button>{{ item }}</button>
          </div>
          
        </div>
      
        <br />

      </div>

    </div>
     
  </div>

</template>

<script>
export default {
  data() {
    return {
      visibleTarjeta: true,
      
    };
  },
  methods: {
    reserve() {
        console.log("hola")
    },
  },
  props: {
    texto: String,
    urlFoto: String,
    descripcion: String,
    salas: Array,
    
  },
};
</script>


<style scoped>

.carta{
  float: right;
  position: relative;
  max-width: 300px;
  margin: 5px 50px 0 0;
  z-index: 30;
  transition: 0.5s;
  background: rgb(255, 255, 255);
}

.botonCerrar {
  transition: 0.5s;
  position: absolute;

  margin: 0 0 0 90%;
  width: 30px;
  height: 30px;
  background: #313c75;
  color: white;
  border-radius: 50%;
  z-index: 60;
}


.contButton {
  position: relative;
  text-align: center;
  display: inline-block;
  
  
  padding: 10px;
  margin: 0 2px 0 5px ;
  
  border-radius: 50%;
  font-size: 14px;
  transition: 0.5s;
  width: auto;
  background-color: #313c75;
  color: aliceblue;
}

.contButton:hover {
  background: #677ef5;
}

.infoSuperior {
  padding: 10px;
  color: #313c75;
}

h3{
  padding: 10px;
  color: #313c75;
}

</style>