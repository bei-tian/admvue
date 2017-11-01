import MyPage from '../components/MyPage.vue';
export default {
    props: ['api'],
    data () {
        return {
            modalShow: false,
            currentPage:1,
            total:0,
            operate: [
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        let buttons = [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params)
                                    }
                                }
                            }, '删除')
                        ];
    
                        if(this.operateAdd) {
                            let added = this.operateAdd(h,params);
                            buttons = buttons.concat(added);
                        }
                        
                        return h('div', buttons);
                    }
                }
            ]
        }
    },
    computed: {
    
    },
    methods: {
        page(page){
            this.currentPage = page
            this.getList()
        },
        edit(params) {
            this.modalShow = true
        },
        remove(params) {
            if (!confirm('确定要删除该数据吗')) {
                return false;
            }
            this.del(params.row.id)
        }
    },
    
    mounted() {
    
    },
    
    components: {
        MyPage
    }
}