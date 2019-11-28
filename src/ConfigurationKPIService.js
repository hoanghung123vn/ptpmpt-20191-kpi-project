import axios from "axios";

const apiKPIDepartmentURL = "http://206.189.34.124:5000/api/group8/kpis?department_id="; // nhóm 8 quản lí
const apiKPIProjectURL = "http://206.189.34.124:5000/api/group8/kpis?project_id="; // nhóm 8 quản lí
//const apiKPIPositionsDepartment = "http://206.189.34.124:5000/api/group8/kpis?";

const apigetListProjectURL = "http://3.1.20.54/v1/projects"; // nhóm 6 quản lí
const apigetlistDepartmentURL = "http://206.189.34.124:5000/api/group8/departments"; // nhóm 8 quản lí

const apiupdateallKPI = "https://dsd05-dot-my-test-project-252009.appspot.com/configKPI/configKPIDepartment"; // nhóm 5 quản lí
const apigetallemployeeindepartment = "http://206.189.34.124:5000/api/group8/departments/"; // nhóm 8 quản lí

const fixapikpipositons = "http://206.189.34.124:5000/api/group8/kpis?department_id=1&employee_id=5dc42a0dc6b2090017e89d4f"; // nhóm 8 quản lí
export default class ConfigurationKPIService {
  getKPIDepartmentById(departmentId) {
    return axios.get(`${apiKPIDepartmentURL}${departmentId}`);
  }
  getKPIProjectById(projectId) {
    return axios.get(`${apiKPIProjectURL}${projectId}`);
  }
  getKPIPositionsInDepartment() {
    return axios.get(`${fixapikpipositons}`);
  }
  getlistProject() {
    return axios.get(`${apigetListProjectURL}`);
  }
  getlistDepartment() {
    return axios.get(`${apigetlistDepartmentURL}`);
  }
  getlistEmployeeByDepartmentID(department_id) {
    return axios.get(`${apigetallemployeeindepartment}${department_id}`);
  }
  updateAllKPI(criterias, id) {
    // console.log(criterias);
    return axios({
      method: "POST",
      url: `${apiupdateallKPI}`,
      data: {
        criterias,
        id
      }
    });
  }
}
