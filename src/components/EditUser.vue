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
                  <v-chip label color="#60C8B7FF" text-color="white" @click="open=!open">
                    <v-icon left>mdi-calendar-range</v-icon>
                    Ngày sinh: {{ picker }}
                  </v-chip>
                </v-col>
                <v-col cols="12">
                  <v-row justify="center" v-if="open" required @click="open=!open">
                    <v-date-picker v-model="picker"></v-date-picker>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="items"
                    v-model="user.statusId"
                    item-text="name"
                    item-value="value"
                    label="Trạng thái"
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
import UserService from "../UserService";
const userService = new UserService();
import bus from "../bus";
export default {
  name: "EditUser",
  data() {
    return {
      valid: true,
      dialogupdate: false,
      picker: new Date(this.user.birthday).toISOString().substr(0, 10),
      open: false,
      requiredRule: [v => !!v || "The field is required!!!"],
      items: [{ name: "Hoạt động", value: 0 }, { name: "Đã khóa", value: 1 }]
    };
  },
  props: {
    user: Object
  },
  methods: {
    async updateUser() {
      if (this.$refs.form.validate()) {
        await userService.updateUser(this.user);
        bus.$emit("updateUser", this.user);
        this.dialogupdate = false;
      }
    }
  }
};
</script>

<style>
</style>
