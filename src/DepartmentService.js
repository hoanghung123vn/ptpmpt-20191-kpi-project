import axios from "axios";

const apiBaseURL = "http://18.217.21.235:8083/api/v1/";
//const apiGroup5 = "https://dsd05-dot-my-test-project-252009.appspot.com/";
const apiGroup5 = "https://quang-dot-my-test-project-252009.appspot.com/";
//var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVkZWI0ZDlhMjNiYzUyMDAxNzgzNzI3YiIsInVzZXJJZCI6IjQ2MTQ3MTgyMTU5NDYyNDAiLCJ1c2VybmFtZSI6ImhvYW5nbGhAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkRXpZLlQwcDZMby5RYVZCNjZPSWdlZWdOYno5eDZqTktYcERtOHVDSDJNOVoxa2F5SDNrZFMiLCJuYW1lIjoiTMOqIEh1eSBIb8OgbmciLCJwaG9uZU51bWJlciI6IjA5ODEzNjY2MSIsIl9fdiI6MH0sImlhdCI6MTU3NjE0ODYwNywiZXhwIjoxNTc4NzQwNjA3fQ.PON0GQHMyvgIryCNgUEpLiRJ_r_An-W44Tdbz28yt_s"

export default class DepartmentService {
  authToken= "";

  getAllDepartment() {
    return axios(`${apiBaseURL}/organizationalStructure/listOrganization`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  getAllDepartmentLevel() {
    return axios(`${apiBaseURL}/organizationalStructure/listOrganizationLevel`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  getDepartmentById(departmentId) {
    return axios.get(`${apiBaseURL}/${departmentId}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  getDepartmentDetail(id)
  {
    return axios.get(`${apiBaseURL}/organizationalStructure/detailOrganization?organizationId=${id}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  deleteDepartment(id) {
    return axios.post(`${apiBaseURL}/organizationalStructure/delete?id=${id}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  criteriasDepartment(id) {
    return axios.get(`http://206.189.34.124:5000/api/group8/kpis?department_id=${id}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  positionDepartment(id) {
    return axios.get(`${apiBaseURL}/position/findByOrganization?organizationId=${id}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  positionRole(listGroup) {
    return axios({
      method: "get",
      params: {
        listGroupId: listGroup
      },
      //url: `https://dsd05-dot-my-test-project-252009.appspot.com/permission/getMultiGroupPermissions`,
      url:`${apiGroup5}/permission/getMultiGroupPermissions`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  findByLevelId(levelId)
  {
    return axios.get(`${apiBaseURL}/organizationalStructure/findByLevel?levelId=${levelId}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  findByname(name)
  {
    return axios.get(`${apiBaseURL}/organizationalStructure/findByNameContaining?name=${name}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  deleteDepartmentLevel(id)
  {
    return axios.post(`${apiBaseURL}/organizationalStructure/deleteOrganizationLevel?levelId=${id}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  getDepartmentPermission(id)
  {
    return axios(`${apiGroup5}/permission/getDepartmentPermissions?departmentId=${id}`,
    {
      headers:
      {
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
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
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  deletePosition(id)
  {
    return axios.post(`${apiBaseURL}/position/delete?positionId=${id}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  getLog()
  {
    return axios.get(`${apiBaseURL}/logOrganization/allList`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

  getAllModule()
  {
    return axios(`${apiGroup5}/permission/getAllModules`,
    {
      headers:
      {
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  getDepartmentModule(id)
  {
    return axios(`${apiGroup5}/permission/getDepartmentModules?departmentId=${id}`,
    {
      headers:
      {
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
    
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  deleteRolePermission(id, roleId)
  {
   
    return axios({
      method: "post",
      data: {
        permissionId: id,
        groupId: roleId
      },
      url: `${apiGroup5}/permission/removeGroupPermission`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    }).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    });
  }

  getDetailPosition(id)
  {
    return axios.get(`${apiBaseURL}/position/detailPosition?positionId=${id}`).catch(function (error)
    {
      if(error.response)
      {
        alert("Đã xảy ra lỗi kết nối tới server");
      }
    })
  }

}
