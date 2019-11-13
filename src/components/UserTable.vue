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
                <v-row justify="center">
                  <v-btn color="primary" dark @click.stop="dialogdetail = true" rounded>Chi tiết</v-btn>
                  <v-dialog v-model="dialogdetail" max-width="768">
                    <v-card>
                      <v-card-title class="headline">Thông tin chi tiết người dùng</v-card-title>
                      <v-card-text>Thông tin người dùng</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogdetail = false">Đóng</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
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
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Legal first name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Legal middle name"
                                hint="example of helper text only on focus"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Legal last name*"
                                hint="example of persistent helper text"
                                persistent-hint
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field label="Email*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field label="Password*" type="password" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                :items="['0-17', '18-29', '30-54', '54+']"
                                label="Age*"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-autocomplete
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interests"
                                multiple
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text @click="dialogupdate = false">Cập nhật</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
                <v-row justify="center">
                  <v-dialog v-model="dialogdelete" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Xóa tài khoản?</v-card-title>
                      <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogdelete = false">Đồng ý</v-btn>
                        <v-btn color="green darken-1" text @click="dialogdelete = false">Hủy</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn class="mb-7" bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create contact</v-card-title>
        <v-container>
          <v-row>
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center">
                <v-avatar size="40px" class="mr-4">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name" />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="mdi-company" placeholder="Company" />
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="(000) 000 - 0000" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-note" placeholder="Notes" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      ],
      dialog: false,
      dialogdetail: false,
      dialogupdate: false,
      dialogdelete: false
    };
  },
  async created() {
    //created() {
    console.log(this.$router.app._route.fullPath);
    const response = await userService.getAllUser();
    this.datas = response.data;
    // this.datas = [
    //   {
    //     id: "321321321",
    //     name: "Pham Minh Hoang"
    //   },
    //   {
    //     id: "323232345",
    //     name: "Nguyen The Nha"
    //   },
    //   {
    //     id: "565476773",
    //     name: "Tran Kim Tuyen"
    //   },
    //   {
    //     id: "3435566563",
    //     name: "Pham Van Hung"
    //   },
    //   {
    //     id: "547898795",
    //     name: "Le Van Cuong"
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
