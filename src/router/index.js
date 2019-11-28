import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Department from '../views/Department.vue'
import SetGroupUser from '../views/SetGroupUser.vue'
import SetGroupPermission from '../views/SetGroupPermission.vue'
import TaskLabelManagement from '../views/TaskLabelManagement.vue'
import ConfigurationKPIDepartment from '../views/ConfigurationKPIDepartment.vue'
import ConfigurationKPIProject from '../views/ConfigurationKPIProject.vue'
import ConfigurationKPIPositionInDepartment from '../views/ConfiguartionKPIPositionsDepartment.vue'

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
  {
    path: '/configdepartment',
    name: 'configdepartment',
    component: ConfigurationKPIDepartment
  },
  {
    path: '/configproject',
    name: 'configproject',
    component: ConfigurationKPIProject
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
  },
  {
    path: '/task-label-management',
    name: 'task-label-management',
    component: TaskLabelManagement
  },
  {
    path: '/configpositionindepartment',
    name: 'configpositionindepartment',
    component: ConfigurationKPIPositionInDepartment
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
