<template>
  <v-container>
    <v-btn color="primary" dark @click.stop="dialog = true" rounded>Chi tiết</v-btn>
    <v-dialog v-model="dialog" persistent max-width="576">
      <v-card>
        <v-card-title class="headline">Tên nhóm người dùng: {{ group.name }}</v-card-title>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">STT</th>
                <th class="text-center">Tên tài nguyên</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(source, index) in group.sources" :key="source.id">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ source.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "group-user-detail",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    group: Object
  }
};
</script>

<style scoped>
.v-card__title.headline {
  background-color: #3f84d8;
}
</style>
