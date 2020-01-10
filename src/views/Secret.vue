<template>
<div>
    <h1>My Secret Space</h1>
    <ul>
        <li>Name: {{user.name}} </li>
        <li>Nickname: {{user.nickname}} </li>
        <li>Updated: {{user.updated_at}} </li>
    </ul>
    <button class="btn btn-outline-secondary"  type="button" @click="logout()">Logout</button>
</div>
</template>
<script>

import { mapActions } from 'vuex'
import { getProfile,  logout, isLoggedIn } from "@/utils/auth";

export default {
    name:"Secret",
    data() {
        return {
            user: getProfile()
        }
    },
    beforeMount() {
        this.checkIfsLoggedIn()
    },
    methods: {
        ...mapActions([
            'checkIfsLoggedIn',
        ]),
        logout() {
            logout();
            this.$router.push("/");
        }
    }
}
</script>