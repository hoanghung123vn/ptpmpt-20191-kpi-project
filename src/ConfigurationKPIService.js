import axios from "axios";

const apiKPIDepartmentURL = "http://206.189.34.124:5000/api/group8/kpis?department_id=";
const apiKPIProjectURL = "http://206.189.34.124:5000/api/group8/kpis?project_id=";

export default class ConfigurationKPIService {
    getKPIDepartmentById(departmentId) {
        return axios.get(`${apiKPIDepartmentURL}${departmentId}`);
      }
    getKPIProjectById(projectId) {
        return axios.get(`${apiKPIProjectURL}${projectId}`);
      }
}
