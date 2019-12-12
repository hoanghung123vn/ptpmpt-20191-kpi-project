<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded @click="updateAllKPIProject">Cập nhật</v-btn>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

import bus from "../bus";
export default {
  name: "UpdateAllKPIProject",
  data() {
    return {
      dialogupdate: false
    };
  },
  props: {
    dataKPI: Array
  },
  methods: {
    async updateAllKPIProject() {
      try {
        const response = await configurationKPIService.updateAllKPIProject(
          this.dataKPI.criterias,
          this.dataKPI.id
        );
        //console.log( this.dataKPI.criterias);
        //console.log(response.data.message);
        //console.log(this.dataKPI.id);
        if (response.data.message == "Cấu hình tiêu chí thành công") {
          bus.$emit("updateAllKPIProject", this.dataKPI);
          this.dialogupdate = false;
          this.$swal("Great!", "Cập nhật thành công", "success");
        } else {
          // console.log("test1");
          const message = response.data.message;
          this.dialogupdate = false;
          //alert("Đã có lỗi xảy ra!", `${message}`);
          this.$swal("Đã có lỗi xảy ra!", `${message}`);
        }
      } catch (error) {
        //console.log("test2");
        this.dialogupdate = false;
        const message = error;
        this.$swal("Đã có lỗi xảy ra!", `${message}`);
      }
    }
  }
};
</script>
