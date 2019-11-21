<template>
  <v-container>
    <v-toolbar-title class="mb-4">Danh sách nhãn công việc</v-toolbar-title>
    <AddLabel />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Tên nhãn</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(label, index) in labels" :key="label.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">
              <v-chip label :color="label.color" text-color="white">
                <v-icon left>mdi-label-variant-outline</v-icon>
                {{ label.name }}
              </v-chip>
            </td>
            <td class="text-center">
              <div class="d-flex justify-space-around">
                <EditLabel :label="label" />
                <DeleteLabel :id="label.id" />
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
import AddLabel from "../components/label/AddLabel.vue";
import DeleteLabel from "../components/label/DeleteLabel.vue";
import EditLabel from "../components/label/EditLabel.vue";
import bus from "../bus";
export default {
  name: "task-label-management",
  components: {
    AddLabel,
    DeleteLabel,
    EditLabel
  },
  data() {
    return {
      labels: [
        {
          id: 0,
          name: "Backend",
          color: "#60C8B7FF"
        },
        {
          id: 1,
          name: "Bug",
          color: "#60C8B7FF"
        }
      ],
      page: 1
    };
  },
  mounted() {
    bus.$on("addLabel", label => {
      const newLabel = {
        id: this.labels.length,
        name: label.name,
        color: label.color
      };
      this.labels.push(newLabel);
      this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteLabel", id => {
      this.labels = this.labels.filter(label => label.id !== id);
      this.$swal("Great!", "Xóa thành công", "success");
    });
    bus.$on("updateLabel", label => {
      const index = this.labels.findIndex(l => l.id === label.id);
      this.labels.splice(index, 1, label);
      this.$swal("Great!", "Cập nhật thành công", "success");
    });
  }
};
</script>

<style scoped>
a.side_bar_link {
  text-decoration: none;
}
</style>
