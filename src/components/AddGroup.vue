<template>
  <div>
    <v-btn class="mb-4" color="success" @click="dialog = !dialog">Thêm nhóm mới</v-btn>
    <v-dialog v-model="dialog" width="576px" persistent>
      <v-card>
        <v-card-title class="success">Tạo nhóm mới</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field placeholder="Tên" v-model="name" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Hủy</v-btn>
          <v-btn text @click="addGroup">Tạo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import UserService from "../UserService";
// const userService = new UserService();
import bus from "../bus";
export default {
  name: "AddGroup",
  data() {
    return {
      dialog: false,
      name: ""
    };
  },
  methods: {
    addGroup() {
      // const response = userService.addUser(user);
      bus.$emit("addGroup", this.name);
      this.dialog = false;
      this.name = "";
    }
  }
};
</script>

<style>
</style>
