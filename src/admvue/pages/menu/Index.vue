<template>
    <div class="menu-index">
        <div class="aside">
            <div class="aside-title">顶部菜单</div>
            <div class="aside-section">
                <ul class="aside-list">
                    <draggable v-model="nav" @end="saveSort(nav)">
                        <li :class="{active:(navCurrentIndex === index)}" v-for="(item,index) in nav"
                            @click="navChange(index)">
                            <Icon :type="item.icon"></Icon>
                            <span>{{item.name}}</span>
                            <span class="item-actions">
                            <span @click="editMenu(item, $event)" title="编辑"><Icon type="compose"></Icon></span>
                            <span @click="delMenu(item.id, $event)" title="删除"><Icon type="close"></Icon> </span>
                        </span>
                        </li>
                    </draggable>
                </ul>
            </div>
            <div class="aside-line"></div>
            <div class="aside-footer">
                <ul class="aside-list">
                    <li @click="addMenu(0)">
                        <Icon type="plus"></Icon>
                        <span>添加新菜单</span></li>
                </ul>
            </div>
        </div>


        <div class="content">
            <ol class="dd-list">
                <li class="dd-item">
                    <div class="dd-content">
                        <span class="menu-name"><Icon :type="navCurrent.icon"></Icon>&nbsp;  {{navCurrent.name}}</span>
                        <span class="item-actions">
                            <span @click="addMenu(navCurrent.id)"><Icon type="plus"></Icon></span>
                            <span @click="editMenu(navCurrent, $event)"><Icon type="compose"></Icon></span>
                            <span @click="delMenu(navCurrent.id, $event)"><Icon type="close"></Icon> </span>
                        </span>
                    </div>
                    <ol class="dd-list">
                        <draggable v-model="navCurrent.menu" @end="saveSort(navCurrent.menu)">
                            <li class="dd-item" v-for="(menu, i) in navCurrent.menu">
                                <div class="dd-content">
                                    <span class="menu-name"><Icon :type="menu.icon"></Icon>&nbsp;  {{menu.name}}</span>
                                    <span class="item-actions">
                                    <span @click="addMenu(menu.id)" title="添加子菜单"><Icon type="plus"></Icon></span>
                                    <span @click="editMenu(menu, $event)" title="编辑"><Icon type="compose"></Icon></span>
                                    <span @click="delMenu(menu.id, $event)" title="删除"><Icon
                                            type="close"></Icon> </span>
                                </span>
                                </div>
                                <ol class="dd-list">
                                    <draggable v-model="menu.sub" @end="saveSort(menu.sub)">
                                        <li :class="{'dd-item':true}" v-for="(sub, j) in menu.sub">
                                            <div :class="{'dd-content':true,'is-not-menu':!Boolean(sub.is_menu)}">
                                                <span class="menu-name"><Icon :type="sub.icon"></Icon>&nbsp; {{sub.name}}</span>
                                                <span class="item-actions">
                                            <span @click="editMenu(sub, $event)" title="编辑"><Icon type="compose"></Icon></span>
                                            <span @click="delMenu(sub.id, $event)" title="删除"><Icon type="close"></Icon> </span>
                                        </span>
                                            </div>
                                        </li>
                                    </draggable>

                                </ol>
                            </li>
                        </draggable>
                    </ol>
                </li>
            </ol>
        </div>

        <Modal title="添加新菜单" :footer-hide="true" v-model="modalShow">
            <Edit :editData="editData"></Edit>
        </Modal>
    </div>

</template>
<script>
    import {menuIndex, menuDel, menuSort} from '../../api/index'
    import draggable from 'vuedraggable'
    import Edit from './Edit.vue'
    export default {
        data() {
            return {
                nav: [],
                navCurrentIndex: 0,
                navCurrent: {},
                modalShow: false,
                editData: {
                    icon: 'navicon-round',
                    name: ''
                }
            }
        },
        methods: {
            navChange(index) {
                this.navCurrentIndex = index
                this.navCurrent = this.nav[index]
            },
            addMenu(parent_id) {
                this.editData = {
                    parent_id: parent_id,
                    icon: 'navicon-round',
                    name: ''
                }
                this.modalShow = true
            },
            editMenu(item, e) {
                this.editData = item
                this.modalShow = true
                e.stopPropagation()
            },

            delMenu(id, e) {
                if (!confirm('确定要删除该菜单吗？')) {
                    return false
                }
                menuDel({id: id}, data => {
                    this.getMenu()
                })
                e.stopPropagation()
            },

            getMenu() {
                menuIndex(data => {
                    this.nav = data
                    this.navCurrent = this.nav[this.navCurrentIndex]
                    this.modalShow = false
                })
            },


            //保存拖动排序
            saveSort(data) {
                let sort = []
                data.map(function (item, index) {
                    sort.push({id: item.id, sort: index})
                })
                menuSort({sort}, data => {

                })
            }
        },
        mounted() {
            this.getMenu()
        },
        components: {
            Edit,
            draggable
        }
    }
</script>
<style>
.is-not-menu {
    background-color: #eeeeee;
}

</style>