import axios from "axios";

const apiBaseURL = "http://3.1.20.54";

export default class ReportService {
 
  getProjectTypes() {
    return axios({
      method: "GET",
      url: `${apiBaseURL}/v1/project_types`,
    });
  }

  getProjectsByType(type) {
    return axios({
      method: "GET",
      url: `${apiBaseURL}/v1/projects`,
      params: {
        project_type: type
      }
    })
  }
}
