<template>
  <v-card>
    <v-card-title class="success">Mẫu báo cáo</v-card-title>
    <v-row>
      <v-col cols="12">
        <v-toolbar-title class="ml-3">Nguời tạo: {{report.user_name}}</v-toolbar-title>
      </v-col>
      <v-col cols="12">
        <v-toolbar-title class="ml-3">Dự án: Sản xuất sản phẩm BKA-Panadol</v-toolbar-title>
      </v-col>
      <v-col cols="12">
        <v-toolbar-title class="ml-3">Loại dự án: Sản xuất thuốc</v-toolbar-title>
      </v-col>
      <v-container>
        <v-row class="ml-2" v-for="field in report.listDetail" :key="field._id">
          <v-col cols="12">
            <v-text-field
              v-if="field.type === 'String'"
              :label="field.field_name"
              type="text"
              :required="field.importance === 1"
            />
            <v-text-field
              v-if="field.type == 'Date'"
              :label="field.field_name"
              type="date"
              :required="field.importance === 1"
            />
            <v-text-field
              v-if="field.type === 'Int' || field.type === 'Long'"
              :label="field.field_name"
              type="number"
              :required="field.importance === 1"
              min="0"
              max="1000"
            />
            <v-text-field
              v-if="field.type === 'Double' || field.type === 'Float'"
              :label="field.field_name"
              type="number"
              :required="field.importance === 1"
              step="0.01"
              min="0"
              max="1000"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-card>
</template>

<script>
import ReportService from "../../ReportService";
const reportService = new ReportService();
export default {
  name: "ReportDetail",
  data() {
    return {
      report: {}
    };
  },
  async created() {
    try {
      const response = await reportService.getReportById(this.$route.params.id);
      this.report = response.data.data[0];
    } catch (error) {
      this.$swal("Ohh!", "Có gì đó sai, hãy tải lại trang", "error");
    }
  }
};
</script>

<style>
</style>
