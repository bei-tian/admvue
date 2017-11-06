<template>
    <span>
        <Index v-if="isLogin"></Index>
        <Login v-if="!isLogin"></Login>
    </span>
</template>


<script>
    import Cookies from 'js-cookie';
    import Login from './admvue/pages/Login.vue'
    import Index from './admvue/pages/Index.vue'
    export default {
        data() {
            return {
                isLogin: false
            }
        },
        created() {
            //判断登陆
            let login_id = Cookies.get("adm_login_id");
            if (login_id > 0) {
                this.isLogin = true;
            }
        },
        components: {
            Index,
            Login
        }
    }
</script>
