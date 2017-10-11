<template>
<div>
    <nav class="nav">
        <div class="nav-header">

        </div>
        <div class="nav-container">
            <ul class="nav-left">
                <li class="active">
                    <a href="#">
                        <Icon type="folder"></Icon>
                        <span>UI示例</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Icon type="locked"></Icon>
                        <span>页面示例</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Icon type="clipboard"></Icon>
                        <span>表格示例</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Icon type="gear-a"></Icon>
                        <span>UI示例</span>
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
        <Menu theme="dark" width="220px">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    内容管理
                </template>
                <MenuItem name="1-1">文章管理</MenuItem>
                <MenuItem name="1-2">评论管理</MenuItem>
                <MenuItem name="1-3">举报管理</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people"></Icon>
                    用户管理
                </template>
                <MenuItem name="2-1">新增用户</MenuItem>
                <MenuItem name="2-2">活跃用户</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
    </nav>


    <nav class="page-tab">
        <Tabs type="card" closable :animated="false">
            <TabPane label="标签一">标签一的内容</TabPane>
            <TabPane label="标签二">标签二的内容</TabPane>
            <TabPane label="标签三">标签三的内容</TabPane>
        </Tabs>
    </nav>
</div>
</template>
