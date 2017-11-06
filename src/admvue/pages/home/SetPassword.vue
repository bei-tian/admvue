<template>
    <Form ref="form" :model="form" :rules="rule" :label-width="80">

        <FormItem label="原密码">
            <Input type="password" v-model="form.oldPass"></Input>
        </FormItem>

        <FormItem label="新密码">
            <Input type="password" v-model="form.newPass"></Input>
        </FormItem>

        <FormItem label="确认密码">
            <Input type="password" v-model="form.rePass"></Input>
        </FormItem>



        <FormItem>
            <Button type="primary" @click="handleSubmit()">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
    import { adminInfo,adminSave } from '../../api/index'
    export default {
        props:['id'],
        data () {
            return {
                form: {
                    oldPass: '',
                    newPass: '',
                    rePass:''
                },
                rule: {
                    oldPass: [
                        { required: true, message: '请输入原密码', trigger: 'blur' }
                    ],
                    newPass: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                        { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                    ],
                    rePass: [
                        { required: true, message: '请再次输入新密码', trigger: 'blur' },
                        { validator: (rule, value, callback) => {
                            if (value !== this.form.newPass) {
                                callback(new Error('两次输入密码不一致'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        adminSave(this.form, data=> {
                            this.$Message.success('提交成功!')
                            this.$parent.$parent.getList()
                        })
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            }
        }
    }
</script>
