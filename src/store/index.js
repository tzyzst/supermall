import Vue from 'vue';
import Vuex from 'vuex';

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    // mutations唯一的目的就是修改state中的状态
    // 其中每个方法尽可能完成的事件比较单一一点
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true;
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      // payload新添加的商品
      // 法1
      // let oldProduct = null;
      // for(let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      // 法2
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      // 判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
      }
      
    }
  }
})

// 3.挂载Vue实例上
export default store