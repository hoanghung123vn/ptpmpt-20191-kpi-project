<template>
  <div>
    <v-btn class="mb-4" color="success" @click="dialog = !dialog">Thêm nhãn công việc mới</v-btn>
    <v-dialog v-model="dialog" width="576px" persistent>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
          <v-card-title class="success">Tạo nhãn công việc</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field placeholder="Tên nhãn" v-model="name" required :rules="nameRules" />
              </v-col>
              <v-col cols="12">
                <v-chip label :color="color" text-color="white" @click="open=!open">
                  <v-icon left>mdi-format-color-highlight</v-icon>
                  Màu sắc: {{ color }}
                </v-chip>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-center" v-if="open">
                  <v-color-picker mode="hexa" v-model="color"></v-color-picker>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="dialog = false">Hủy</v-btn>
            <v-btn text @click="addLabel" :disabled="!valid">Tạo</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import LabelService from "../../LabelService";
const labelService = new LabelService();
import bus from "../../bus";
export default {
  name: "AddLabel",
  data() {
    return {
      dialog: false,
      name: "",
      color: "#3EA037FF",
      valid: true,
      nameRules: [v => !!v || "Name is required"],
      colorRules: [v => !!v || "Color is required"],
      open: false
    };
  },
  methods: {
    async addLabel() {
      if (this.$refs.form.validate()) {
        try {
          const response = await labelService.addLabel(this.name, this.color);
          bus.$emit("addLabel", response.data);
          this.dialog = false;
          this.name = "";
          this.color = "#3EA037FF";
        } catch (error) {
          this.$swal("Ooh!", "Tạo mới thất bại, hãy thử lại", "error");
        }
      }
    }
  }
};
</script>

<style>
</style>
