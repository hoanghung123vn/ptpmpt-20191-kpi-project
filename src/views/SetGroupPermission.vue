<template>
  <v-container>
    <v-toolbar-title class="mb-4">Danh sách các tài nguyên</v-toolbar-title>
    <v-tabs background-color="orange lighten-3" color="deep-purple accent-4" left>
      <v-tab>Đường dẫn</v-tab>
      <v-tab>Mẫu công việc</v-tab>
      <v-tab>Thành phần giao diện</v-tab>
      <v-tab-item>
        <v-container fluid>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">STT</th>
                  <th>Đường dẫn url</th>
                  <th class="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(link, index) in links" :key="link._id">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>"{{ link.url }}"</td>
                  <td class="text-center">
                    <div class="d-flex justify-space-between">
                      <LinkDetail :link="link" />
                      <SetRole :link="link" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
// import bus from "../bus";
import PermissionService from "../PermissionService";
const permissionService = new PermissionService();
import SetRole from "../components/permission/SetRole";
import LinkDetail from "../components/permission/LinkDetail";
export default {
  name: "set-group-permission",
  data() {
    return {
      links: []
    };
  },
  components: {
    SetRole,
    LinkDetail
  },
  async created() {
    const response = await permissionService.getLinks();
    this.links = response.data;
  },
  mounted() {
    // bus.$on("addSource", name => {
    //   const newSource = {
    //     id: this.group.sources.length,
    //     name: name
    //   };
    //   this.group.sources.push(newSource);
    //   this.$swal("Great!", "Tạo mới thành công", "success");
    // });
    // bus.$on("deleteSource", id => {
    //   this.group.sources = this.group.sources.filter(
    //     source => source.id !== id
    //   );
    //   this.$swal("Great!", "Xóa thành công", "success");
    // });
  }
};
</script>

<style>
</style>
