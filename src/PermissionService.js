import axios from 'axios';

const apiBaseUrl = "https://pmptn13.herokuapp.com";

export default class PermissionService {
  getRoles() {
    return axios({
      method: "GET",
      url: `${apiBaseUrl}/roles`
    })
  }

  deleteRole(id) {
    return axios({
      method: "DELETE",
      url: `${apiBaseUrl}/roles/${id}`
    })
  }

  createRole(name, abstract) {
    return axios({
      method: "POST",
      url: `${apiBaseUrl}/roles`,
      data: {
        name,
        abstract
      }
    })
  }
}
