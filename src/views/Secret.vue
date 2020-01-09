<template>
<div>
    <h1>My Secret Space</h1>
    <ul>
        <li>Name: {{user.name}} </li>
        <li>Nickname: {{user.nickname}} </li>
        <li>Updated: {{user.updated_at}} </li>
    </ul>
    <button type="button" @click="logout()">Logout</button>
</div>
</template>
<script>

import { getProfile,  logout, isLoggedIn } from "@/utils/auth";
export default {
    name:"Secret",
    data() {
        return {
            user: getProfile()
        }
    },
    methods: {
        logout() {
            logout();
            this.$router.push("/");
        }
    }
}
</script>