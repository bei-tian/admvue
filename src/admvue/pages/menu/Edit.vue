<template>
    <Form ref="formCustom" :label-width="80">
        <FormItem label="图标&名称：">
            <Input v-model="initData.name">
            <Poptip slot="prepend" placement="bottom" ref="poptip">
                <div class="menu-icon">
                    <Icon :type="icon"></Icon>
                </div>

                <div slot="content" ref="icons">
                    <Icons @on-selected="iconChange"></Icons>
                </div>
            </Poptip>
            </Input>
        </FormItem>
        <FormItem label="链接：">
            <Input v-model="initData.url"> </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">提交</Button>

        </FormItem>
    </Form>
</template>
<script>
    import {menuSave} from '../../api/index'
    import Icons from './Icons.vue'
    export default {
        props: ['editData'],
        data() {
            return {
                icon: this.editData.icon
            }
        },
        computed: {
            initData: function () {
                return {
                    id: this.editData.id,
                    parent_id: this.editData.parent_id,
                    icon: this.icon,
                    name: this.editData.name,
                    url: this.editData.url,
                }
            }
        },
        methods: {
            handleSubmit() {
                menuSave(this.initData, data => {
                    this.$parent.$parent.getMenu()
                })
            },
            iconChange(type) {
                this.icon = type
                this.$refs.poptip.visible = false
            }
        },
        watch: {
            editData: function (newVal) {
                this.icon = newVal.icon
            }
        },

        components: {
            Icons
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
        width: 320px;
        height: 300px;
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