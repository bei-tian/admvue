<template>
    <div class="login-bd">
        <div class="login-logo"></div>
        <h3>管理后台登陆</h3>
        <Form ref="form" :model="form" :rules="rule">
            <Form-item prop="username">
                <Input type="text" v-model="form.username" placeholder="请输入帐号"/>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码"/>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('form')" long>登录</Button>
            </Form-item>
        </Form>
    </div>

</template>
<script>
    import Cookies from 'js-cookie'
    import {adminLogin} from '../api/index'
    export default {
        data () {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rule: {
                    username: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        adminLogin(this.form, data => {
                            Cookies.set('adm_login_id', data.id)
                            Cookies.set('token', data.token)
                            this.$root.$children[0].isLogin = true
                        })
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            }
        }
    }
</script>
