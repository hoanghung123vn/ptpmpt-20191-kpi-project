<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded @click="updateAllKPIPositions">Cập nhật</v-btn>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();
import bus from "../bus";
export default {
  name: "UpdateAllKPIPositions",
  data() {
    return {
      dialogupdate: false
    };
  },
  props: {
    dataKPI: Array
  },
  methods: {
    async updateAllKPIPositions() {
      try {
        const response = await configurationKPIService.updateallPositionsKPI(
          this.dataKPI.criterias,
          this.dataKPI.id
        );
        if (response.data.message == "Cấu hình tiêu chí thành công") {
          bus.$emit("updateAllKPIPositions", this.dataKPI);
          this.dialogupdate = false;
          this.$swal("Great!", "Cập nhật thành công", "success");
        } else {
          const message = response.data.message;
          this.dialogupdate = false;
          this.$swal("Đã có lỗi xảy ra!", `${message}`);
        }
      } catch (error) {
        const message = error;
        this.dialogupdate = false;
        this.$swal("Đã có lỗi xảy ra!", `${message}`);
      }
    }
  }
};
</script>