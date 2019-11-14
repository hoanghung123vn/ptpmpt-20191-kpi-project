<template>
  <div>
    <v-btn class="mb-7" bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px" persistent>
      <v-card>
        <v-card-title class="success">Tạo người dùng mới</v-card-title>
        <v-container>
          <v-row>
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center">
                <v-avatar size="40px" class="mr-4">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Tên" v-model="user.name" />
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Email" v-model="user.email" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Mật khẩu*"
                type="password"
                prepend-icon="mdi-lock"
                required
                v-model="user.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="(000) 000 - 0000"
                v-model="user.phoneNumber"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-home" placeholder="Địa chỉ" v-model="user.address" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Ngày sinh*"
                required
                prepend-icon="mdi-calendar-range"
                v-model="user.birthday"
                @click="open = !open"
              ></v-text-field>
            </v-col>
            <v-row justify="center" v-if="open">
              <v-date-picker v-model="user.birthday"></v-date-picker>
            </v-row>
            <v-col cols="12">
              <v-select
                :items="['Nam', 'Nữ']"
                label="Giới tính*"
                required
                prepend-icon="mdi-gender-male-female"
                v-model="user.gender"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Hủy</v-btn>
          <v-btn text @click="addUser">Tạo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import UserService from "../UserService";
// const userService = new UserService();
export default {
  name: "AddUser",
  data() {
    return {
      dialog: false,
      open: false,
      user: {
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        birthday: new Date().toISOString().substr(0, 10),
        address: "",
        gender: ""
      }
    };
  },
  methods: {
    addUser() {
      // const response = userService.addUser(user);
      this.dialog = false;
      this.$swal("Great!", "Tạo mới thành công", "success");
    }
  }
};
</script>

<style>
</style>
