<template>
  <div>
    <v-overflow-btn
      :items="namePositions"
      label="Chọn chức vụ"
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
  name: "SelectPositions",
  data() {
    return {
      namePositions: [],
      listPositions: []
    };
  },

  async created() {
    var response = await configurationKPIService.getlistEmployeeByDepartmentID(
      1
    );
    this.listPositions = response.data.department.positions;
    for (var i = 0; i < this.listPositions.length; i++) {
      this.namePositions.push(this.listPositions[i].name);
    }
  }
};
</script>
