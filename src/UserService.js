import axios from "axios";

const apiBaseURL = "https://dsd05-dot-my-test-project-252009.appspot.com";

export default class UserService {
  getAllUser() {
    return axios(`${apiBaseURL}/user/getUserInfos`);
  }

  getAllUserByDepartment(departmentId) {
    return axios.get(`${apiBaseURL}/${departmentId}`)
  }
}
