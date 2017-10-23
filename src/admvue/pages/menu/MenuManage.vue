<template>
    <div class="menu-set">
        <div class="aside">
            <div class="aside-title">顶部菜单</div>
            <div class="aside-section">
                <ul class="aside-list">
                    <draggable v-model="nav">
                    <li :class="{active:(navCurrentIndex === index)}" v-for="(item,index) in nav" @click="navChange(index)">
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.name}}</span>
                        <span class="item-actions">
                            <span @click="editMenu(item, $event)"><Icon type="compose"></Icon></span>
                            <span @click="delMenu(item.id, $event)"><Icon type="close"></Icon> </span>
                        </span>
                    </li>
                    </draggable>
                </ul>
            </div>
            <div class="aside-line"></div>
            <div class="aside-footer">
                <ul class="aside-list">
                    <li @click="addMenu(0)"><Icon type="plus"></Icon> <span>添加新菜单</span></li>
                </ul>
            </div>
        </div>


        <Modal
                v-model="modalShow"
                title="添加新菜单"
                okText="提交"
                :footer-hide="true"
                >
            <Edit :editData="editData"></Edit>

        </Modal>




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
                        <li class="dd-item" v-for="(menu, i) in navCurrent.menu">
                            <div class="dd-content">
                                <span class="menu-name"><Icon :type="menu.icon"></Icon>&nbsp;  {{menu.name}}</span>
                                <span class="item-actions">
                                    <span @click="addMenu(menu.id)"><Icon type="plus"></Icon></span>
                                    <span @click="editMenu(menu, $event)"><Icon type="compose"></Icon></span>
                                    <span @click="delMenu(menu.id, $event)"><Icon type="close"></Icon> </span>
                                </span>
                            </div>
                            <ol class="dd-list">
                                <draggable v-model="menu.sub">
                                <li class="dd-item" v-for="(sub, j) in menu.sub">
                                    <div class="dd-content">
                                        <span class="menu-name"><Icon :type="sub.icon"></Icon>&nbsp; {{sub.name}}</span>
                                        <span class="item-actions">
                                            <span @click="editMenu(sub, $event)"><Icon type="compose"></Icon></span>
                                            <span @click="delMenu(sub.id, $event)"><Icon type="close"></Icon> </span>
                                        </span>
                                    </div>
                                </li>
                                </draggable>

                            </ol>
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
    </div>

</template>
<script>
    import { getMenu,delMenu } from '../../api/index'
    import draggable from 'vuedraggable'
    import Edit from './Edit.vue'
    export default {
      data() {
        return {
          nav:[],
          navCurrentIndex:0,
          navCurrent:{},
          modalShow:false,
          editData:{
            icon:'navicon-round',
            name:''
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
            parent_id:parent_id,
            icon:'navicon-round',
            name:''
          }
          this.modalShow = true
        },
        editMenu(item,e) {
          this.editData = item
          this.modalShow = true
          e.stopPropagation()
        },

        delMenu(id,e) {
          console.log(e)
          if(!confirm('确定要删除该菜单吗？')) {
            return false
          }
          delMenu({id:id}, data => {
            this.getMenu()
          })
          e.stopPropagation()
        },

        getMenu() {
          getMenu( data => {
            this.nav = data
            this.navCurrent = this.nav[this.navCurrentIndex]
            this.modalShow = false
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


</style>