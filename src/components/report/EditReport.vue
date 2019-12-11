<template>
  <div>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card>
        <v-card-title class="success">Chỉnh sửa mẫu báo cáo</v-card-title>
        <v-card-title>Người tạo: {{user_name}}</v-card-title>
        <v-row>
          <v-col cols="5" class="ml-4">
            <v-select
              :items="itemstype"
              v-model="project_type"
              item-text="name"
              item-value="id"
              label="Chọn loại dự án"
              required
              :rules="requiredRule"
              @change="getProjectTypes(project_type)"
            ></v-select>
          </v-col>
          <v-col cols="5" class="ml-4">
            <v-select
              :items="itemsproject"
              v-model="project_id"
              item-text="name"
              item-value="id"
              label="Chọn dự án"
              required
              :rules="requiredRule"
            ></v-select>
          </v-col>
          <v-col cols="5" class="ml-4">
            <v-text-field
              placeholder="Tên báo cáo"
              v-model="report_name"
              type="text"
              required
              :rules="requiredRule"
            />
          </v-col>
          <v-col cols="12" sm="11" class="ml-4">
            <v-select
              v-model="listDetail"
              :items="listField"
              :menu-props="{ maxHeight: '400' }"
              label="Chọn các trường"
              multiple
              chips
              item-text="field_name"
              return-object
              required
              :rules="requiredRule"
            ></v-select>
          </v-col>
        </v-row>
        <v-container>
          <v-row class="ml-1" v-for="field in listDetail" :key="field._id" v-model="listDetail">
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
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="editReport" :disabled="!valid">Cập nhật</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import ReportService from "../../ReportService";
const reportService = new ReportService();
import ProjectService from "../../ProjectService";
const projectService = new ProjectService();
export default {
  name: "EditReport",
  data() {
    return {
      valid: true,
      user_name: "",
      user_id: null,
      report_name: "",
      listField: [],
      listDetail: [],
      project_type: null,
      itemstype: [],
      project_id: "",
      itemsproject: [],
      requiredRule: [v => !!v || "The field is required!!!"],
      report_id: this.$route.params.id
    };
  },
  async created() {
    try {
      const response = await projectService.getProjectTypes();
      this.itemstype = response.data;
      const response1 = await reportService.getReportById(this.report_id);
      const data = response1.data.data[0];
      this.user_name = data.user_name;
      this.user_id = data.user_id;
      this.report_name = data.report_name;
      this.project_type = data.project_type;
      this.getProjectTypes(this.project_type);
      this.project_id = data.project_id;
      this.listDetail = data.listDetail;
    } catch (error) {
      this.$swal("Ooh!", "Có gì đó sai, hãy tải lại trang", "error");
    }
  },
  methods: {
    async editReport() {
      if (this.$refs.form.validate()) {
        try {
          await reportService.editReport(
            this.report_id,
            this.user_id,
            this.user_name,
            this.project_id,
            this.project_type,
            this.listDetail,
            this.report_name
          );
          this.$swal("Great!", "Chỉnh sửa thành công", "success");
          this.$router.push({ name: "reports" });
        } catch (error) {
          this.$swal("Ooh!", "Chỉnh sửa thất bại, hãy thử lại", "error");
          this.$router.push({ name: "reports" });
        }
      }
    },
    async getProjectTypes(type) {
      try {
        const response = await projectService.getProjectsByType(type);
        this.itemsproject = response.data.results;
        const response2 = await reportService.getFieldsByProjectType(type);
        this.listField = response2.data.data;
      } catch (error) {
        this.$swal("Ooh!", "Có gì đó sai, hãy tải lại trang", "error");
      }
    }
  }
};
</script>

<style>
</style>
