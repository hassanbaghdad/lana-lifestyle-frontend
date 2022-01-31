import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/components/admin/Login";
import Dashboard from "@/components/admin/Dashboard";
import Products from "@/components/admin/Products/Products";
import ViewProduct from "@/components/visitor/ViewProduct";
import VistorsProducts from "@/components/visitor/Products"
import AboutUs from "@/components/visitor/AboutUs";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/products2',
    name: 'Products',
    component: Products
  },
  {
    path: '/product/*',
    name: 'ViewProduct',
    component: ViewProduct
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs
  },

  {
    path: '/products',
    name: 'VistorsProducts',
    component: VistorsProducts
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
