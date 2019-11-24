<template>
    <div>
        <v-row justify="center">
                  <v-dialog v-model="dialogupdatelevel" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="success" dark v-on="on" rounded>Cập nhật</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Cập nhật cấp bộ phận</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field v-model="departmentLevel.levelName" id="departmentLevelCodeUpdate" label="Tên cấp bộ phận*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea v-model="departmentLevel.levelDescription" label="Mô tả cấp bộ phận" id="departmentLevelDescriptionUpdate"></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogupdatelevel = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text v-on:click="UpdateLevelDepartment(departmentLevel.id)">Cập nhật</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
    </div>
</template>

<script>
import DepartmentService from "../DepartmentService.js";
const departmentService = new DepartmentService();
export default {
    name: "UpdateDepartmentLevel",
    data() {
    return {
        dialogupdatelevel: false
    };
    },
    props: {
        departmentLevel: Object
    },
    methods:{
        async UpdateLevelDepartment(id)
        {
        var levelName = String(document.getElementById("departmentLevelCodeUpdate").value);
        var levelDescription = String(document.getElementById("departmentLevelDescriptionUpdate").value); 
        await departmentService.updateLevelDepartment(id,levelName, levelDescription);
        alert("Cập nhật cấp bộ phận thành công");
        var levelResponse = await departmentService.getAllDepartmentLevel();
        this.levelDatas = levelResponse.data;
        this.dialogupdatelevel = false;
        }
    }
}
</script>