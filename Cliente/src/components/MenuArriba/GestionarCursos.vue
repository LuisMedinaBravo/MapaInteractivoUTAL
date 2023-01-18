 <template>

    <div class="container">
        <div class="editarEdificios" >
            <div v-if="mostrarCursos">
                <ComboxDinamic
                :listaCursos="cursosActivos"
                @notifica="obtenerIndex"
                />
            </div>
            <div>
                <div v-if="mostrarEditarCrusos" class="infoCursoSeleccionado">
                    <v-list-item>
                        <v-list-item-content >
                            <div v-if="mostrarSecciones">
                             <button @click="m_mostrarCursos()"><ion-icon name="md-arrow-round-back"></ion-icon></button>
                              
                                    <div  class="nombreCurso">
                                        {{cursosActivos[indexCursoSeleccionado].nombre }}
                                    </div>
                                    <br>
                                    <div  v-for="(item) in secciones" :key="item.id" > 
                                
                                        <div @click="m_mostrarBloques(item)"  class="infoSeccion">
                                            Sección  {{item}}  
                                        </div> 
                                    
                                    </div>
                               
                            </div>

                            <div v-if="mostrarBloques" class="infoCursoSeleccionado">
                                
                                <button @click="volverASecciones()"><ion-icon name="md-arrow-round-back"></ion-icon>
                                </button>

                                <v-list-item>
                                    <v-list-item-content >
                                    <div class="nombreCurso"> 
                                        {{cursosActivos[indexCursoSeleccionado].nombre }} Sección {{ seccionSeleccionada }}
                                        
                                    </div>
                                    
                                    <br>
                                    </v-list-item-content>
                                </v-list-item>
                                    <v-list-item>
                                    <v-list-item-content >
                                        <div  v-for="(item,index) in bloques" :key="item.id"  class="infoSeccion"> 
                            
                                            <div @click="m_mostrarEditarBloque(item,index)">
                                                Bloque {{item.dia}} {{item.hora_inicio}} {{item.hora_final}} 
                                            </div> 
                            
                                        </div>  
                                    </v-list-item-content>
                                </v-list-item>
                            </div>  
                            <div v-if="mostrarEditarBloque" class="infoCursoSeleccionado">
                                
                                <button @click="volverABloques()"><ion-icon name="md-arrow-round-back"></ion-icon>
                                </button>
                                      <div class="formularioEditar">
                                            
                                            <v-list-item-title  > Hora_Inicio Actual: <b>{{ hora_iniActual}} </b> </v-list-item-title>

                                            <v-select             
                                                v-model="hora_ini_nueva"
                                                :items="horasDeInicio"
                                                label="Seleccionar Hora"
                                                outlined
                                                dense
                                            >
                                            </v-select>
                                                    <v-list-item-title >Hora_Final Actual: <b>{{ hora_finActual}}</b> </v-list-item-title>
                                            <v-select 
                                                
                                                v-model="hora_fin_nueva"
                                                :items="horasDeTermino"
                                                label="Seleccionar Hora"
                                                outlined
                                                dense

                                                    
                                            >
                                            </v-select>
                                            
                                                <v-list-item-title  >Sala Actual: <b>{{ sala_Actual}} </b>  </v-list-item-title>
                                           
                                            <v-combobox 
                                                v-model="sala_nueva"
                                                :items="salas"
                                                label="Seleccionar Sala"
                                                outlined
                                                dense
                                                    
                                            >
                                            </v-combobox >
                                             
                                                <v-list-item-title>Dia  Actual: <b>{{dia_Actual}} </b>  </v-list-item-title>
                                      
                                            <v-select 
                                
                                                    v-model="dia_nueva"
                                                    :items="dias"
                                                    label="Seleccionar Dia"
                                                    outlined
                                                    dense
                                                    
                                            >
                                            </v-select>

                                            <div class="botonGuardar">
                                                <button  @click="guardarSala()">Guardar</button>
                                            </div>
                                    
                                
                                        
                                        </div>   
                                       
                            </div>  
                                
                            
                        </v-list-item-content>  
                    </v-list-item>
                   
                        
                </div>      
                
               
            
            </div>
        </div>
    </div>
</template>

