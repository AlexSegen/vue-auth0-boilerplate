<template>
  <div>
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/shared/Navbar'
export default {
  name: "App",
  components: {
    Navbar
  }
  
}
</script>