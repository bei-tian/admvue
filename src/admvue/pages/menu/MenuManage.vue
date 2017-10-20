<template>
    <div class="menu-set">
        <div class="aside">
            <div class="aside-title">顶部菜单</div>
            <div class="aside-section">
                <ul class="aside-list">
                    <li v-for="(item,index) in nav" @click="navChange(index)">
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.name}}</span>
                        <span class="item-actions"><Icon type="compose"></Icon> <Icon type="close"></Icon> </span>
                    </li>
                </ul>
            </div>
            <div class="aside-line"></div>
            <div class="aside-footer">
                <ul class="aside-list">
                    <li @click="addNav"><Icon type="plus"></Icon> <span>添加新菜单</span></li>
                </ul>
            </div>
        </div>


        <Modal
                v-model="modalShow"
                title="添加新菜单"
                okText="提交"
                :footer-hide="true"
                >
            <Edit></Edit>

        </Modal>




        <div class="content">
            <ol class="dd-list">
                <li class="dd-item">
                    <div class="dd-content">
                        <span class="menu-name"><Icon :type="navCurrent.icon"></Icon>  {{navCurrent.name}}</span>
                    </div>
                    <ol class="dd-list">
                        <li class="dd-item" v-for="(menu,index) in navCurrent.menu">
                            <div class="dd-content">
                                <span class="menu-name"><Icon :type="menu.icon"></Icon>  {{menu.name}}</span>
                                <span class="pull-right fa-angle-right"></span>
                            </div>
                            <ol class="dd-list">
                                <li class="dd-item" v-for="(sub,index) in menu.sub">
                                    <div class="dd-content">
                                        <span class="menu-name">{{sub.name}}</span>
                                        <span class="pull-right fa-angle-right"></span>
                                    </div>
                                </li>

                            </ol>
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
    </div>

</template>
<script>
    import { getMenu } from '../../api/index'
    import Edit from './Edit.vue'
    export default {
      data() {
        return {
          nav:[],
          navCurrent:{},
          modalShow:false
        }
      },
      methods: {
        navChange(index) {
          this.navCurrent = this.nav[index]
        },
        addNav() {
          this.modalShow = true
        }
      },
      mounted() {
        getMenu( data => {
          this.nav = data
          this.navCurrent = this.nav[0]
        })
      },
      components: {
        Edit
      }
    }
</script>
<style>


</style>