<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="678px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded>Chỉnh sửa</v-btn>
      </template>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline">Tiêu chí KPI</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Tên*" required v-model="name" :rules="nameRules"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Tỉ lệ" required v-model="ratio" :rules="ratioRules"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Chú thích" required v-model="note"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*chỉ ra các trường bắt buộc</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
            <v-btn color="blue darken-1" text @click="updateKPI" :disabled="!valid">Cập nhật</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import bus from "../bus";
export default {
  name: "EditKPI",
  data() {
    return {
      valid: true,
      dialogupdate: false,
      nameRules: [v => !!v || "Name is required"],
      ratioRules: [v => !!v || "Ratio is required"],
      name: this.department.name,
      ratio: this.department.ratio,
      note: this.department.note,
      id: this.department.id,
      tieuchi: Object
    };
  },
   props: {
    department: Object
  },
  methods: {
    updateKPI() {
      if (this.$refs.form.validate()) { 
        this.getObjectDer();
        bus.$emit("updateKPI", this.tieuchi);
        this.dialogupdate = false;
      }
    },
    async getObjectDer()
    {
       this.tieuchi = {
        id: this.id,
        name: this.name,
        ratio : this.ratio,
        note: this.note
      }
    }
  }
};
</script>

<style>
</style>