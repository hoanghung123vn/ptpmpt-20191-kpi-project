<template>
  <v-container>
    <v-toolbar-title class="mb-4">Danh sách mẫu báo cáo</v-toolbar-title>
    <router-link :to="{name: 'add-report'}" class="side_bar_link">
      <v-btn class="mb-4" color="success">Thêm mẫu báo cáo mới</v-btn>
    </router-link>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Người tạo</th>
            <th class="text-center">Tên báo cáo</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in report_paginate" :key="report._id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ report.user_name }}</td>
            <td>
              <router-link
                :to="{name: 'report-detail', params: {id: report._id}}"
                class="side_bar_link"
              >
                <v-chip label color="info" text-color="white">
                  <v-icon left>mdi-file-document-box-outline</v-icon>
                </v-chip>
                {{ report.report_name }}
              </router-link>
            </td>
            <td class="text-center">
              <div class="d-flex justify-space-around">
                <v-container justify-center>
                  <router-link
                    :to="{name: 'edit-report', params: {id: report._id}}"
                    class="side_bar_link"
                  >
                    <v-btn color="success">Chỉnh sửa</v-btn>
                  </router-link>
                </v-container>
                <DeleteReport :id="report._id" />
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center mt-5">
      <v-pagination v-model="page" :length="len" @input="paginate"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import DeleteReport from "../components/report/DeleteReport.vue";
import bus from "../bus";
import ReportService from "../ReportService";
const reportService = new ReportService();
export default {
  name: "reports",
  components: {
    DeleteReport
  },
  data() {
    return {
      reports: [],
      page: 1,
      report_paginate: [],
      num: 15,
      len: 1
    };
  },
  async created() {
    try {
      const response = await reportService.getReports();
      this.reports = response.data.data;
      this.len = Math.ceil(this.reports.length / this.num);
      for (let i = 0; i < this.reports.length && i < this.num; i++) {
        this.report_paginate.push(this.reports[i]);
      }
    } catch (error) {
      this.$swal("Ohh!", "Có gì đó sai, hãy tải lại trang", "error");
    }
  },
  mounted() {
    bus.$on("deleteReport", id => {
      this.reports = this.reports.filter(report => report._id !== id);
      this.$swal("Great!", "Xóa thành công", "success");
    });
  },
  methods: {
    paginate() {
      this.report_paginate = [];
      for (
        let i = (this.page - 1) * this.num;
        i < this.reports.length && i < this.page * this.num;
        i++
      ) {
        this.report_paginate.push(this.reports[i]);
      }
    }
  }
};
</script>

<style scoped>
a.side_bar_link {
  text-decoration: none;
}
</style>
