import axios from "axios";

const apiBaseURL = "https://dsd05-dot-my-test-project-252009.appspot.com";
const apiBaseURLUser = "https://api-ptpmpt-18.herokuapp.com/api";

export default class UserService {
  getAllUser() {
    return axios(`${apiBaseURL}/user/getUserInfos`);
  }

  getAllUserByDepartment(departmentId) {
    return axios.get(`${apiBaseURL}/${departmentId}`)
  }

  signIn(username, password) {
    return axios.post(`${apiBaseURLUser}/auth/login`, {
      data: {
        username: username,
        password: password
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
