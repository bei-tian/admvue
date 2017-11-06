<template>
    <span>
        <Tree :data="data" :show-checkbox="true" v-model="data" ref="tree"></Tree>
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
            }
        },
        methods: {
            save() {
                let checked = this.$refs['tree'].getCheckedNodes()
                let privilege = []
                checked.map(function (item) {
                    privilege.push(item.id)
                })
                adminRolePrivilegeSave({id:this.id, privilege:privilege.join(',')},data => {
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

        watch:{
            id:function (newId) {
                this.getPrivilege(newId)
            }
        }
    }
</script>
