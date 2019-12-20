import axios from "axios";

const apiBaseURL = "https://dsd05-dot-my-test-project-252009.appspot.com";
// const apiBaseURL = "http://quang-dot-my-test-project-252009.appspot.com";
const apiBaseURLUser = "https://api-ptpmpt-18.herokuapp.com/api";

export default class UserService {
  getAllUser() {
    const token = localStorage.getItem("auth");
    return axios({
      method: "get",
      url: `${apiBaseURL}/user/getUserInfos`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    });
  }

  getAllUserByDepartment(departmentId) {
    return axios.get(`${apiBaseURL}/${departmentId}`)
  }

  signIn(username, password) {
    return axios({
      method: "post",
      data: {
        username: username,
        password: password
      },
      url: `${apiBaseURLUser}/auth/login`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  deleteUser(id) {
    return axios({
      method: "post",
      data: {
        id
      },
      url: `${apiBaseURL}/user/removeUserInfo`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  updateUser(user) {
    return axios({
      method: "post",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        statusId: user.statusId,
        birthday: user.birthday,
        lastUpdate: user.lastUpdate
      },
      url: `${apiBaseURL}/user/editUserInfo`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  addUser(user) {
    return axios({
      method: "post",
      data: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        gender: user.gender,
        birthday: new Date(user.birthday).getTime()
      },
      url: `${apiBaseURL}/user/addUserInfo`,
      // headers: {
      //   "Content-Type": "application/json"
      // }
    });
  }
}
