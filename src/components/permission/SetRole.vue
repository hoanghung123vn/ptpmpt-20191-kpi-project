<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialogupdate" persistent max-width="678px">
        <template v-slot:activator="{ on }">
          <v-btn color="success" dark v-on="on" rounded>Phân quyền</v-btn>
        </template>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
            <v-card-title class="headline">Phân quyền cho tài nguyên</v-card-title>
            <v-list-item class="ml-3">
              <v-list-item-content>
                <v-list-item-title>Đường dẫn: "{{ link.url }}"</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      :items="roles"
                      v-model="role"
                      item-text="name"
                      return-object
                      label="Chọn nhóm quyền được truy cập link"
                      required
                      :rules="requiredRule"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
              <v-btn color="blue darken-1" text @click="setRole" :disabled="!valid">Thực hiện</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import PermissionService from "../../PermissionService";
const permissionService = new PermissionService();
// import bus from "../../bus";
export default {
  name: "SetRole",
  data() {
    return {
      valid: true,
      dialogupdate: false,
      requiredRule: [v => !!v || "The field is required!!!"],
      open: false,
      roles: [],
      role: null
    };
  },
  props: {
    link: Object
  },
  async created() {
    try {
      const response = await permissionService.getRoles();
      this.roles = response.data;
      const response2 = await permissionService.getLinkDetail(this.link._id);
      this.role = response2.data.role;
    } catch (error) {
      this.$swal("Ooh!", "Có gì đó sai, hãy tải lại trang", "error");
    }
  },
  methods: {
    async setRole() {
      if (this.$refs.form.validate()) {
        try {
          await permissionService.setRole(this.link._id, this.role._id);
          this.dialogupdate = false;
          this.$swal("Great!", "Phân quyền thành công", "success");
        } catch (error) {
          this.$swal("Ooh!", "Phân quyền thất bại, hãy thử lại", "error");
          this.dialogupdate = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.v-card__title.headline {
  background-color: #19c466;
  color: white;
}
</style>
