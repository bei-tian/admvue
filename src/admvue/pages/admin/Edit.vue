<template>
    <Form ref="formCustom" :model="form" :rules="rule" :label-width="80">
        <FormItem label="账号" prop="username">
            <Input type="text" v-model="form.username"></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="form.password"></Input>
        </FormItem>
        <FormItem label="角色" prop="role">
            <Select v-model="form.role_id" style="width:200px">
                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
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
                    password: '',
                    username: '',
                    role_id:0
                },
                roleList: [],
                rule: {

                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
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
        },
        watch:{
            id:function (newId) {
                adminInfo({id:newId},data=> {
                    if (data.info) {
                        this.form = data.info
                    } else {
                        this.form = {
                            password: '',
                            username: '',
                            role_id:0
                        }
                    }
                    this.roleList = data.roleList
                })
            }
        }
    }
</script>
