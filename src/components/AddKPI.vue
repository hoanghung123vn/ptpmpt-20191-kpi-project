<template>
  <div>
    <v-btn class="mb-4" color="success" @click="dialog = !dialog">Thêm tiêu chí mới</v-btn>
    <v-dialog v-model="dialog" width="576px" persistent>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
          <v-card-title class="success">Thêm tiêu chí</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field placeholder="Tên tiêu chí" v-model="name" required :rules="nameRules" />
              </v-col>
              <v-col cols="12">
                <v-text-field placeholder="Tỉ lệ" v-model="ratio" required :rules="ratioRules" />
              </v-col>
              <v-col cols="12">
                <v-text-field placeholder="Chú thích" v-model="note" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="dialog = false">Hủy</v-btn>
            <v-btn text @click="addKPI" :disabled="!valid">Thêm</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
// import UserService from "../UserService";
// const userService = new UserService();
import bus from "../bus";
export default {
  name: "AddKPI",
  data() {
    return {
      valid: true,
      dialog: false,
      name: "",
      ratio: "",
      note: "",
      id: "",
      tieuchi: Object,
      nameRules: [v => !!v || "Name is required"],
      ratioRules: [v => !!v || "Ratio is required"],
    };
  },
  methods: {
    addKPI() {
      if (this.$refs.form.validate()) {
        this.getObjectDer();
        bus.$emit("addKPI", this.tieuchi);
        this.dialog = false;
        this.setDataObjectDer();
      }
    },
    async getObjectDer(){
       this.tieuchi = {
        id: this.id,
        name: this.name,
        ratio : this.ratio,
        note: this.note
      }
    },
    async setDataObjectDer(){
      this.name = "",
      this.ratio = "",
      this.note = "",
      this.id = ""
    }
  }
};
</script>

<style>
</style>