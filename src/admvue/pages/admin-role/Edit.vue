<template>
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
        <FormItem label="角色名称" prop="name">
            <Input type="text" v-model="form.name"></Input>
        </FormItem>


        <FormItem>
            <Button type="primary" @click="handleSubmit('form')">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
    import { adminRoleInfo,adminRoleSave } from '../../api/index'
    export default {
        props:['id'],
        data () {
            return {
                form: {
                    name: '',
                    privilege: ''
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
                        adminRoleSave(this.form, data=> {
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
                adminRoleInfo({id:newId},data=> {
                    if (data.info) {
                        this.form = data.info
                    } else {
                        this.form = {}
                    }
                    this.roleList = data.roleList
                })
            }
        }
    }
</script>
