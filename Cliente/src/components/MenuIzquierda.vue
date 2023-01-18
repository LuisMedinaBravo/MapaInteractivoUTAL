<template>

  <div class="navegacion">
    <ul>
      <li  class="selectMenu" >
        <div @click="select" class="select">
        <input type="text" class="textBox" placeholder="Seleccionar edificio" readonly>
          <div class="option">
              <div v-for="item in edificios" :key="item.id">
                  <div @click="show(item)">{{item}}</div>
              </div> 
               
          </div>
        </div>
      </li>

      <div v-for="item in salasEd" :key="item.id">
        
          <li class="list">
          <router-link to="/">
            <a @click="$emit('generarRutaMisCursos',this.EdificioSeleccionado,menu)">
              <span class="icon"><ion-icon name="list-box"></ion-icon></span>
              <span class="titulo">{{item}}</span>
              
            </a>
            
          </router-link>
           
        </li>
        
      </div>
        

    </ul>
     
  

  </div>
    
  

</template>

<script >

//import API from "@/api"

export default {
    data() {
        return {


            edificios: [],
            salasEd:[],
            EdificioSeleccionado:"",
            menu:"menuIzquierda"

        };
    }/* ,
    methods: {
        escribir() {
            alert("hola");
        },
        async show(anything){
            this.EdificioSeleccionado=document.querySelector('.textBox').value = anything;
            
            this.salasEd= await API.getSalasByName(this.EdificioSeleccionado)
            console.log(this.salasEd)
        },
        async select(){
            this.edificios = await API.getEdificios()
            
            var dropdown = document.querySelector('.select');
            dropdown.classList.toggle('active');
            
        },
        generarRutaMisCursos(){

        }
        
    } */,
    props: {
        nombre: String,
        posMonito: String,
    },
  
};


</script>

<style scoped>

    .blanco{
      color: aliceblue;
    }
   .navegacion{
    font-family: 'Poppins', sans-serif;
    position: absolute;
    color: rgb(38, 64, 87);
    width: 250px;
    height: 93.7vh;
    background: #313C75;
    overflow-x: hidden ;
    transition: 0.5s;
    z-index: 120;

    
  }

  .navegacion:hover {
    width: 250px;
    transition: 0.5s;
    
  }

  .navegacion:hover .list{
    
    display: block;
  }
  
  
  .list:hover{
    
    color: aliceblue;
    cursor: pointer;
    background: #677EF5;

  }

  .navegacion ul{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 5px;
    padding-top: 40px;
  }

  .navegacion ul li{
    position: relative;
    list-style: none;
    width: 98%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }



  .navegacion ul li a{
    position: relative;
    display: block;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: aliceblue;
  }


  .navegacion ul li a .icon{
    position: relative;
    display: block;
    min-width: 60px;
    height: 60px;
    line-height: 70px;
    text-align: center;
  }

  .navegacion ul li a .icon ion-icon{
    position: relative;
    font-size: 1.5em;
    z-index: 1;

  }
  .navegacion ul li a .titulo{
    position: relative;
    display: block;
    padding-left: 10px ;
    height: 60px;
    line-height: 60px;
    white-space: nowrap ;
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

.option{
  display: inline-block;
  box-sizing: border-box;
  max-height: 200px;
  
  overflow-y: scroll;
  
}
</style>