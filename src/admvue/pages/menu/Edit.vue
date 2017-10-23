<template>
    <Form ref="formCustom"  :label-width="80">
        <FormItem label="图标&名称：">
            <Input v-model="initData.name">
            <Poptip slot="prepend" placement="bottom" ref="poptip">
                <div class="menu-icon"><Icon :type="icon"></Icon></div>

                <div slot="content" ref="icons">
                    <Icon type="null"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="plus-circled"></Icon>
                    <Icon type="ionic"></Icon>
                    <Icon type="navicon-round"></Icon>
                    <Icon type="chevron-left"></Icon>
                    <Icon type="drag"></Icon>
                    <Icon type="log-in"></Icon>
                    <Icon type="log-out"></Icon>
                    <Icon type="checkmark-round"></Icon>
                    <Icon type="close"></Icon>
                    <Icon type="plus-round"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="minus"></Icon>
                    <Icon type="help"></Icon>
                    <Icon type="backspace"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="plus-circled"></Icon>
                    <Icon type="ionic"></Icon>
                    <Icon type="navicon-round"></Icon>
                    <Icon type="chevron-left"></Icon>
                    <Icon type="drag"></Icon>
                    <Icon type="log-in"></Icon>
                    <Icon type="log-out"></Icon>
                    <Icon type="checkmark-round"></Icon>
                    <Icon type="close"></Icon>
                    <Icon type="plus-round"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="minus"></Icon>
                    <Icon type="help"></Icon>
                    <Icon type="backspace"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="plus-circled"></Icon>
                    <Icon type="ionic"></Icon>
                    <Icon type="navicon-round"></Icon>
                    <Icon type="chevron-left"></Icon>
                    <Icon type="drag"></Icon>
                    <Icon type="log-in"></Icon>
                    <Icon type="log-out"></Icon>
                    <Icon type="checkmark-round"></Icon>
                    <Icon type="close"></Icon>
                    <Icon type="plus-round"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="minus"></Icon>
                    <Icon type="help"></Icon>
                    <Icon type="backspace"></Icon>
                    <Icon type="navicon-round"></Icon>
                    <Icon type="chevron-left"></Icon>
                    <Icon type="drag"></Icon>
                    <Icon type="log-in"></Icon>
                    <Icon type="log-out"></Icon>
                    <Icon type="checkmark-round"></Icon>
                    <Icon type="close"></Icon>
                    <Icon type="plus-round"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="minus"></Icon>
                    <Icon type="help"></Icon>
                    <Icon type="backspace"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="plus-circled"></Icon>
                    <Icon type="ionic"></Icon>
                    <Icon type="navicon-round"></Icon>
                    <Icon type="chevron-left"></Icon>
                    <Icon type="drag"></Icon>
                    <Icon type="log-in"></Icon>
                    <Icon type="log-out"></Icon>
                    <Icon type="checkmark-round"></Icon>
                    <Icon type="close"></Icon>
                    <Icon type="plus-round"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="minus"></Icon>
                    <Icon type="help"></Icon>
                    <Icon type="backspace"></Icon>
                </div>
            </Poptip>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">提交</Button>

        </FormItem>
    </Form>
</template>
<script>
  import { editMenu } from '../../api/index'
  export default {
    props:['editData'],
    data() {
      return {
        icon:this.editData.icon
      }
    },
    computed: {
      initData: function() {
        return {
          id: this.editData.id,
          parent_id: this.editData.parent_id,
          icon: this.icon,
          name: this.editData.name,
        }
      }
    },
    methods: {
      handleSubmit() {
        editMenu(this.initData,data => {
          this.$parent.$parent.getMenu()
        })
      }
    },
    watch: {
      editData: function (newVal) {
        this.icon = newVal.icon
      }
    },
    mounted() {
      //添加图标点击事件
      let icons = this.$refs.icons.childNodes;
      for (let i=0;i<icons.length;i++){
        if (icons[i].tagName === 'I') {
          icons[i].addEventListener('click', (e)=> {
            this.icon = e.target.className.substring(18)
            this.$refs.poptip.visible = false
          })
        }
      }
    }
  }
</script>

<style>
    .ivu-input-group-prepend {
        color: #76838f;
        background-color: transparent;
        width: 35px;
        border-radius: 4px
    }
    .ivu-poptip-body {
        width:320px;
        height:300px;
        overflow-y: auto;
    }
    .ivu-poptip-body i {
        display: block;
        float: left;
        padding: 8px;
        margin: 4px;
        width: 30px;
        height: 30px;
        font-size: 14px;
        color: inherit;
        text-align: center;
        cursor: pointer;
        border-radius: 2px;
        -webkit-box-shadow: 0 0 0 1px #e4eaec;
        box-shadow: 0 0 0 1px #e4eaec;
    }
    .menu-icon {
        cursor: pointer;
        width: 20px;
    }
</style>