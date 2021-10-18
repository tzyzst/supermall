import Vue from "vue";
import VueRouter from "vue-router";

// 懒加载
const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
    {
      // 重定向
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/category',
      component: Category,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    }
]
const router = new VueRouter({
  routes,
  mode: "history"
})

export default router