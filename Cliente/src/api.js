import axios from 'axios'
import * as turf from '@turf/turf'

const url = "/api/Estudiante"
var salas =[]
var menorIndice
var camino =[]


var visitados =[]

import { DijkstraCalculator } from 'dijkstra-calculator';

var EntradasSalas={
   info:[   
            {
                nombre:"Facultad de Ingeniería",
                datos: {
                    coordenadas:[-71.22979433407157, -35.0017047386893],
                    vecinos:[0]
                }
            },{
                nombre:"Edificio Minas",
                datos: {
                    coordenadas:[-71.23095415504667, -35.00135123097902],
                    vecinos:[14]
                }
            },{
                nombre:"Edificio de Mecanica",
                datos: {
                    coordenadas:[-71.22886378003142, -35.002003009634954],
                    vecinos:[25,28]
                }
            },{
                nombre:"Edificio Construccion",
                datos: {
                    coordenadas:[-71.2291604784214, -35.003168465316016],
                    vecinos:[35]
                }
            },{
                nombre:"Edificio I+D",
                datos: {
                    coordenadas:[-71.22915475374442, -35.00365484351161],
                    vecinos:[36]
                }
            },{
                nombre:"Edificios Laboratorios",
                datos: {
                    coordenadas:[-71.22999896811982, -35.002471304966534],
                    vecinos:[22,54]
                }
            },{
                nombre:"Edificio Estudiantil",
                datos: {
                    coordenadas:[-71.22980662330485, -35.0020445830408],
                    vecinos:[57,4]
                }
            },{
                nombre:"Biblioteca",
                datos: {
                    coordenadas:[-71.22894013559387, -35.002824873000314],
                    vecinos:[56,31]
                }
            },{
                nombre:"Eléctrica",
                datos: {
                    coordenadas:[-71.23129613592188, -35.0020916923508],
                    vecinos:[14]
                }
            },{
                nombre:"Salas de Madera",
                datos: {
                    coordenadas:[-71.22897841350172, -35.002423278615076],
                    vecinos:[29,32]
                }
            },{
                nombre:"Servicios Multiples",
                datos: {
                    coordenadas:[-71.2302405610473, -35.00213003797558],
                    vecinos:[15,58]
                }
            },{
                nombre:"Edificio Salas S",
                datos: {
                    coordenadas:[-71.22955876785723, -35.00311601562916],
                    vecinos:[59]
                }
            },{
                nombre:"Gimnasio",
                datos: {
                    coordenadas:[-71.23020173932005, -35.00298450172138],
                    vecinos:[42]
                }
            },{
                nombre:"Entrada",
                datos: {
                    coordenadas:[-71.229743, -35.001366],
                    vecinos:[0]
                }
            }
    ]
}

