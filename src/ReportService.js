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

  addReport(user_id, user_name, project_id, project_type, listDetail, report_name) {
    return axios({
      method: "POST",
      url: `${apiBaseURL}/template/postTemplate`,
      data: {
        user_name,
        project_type,
        user_id,
        project_id,
        listDetail,
        report_name
      }
    });
  }

  getFieldsByProjectType(type) {
    return axios({
      method: "GET",
      url: `${apiBaseURL}/report/getByProjectType/${type}`
    })
  }

  editReport(id, user_id, user_name, project_id, project_type, listDetail, report_name) {
    return axios({
      method: "PUT",
      url: `${apiBaseURL}/template/updateTemplate/${id}`,
      data: {
        user_name,
        project_type,
        user_id,
        project_id,
        listDetail,
        report_name
      }
    });
  }

  delete(id) {
    return axios({
      method: "DELETE",
      url: `${apiBaseURL}/template/deleteTemplate/${id}`
    });
  }

  addField(field_name, type, project_type, importance, level) {
    return axios({
      method: "POST",
      url: `${apiBaseURL}/report/postField`,
      data: {
        field_name, type, project_type, importance, level
      }
    })
  }

  editField(id, field) {
    return axios({
      method: "PUT",
      url: `${apiBaseURL}/report/updateField/${id}`,
      data: {
        field_name: field.field_name,
        type: field.type,
        project_type: field.project_type,
        importance: field.importance,
        level: field.level
      }
    })
  }
}
