import axios from "axios";

const apiBaseURL = "http://18.217.21.235:8083/api/v1/";
const apiGroup5 = "https://dsd05-dot-my-test-project-252009.appspot.com/";

export default class DepartmentService {
  getAllDepartment() {
    return axios(`${apiBaseURL}/organizationalStructure/listOrganization`);
  }

  getAllDepartmentLevel() {
    return axios(`${apiBaseURL}/organizationalStructure/listOrganizationLevel`);
  }

  getDepartmentById(departmentId) {
    return axios.get(`${apiBaseURL}/${departmentId}`)
  }

  createDepartment(code, description, levelId, levelName, name) {
    return axios({
      method: "post",
      data: {
        organizationCode: code,
        organizationName: name,
        organizationDescription: description,
        organizationLevelId: levelId,
        organizationLevelName: levelName
      },
      url: `${apiBaseURL}/organizationalStructure/create`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  updateDepartment(code, description, levelId, levelName, name) {
    return axios({
      method: "post",
      data: {
        organizationCode: code,
        organizationName: name,
        organizationDescription: description,
        organizationLevelId: levelId,
        organizationLevelName: levelName
      },
      url: `${apiBaseURL}/organizationalStructure/update`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }


  deleteDepartment(id) {
    return axios.post(`${apiBaseURL}/organizationalStructure/delete?id=${id}`)
  }

  criteriasDepartment(id) {
    return axios.get(`http://206.189.34.124:5000/api/group8/kpis?department_id=${id}`)
  }

  positionDepartment(id) {
    return axios.get(`${apiBaseURL}/position/findByOrganization?organizationId=${id}`)
  }

  positionRole(positionId) {
    return axios.get(`${apiGroup5}/permission/getGroupPermissions?groupId=${positionId}`)
  }
}
