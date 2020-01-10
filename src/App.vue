<template>
  <div>
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/shared/Navbar'

export default {
  name: "App",
  components: {
    Navbar
  },
  created() {
    this.checkIfsLoggedIn()
  },
  methods: {
    ...mapActions([
      'checkIfsLoggedIn',
    ]),
  }
}
</script>