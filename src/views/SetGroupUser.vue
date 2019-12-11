<template>
  <v-container>
    <v-toolbar-title class="mb-4">Danh sách nhóm quyền</v-toolbar-title>
    <AddGroup :items="groups" />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Tên nhóm quyền</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in groups" :key="group._id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ group.name }}</td>
            <td class="text-center">
              <div class="d-flex justify-space-between">
                <GroupUserDetail :group="group" />
                <DeleteGroupUser :id="group._id" />
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center mt-5">
      <v-pagination v-model="page" :length="3"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import GroupUserDetail from "../components/permission/GroupUserDetail.vue";
import DeleteGroupUser from "../components/permission/DeleteGroupUser.vue";
import AddGroup from "../components/permission/AddGroup.vue";
import bus from "../bus";
import PermissionService from "../PermissionService";
const permissionService = new PermissionService();

export default {
  name: "set-group-user",
  components: {
    GroupUserDetail,
    DeleteGroupUser,
    AddGroup
  },
  data() {
    return {
      groups: [],
      page: 1
    };
  },
  async created() {
    const response = await permissionService.getRoles();
    this.groups = response.data;
  },
  mounted() {
    bus.$on("addGroup", group => {
      this.groups.push(group);
    });
    bus.$on("deleteGroup", id => {
      this.groups = this.groups.filter(group => group._id !== id);
      this.$swal("Great!", "Xóa thành công", "success");
    });
  },
  methods: {
    refreshActive() {
      bus.$emit("refreshActive");
    }
  }
};
</script>

<style scoped>
a.side_bar_link {
  text-decoration: none;
}
</style>
