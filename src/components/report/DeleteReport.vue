<template>
  <v-container justify-center>
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Xóa mẫu báo cáo?</v-card-title>
        <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteReport">Đồng ý</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ReportService from "../../ReportService";
const reportService = new ReportService();
import bus from "../../bus";
export default {
  name: "DeleteReport",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    id: String
  },
  methods: {
    async deleteReport() {
      try {
        await reportService.delete(this.id);
        bus.$emit("deleteReport", this.id);
        this.dialog = false;
      } catch (error) {
        this.$swal("Ohh", "Có gì đó sai, hãy thử lại!", "error");
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
</style>
