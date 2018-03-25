import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);			//vuex初始化

let userStore = new Vuex.Store({
  state:{			//存储空间
    loginbean:null
  },
  mutations:{			//事件响应，修改存储的方法集
    changeLoginbean:function(state,data){
      this.state.loginbean = data;
      // alert('store中收到参数:' + JSON.stringify(data));
    }
    
  }
});
export default userStore;