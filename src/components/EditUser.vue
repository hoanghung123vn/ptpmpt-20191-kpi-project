<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="678px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded>Cập nhật</v-btn>
      </template>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline">Hồ sơ người dùng</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Tên*" required v-model="user.name" :rules="requiredRule"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email" required v-model="user.email" :rules="requiredRule"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Mật khẩu*" type="password" required :rules="requiredRule"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Số điện thoại*"
                    required
                    v-model="user.phoneNumber"
                    :rules="requiredRule"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Địa chỉ*"
                    required
                    v-model="user.address"
                    :rules="requiredRule"
                  ></v-text-field>
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
                    :rules="requiredRule"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*chỉ ra các trường bắt buộc</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
            <v-btn color="blue darken-1" text @click="updateUser" :disabled="!valid">Cập nhật</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
// import UserService from "../UserService";
// const userService = new UserService();
import bus from "../bus";
export default {
  name: "EditUser",
  data() {
    return {
      valid: true,
      dialogupdate: false,
      picker: new Date().toISOString().substr(0, 10),
      open: false,
      requiredRule: [v => !!v || "The field is required!!!"]
    };
  },
  props: {
    user: Object
  },
  methods: {
    updateUser() {
      if (this.$refs.form.validate()) {
        // const response = await userService.updateUser(this.user);
        bus.$emit("updateUser", this.user);
        this.dialogupdate = false;
      }
    }
  }
};
</script>

<style>
</style>
