<template>
  <div>
    <v-btn class="mb-7" bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="768px" persistent>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
          <v-card-title class="success">Tạo người dùng mới</v-card-title>
          <v-container>
            <v-row>
              <v-col class="align-center justify-space-between" cols="12">
                <v-row align="center">
                  <v-avatar size="40px" class="mr-4">
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                  </v-avatar>
                  <v-text-field
                    placeholder="Tên"
                    v-model="user.name"
                    :rules="requiredRule"
                    required
                  />
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-mail"
                  placeholder="Email"
                  v-model="user.email"
                  type="email"
                  required
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Mật khẩu*"
                  type="password"
                  prepend-icon="mdi-lock"
                  required
                  v-model="user.password"
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="tel"
                  prepend-icon="mdi-phone"
                  placeholder="(000) 000 - 0000"
                  v-model="user.phoneNumber"
                  required
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field prepend-icon="mdi-home" placeholder="Địa chỉ" v-model="user.address" />
              </v-col>
              <v-col cols="12">
                <v-chip label color="#60C8B7FF" text-color="white" @click="open=!open">
                  <v-icon left>mdi-calendar-range</v-icon>
                  Ngày sinh: {{ user.birthday }}
                </v-chip>
              </v-col>
              <v-col cols="12">
                <v-row justify="center" v-if="open" required @click="open=!open">
                  <v-date-picker v-model="user.birthday"></v-date-picker>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="['Nam', 'Nữ']"
                  label="Giới tính*"
                  required
                  prepend-icon="mdi-gender-male-female"
                  v-model="user.gender"
                  :rules="requiredRule"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="dialog = false">Hủy</v-btn>
            <v-btn text @click="addUser" :disabled="!valid">Tạo</v-btn>
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
  name: "AddUser",
  data() {
    return {
      valid: true,
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
      },
      requiredRule: [v => !!v || "The field is required!!!"]
    };
  },
  methods: {
    addUser() {
      if (this.$refs.form.validate()) {
        // const response = userService.addUser(user);
        bus.$emit("addUser", this.user);
        this.user = {
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          birthday: new Date().toISOString().substr(0, 10),
          address: "",
          gender: ""
        };
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
</style>
