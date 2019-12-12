<template>
  <v-container>
    <v-btn color="primary" dark @click.stop="dialog = true" rounded>Chi tiết</v-btn>
    <v-dialog v-model="dialog" persistent max-width="576">
      <v-card>
        <v-card-title class="headline">Chi tiết tài nguyên</v-card-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Đường dẫn: "{{ link.url }}"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Tên nhóm quyền được truy cập: {{ role_name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PermissionService from "../../PermissionService";
const permissionService = new PermissionService();
export default {
  name: "LinkDetail",
  data() {
    return {
      dialog: false,
      role_name: ""
    };
  },
  props: {
    link: Object
  },
  async created() {
    const response = await permissionService.getLinkDetail(this.link._id);
    this.role_name = response.data.role.name;
  }
};
</script>

<style scoped>
.v-card__title.headline {
  background-color: #3f84d8;
  color: white;
}
</style>
