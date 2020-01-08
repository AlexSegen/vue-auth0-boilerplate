<template>
  <div class="hello">
    <div v-if="!isLoggedIn">
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
import { login, getProfile,  logout, isLoggedIn } from "../utils/auth";
export default {
  name: "HelloWorld",
  data() {
    return {
      isLoggedIn: isLoggedIn(),
      user: getProfile()
    };
  },
  props: {
    msg: String
  },
  methods: {
    login() {
      login();
    },
    logout(){
      logout()
      this.isLoggedIn = false;
      this.user = null
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
