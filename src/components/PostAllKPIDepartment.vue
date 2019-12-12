<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded @click="postAllKPIDepartment">Cập nhật</v-btn>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

import bus from "../bus";
export default {
  name: "PostAllKPIDepartment",
  data() {
    return {
      dialogupdate: false
    };
  },
  props: {
    dataKPI: Array
  },
  methods: {
    async postAllKPIDepartment() {
      try {
            await configurationKPIService.postKPIDepartment(this.dataKPI.criterias, this.dataKPI.id);          
            bus.$emit("postAllKPIDepartment", this.dataKPI);
            this.dialogupdate = false;
            this.$swal("Great!", "Cập nhật thành công", "success");   
        }    
        catch (error){
            const message = error;
            this.$swal("Đã có lỗi xảy ra!", `${message}`);
            this.dialogupdate = false;
        }    
    }
  }
};
</script>
