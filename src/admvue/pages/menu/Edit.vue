<template>
    <Form ref="formCustom"  :label-width="80">
        <FormItem label="图标&名称：">
            <Input v-model="name">
            <Poptip slot="prepend" placement="bottom-start">
                <Button icon="ios-search"></Button>
                <div slot="content">
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <br>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <br>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>
                    <Icon type="arrow-up-a"></Icon>

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

  export default {
    data() {
      return {
        name:''
      }
    },
    methods: {
      handleSubmit() {
        addMenu(this.name,data => {

        })
      }
    }
  }
</script>