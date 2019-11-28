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
          <tr v-for="(label, index) in labels" :key="label._id">
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
                <DeleteLabel :id="label._id" />
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
import LabelService from "../LabelService";
const labelService = new LabelService();
export default {
  name: "task-label-management",
  components: {
    AddLabel,
    DeleteLabel,
    EditLabel
  },
  data() {
    return {
      labels: [],
      page: 1
    };
  },
  async created() {
    try {
      const response = await labelService.getLabels();
      this.labels = response.data;
    } catch (error) {
      this.$swal("Ohh!", "Có gì đó sai, hãy tải lại trang", "error");
    }
  },
  mounted() {
    bus.$on("addLabel", label => {
      this.labels.push(label);
      this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteLabel", id => {
      this.labels = this.labels.filter(label => label._id !== id);
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
