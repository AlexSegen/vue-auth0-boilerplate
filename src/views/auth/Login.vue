<template>
  <div class="hello">
    <div v-if="!IS_LOGGED_IN">
      <h2>Hello</h2>
      <button type="button" @click="login">Login</button>
    </div>
    <div v-else>
      <h2>Welcome, {{user.name}}</h2>
      <p>You are Logged In</p>
      <button type="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { login, getProfile,  logout, isLoggedIn } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    return {
      user: getProfile()
    };
  },
  computed: {
    ...mapGetters([
      'IS_LOGGED_IN'
    ])
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
    login() {
      login();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
