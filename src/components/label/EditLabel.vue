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
                    <v-text-field label="Tên*" required v-model="label.name" :rules="requiredRule"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      required
                      v-model="label.color"
                      :rules="requiredRule"
                    ></v-text-field>
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
// import UserService from "../UserService";
// const userService = new UserService();
import bus from "../../bus";
export default {
  name: "EditLabel",
  data() {
    return {
      valid: true,
      dialogupdate: false,
      requiredRule: [v => !!v || "The field is required!!!"]
    };
  },
  props: {
    label: Object
  },
  methods: {
    updateLabel() {
      if (this.$refs.form.validate()) {
        // const response = await userService.updateUser(this.user);
        bus.$emit("updateLabel", this.label);
        this.dialogupdate = false;
      }
    }
  }
};
</script>

<style>
</style>
