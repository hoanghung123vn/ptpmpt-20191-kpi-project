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
import Reports from '../views/Reports.vue'
import ReportDetail from '../components/report/ReportDetail'
import AddReport from '../components/report/AddReport'
import EditReport from '../components/report/EditReport'
import ReportFields from '../views/ReportFields'

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
    path: '/set-group-permission',
    name: 'set-group-permission',
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
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  },
  {
    path: '/report-detail/:id',
    name: 'report-detail',
    component: ReportDetail
  },
  {
    path: '/add-report',
    name: 'add-report',
    component: AddReport
  },
  {
    path: '/edit-report/:id',
    name: 'edit-report',
    component: EditReport
  },
  {
    path: '/report-fields',
    name: 'report-fields',
    component: ReportFields
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
