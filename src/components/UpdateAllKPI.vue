<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded @click="updateAllKPI">Cập nhật</v-btn>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

import bus from "../bus"
export default {
  name: "UpdateAllKPI",
  data() {
    return {   
      dialogupdate: false,
    };
  },
   props: {
    dataKPI: Array
  },
    methods: {
      async updateAllKPI() {
        try {
          const response = await configurationKPIService.updateAllKPI(
          this.dataKPI.criterias,
          this.dataKPI.id
          );
          console.log("bRet",response);
          if (response.data.message == "Cấu hình tiêu chí thành công") {   
            bus.$emit("updateAllKPI", this.dataKPI);
            this.dialogupdate = false;
            this.$swal("Great!", "Cập nhật thành công", "success");
          } 
          else {
            const message = response.data.message;
            this.$swal("Đã có lỗi xảy ra!", `${message}`);
          }
        }
        catch (error) {
          const message = error;
          this.$swal("Đã có lỗi xảy ra!", `${message}`);
      }
    }
           
    }
};
</script>