<template>
    <div class="main">
        <nav class="nav">
            <div class="nav-header">
                <img src="/images/logo.png" class="logo"/>
            </div>
            <div class="nav-container">
                <ul class="nav-left">
                    <li :class="{active:(navCurrentIndex === index)}" v-for="(item,index) in nav"
                        @click="navChange(index)">
                        <a href="javascript:">
                            <Icon :type="item.icon"></Icon>
                            <span>{{item.name}}</span>
                        </a>
                    </li>
                </ul>

                <ul class="nav-right">
                    <li class="user-notice">
                        <a href="javascript:">
                            <Badge dot>
                                <Icon type="ios-bell"></Icon>
                            </Badge>
                        </a>
                    </li>
                    <li class="user-info">
                        <Dropdown trigger="click">
                            <a href="javascript:void(0)">
                                <img src="/images/user2-160x160.jpg" class="user-image"/> <span>admin</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list" class="user-set">
                                <DropdownItem>
                                    <div @click="setPassword">修改密码</div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div @click="logout">退出</div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>

                </ul>
            </div>
        </nav>


        <nav class="site-menu">
            <Menu ref="menu" theme="dark" width="220px" :active-name="menuActiveName" :open-names="menuOpenName"
                  @on-select="openPage">
                <Submenu :name="i" v-for="(item, i) in menu" :key="i">
                    <template slot="title">
                        <Icon :type="item.icon"></Icon>
                        {{item.name}}
                    </template>
                    <Menu-item :name="i+'-'+j" v-for="(sub,j) in item.sub" :key="j">{{sub.name}}</Menu-item>
                </Submenu>
            </Menu>
        </nav>


        <nav class="page-tab">
            <Tabs type="card" closable :animated="false" :value="tabCurrent" @on-click="tabChange">
                <Tab-pane v-for="(item,index) in pageTab" :key="index" :label="item.name"></Tab-pane>
            </Tabs>
        </nav>

        <main class="adm-page">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </main>

        <Modal title="修改密码" :footer-hide="true" v-model="modalShow">
            <SetPassword></SetPassword>
        </Modal>
    </div>
</template>

<style>


</style>

<script>
    import SetPassword from './home/SetPassword.vue'
    import {menuMy} from '../api/index'
    import Cookies from 'js-cookie'

    export default {
        data() {
            return {
                nav: [],
                navCurrentIndex: 0,

                menu: [],
                menuOpenName: [],
                menuActiveName: '',

                pageTab: [{
                    name: '首页',
                    url: '/'
                }],
                tabCurrent: 0,
                modalShow: false
            }
        },
        computed: {},
        methods: {
            setPassword() {
                this.modalShow = true
            },
            //退出
            logout() {
                Cookies.remove('adm_login_id')
                this.$root.$children[0].isLogin = false
            },
            //切换主导航栏
            navChange(index) {
                this.navCurrentIndex = index
                this.menu = this.nav[index].menu
            },

            //点击左边菜单
            openPage(name) {
                let keys = name.split('-')
                let page = this.menu[keys[0]].sub[keys[1]]
                if (this.pageTab.includes(page)) {
                    this.tabCurrent = this.pageTab.indexOf(page)
                } else {
                    this.pageTab.push(page)
                    this.tabCurrent = this.pageTab.lastIndexOf(page)
                }
                this.$router.push(page.url);
            },

            //切换页面标签
            tabChange(name) {
                let page = this.pageTab[name]
                this.$router.push(page.url);

            },

            initTab() {
                //刷新时，初始化nav，menu和tab
                let path = location.pathname
                for (let nav of this.nav) {
                    if (nav.menu)
                        for (let menu of nav.menu) {
                            if (menu.sub)
                                for (let sub of menu.sub) {
                                    if (sub.url === path.trim()) {
                                        this.pageTab.push(sub)
                                        this.navCurrentIndex = this.nav.indexOf(nav)
                                        this.menuOpenName = [nav.menu.indexOf(menu)]
                                        this.menuActiveName = nav.menu.indexOf(menu) + '-' + menu.sub.indexOf(sub)
                                        break
                                    }
                                }
                        }
                }
                this.menu = this.nav[this.navCurrentIndex].menu
            }
        },
        mounted() {
            menuMy(data => {
                this.nav = data
                this.initTab()
            })
        },
        updated () {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
                this.$refs.menu.updateActiveName();
            });
        },
        components: {
            SetPassword
        }
    }
</script>
