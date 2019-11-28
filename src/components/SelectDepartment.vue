<template>
  <div>
    <v-overflow-btn
      :items="nameDepartment"
      label="Chọn phòng ban"
      target="#dropdown-example"
      outlined
      background-color="blue lighten-3"
    ></v-overflow-btn>
  </div>
</template>

<script>
import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

export default {
  name: "SelectProject",
  data() {
    return {
      nameDepartment: [],
      listDepartment: []
    };
  },

  async created() {
    var response = await configurationKPIService.getlistDepartment();
    this.listDepartment = response.data.departments;
    for (var i = 0; i < this.listDepartment.length; i++) {
      this.nameDepartment.push(this.listDepartment[i].department_name);
    }
  }
};
</script>
