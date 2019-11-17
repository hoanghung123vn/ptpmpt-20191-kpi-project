import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Department from '../views/Department.vue'
import SetGroupUser from '../views/SetGroupUser.vue'
import SetGroupPermission from '../views/SetGroupPermission.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/department',
    name: 'department',
    component: Department
  },
  // {

  //   path: '/set-group-permission',
  //   name: 'set-group-permission',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: SetGroupPermission
  // },
  {
    path: '/configuration',
    nam: 'configuration',
    component: () => import(/* webpackChunkName: "about" */ '../views/Configuration.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/set-group-user',
    name: 'set-group-user',
    component: SetGroupUser
  },
  {
    path: '/set-group-permission/:groupId',
    name: 'set-group-permission-by-id',
    component: SetGroupPermission
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
