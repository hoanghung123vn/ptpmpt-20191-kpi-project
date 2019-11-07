<template>
  <v-container>
    <v-row class="hidden-sm-and-down">
      <v-col>
        <v-text-field label="Search" single-line outlined append-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col>
        <v-btn class color="primary" x-large>Search</v-btn>
      </v-col>
      <v-col>
        <v-overflow-btn
          class
          :items="department"
          label="Lọc theo bộ phận"
          target="#dropdown-example"
          outlined
          background-color="blue lighten-3"
        ></v-overflow-btn>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Họ Tên</th>
            <th class="text-center">Chức vụ</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in datas" :key="user.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ user.name }}</td>
            <td class="text-center">Nhân viên</td>
            <td>
              <div class="d-flex justify-space-around">
                <v-btn rounded color="primary">Chi tiết</v-btn>
                <v-btn rounded color="success">Cập nhật</v-btn>
                <v-btn rounded color="error">Xóa</v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>


<script>
import UserService from "../UserService";
const userService = new UserService();
export default {
  name: "UserTable",
  data() {
    return {
      datas: [],
      department: [
        "Phòng nhân sự",
        "Phòng kinh doanh",
        "Bộ phận hỗ trợ - hậu cần"
      ]
    };
  },
  async created() {
    const response = await userService.getAllUser();
    this.datas = response.data;
  }
};
</script>

<style>
</style>