<script>
import API from "@/api";
import  {ref } from "vue";
import swal from "sweetalert";
import ComboxDinamic from "./ComboxDinamic.vue";
var idCursoSeleccionado = ref();
export default {
    data() {
        return {
            instanciaSalaslala: [],
            seccionNoSeleccionada: true,
            mostrarCursos: true,
            mostrarEditarCrusos: false,
            mostrarSecciones: false,
            mostrarBloques: false,
            mostrarEditarBloque: false,
            indexCursoSeleccionado: 0,
            indexBloqueSeleccionado: 0,
            seccionSeleccionada: "",
            bloqueSeleccionado: "",
            hora_iniActual: "",
            hora_finActual: "",
            sala_Actual: "",
            dia_Actual: "",
            hora_ini_nueva: "",
            hora_fin_nueva: "",
            sala_nueva: "",
            dia_nueva: "",
            cursos: [],
            cursosActivos: [],
            cursosInstacias: [],
            cursoEditado: [],
            horasDeInicio: [
                "8:30",
                "9:40",
                "10:50",
                "12:00",
                "13:10",
                "14:20",
                "15:30",
                "16:40",
                "17:50",
                "19:00",
                "20:10",
                "21:20",
            ],
            horasDeTermino: [
                "9:30",
                "10:40",
                "11:50",
                "13:00",
                "14:10",
                "15:20",
                "16:30",
                "17:40",
                "18:50",
                "20:00",
                "21:10",
                "22:20",
            ],
            salas: [],
            secciones: [],
            bloques: [],
            dias: [
                "Lunes",
                "Martes",
                "Miercoles",
                "Jueves",
                "Viernes",
                "Sabado",
                "Domingo",
            ]
        };
    },
    methods: {
        obtenerIndex(e){
            this.botonIr(e)
            console.log("")
        },
        async getEdificios() {
            //Para sacar los cursos activos
            this.cursos = await API.getAllCursos();
            this.cursos.forEach(element => {
                //console.log(element.nombre)
                this.cursosActivos.push({
                    nombre: element.nombre,
                });
            });
            this.secciones.forEach(element => {
                // console.log(element.nombre)
                this.cursosActivos.push({
                    nombre: element.nombre,
                    asiste: element.asisteID,
                });
            });
            var instanciaSalas = await API.getAllSalas();
            instanciaSalas.forEach(element => {
                // console.log(element.nombre)
                this.salas.push(element.nombre);
            });
            //  console.log(this.cursos, instanciaSalas)
        },
        m_mostrarCursos() {
            console.log("muestra")
            this.mostrarCursos = true;
            this.mostrarEditarCrusos = false;
            this.mostrarSecciones = false;
            this.mostrarBloques = false;
            this.mostrarEditarBloque = false;
            this.indexCursoSeleccionado = 0;
            this.secciones = [];
        },
        m_mostrarBloques(seccionSL) {
            this.mostrarBloques = true;
            this.mostrarSecciones = false;
            console.log("SELECCION SELECICONADA " + seccionSL);
            this.seccionSeleccionada = seccionSL;
        },
        m_mostrarEditarBloque(item, index) {
            this.mostrarBloques = false;
            this.mostrarEditarBloque = true;
            this.hora_iniActual = item.hora_inicio;
            this.hora_finActual = item.hora_final;
            //console.log(item.id_sala.nombre)
            this.sala_Actual = item.id_sala.nombre;
            this.dia_Actual = item.dia;
            //item es el curso editado
            this.cursoEditado = item;
            this.indexBloqueSeleccionado = index;
            //console.log("Salas " + this.salas)
            /* Sala = this.cursos[cursoSeleccionado].id_sala.nombre*/
        },
        volverASecciones() {
            this.mostrarBloques = false;
            this.mostrarSecciones = true;
        },
        volverABloques() {
            this.mostrarBloques = true;
            this.mostrarEditarBloque = false;
        },
        botonIr(cursoSeleccionado) {
            
            //Guardamos el curso seleccionado
            this.indexCursoSeleccionado = cursoSeleccionado;
            //Ocultar Cursos
            this.mostrarCursos = false;
            //Mostrar EditarCursos
            this.mostrarEditarCrusos = true;
            //Mostrar Secciones
            this.mostrarSecciones = true;
            //OCULTAR O ABRIR LA VENTANA DE LOS CURSOS
            this.cursoNoSeleccionado = !this.cursoNoSeleccionado;
            this.cursoSeleccionado = !this.cursoSeleccionado;
            //GUARDAR EL ID DEL CURSO QUE SELECCIONO
            idCursoSeleccionado.value = cursoSeleccionado;
            //this.idCursoSeleccionado=cursoSeleccionado;
            //console.log("id CURSO SELECCIONADO: " +idCursoSeleccionado.value);
            // console.log(this.cursos[cursoSeleccionado].asisteID);
            //console.log("Se agregó " +(this.cursos[cursoSeleccionado].asisteID[0].seccion));
            //console.log("lalala "+this.cursos[cursoSeleccionado].asisteID[cursoSeleccionado].seccion);
            var instaciaCorresponde = this.cursos[cursoSeleccionado].asisteID;
            var instanciaSecciones = [];
            //SECCIONES
            instaciaCorresponde.forEach(element => {
                console.log("Se agregó " + element.seccion);
                instanciaSecciones.push(element.seccion);
            });
            instanciaSecciones = [...new Set(instanciaSecciones)];
            console.log(instanciaSecciones);
            this.secciones = instanciaSecciones;
            //BLOQUES
            this.bloques = this.cursos[cursoSeleccionado].asisteID;
            //this.bloques= [...new Set( this.bloques)];
            //console.log("aaa " +this.bloques);
            // //QUITAMOS DUPLICADOS EN LAS SECCIONES
            //this.cursosInstacias= [...new Set(this.cursosInstacias)];
            //console.log(this.cursosInstacias);
            //Guardamos los valores antiguos de las salas
            this.hora_ini_nueva = this.cursos[cursoSeleccionado].hora_inicio;
            this.hora_fin_nueva = this.cursos[cursoSeleccionado].hora_final;

            //this.sala_nueva = this.cursos[cursoSeleccionado].id_sala.nombre;
            
            
        },
        botonVolver() {
            this.cursoNoSeleccionado = !this.cursoNoSeleccionado;
            this.cursoSeleccionado = !this.cursoSeleccionado;
            this.seccionNoSeleccionada = !this.seccionNoSeleccionada;
            console.log("SECCION NO SELECCIONADA: " + this.seccionNoSeleccionada);
            this.seccionSeleccionada = !this.seccionSeleccionada;
            console.log("SECCION  SELECCIONADA: " + this.seccionSeleccionada);
        },
        guardarSala() {
            swal("Listo", "Sala Editada.", "success");
            this.m_mostrarCursos();
            console.log(this.hora_ini_nueva);
            console.log(this.hora_fin_nueva);
            console.log(this.sala_nueva);
            console.log(this.dia_nueva);
            this.bloques[this.indexBloqueSeleccionado].hora_final = this.hora_fin_nueva;
            this.bloques[this.indexBloqueSeleccionado].hora_inicio = this.hora_ini_nueva;
            this.bloques[this.indexBloqueSeleccionado].dia = this.dia_nueva;
            this.bloques[this.indexBloqueSeleccionado].id_sala.nombre = this.sala_nueva;
            this.hora_iniActual = this.hora_ini_nueva;
            this.hora_finActual = this.hora_fin_nueva;
            this.sala_Actual = this.sala_nueva;
            this.dia_Actual = this.dia_nueva;


            
            /* Hora_Inicio =  this.cursoEditado.hora_inicio=this.hora_ini_nueva;*/
            /* Hora_Final =  this.cursos[this.indexCursoSeleccionado].hora_final=this.hora_fin_nueva;*/
            /* Sala = this.cursos[this.indexCursoSeleccionado].id_sala.nombre=this.sala_nueva; */
        },
    },
    beforeMount() {
        this.getEdificios();
    },
    components: { ComboxDinamic }
}
</script> 

