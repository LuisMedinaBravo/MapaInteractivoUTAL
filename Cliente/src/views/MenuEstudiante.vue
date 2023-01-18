<template>
  <div class="menuEstudiante">
    
    <MenuSuperior
      nombreUsuario="Rodrigo López"
      estadoBotonMisCursos=true
    />
 
  </div>
</template>


<script>
import MenuSuperior from "@/components/MenuSuperior.vue"

export default{
  components:{
    MenuSuperior

  }

}
</script>