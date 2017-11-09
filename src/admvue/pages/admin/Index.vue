<template>
    <div class="admin-index">
        <div class="list-operate">
            <Form ref="formInline" inline>
                <FormItem>
                    <Select placeholder="所属角色" v-model="form.role_id" style="width:200px">
                        <Option :value="0" :key="0">选择角色</Option>
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Input placeholder="搜索账号" v-model="form.username"/>
                </FormItem>


                <FormItem>
                    <Button type="info" icon="ios-search" @click="search">搜索</Button>
                    <Button type="success" icon="plus" @click="add">新增</Button>
                </FormItem>
            </Form>
        </div>

        <Table size="small" :columns="columns.concat(operate)" :data="list"></Table>

        <MyPage :total="total" @on-change="page"></MyPage>

        <Modal title="添加账号" :footer-hide="true" v-model="modalShow">
            <Edit :id="id"></Edit>
        </Modal>
    </div>
</template>
<script>
    import MyPage from '../../components/MyPage.vue'
    import Edit from './Edit.vue'
    import {adminIndex, adminDel} from '../../api/index'
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
                        title: '角色',
                        key: 'username'
                    },
                    {
                        title: '角色',
                        key: 'role'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time'
                    }
                ],
                list: [],
                form: {
                    role_id: 0,
                    username: ''
                },
                roleList: [],
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
                adminIndex(params, data => {
                    this.list = data.list
                    this.total = data.total
                    this.roleList = data.role
                    this.modalShow = false
                })
            },
            del(id) {
                adminDel({id: id}, data => {
                    this.getList()
                })
            }
        },
        mounted() {
            this.getList()
        },
        components: {
            MyPage,
            Edit
        }
    }
</script>

<style>
    .admin-index {
        margin: 20px 20px 0;
        background-color: #ffffff;
        padding: 20px;
    }
</style>
