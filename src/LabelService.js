import axios from "axios";

const apiBaseURL = "https://falling-frog-38743.pktriot.net/api/labels";

export default class LabelService {
  getLabels(offset, limit, name, color) {
    return axios({
      method: "POST",
      url: `${apiBaseURL}/search`,
      params: {
        offset,
        limit
      },
      data: {
        name,
        color
      }
    });
  }

  addLabel(name, color) {
    return axios({
      method: "POST",
      url: `${apiBaseURL}`,
      data: {
        name,
        color
      }
    });
  }

  updateLabel(id, name, color) {
    return axios({
      method: "PUT",
      url: `${apiBaseURL}/${id}`,
      data: {
        name,
        color
      }
    });
  }

  getLabel(id) {
    return axios({
      method: "GET",
      url: `${apiBaseURL}/${id}`
    });
  }

  delete(id) {
    return axios({
      method: "DELETE",
      url: `${apiBaseURL}/${id}`
    });
  }
}
