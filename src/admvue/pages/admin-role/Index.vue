<template>
    <div class="admin-index">
        <div class="list-operate">
            <Form ref="formInline" inline>
                <FormItem>
                    <Input placeholder="搜索角色" v-model="form.name"/>
                </FormItem>


                <FormItem>
                    <Button type="info" icon="ios-search" @click="search">搜索</Button>
                    <Button type="success" icon="plus" @click="add">新增</Button>
                </FormItem>
            </Form>
        </div>

        <Table size="small" :columns="columns.concat(operate)" :data="list"></Table>

        <MyPage :total="total" @on-change="page"></MyPage>

        <!--<Modal title="添加角色" :footer-hide="true" v-model="modalShow">-->
        <!--<Edit :id="id"></Edit>-->
        <!--</Modal>-->

        <Modal title="设置权限" :footer-hide="true" v-model="modalShow">
            <Privilege :id="id"></Privilege>
        </Modal>
    </div>
</template>
<script>
    import MyPage from '../../components/MyPage.vue'
    import Edit from './Edit.vue'
    import Privilege from './Privilege.vue'
    import {adminRoleIndex, adminRoleDel} from '../../api/index'
    import indexMixin from '../../mixins/indexMixin'
    export default {
        mixins: [indexMixin],
        data () {
            return {
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '角色名称',
                        key: 'name'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time'
                    }
                ],
                list: [],
                form: {
                    name: ''
                },
                id: -1
            }
        },
        methods: {
            search() {
                this.getList()
            },
            add() {
                this.id = 0
                this.modalShow = true
            },
            edit(params) {
                if (params.row) {
                    this.id = params.row.id
                }
                this.modalShow = true
            },
            getList() {
                let params = this.form
                params.page = this.currentPage
                adminRoleIndex(params, data => {
                    this.list = data.list
                    this.total = data.total
                    this.modalShow = false
                })
            },
            del(id) {
                adminRoleDel({id: id}, data => {
                    this.getList()
                })
            },
            operateAdd(h, params) {
                return [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginLeft: '5px'
                        },
                        on: {
                            click: () => {
                                this.privilege(params)
                            }
                        }
                    }, '设置权限'),
                ]
            },
            privilege(params) {
                this.id = params.row.id
                this.modalShow = true
            }
        },
        created() {
            this.operate.push()
        },
        mounted() {
            this.getList()
        },
        components: {
            MyPage,
            Edit,
            Privilege
        }
    }
</script>

<style>
    .admin-index {
        margin: 20px 20px 0
        background-color: #ffffff
        padding: 20px
    }
</style>
