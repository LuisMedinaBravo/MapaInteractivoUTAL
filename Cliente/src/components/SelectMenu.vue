<template>
  <div class="contenedor">
      <div @click="select" class="select">
        <input type="text" class="textBox" placeholder="Seleccionar edificio" readonly>
        <div class="option">
            <div v-for="item in edificios" :key="item.id">
                <div @click="show(item)">{{item}}</div>
            </div> 
        </div>
        <div class="salas" v-for="item in salasEd" :key="item.id">
            <div @click="show(item)">{{item}}</div>
            123123
        </div>
    </div>

  </div>
</template>

<script>
import API from "@/api"
export default {
    data(){
        return{
            edificios: [],
            salasEd:[],
      

        }
    },
    methods:{
        async show(anything){
            const EdificioSeleccionado=document.querySelector('.textBox').value = anything;
            
            this.salasEd= API.getSalasByName(EdificioSeleccionado)
        },
        async select(){
            this.edificios = await API.getEdificios()
            
            var dropdown = document.querySelector('.select');
            
            dropdown.onclick = function (){
                dropdown.classList.toggle('active');
               
            }
        },
        

    }

}
</script>

<style scoped>
.salas{
  position: absolute;
  z-index: 1000;
  display: block;
  top: 0;
  left: 0;
}


.select{
    position: relative;
    width: 240px;
    height: 50px;
    z-index: 10;
}

.select:-moz-placeholder {
   opacity: 0;
}

.select::before{
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #333;
    right: 20px;
    top: 15px;
    z-index: 10000;
    border-top: 2px solid white;
    border-right: 2px solid white;
    transform: rotate(-45deg);
    transition: 0.5s;
    pointer-events: none;
}

.select.active::before{
    top: 22px;
    transform:rotate(-225deg);
}
.select input{
    position: absolute;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background: white;
    border: none;
    outline: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.745);
    padding: 12px 20px;
    border-radius: 10px;
}
.select .option{
    position: absolute;
    top: 70px;
    width: 100%;
    background: white;
    box-shadow: 0 30px 30px black;
    border-radius: 10px;
    overflow: hidden;
    display: none;
    color: #333;
}

.select.active .option{
    display: block;
}

.select .option div{
    padding: 12px 20px;
    cursor: pointer;
}
.select .option div:hover{
    background: #677EF5;
    color: aliceblue;
}
</style>