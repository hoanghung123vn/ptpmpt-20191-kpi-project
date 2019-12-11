<template>
  <v-container>
    <v-toolbar-title class="mb-4">Nhóm quyền: {{ group.name }}</v-toolbar-title>
    <AddSource />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Tên tài nguyên</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(source, index) in group.sources" :key="source.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ source.name }}</td>
            <td class="text-center">
              <DeleteSource :id="source.id" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import bus from "../bus";
import AddSource from "../components/permission/AddSource.vue";
import DeleteSource from "../components/permission/DeleteSource.vue";
export default {
  name: "set-group-permission",
  components: {
    AddSource,
    DeleteSource
  },
  data() {
    return {
      group: null
    };
  },
  created() {
    this.group = {
      id: 0,
      name: "Trưởng phòng",
      sources: [
        {
          id: 0,
          name: "Tin nhắn"
        },
        {
          id: 1,
          name: "Báo cáo"
        }
      ]
    };
  },
  mounted() {
    bus.$on("addSource", name => {
      const newSource = {
        id: this.group.sources.length,
        name: name
      };
      this.group.sources.push(newSource);
      this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteSource", id => {
      this.group.sources = this.group.sources.filter(
        source => source.id !== id
      );
      this.$swal("Great!", "Xóa thành công", "success");
    });
  }
};
</script>

<style>
</style>
