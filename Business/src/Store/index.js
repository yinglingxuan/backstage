import Vue from 'vue'     /*导入安装好自带的组件*/
import Vuex from 'vuex'
import axios from 'axios'
// 启用/安装vuex -> Vuex.install
Vue.use(Vuex);
const store = new Vuex.Store({
  state: { // 共享数据
    datas:[],  //数据为count 0
    UserDate:{}
  },
  getters:{
    datas(state){
      return state.datas;
    },
    UserDate(state){
      return state.UserDate;
    }
  },
  mutations: { // 行为/数据状态[不能异步]
  },
  actions: {// 动作

  }
});

export default store;
