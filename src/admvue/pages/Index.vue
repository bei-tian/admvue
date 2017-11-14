<style lang='less'>
    @import "./main.less";
    .test {
        width: 100px;
        height: 100px;
        background: #f00;
        .test-item {
            width: 50px;
            height: 50px;
            background: #ff0;
        }
    }
</style>
<template>
    <div class="main">
        <nav class="nav">
            <div class="nav-header" :style="{width:menuWidth}">
                <img v-show="!menuShrink" src="/dist/static/images/logo.png" class="logo"/>
                <img v-show="menuShrink" src="/dist/static/images/logo-mini.png" width="65"/>
            </div>
            <div class="nav-container" :style="{'margin-left':menuWidth}">
                <ul class="nav-left">
                    <li :style="{transform: 'rotateZ(' + (menuShrink ? '-90' : '0') + 'deg)',width: '60px'}" type="text" @click="toggleMenu">
                        <a href="javascript:">
                            <Icon type="navicon" size="28" style="margin-top: 15px"></Icon>
                        </a>
                    </li>
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
                                <img src="/dist/static/images/user2-160x160.jpg" class="user-image"/> <span>admin</span>
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


        <nav class="site-menu" :style="{width:menuWidth}">
            <template v-if="!menuShrink">
                <Menu ref="menu" theme="dark" width="220px" :active-name="menuActiveName" :open-names="menuOpenName"
                      @on-select="openPage">
                    <Submenu v-for="(item, i) in menu" :key="i" :name="navCurrentIndex +'-'+ i">
                        <template slot="title">
                            <Icon :type="item.icon"></Icon>
                            {{item.name}}
                        </template>
                        <Menu-item v-for="(sub,j) in item.sub" :key="j" :name="navCurrentIndex +'-'+ i +'-'+j">
                            {{sub.name}}
                        </Menu-item>
                    </Submenu>
                </Menu>
            </template>
            <template v-else>
                <template v-for="(item, i) in menu">
                    <Dropdown placement="right-start" @on-click="openPage">
                        <Button style="width: 70px;margin-left: -5px;padding:10px 0; color: #ffffff;" type="text">
                            <Icon :type="item.icon" size="20"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(sub,j) in item.sub" :key="j" :name="navCurrentIndex +'-'+ i +'-'+j">{{sub.name}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </template>
            </template>
        </nav>


        <nav class="page-tab" :style="{'margin-left':menuWidth}">
            <Tabs type="card" closable :animated="false" :value="tabCurrent" @on-click="tabChange" @on-tab-remove="closePage">
                <Tab-pane v-for="(item,index) in pageTab" :key="index" :label="item.name" :name="item.keys"></Tab-pane>
            </Tabs>
        </nav>

        <main class="adm-page" :style="{'margin-left':menuWidth}">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </main>

        <Modal title="修改密码" :footer-hide="true" v-model="modalShow">
            <SetPassword></SetPassword>
        </Modal>
    </div>
</template>


<script>
    import SetPassword from './home/SetPassword.vue'
    import {menuMy} from '../api/index'
    import Cookies from 'js-cookie'

    export default {
        data() {
            return {
                nav: [],
                navCurrentIndex: 0,

                //左侧菜单状态
                menu: [],
                menuOpenName: [],
                menuActiveName: '',

                //标签页切换
                pageTab: [{
                    name: '首页',
                    url: '/'
                }],
                tabCurrent: '',

                //菜单收缩
                menuShrink: false,
                menuWidth: '220px',

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

            //收缩菜单
            toggleMenu() {
                this.menuShrink = !this.menuShrink
                if (this.menuShrink) {
                    this.menuWidth = '65px'
                } else  {
                    this.menuWidth = '220px'
                }
            },

            //切换主导航栏
            navChange(index) {
                this.navCurrentIndex = index
                this.menu = this.nav[index].menu
            },

            //点击左边菜单
            openPage(name) {
                let keys = name.split('-')
                let page = this.menu[keys[1]].sub[keys[2]]
                page.keys = name
                if(!this.contains(page)) {
                    this.pageTab.push(page)
                }
                this.tabCurrent = name
                this.$router.push(page.url)

                localStorage.pageTab = JSON.stringify(this.pageTab)
                localStorage.tabCurrent = name
            },
            closePage(name) {
                let keys = name.split('-')
                let page = this.menu[keys[1]].sub[keys[2]]
                for (let i in this.pageTab) {
                    if (this.pageTab[i].id === page.id) {
                        this.pageTab.splice(i, 1);
                        //关闭当前面
                        if(name === this.tabCurrent) {
                            this.$router.push(this.pageTab[i-1].url)
                        }
                    }
                }
                localStorage.pageTab = JSON.stringify(this.pageTab)
            },
            //切换页面标签
            tabChange(name) {
                let keys = name.split('-')
                let page = this.nav[keys[0]].menu[keys[1]].sub[keys[2]]
                this.$router.push(page.url)
                this.navCurrentIndex = parseInt(keys[0])
                this.menu = this.nav[this.navCurrentIndex].menu
                let openName = keys[0] + '-' + keys[1]
                if (!this.menuOpenName.includes(openName)) {
                    this.menuOpenName.push(openName)
                }
                this.menuActiveName = name
                localStorage.tabCurrent = name
            },

            initTab() {
                //刷新时，初始化nav，menu和tab
                this.pageTab = JSON.parse(localStorage.pageTab)
                this.tabCurrent = localStorage.tabCurrent
                let keys = this.tabCurrent.split('-')
                this.navCurrentIndex = parseInt(keys[0])
                this.menu = this.nav[this.navCurrentIndex].menu
                this.menuOpenName = [keys[0] + '-' + keys[1]]
                this.menuActiveName = this.tabCurrent
            },

            contains(current) {
                for (let i in this.pageTab) {
                    if (this.pageTab[i].id === current.id) return true;
                }
                return false;
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
