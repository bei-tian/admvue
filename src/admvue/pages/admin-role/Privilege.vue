<template>
    <span>
        <scrolly class="foo" :style="{height: '300px' }">
          <scrolly-viewport>
            <Tree :data="data"  show-checkbox v-model="data" ref="tree"></Tree>
          </scrolly-viewport>
          <scrolly-bar axis="y"></scrolly-bar>
        </scrolly>

        <Button type="info" @click="save">保存</Button>
    </span>
</template>
<script>
    import {adminRolePrivilegeSave, adminRolePrivilege} from '../../api/index'
    import { Scrolly, ScrollyViewport, ScrollyBar } from 'vue-scrolly';
    export default {
        props: ['id'],
        data () {
            return {
                data: [],
            }
        },
        methods: {
            save() {
                let checked = this.$refs['tree'].getChecked()
                let privilege = []
                checked.map(function (item) {
                    privilege.push(item.id)
                })
                adminRolePrivilegeSave({id: this.id, privilege: privilege.join(',')}, data => {
                    this.$parent.$parent.privilegeModelShow = false
                    this.$Message.success('保存成功!')
                })
            },
            getPrivilege(id) {
                adminRolePrivilege({id}, data => {
                    this.data = data
                })
            }
        },

        watch: {
            id: function (newId) {
                this.getPrivilege(newId)
            }
        },

        mounted() {
            this.$refs['tree'].getChecked = function () {
                return this.flatState.filter(obj => obj.node.checked || obj.node.indeterminate).map(obj => obj.node);
            }
        },

        components: {
            Scrolly,
            ScrollyViewport,
            ScrollyBar
        }
    }
</script>
