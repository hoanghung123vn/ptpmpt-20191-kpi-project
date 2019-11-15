<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click.stop="dialogdetail = true" rounded>Chi tiết</v-btn>
    <v-dialog v-model="dialogdetail" persistent max-width="768">
      <v-card>
        <v-card-title class="headline">Thông tin chi tiết người dùng</v-card-title>
        <v-container>
          <v-row class="ml-5">
            <v-col cols="12">
              <div class="subtitle-1">Tên: {{user.name}}</div>
            </v-col>
          </v-row>
          <v-row class="ml-5">
            <v-col cols="12">
              <div class="subtitle-1">Email: {{user.email}}</div>
            </v-col>
          </v-row>
          <v-row class="ml-5">
            <v-col cols="12">
              <div class="subtitle-1">Số điện thoại: {{user.phoneNumber}}</div>
            </v-col>
          </v-row>
          <v-row class="ml-5">
            <v-col cols="12">
              <div class="subtitle-1">Địa chỉ: {{user.address}}</div>
            </v-col>
          </v-row>
          <v-row class="ml-5">
            <v-col cols="12">
              <div class="subtitle-1">Ngày sinh: {{new Date(user.bithday).toLocaleDateString()}}</div>
            </v-col>
          </v-row>
          <v-row class="ml-5">
            <v-col cols="12">
              <div class="subtitle-1">Trạng thái: {{user.statusId}}</div>
            </v-col>
          </v-row>
          <v-row class="ml-5">
            <v-col cols="12">
              <div class="subtitle-1">Ngày tạo: {{new Date(user.dateCreated).toLocaleDateString()}}</div>
            </v-col>
          </v-row>
          <v-row class="ml-5">
            <v-col cols="12">
              <div
                class="subtitle-1"
              >Ngày cập nhật: {{new Date(user.lastUpdate).toLocaleDateString()}}</div>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogdetail = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DetailUser",
  data() {
    return {
      dialogdetail: false
    };
  },
  props: {
    user: Object
  }
};
</script>

<style>
</style>
