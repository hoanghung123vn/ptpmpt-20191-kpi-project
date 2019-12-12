<template>
  <div>
    <v-btn class="mb-4" color="success" @click="dialog = !dialog">Thêm nhóm quyền mới</v-btn>
    <v-dialog v-model="dialog" width="678px" persistent>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
          <v-card-title class="success">Tạo nhóm quyền mới</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  placeholder="Tên nhóm quyền"
                  v-model="name"
                  required
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="items"
                  v-model="listAbstract"
                  label="Chọn nhóm quyền cha"
                  item-text="name"
                  multiple
                  return-object
                  :menu-props="{ maxHeight: '400' }"
                  :rules="requiredRule"
                  chips
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="dialog = false">Hủy</v-btn>
            <v-btn text @click="addGroup" :disabled="!valid">Tạo</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import PermissionService from "../../PermissionService";
const permissionService = new PermissionService();
import bus from "../../bus";
export default {
  name: "AddGroup",
  data() {
    return {
      dialog: false,
      name: "",
      valid: true,
      requiredRule: [v => !!v || "This field is required"],
      listAbstract: []
    };
  },
  created() {},
  props: {
    items: Array
  },
  methods: {
    async addGroup() {
      if (this.$refs.form.validate()) {
        try {
          const response = await permissionService.createRole(
            this.name,
            this.listAbstract
          );
          bus.$emit("addGroup", response.data);
          this.dialog = false;
          this.name = "";
          this.listAbstract = [];
          this.$swal("Great!", "Tạo mới thành công", "success");
        } catch (error) {
          this.dialog = false;
          this.name = "";
          this.listAbstract = [];
          this.$swal("Ohh!", "Tạo mới thất bại, hãy thử lại", "error");
        }
      }
    }
  }
};
</script>

<style>
</style>
