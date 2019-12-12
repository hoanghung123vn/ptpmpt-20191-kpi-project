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
          <tr v-for="(label, index) in label_paginate" :key="label._id">
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
      <v-pagination v-model="page" :length="len" @input="paginate"></v-pagination>
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
      label_paginate: [],
      page: 1,
      num: 15,
      len: 1
    };
  },
  async created() {
    try {
      const response = await labelService.getLabels();
      this.labels = response.data;
      this.len = Math.ceil(this.labels.length / this.num);
      for (let i = 0; i < this.labels.length && i < this.num; i++) {
        this.label_paginate.push(this.labels[i]);
      }
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
  },
  methods: {
    paginate() {
      this.label_paginate = [];
      for (
        let i = (this.page - 1) * this.num;
        i < this.labels.length && i < this.page * this.num;
        i++
      ) {
        this.label_paginate.push(this.labels[i]);
      }
    }
  }
};
</script>

<style scoped>
a.side_bar_link {
  text-decoration: none;
}
</style>
