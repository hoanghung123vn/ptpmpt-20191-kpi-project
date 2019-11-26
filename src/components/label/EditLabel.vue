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
              <span class="headline">Chỉnh sửa nhãn công việc</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Tên nhãn*"
                      required
                      v-model="label.name"
                      :rules="requiredRule"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-chip label :color="label.color" text-color="white" @click="open=!open">
                      <v-icon left>mdi-format-color-highlight</v-icon>
                      Màu sắc: {{ label.color }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex justify-center" v-if="open">
                      <v-color-picker mode="hexa" v-model="label.color"></v-color-picker>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <small>*chỉ ra các trường bắt buộc</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
              <v-btn color="blue darken-1" text @click="updateLabel" :disabled="!valid">Cập nhật</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import LabelService from "../../LabelService";
const labelService = new LabelService();
import bus from "../../bus";
export default {
  name: "EditLabel",
  data() {
    return {
      valid: true,
      dialogupdate: false,
      requiredRule: [v => !!v || "The field is required!!!"],
      open: false
    };
  },
  props: {
    label: Object
  },
  methods: {
    async updateLabel() {
      if (this.$refs.form.validate()) {
        try {
          await labelService.updateLabel(
            this.label._id,
            this.label.name,
            this.label.color
          );
          bus.$emit("updateLabel", this.label);
          this.dialogupdate = false;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style>
</style>
