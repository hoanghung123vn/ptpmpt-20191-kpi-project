import axios from "axios";

const apiBaseURL = " http://dsd10-kong.herokuapp.com";

export default class ReportService {
  getReports() {
    return axios({
      method: "GET",
      url: `${apiBaseURL}/template`,
    });
  }

  getReportById(id) {
    return axios({
      method: "GET",
      url: `${apiBaseURL}/template/getByReportId/${id}`
    })
  }

  addReport(user_id, user_name, project_id, project_type, listDetail) {
    return axios({
      method: "POST",
      url: `${apiBaseURL}/template/postTemplate`,
      data: {
        user_name,
        project_type,
        user_id,
        project_id,
        listDetail
      }
    });
  }

  getFieldsByProjectType(type) {
    return axios({
      method: "GET",
      url: `${apiBaseURL}/report/getByProjectType/${type}`
    })
  }

  editReport(id, user_id, user_name, project_id, project_type, listDetail) {
    return axios({
      method: "PUT",
      url: `${apiBaseURL}/template/updateTemplate/${id}`,
      data: {
        user_name,
        project_type,
        user_id,
        project_id,
        listDetail
      }
    });
  }

  delete(id) {
    return axios({
      method: "DELETE",
      url: `${apiBaseURL}/template/deleteTemplate/${id}`
    });
  }
}
