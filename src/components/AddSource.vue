<template>
  <div>
    <v-btn class="mb-4" color="success" @click="dialog = !dialog">Thêm tài nguyên mới</v-btn>
    <v-dialog v-model="dialog" width="576px" persistent>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
          <v-card-title class="success">Tạo tài nguyên</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field placeholder="Tên" v-model="name" required :rules="nameRules" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="dialog = false">Hủy</v-btn>
            <v-btn text @click="addGroup" :disabled="!valid">Tạo</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
// import UserService from "../UserService";
// const userService = new UserService();
import bus from "../bus";
export default {
  name: "AddSource",
  data() {
    return {
      dialog: false,
      name: "",
      valid: true,
      nameRules: [v => !!v || "Name is required"]
    };
  },
  methods: {
    addGroup() {
      if (this.$refs.form.validate()) {
        // const response = userService.addUser(user);
        bus.$emit("addSource", this.name);
        this.dialog = false;
        this.name = "";
      }
    }
  }
};
</script>

<style>
</style>
