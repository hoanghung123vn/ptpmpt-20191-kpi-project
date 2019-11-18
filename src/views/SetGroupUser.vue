<template>
  <v-container>
    <v-toolbar-title class="mb-4">Danh sách nhóm người dùng</v-toolbar-title>
    <AddGroup />
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
          <tr v-for="(group, index) in groups" :key="group.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ group.name }}</td>
            <td class="text-center">
              <div class="d-flex justify-space-between">
                <GroupUserDetail :group="group" />
                <DeleteGroupUser :id="group.id" />
                <v-container>
                  <router-link
                    :to="{name: 'set-group-permission-by-id', params: { groupId: group.id }, group: group}"
                    class="side_bar_link"
                  >
                    <v-btn color="orange" dark rounded @click="refreshActive">Thiết lập</v-btn>
                  </router-link>
                </v-container>
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
import GroupUserDetail from "../components/GroupUserDetail.vue";
import DeleteGroupUser from "../components/DeleteGroupUser.vue";
import AddGroup from "../components/AddGroup.vue";
import bus from "../bus";
export default {
  name: "set-group-user",
  components: {
    GroupUserDetail,
    DeleteGroupUser,
    AddGroup
  },
  data() {
    return {
      groups: [
        {
          id: 0,
          name: "Nhân viên",
          sources: [
            {
              id: 0,
              name: "Báo cáo"
            },
            {
              id: 1,
              name: "Tin nhắn"
            }
          ]
        },
        {
          id: 1,
          name: "Trưởng phòng",
          sources: [
            {
              id: 0,
              name: "Báo cáo"
            },
            {
              id: 1,
              name: "Tin nhắn"
            }
          ]
        }
      ],
      page: 1
    };
  },
  mounted() {
    bus.$on("addGroup", name => {
      const newGroup = {
        id: this.groups.length,
        name: name,
        sources: []
      };
      this.groups.push(newGroup);
      this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteGroup", id => {
      this.groups = this.groups.filter(group => group.id !== id);
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
