<template>
    <span>
        <Tree :data="data" show-checkbox @on-check-change="handleCheck"></Tree>
        <Button type="info" @click="save">保存</Button>
    </span>
</template>
<script>
    import { adminRolePrivilegeSave, adminRolePrivilege } from '../../api/index'
    export default {
        props:['id'],
        data () {
            return {
                data: [],
                privilege:''
            }
        },
        methods: {
            handleCheck(checked) {
                let privilege = []
                checked.map(function (item) {
                    privilege.push(item.id)
                })
                this.privilege = privilege.join(',')
            },
            save() {
                adminRolePrivilegeSave({id:this.id, privilege:this.privilege},data => {
                    this.$Message.success('保存成功!')
                    this.$parent.$parent.getList()
                })
            },
            getPrivilege(id) {
                adminRolePrivilege({id},data => {
                    this.data = data
                })
            }
        },
        mounted() {
            //this.getPrivilege(this.id)
        },
        watch:{
            id:function (newId) {
                this.getPrivilege(newId)
            }
        }
    }
</script>
