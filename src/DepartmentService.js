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

  updateDepartment(id,code, description, levelId, levelName, name) {
    return axios({
      method: "post",
      data: {
        id: id,
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

  getDepartmentDetail(id)
  {
    return axios.get(`${apiBaseURL}/organizationalStructure/detailOrganization?organizationId=${id}`)
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

  positionRole(listGroup) {
    return axios({
      method: "get",
      params: {
        listGroupId: listGroup
      },
      url: `https://dsd05-dot-my-test-project-252009.appspot.com/permission/getMultiGroupPermissions`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  findByLevelId(levelId)
  {
    return axios.get(`${apiBaseURL}/organizationalStructure/findByLevel?levelId=${levelId}`)
  }

  findByname(name)
  {
    return axios.get(`${apiBaseURL}/organizationalStructure/findByNameContaining?name=${name}`)
  }

  deleteDepartmentLevel(id)
  {
    return axios.post(`${apiBaseURL}/organizationalStructure/deleteOrganizationLevel?levelId=${id}`)
  }

  createLevelDepartment(levelName, levelDescription)
  {
    return axios({
      method: "post",
      data: {
        levelDescription: levelDescription,
        levelName: levelName
      },
      url: `${apiBaseURL}/organizationalStructure/createOrganizationLevel`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  updateLevelDepartment(id, levelName, levelDescription)
  {
    return axios({
      method: "post",
      data: {
        id: id,
        levelDescription: levelDescription,
        levelName: levelName
      },
      url: `${apiBaseURL}/organizationalStructure/updateOrganizationLevel`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getDepartmentPermission(id)
  {
    return axios(`${apiGroup5}/permission/getDepartmentPermissions?departmentId=${id}`);
  }

  createPosition(name, departmentId, levelId)
  {
    return axios({
      method: "post",
      data: {
        positionName: name,
        levelId: levelId,
        organizationId: departmentId
      },
      url: `${apiBaseURL}/position/create`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getKpi(from, to, id, )
  {
    return axios({
      method: "get",
      params: {
        startTime: from,
        endTime: to,
        departmentId: id
      },
      url: `http://18.217.21.235:8083/api/v1/departmentKPI/getDepartmentKPI`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getKpiYear(year, id)
  {
    return axios({
      method: "get",
      params: {
        year: year,
        departmentId: id
      },
      url: `http://18.217.21.235:8083/api/v1/departmentKPI/getDepartmentKPIByYear`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getKpiQuarter(quarter,year, id)
  {
    return axios({
      method: "get",
      params: {
        quarter: quarter,
        year: year,
        departmentId: id
      },
      url: `http://18.217.21.235:8083/api/v1/departmentKPI/getDepartmentKPIByQuarter`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  deletePosition(id)
  {
    return axios.post(`${apiBaseURL}/position/delete?positionId=${id}`)
  }

  getLog()
  {
    return axios.get(`${apiBaseURL}/logOrganization/allList`)
  }

  getAllModule()
  {
    return axios(`${apiGroup5}/permission/getAllModules`);
  }

  getDepartmentModule(id)
  {
    return axios(`${apiGroup5}/permission/getDepartmentModules?departmentId=${id}`);
    
  }

  addDepartmentModule(moduleId, departmentId)
  {
    return axios({
      method: "post",
      data: {
        moduleId: moduleId,
        departmentId: departmentId
      },
      url: `${apiGroup5}/permission/addModuleDepartment`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  deleteDepartmentModule(moduleId, departmentId)
  {
    return axios({
      method: "post",
      data: {
        moduleId: moduleId,
        departmentId: departmentId
      },
      url: `${apiGroup5}/permission/removeModuleDepartment`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  addRolePermission(permissionId, roleId)
  {
    return axios({
      method: "post",
      data: {
        permissionId: permissionId,
        groupId: roleId
      },
      url: `${apiGroup5}/permission/addGroupPermission`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  deleteRolePermission(permissionId, roleId)
  {
    return axios({
      method: "post",
      data: {
        permisisonId: permissionId,
        groupId: roleId
      },
      url: `${apiGroup5}/permission/removeGroupPermission`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

}
