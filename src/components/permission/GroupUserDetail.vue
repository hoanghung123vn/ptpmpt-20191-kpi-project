<template>
  <v-container>
    <v-btn color="primary" dark @click.stop="dialog = true" rounded>Chi tiết</v-btn>
    <v-dialog v-model="dialog" persistent max-width="576">
      <v-card>
        <v-card-title class="headline">Chi tiết nhóm quyền</v-card-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Tên nhóm quyền: {{ group.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <p>Các nhóm quyền cha:</p>
              <p v-if="group.abstract.length === 0">Không có</p>
              <p v-for="abstract in group.abstract" :key="abstract._id">{{ abstract.name }}</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Ngày tạo: {{ new Date(group.createdAt).toGMTString() }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Ngày cập nhật: {{ new Date(group.updatedAt).toGMTString() }}</v-list-item-title>
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
  color: white;
}
</style>
