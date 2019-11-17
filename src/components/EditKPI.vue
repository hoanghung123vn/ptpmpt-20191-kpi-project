<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded>Cập nhật</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Tiêu chí KPI</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Tên tiêu chí*" required v-model="department.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Tỉ lệ" required v-model="department.ratio"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Chú thích*" required v-model="department.note"></v-text-field>
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
  name: "EditKPI",
  data() {
    return {
      dialogupdate: false,
      picker: new Date().toISOString().substr(0, 10),
      open: false
    };
  },
  props: {
    department: Object
  },
  methods: {
    updateUser() {
      // const response = await userService.updateUser(this.user);
      // this.dialogupdate = false;
      // this.$swal("Great!", "Cập nhật thành công", "success");
    }
  }
};
</script>

<style>
</style>
