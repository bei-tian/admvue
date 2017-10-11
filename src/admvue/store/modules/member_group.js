import Api from '../../utils/Api'
export default {
    state: {
        index:{},
        indexApi:'member_group/index',
        edit:{},
        privilege:{}
    },
    mutations: {
        receivePrivilege(state,data) {
            state.privilege = data;
        }
    },
    actions: {
        getPrivilege(context,id) {
            Api.get('member_group/privilege', {id:id}, (data) => {
                context.commit('receivePrivilege', data);
            });
        }
    }
}