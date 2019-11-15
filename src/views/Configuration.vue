<template>
    <v-container>   
    <br>
    <v-simple-table style="width:100%;">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">Mã bộ phận</th>
                    <th class="text-center">Tên bộ phận</th>
                    <th class="text-center">Tên cấp bộ phận</th>
                    <th class="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="department in datas" :key="department.id">
                    <td class="text-center">{{ department.organizationCode }}</td>
                    <td class="text-center">{{ department.organizationName }}</td>                  
                    <td class="text-center">{{ department.organizationLevelName }}</td>
                    <td>
                        <div class="d-flex justify-space-around">
                <v-row justify="center">
                  <v-btn color="primary" dark @click.stop="dialogdetail = true" rounded>Chi tiết</v-btn>
                  <v-dialog v-model="dialogdetail" max-width="768">
                    <v-card>
                      <v-card-title class="headline">Công thức tính KPI</v-card-title>
                      <v-card-text>Mô tả công thức</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogdetail = false">Đóng</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
                <v-row justify="center">
                  <v-dialog v-model="dialogupdate" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="success" dark v-on="on" rounded>Cập nhật</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Công thức tính KPI</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogupdate = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text @click="dialogupdate = false">Cập nhật</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
                <v-row justify="center">
                  <v-dialog v-model="dialogdelete" persistent max-width="270">
                    <template v-slot:activator="{ on }">
                      <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Xóa công thức tính KPI bộ phận?</v-card-title>
                      <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text v-on:click="deleted(department.id);">Đồng ý</v-btn>
                        <v-btn color="green darken-1" text @click="dialogdelete = false">Hủy</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </div>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
    </v-container>
</template>


<style>
    .tab {
        width: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
    }

        /* Style the buttons that are used to open the tab content */

            /* Change background color of buttons on hover */
            .tab button:hover {
                background-color: #ddd;
            }

            /* Create an active/current tablink class */
            .tab button.active {
                background-color: #ccc;
            }

    /* Style the tab content */
    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-top: none;
    }
</style>

<script>
import Department from "../DepartmentService.js";
const departmentService = new Department();
export default {
  name: "Tab",
  data() {
    return {
      datas: [],
      levelDatas:[],
      dialogdetail: false,
      dialogupdate: false,
      dialogdelete: false
    };
  },
  methods:{
      openCity(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    },
    async deleted(id)
    {
      await departmentService.deleteDepartment(id);
      alert("Xóa bộ phận thành công");
      var response = await departmentService.getAllDepartment();
      this.datas = response.data;
      location.reload();
    }
  },
  async created()
  {
    var response = await departmentService.getAllDepartment();
    this.datas = response.data;
    
    var levelResponse = await departmentService.getAllDepartmentLevel();
    this.levelDatas = levelResponse.data;
  },

  
};
</script>