var MapaDatos =({
    punto:[
        {
            //0
            coordenadas: [-71.2299404525283,-35.00157096723943],
            vecinos:[1]
            
        },{
            //1
            coordenadas:[-71.23010011256969,-35.00169222284792],
            vecinos:[2]
             
        },{
            //2
            coordenadas:[-71.22997404874641,-35.001797683174544],
            vecinos:[3]
             
        },{
            //3
            coordenadas:[-71.22997404874641,-35.00188556667614],
            vecinos:[4]
        },{
            //4
            coordenadas:[-71.22994990886504,-35.001914128794496],
            vecinos:[5]
        },{
            //5
            coordenadas:[-71.2298345738774,-35.001857004548505],
            vecinos:[6]
        },{
            //6
            coordenadas:[-71.22954757751285,-35.00187458124379],
            vecinos:[7]
        },{
            //7
            coordenadas:[-71.2295448953037,-35.00187458124379],
            vecinos:[8]
        },{
            //8
            coordenadas:[-71.22956367076681,-35.00171199666902],
            vecinos:[9]
        },{
            //9
            coordenadas:[-71.22970314563581,-35.001566988533234],
            vecinos:[0]
        }
        ,{
            //10
            coordenadas:[-71.23003371709136,-35.001465682790254],
            vecinos:[0]
        },{
            //11
            coordenadas:[-71.23017382792807,-35.001429552497015],
            vecinos:[10]
        },{
            //12
            coordenadas:[-71.23031706117858,-35.001441804224015],
            vecinos:[11]
        },{
            //13
            coordenadas:[-71.23051270456054,-35.00169026246481],
            vecinos:[12]
        },{
            //14
            coordenadas:[-71.23099539424632,-35.001547057602785],
            vecinos:[13]
        },{
            //15
            coordenadas:[-71.23042570170693,-35.00189898036885],
            vecinos:[1]
        },{
            //16
            coordenadas:[-71.23051741361367,-35.00195686399013],
            vecinos:[15]
        },{
            //17
            coordenadas:[-71.23054945568967,-35.002074480029705],
            vecinos:[16]
        },{
            //18
            coordenadas:[-71.2305458250504,-35.00218974620029],
            vecinos:[17]
        },{
            //19
            coordenadas:[-71.23052488966263,-35.00224413861483],
            vecinos:[18]
        },{
            //20
            coordenadas:[-71.23033445282263,-35.0024330869962],
            vecinos:[19]
        },{
            //21
            coordenadas:[-71.2299884478597,-35.00223095615343],
            vecinos:[20,4]
        },{
            //22
            coordenadas:[-71.22991978430625,-35.00229620380366],
            vecinos:[21]
        },{
            //23
            coordenadas:[-71.22960549137818,-35.00231347834065],
            vecinos:[22]
        },{
            //24
            coordenadas:[-71.22955989382503,-35.002010281445735],
            vecinos:[23,6]
        },{
            //25
            coordenadas:[-71.22927687673246,-35.00202755513493],
            vecinos:[24,28]
        },{
            //26
            coordenadas:[-71.22918212536254,-35.00236405020594],
            vecinos:[22]
        },{
            //27
            coordenadas:[-71.22917392581876,-35.00232605253304],
            vecinos:[26]
        },{
            //28
            coordenadas:[-71.22914468746264,-35.002186274270116],
            vecinos:[27]
        },{
            //29
            coordenadas:[-71.22920101385235,-35.002537806041246],
            vecinos:[26]
        },{
            //30
            coordenadas:[-71.22926062633935,-35.00267519274698],
            vecinos:[29]
        },{
            //31
            coordenadas:[-71.22889983549454,-35.002700820936255],
            vecinos:[30]
        },{
            //32
            coordenadas:[-71.22888374224058,-35.002558011620685],
            vecinos:[31]
        },{
            //33
            coordenadas:[-71.2293135910152,-35.00308757874281],
            vecinos:[30]
        },{
            //34
            coordenadas:[-71.22931385853363,-35.00312593857843],
            vecinos:[33]
        },{
            //35
            coordenadas:[-71.22925249968682,-35.00312953750478],
            vecinos:[34]
        },{
            //36
            coordenadas:[-71.22936980920181,-35.0035532515094],
            vecinos:[33]
        },{
            //37
            coordenadas:[-71.22956829266921,-35.003529084048715],
            vecinos:[36]
        },{
            //38
            coordenadas:[-71.22971209855535,-35.00305923560182],
            vecinos:[33]
        },{
            //39
            coordenadas:[-71.22970136971927,-35.002988929816816],
            vecinos:[38]
        },{
            //40
            coordenadas:[-71.22978043765664,-35.00297784727669],
            vecinos:[39]
        },{
            //41
            coordenadas:[-71.22987703348345,-35.00293643116061],
            vecinos:[40]
        },{
            //42
            coordenadas:[-71.22993550080423,-35.002862478092084],
            vecinos:[41]
        },{
            //43
            coordenadas:[-71.22996322380382,-35.002818027122814],
            vecinos:[42]
        },{
            //44
            coordenadas:[-71.22995980573604,-35.002764011391854],
            vecinos:[43]
        },{
            //45
            coordenadas:[-71.22994554553841,-35.00268776166632],
            vecinos:[44]
        },{
            //46
            coordenadas:[-71.22990251839609,-35.002625032711684],
            vecinos:[45]
        },{
            //47
            coordenadas:[-71.22982051618962,-35.002583680004165],
            vecinos:[46]
        },{
            //48
            coordenadas:[-71.22973636583296,-35.002562342812766],
            vecinos:[47]
        },{
            //49
            coordenadas:[-71.22959942254467,-35.00258176936264],
            vecinos:[48]
        },{
            //50
            coordenadas:[-71.22948195570028,-35.00266638579051],
            vecinos:[49,30]
        },{
            //51
            coordenadas:[-71.22944572404857,-35.00277212907218],
            vecinos:[50]
        },{
            //52
            coordenadas:[-71.22947949824105,-35.00288420034394],
            vecinos:[51]
        },{
            //53
            coordenadas:[-71.22957169797503,-35.00295606060448],
            vecinos:[52,39]
        },{
            //54
            coordenadas:[-71.23016561350855,-35.00258825427132],
            vecinos:[20,45]
        },{
            //55    
            coordenadas:[-71.22995038136769,-35.00273285676767],
            vecinos:[54]
        },{
            //56
            coordenadas:[-71.22928210232985,-35.002870681569895],
            vecinos:[51,33,30]
        },{
            //57
            coordenadas:[-71.22998142083637,-35.002150322537915],
            vecinos:[4,21]
        },{
            //58
            coordenadas:[-71.23014307217852,-35.002322860518],
            vecinos:[20,21]
        },{
            //59
            coordenadas:[-71.2295505129698,-35.00306755704641],
            vecinos:[38,33]
        },{
            //60
            coordenadas:[-71.22963429815131,-35.00250238913921],
            vecinos:[23,48]
        },{
            //61
            coordenadas:[-71.22939824345772,-35.00233694569128],
            vecinos:[26,23]
        }
        
        


    ]
  })
 

  
