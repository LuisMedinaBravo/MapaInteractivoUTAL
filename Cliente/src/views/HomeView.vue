
<template>
  <div>
    <MenuSuperior/>
    <CuerpoLanding/>
    
  </div>
  

</template>

<script>

import MenuSuperior from '@/components/MenuSuperior.vue';
import CuerpoLanding from '@/components/CuerpoLanding.vue';


export default {
  
  name: 'HomeView',
  components: {
    MenuSuperior,
    CuerpoLanding

  },
}
</script>
