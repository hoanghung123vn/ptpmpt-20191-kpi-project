<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded>Cập nhật</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Hồ sơ người dùng</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Tên*" required v-model="user.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" required v-model="user.email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Mật khẩu*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Số điện thoại*" required v-model="user.phoneNumber"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Địa chỉ*" required v-model="user.address"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ngày sinh*" required v-model="picker" @click="open = !open"></v-text-field>
              </v-col>
              <v-row justify="center" v-if="open">
                <v-date-picker v-model="picker"></v-date-picker>
              </v-row>
              <v-col cols="12">
                <v-select
                  :items="[0, 1, 2, 3]"
                  label="Trạng thái*"
                  required
                  v-model="user.statusId"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*chỉ ra các trường bắt buộc</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
          <v-btn color="blue darken-1" text @click="updateUser">Cập nhật</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// import UserService from "../UserService";
// const userService = new UserService();
export default {
  name: "EditUser",
  data() {
    return {
      dialogupdate: false,
      picker: new Date().toISOString().substr(0, 10),
      open: false
    };
  },
  props: {
    user: Object
  },
  methods: {
    updateUser() {
      // const response = await userService.updateUser(this.user);
      this.dialogupdate = false;
      this.$swal("Great!", "Cập nhật thành công", "success");
    }
  }
};
</script>

<style>
</style>