<style scoped>
*{
    box-sizing: 0;
}
.container{
    float: right;
    display: inline-block;
    margin: 5px 0 0 0;
    width: 400px;
    
    color: rgb(255, 255, 255);
    transition: 0.5s;
    border-radius: 2%;
    overflow-y: auto;

}
.editarEdificios{
    color: aliceblue;
    height: auto;
    z-index: 90;
    transition: 0.5s;
    overflow-y: auto;
    border-radius: 2%;
    overflow-x: hidden;
}
.infoCursos{
    color: aliceblue;
    background: #313C75;
    border-top: 1px solid #ffffff;
    cursor: pointer;
    border-radius: 2%;
    
    transition: 0.5s;
}
.infoCursos:hover{
    background: #5163bb;
    
}
.infoCursoSeleccionado{
    color: aliceblue;
    background: #313C75;
    width: auto;
    font-size: 16px;
    border-radius: 2%;
    transition: 0.5s;
    position: relative;
    
}
.nombreCurso{
    width: 340px;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
}
.infoSeccion{
    display: inline-block;
    background: #313C75;
    width: 81px;
    padding: 5px;
    cursor: pointer;
    transition: 0.5s;
    text-align: center;
    
    border: 1px solid white;
}
.infoSeccion:hover{
    
    transition: 0.5s;
    background: #5163bb;

}

.formularioEditar{
    color: aliceblue;
    background: #313C75;
    width: 320px;
    font-weight: bold;
    transition: 0.5s;
    border-radius: 2%;
}

.infoCursoSeleccionado ion-icon{
    height: 25px;
    width: 25px;
    transition: 0.5s;
    
    border-radius: 50%;
    
}
.infoCursoSeleccionado ion-icon:hover{

    background: #677EF5;
    border-radius: 50%;
}

.v-select{
    width: 320px;
    
    font-size: 16px;
    
}
.botonGuardar{
    transition: 0.5s;
    border-radius: 15%;
    width: 320px;
    text-align: center;

}
.botonGuardar button{
    padding: 5px 10px 5px 10px;
    transition: 0.5s;
    border-radius: 5%;
    border: 1px solid white;
}
.botonGuardar button:hover{
    background: #677EF5;
    
    border-radius: 5%;
}
.v-list-item-title{

    font-size: 16px;
}

</style>