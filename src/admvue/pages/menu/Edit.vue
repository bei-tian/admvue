<template>
    <Form ref="formCustom"  :label-width="80">
        <FormItem label="图标&名称：">
            <Input v-model="name">
            <Poptip slot="prepend" placement="bottom" ref="poptip">
                <div style="cursor: pointer;"><Icon :type="icon"></Icon></div>

                <div slot="content" ref="icons">
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
  import { addMenu } from '../../api/index'
  export default {
    data() {
      return {
        icon:'navicon-round',
        name:''
      }
    },
    methods: {
      handleSubmit() {
        addMenu({name:123},data => {

        })
      }
    },
    mounted() {
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
        font-size: 14px;
        color: inherit;
        text-align: center;
        cursor: pointer;
        border-radius: 2px;
        -webkit-box-shadow: 0 0 0 1px #e4eaec;
        box-shadow: 0 0 0 1px #e4eaec;
    }
</style>