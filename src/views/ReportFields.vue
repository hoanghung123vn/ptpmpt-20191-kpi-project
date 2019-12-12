<template>
  <v-container>
    <v-toolbar-title class="mb-4">Danh sách các trường thông tin</v-toolbar-title>
    <v-row>
      <v-col cols="6">
        <v-select
          :items="types"
          v-model="type_id"
          label="Chọn loại dự án"
          item-text="name"
          item-value="id"
          @change="getFields"
        ></v-select>
      </v-col>
    </v-row>
    <AddField :project_type="type_id+''" />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Tên trường</th>
            <th class="text-center">Kiểu</th>
            <th class="text-center">Độ quan trọng</th>
            <th class="text-center">Cấp độ</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, index) in field_paginate" :key="field._id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ field.field_name }}</td>
            <td class="text-center">{{ field.type }}</td>
            <td class="text-center" v-if="field.importance === 0">Không bắt buộc</td>
            <td class="text-center" v-if="field.importance === 1">Bắt buộc</td>
            <td class="text-center" v-if="field.level === 1">Nhân viên</td>
            <td class="text-center" v-if="field.level === 2">Tổ trưởng</td>
            <td class="text-center" v-if="field.level === 3">Trưởng phòng</td>
            <td class="text-center" v-if="field.level === 4">Giám đốc</td>
            <td class="text-center" v-if="field.level === 5">Hội đồng quản trị</td>
            <td>
              <div class="d-flex justify-space-around">
                <EditField :field="field" />
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
import bus from "../bus";
import ReportService from "../ReportService";
const reportService = new ReportService();
import ProjectService from "../ProjectService";
const projectService = new ProjectService();
import EditField from "../components/field/EditField";
import AddField from "../components/field/AddField";
export default {
  name: "report-fields",
  components: {
    EditField,
    AddField
  },
  data() {
    return {
      fields: [],
      page: 1,
      field_paginate: [],
      num: 15,
      len: 1,
      types: [],
      type_id: 0
    };
  },
  async created() {
    try {
      const response1 = await projectService.getProjectTypes();
      this.types = response1.data;
      this.getFields();
    } catch (error) {
      this.$swal("Ohh!", "Có gì đó sai, hãy tải lại trang", "error");
    }
  },
  mounted() {
    bus.$on("addField", field => {
      field._id = this.field_paginate;
      this.field_paginate = this.field_paginate.push(field);
    });
  },
  methods: {
    async getFields() {
      const response = await reportService.getFieldsByProjectType(this.type_id);
      this.fields = response.data.data;
      this.len = Math.ceil(this.fields.length / this.num);
      this.page = 1;
      this.paginate();
    },
    paginate() {
      this.field_paginate = [];
      for (
        let i = (this.page - 1) * this.num;
        i < this.fields.length && i < this.page * this.num;
        i++
      ) {
        this.field_paginate.push(this.fields[i]);
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
