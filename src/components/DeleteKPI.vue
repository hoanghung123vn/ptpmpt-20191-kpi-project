<template>
  <v-row justify="center">
    <v-dialog v-model="dialogdelete" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Xóa tiêu chí KPI?</v-card-title>
        <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteKPI">Đồng ý</v-btn>
          <v-btn color="green darken-1" text @click="dialogdelete = false">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import bus from "../bus";
export default {
  name: "DeleteKPI",
  data() {
    return {
      dialogdelete: false
    };
  },
  props: {
    department: Object
  },
  methods: {
    deleteKPI() {
      bus.$emit("deleteKPI", this.department.name);
      this.dialogdelete = false;
    }
  }
};
</script>

<style>
</style>
