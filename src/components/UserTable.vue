<template>
  <v-container>
    <v-row class="hidden-sm-and-down">
      <v-col>
        <v-text-field label="Tìm kiếm" single-line outlined append-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col>
        <v-btn class color="primary" x-large>Tìm kiếm</v-btn>
      </v-col>
      <v-col>
        <v-overflow-btn
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
            <th class="text-center">Trạng thái</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ user.name }}</td>
            <td class="text-center">
              <v-chip label :color="(user.statusId === 0) ? 'blue' : 'warning'" text-color="white">
                <v-icon left>mdi-label-variant-outline</v-icon>
                {{ (user.statusId === 0) ? "Hoạt động" : "Đã khóa" }}
              </v-chip>
            </td>
            <td>
              <div class="d-flex justify-space-around">
                <DetailUser :user="user" />
                <EditUser :user="user" />
                <DeleteUser :user="user" />
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center mt-5">
      <v-pagination v-model="page" :length="3"></v-pagination>
    </div>
    <AddUser />
  </v-container>
</template>

<script>
import UserService from "../UserService";
const userService = new UserService();
import DetailUser from "../components/DetailUser";
import EditUser from "../components/EditUser";
import DeleteUser from "../components/DeleteUser";
import AddUser from "../components/AddUser";
import bus from "../bus";
export default {
  name: "UserTable",
  components: {
    DetailUser,
    EditUser,
    DeleteUser,
    AddUser
  },
  data() {
    return {
      users: [],
      department: [
        "Phòng nhân sự",
        "Phòng kinh doanh",
        "Bộ phận hỗ trợ - hậu cần"
      ],
      page: 1
    };
  },
  mounted() {
    bus.$on("deleteUser", user => {
      const index = this.users.findIndex(u => (u.id = user.id));
      user.lastUpdate = new Date();
      user.statusId = 1;
      this.users.splice(index, 1, user);
      this.$swal("Great!", "Cập nhật trạng thái thành công", "success");
    });
    bus.$on("addUser", user => {
      this.users.push(user);
      this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("updateUser", user => {
      const index = this.users.findIndex(u => u.id === user.id);
      user.lastUpdate = new Date();
      this.users.splice(index, 1, user);
      this.$swal("Great!", "Cập nhật thành công", "success");
    });
  },
  async created() {
    //created() {
    //console.log(this.$router.app._route.fullPath);
    const response = await userService.getAllUser();
    this.users = response.data;

    // this.users = [
    //   {
    //     id: "321321321",
    //     name: "Pham Minh Hoang",
    //     email: "hoangpm@gmail.com",
    //     phoneNumber: "0982367327136",
    //     bithday: new Date(571758625498),
    //     statusId: 0,
    //     dateCreated: new Date(1571758625498),
    //     lastUpdate: new Date(1571758625498)
    //   },
    //   {
    //     id: "323232345",
    //     name: "Nguyen The Nha",
    //     email: "hoangpm@gmail.com",
    //     phoneNumber: "0982367327136",
    //     bithday: new Date(571758625498),
    //     statusId: 0,
    //     dateCreated: new Date(1571758625498),
    //     lastUpdate: new Date(1571758625498)
    //   },
    //   {
    //     id: "565476773",
    //     name: "Tran Kim Tuyen",
    //     email: "hoangpm@gmail.com",
    //     phoneNumber: "0982367327136",
    //     bithday: new Date(571758625498),
    //     statusId: 0,
    //     dateCreated: new Date(1571758625498),
    //     lastUpdate: new Date(1571758625498)
    //   },
    //   {
    //     id: "3435566563",
    //     name: "Pham Van Hung",
    //     email: "hoangpm@gmail.com",
    //     phoneNumber: "0982367327136",
    //     bithday: new Date(571758625498),
    //     statusId: 0,
    //     dateCreated: new Date(1571758625498),
    //     lastUpdate: new Date(1571758625498)
    //   },
    //   {
    //     id: "547898795",
    //     name: "Le Van Cuong",
    //     email: "hoangpm@gmail.com",
    //     phoneNumber: "0982367327136",
    //     bithday: new Date(571758625498),
    //     statusId: 0,
    //     dateCreated: new Date(1571758625498),
    //     lastUpdate: new Date(1571758625498)
    //   }
    // ];
  }
};
</script>

<style>
.v-autocomplete.v-input > .v-input__control > .v-input__slot {
  cursor: pointer !important;
}
</style>
