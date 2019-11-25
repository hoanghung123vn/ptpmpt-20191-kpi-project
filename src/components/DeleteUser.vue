<template>
  <v-row justify-center>
    <v-dialog v-model="dialogdelete" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Xóa tài khoản?</v-card-title>
        <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteUser">Đồng ý</v-btn>
          <v-btn color="green darken-1" text @click="dialogdelete = false">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import UserService from "../UserService";
const userService = new UserService();
import bus from "../bus";
export default {
  name: "DeleteUser",
  data() {
    return {
      dialogdelete: false
    };
  },
  props: {
    user: Object
  },
  methods: {
    //async deleteUser(id) {
    async deleteUser() {
      try {
        const response = await userService.deleteUser(this.user.id);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      bus.$emit("deleteUser", this.user.id);
      this.dialogdelete = false;
      ///await userService.deleteUser(id);
    }
  }
};
</script>

<style>
</style>
