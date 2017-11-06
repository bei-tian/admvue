<template>
    <span>
        <div class="account-info">
            <div>欢迎您，{{info.username}} {{info.role}} </div>
            <div>上次登录日期：{{info.login_time}} ，如果不是您本人登录，请及时 <a @click="setPassword">修改密码</a> 。</div>
        </div>

        <Modal title="修改密码" :footer-hide="true" v-model="modalShow">
            <SetPassword></SetPassword>
        </Modal>

        <div class="home-1">

        </div>
    </span>
</template>
<script>
    import { adminMy } from '../../api/index'
    import SetPassword from './SetPassword.vue'
    export default {
        data() {
            return {
                modalShow:false,
                info:{}
            }
        },
        methods: {
            setPassword() {
                this.modalShow = true
            }
        },
        mounted() {
            adminMy( data => {
                this.info = data.info
            })
        },
        components: {
            SetPassword
        }
    }
</script>
<style>
    .account-info {
        height: 80px;
        padding: 20px;
    }
</style>
