<template>
    <div>
        <v-row justify="center">
                  <v-dialog v-model="dialogupdate" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="success" dark v-on="on" rounded>Cập nhật</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Cập nhật bộ phận</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentCodeTxtUpdate" label="Mã bộ phận*" required v-model="department.organizationCode"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentLevelIdTxtUpdate"
                                label="Mã cấp bậc*" 
                                hint="Mã cấp bậc của bộ phận lấy trong bảng cấp bậc bộ phận"
                               required v-model="department.organizationLevelId"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentNameTxtUpdate"
                                label="Tên bộ phận*"
                                hint="Tên chính thức sử dụng cho bộ phận"
                                persistent-hint
                                required v-model="department.organizationName"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea label="Mô tả" id="txtAreaDescriptionTxtUpdate" v-model="department.organizationDescription"></v-textarea>
                            </v-col>
                            
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text v-on:click="UpdateDepartment(department.id)">Cập nhật</v-btn>
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
    name: "UpdateDepartment",
    data() {
    return {
        dialogupdate: false
    };
    },
    props: {
        department: Object
    },
    methods:{
        async UpdateDepartment(id)
        {
          var code = String(document.getElementById("departmentCodeTxtUpdate").value);
          var description = String(document.getElementById("txtAreaDescriptionTxtUpdate").value);
          var levelId = String(document.getElementById("departmentLevelIdTxtUpdate").value);
          var name = String(document.getElementById("departmentNameTxtUpdate").value);
          var levelName;
          switch(levelId)
          {
            case 1: levelName = "HĐQT"; break;
            case 2: levelName = "BGĐ"; break;
            case 3: levelName = "Phòng ban"; break;
            case 4: levelName = "Tổ"; break;
          }

        await departmentService.updateDepartment(id, code, description, levelId, levelName, name);
        alert("Cập nhật bộ phận thành công");
        var response = await departmentService.getAllDepartment();
        this.datas = response.data;
        this.dialogupdate = false;
        }
    }
}
</script>