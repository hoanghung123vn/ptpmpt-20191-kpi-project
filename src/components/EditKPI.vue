<template>
  <v-row justify="center">
    <v-dialog v-model="dialogupdate" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on" rounded>Cập nhật</v-btn>
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
                <v-text-field label="Tên tiêu chí*" required v-model="department.name" :rules="requiredRule"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Tỉ lệ*" required v-model="department.ratio" :rules="requiredRule"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Chú thích" required v-model="department.note"></v-text-field>
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
      requiredRule: [v => !!v || "The field is required!!!"]
    };
  },
   props: {
    department: Object
  },
  methods: {
    updateKPI() {
      if (this.$refs.form.validate()) {   
        //console.log("validate");
        bus.$emit("updateKPI", this.department);
        this.dialogupdate = false;
      }
      
    }
  }
};
</script>

<style>
</style>
