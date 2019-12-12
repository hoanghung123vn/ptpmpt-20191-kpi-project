<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialogupdate" persistent max-width="678px">
        <template v-slot:activator="{ on }">
          <v-btn color="success" dark v-on="on" rounded>Chỉnh sửa</v-btn>
        </template>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
            <v-card-title>
              <span class="headline">Chỉnh sửa trường báo cáo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Tên trường*"
                      required
                      v-model="field.field_name"
                      :rules="requiredRule"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select :items="items" v-model="field.type" label="Kiểu của trường"></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="items2"
                      v-model="field.importance"
                      label="Độ quan trọng"
                      item-text="name"
                      item-value="value"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="items3"
                      v-model="field.level"
                      label="Cấp độ"
                      item-text="name"
                      item-value="value"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*chỉ ra các trường bắt buộc</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
              <v-btn color="blue darken-1" text @click="updateField" :disabled="!valid">Cập nhật</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import ReportService from "../../ReportService";
const reportService = new ReportService();
import bus from "../../bus";
export default {
  name: "EditField",
  data() {
    return {
      valid: true,
      dialogupdate: false,
      requiredRule: [v => !!v || "The field is required!!!"],
      open: false,
      items: ["Int", "Long", "Float", "Double", "String", "Date"],
      items2: [
        { name: "Không bắt buộc", value: 0 },
        { name: "Bắt buộc", value: 1 }
      ],
      items3: [
        { name: "Nhân viên", value: 1 },
        { name: "Tổ trưởng", value: 2 },
        { name: "Trưởng phòng", value: 3 },
        { name: "Giám đốc", value: 4 },
        { name: "Hội đồng quản trị", value: 5 }
      ]
    };
  },
  props: {
    field: Object
  },
  methods: {
    async updateField() {
      if (this.$refs.form.validate()) {
        try {
          await reportService.editField(this.field._id, this.field);
          bus.$emit("updateField", this.field);
          this.$swal("Great!", "Cập nhật thành công", "success");
          this.dialogupdate = false;
        } catch (error) {
          this.$swal("Ohh!", "Có gì đó sai, hãy thử lại!", "error");
        }
      }
    }
  }
};
</script>

<style>
</style>
