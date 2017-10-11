<template>
<div>
    <nav class="nav">
        <div class="nav-header">

        </div>
        <div class="nav-container">
            <ul class="nav-left">
                <li :class="{active:(navCurrent === index)}" v-for="(item,index) in nav" @click="navChange(index)">
                    <a href="#">
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.name}}</span>
                    </a>
                </li>
            </ul>

            <ul class="nav-right">
                <li>
                    <a href="#">
                        <Icon type="email"></Icon>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Icon type="log-out"></Icon>
                    </a>
                </li>
            </ul>
        </div>
    </nav>



    <nav class="site-menu">
        <Menu theme="dark" width="220px" @on-select="openPage">
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
        <Tabs type="card" closable :animated="false" :value="tabCurrent">

            <Tab-pane v-for="(item,index) in pageTab" :key="index" :label="item.name">dd</Tab-pane>
        </Tabs>
    </nav>
</div>
</template>


<script>
  export default {
    data() {
      return {
        nav:[
          {icon:'folder', name:'UI示例', menu:[
            {icon:'folder', name:'内容管理',sub:[
              {name:'文章管理'},
              {name:'评论管理'},
            ]},
            {icon:'locked', name:'用户管理',sub:[
              {name:'新增用户'},
              {name:'活跃用户'},
            ]},
          ]},


          {icon:'locked', name:'页面示例', menu:[
            {icon:'folder', name:'内容管理2',sub:[
              {name:'文章管理2'},
              {name:'评论管理2'},
            ]},
            {icon:'locked', name:'用户管理2',sub:[
              {name:'新增用户2'},
              {name:'活跃用户'},
            ]},
          ]},
          {icon:'clipboard', name:'表格示例'},
          {icon:'gear-a', name:'UI示例'},
        ],
        navCurrent:0,

        menu:[],
        pageTab:[],
        tabCurrent:0
      }
    },
    computed: {

    },
    methods: {
      navChange(index) {
        this.navCurrent = index
        this.menu = this.nav[index].menu
      },
      openPage(name) {
        let keys = name.split('-')
        let page = this.menu[keys[0]].sub[keys[1]]
        if(this.pageTab.includes(page)) {
          this.tabCurrent = this.pageTab.indexOf(page)
        } else {
          this.pageTab.push(page)
          this.tabCurrent = this.pageTab.lastIndexOf(page)
        }
      }
    },
    beforeMount() {
      this.menu = this.nav[this.navCurrent].menu
    }
  }
</script>