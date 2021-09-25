import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

//$bus 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,store
}).$mount('#app')