export default class API{
    //pedir usuario
    static async getEstudianteDNI(dni){
        const res = await axios.get(url+'/'+dni)
       
        return res.data

    }
    static buscarEntradas(nombreEdificio){
        var datos
        EntradasSalas.info.forEach(element => {
            if(element.nombre==nombreEdificio){
                console.log(element.datos)
                datos = element.datos
            }
        });
        
        return datos
    }
    static setGraphInfo(edef){
        var datos =this.buscarEntradas(edef)
        
        
        if(datos!==undefined){
                const graph = new DijkstraCalculator();
            
            
                MapaDatos.punto.push(datos)
                for (let index = 0; index < MapaDatos.punto.length; index++) {
                    graph.addVertex(index+"")
                    
                }
                
                var i=0
                MapaDatos.punto.forEach(element => {
                element.vecinos.forEach(element2 => {
                        var corX1 = MapaDatos.punto[i].coordenadas[0]
                        var corY1= MapaDatos.punto[i].coordenadas[1]
                        var corX2 = MapaDatos.punto[element2].coordenadas[0]
                        var corY2 = MapaDatos.punto[element2].coordenadas[1]
                        
                        var dis =this.distancia(corX1,corY1,corX2,corY2)
                        
        
                        
                        graph.addEdge(i+"",element2+"",dis)
                    
                            
                    
                    
                });
                i++
            });
            
            const path = graph.calculateShortestPath(menorIndice+"",MapaDatos.punto.length-1+"");
        
            
            path.forEach(element => {
                camino.push(MapaDatos.punto[element].coordenadas)
            });
                
                MapaDatos.punto.pop()
                return camino
        }else{
            return false
        }
        
        
       
        
       
       
        
       
        
        
        
        

       
                    
               
            
        
    }
    static async getEdificioByNombreSala(nombresala){
        const res = await axios.get("/api/Edificio-salanombre/"+nombresala)
        
        return res.data
    }
    static async validarusuario(datos){
        const res = await axios.post(url+'/login',datos)
     
        console.log(res.data)
        return res.data
    }
    static async postSala(datos,edificio){
       
        const res = await axios.post("/api/Sala",{
            nombre:datos
        }
       
        
        )
        await axios.put("/api/Edificio-actualizar",{
            idSala: res.data._id,
            nombreEdificio:edificio
        })
        
       
        
        return res.data
    }

    
    static async getSalasByName(nombre){
        const res = await axios.get("/api/Edificio-sala/"+nombre)
        salas = res.data
        return res.data
    }
    static async getEdificios(){
        const res = await axios.get("/api/Edificio/")
      
        return res.data
    }

    static getSalas(){
        return salas
    }
    static async getAllAsistes(){
        const res = await axios.get("/api/Asiste")
        return res.data
    }
    static async getAllCursos(){
        const res = await axios.get("/api/Curso")
        return res.data
    }
    static async getAsisteById(id){
   
        const res = await axios.get("/api/Asiste-Estudiante/"+id)
        
        return res.data
    }
    static getMapaDatos(){
        console.log(MapaDatos)
    }
    static async getAllSalas(){
        const res = await axios.get("/api/Sala/")

        return res.data
    }
    static distancia(fromlng,fromlat,tolng,tolat){
        var from = turf.point([fromlng,fromlat]);

        var to = turf.point([tolng,tolat]);
        var options = {units: 'miles'};

        var distance = turf.distance(from, to, options);
        return distance
    }
    static CercanoUsuario(fromlng,fromlat){
        camino=[]
        visitados.length=0
        
        var menor=Infinity
        var indice=0
        var dis =0
        camino.push([fromlng,fromlat])
        MapaDatos.punto.forEach(element => {
            dis = this.distancia(fromlng,fromlat,element.coordenadas[0],element.coordenadas[1])
            
            if(dis<=menor){
                menor=dis
                menorIndice=indice

            }
            indice++
        });

        
        
        console.log(menorIndice)
        return menorIndice   
    }
    


    static inArray(array,buscado){
        var bus=false
        array.forEach(element => {
            if(buscado==element){
                bus=true
            }
        });
        return bus
    }





    

    
}   