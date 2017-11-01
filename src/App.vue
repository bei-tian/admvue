<template>
    <span>
        <Index v-if="isLogin"></Index>
        <Login v-if="!isLogin"></Login>
    </span>
</template>


<script>
    import Cookie from './admvue/utils/Cookie'
    import {Index,Login} from './admvue/index'
    export default {
        data() {
            return {
                isLogin: false
            }
        },
        created() {
            //判断登陆
            let login_id = Cookie.get("adm_login_id");
            if(login_id > 0) {
                this.isLogin = true;
            }
        },
        components: {
            Index,
            Login
        }
    }
</script>
