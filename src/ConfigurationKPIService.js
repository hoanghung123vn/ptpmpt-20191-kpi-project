import axios from "axios";

const apiKPIDepartmentURL = "http://206.189.34.124:5000/api/group8/kpis?department_id="; // nhóm 8 quản lí
const apiKPIProjectURL = "http://206.189.34.124:5000/api/group8/kpis?project_id="; // nhóm 8 quản lí
const apiKPIPositionsDepartment = "http://206.189.34.124:5000/api/group8/kpis?";

const apigetListProjectURL = "http://3.1.20.54/v1/projects"; // nhóm 6 quản lí
const apigetlistDepartmentURL = "http://206.189.34.124:5000/api/group8/departments"; // nhóm 8 quản lí

const apiupdateallDepartmentKPI = "https://dsd05-dot-my-test-project-252009.appspot.com/configKPI/configKPIDepartment"; // nhóm 5 quản lí
const apiupdateallProjectKPI = "https://dsd05-dot-my-test-project-252009.appspot.com/configKPI/configKPIProject"; // nhóm 5 quản lí
const apiupdateallPositionsKPI = "https://dsd05-dot-my-test-project-252009.appspot.com/configKPI/configKPIJobPosition"; // nhóm 5 quản lí

const apigetallemployeeindepartment = "http://206.189.34.124:5000/api/group8/departments/"; // nhóm 8 quản lí

//const fixapikpipositons = "http://206.189.34.124:5000/api/group8/kpis?department_id=1&employee_id=5dc42a0dc6b2090017e89d4f"; // nhóm 8 quản lí

//const apigetUserURL = "https://api-ptpmpt-18.herokuapp.com/api/user/getUsers"; // nhóm 18 quản lí

export default class ConfigurationKPIService {
  getKPIDepartmentById(departmentId) {
    return axios.get(`${apiKPIDepartmentURL}${departmentId}`);
  }
  getKPIProjectById(projectId) {
    return axios.get(`${apiKPIProjectURL}${projectId}`);
  }
  getKPIPositionsInDepartment(id1, id2) {
    return axios.get(`${apiKPIPositionsDepartment+"department_id="+id1 + "&employee_id=" + id2}`);
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
  updateAllKPIDepartment(criterias, id) {
    return axios({
      method: "POST",
      url: `${apiupdateallDepartmentKPI}`,
      data: {
        criterias,
        id
      }
    });
  }
  postKPIProject(criterias,project_id) {
    return axios({
    method: "POST",
    url: `${apiKPIProjectURL}${project_id}`,
    data: {
      department_id: null,
      type: "PROJECT",
      employee_id: null,
      criterias,
      project_id
      }
    });
  }
  postKPIDepartment(criterias,department_Id) {
    return axios({
    method: "POST",
    url: `${apiKPIDepartmentURL}${department_Id}`,
    data: {
      department_Id,
      type: "DEPARTMENT",
      employee_id: null,
      criterias,
      project_id: null
      }
    });
  }
  updateAllKPIProject(criterias, id) {
    return axios({
      method: "POST",
      url: `${apiupdateallProjectKPI}`,
      data: {
        criterias,
        id
      }
    });
  }
  updateallPositionsKPI(criterias, id) {
    return axios({
      method: "POST",
      url: `${apiupdateallPositionsKPI}`,
      data: {
        criterias,
        id
      }
    });
  }
}
