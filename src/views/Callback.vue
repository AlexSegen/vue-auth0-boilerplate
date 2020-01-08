<template>
    <div>
        <h2>Callback</h2>
    </div>
</template>
<script>
import { handleAuth } from '../utils/auth'
export default {
    name: "callback",
    beforeMount() {
        handleAuth((err) => {
            if(err) {
                console.log('Error from callback', error);
                return
            }

            this.$router.push("/secret");
        })
    },
    props: {

    },
    methods: {

    }
    
}
</script>