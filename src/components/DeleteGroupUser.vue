<template>
  <v-container justify-center>
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Xóa nhóm người dùng?</v-card-title>
        <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteGroupUser">Đồng ý</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import UserService from "../UserService";
// const userService = new UserService();
import bus from "../bus";
export default {
  name: "DeleteGroupUser",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    id: Number
  },
  methods: {
    //async deleteUser(id) {
    deleteGroupUser() {
      bus.$emit("deleteGroup", this.id);
      this.dialog = false;
      ///await userService.deleteUser(id);
    }
  }
};
</script>

<style>
</style>
