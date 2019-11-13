<template>
    <v-container>
    <div id="handler_bar">
        <v-btn color="primary">
            <v-icon>mdi-plus</v-icon>
            <span>Thêm mới bộ phận</span>
        </v-btn>
        <div style="float: right;">
            <v-text-field id="search_input" single-line outlined append-icon="mdi-magnify" placeholder="Nhập để tìm kiếm" />
            <v-select label="Lựa chọn điều kiện lọc" v-bind:items="filter" style="float: left">
                
            </v-select>
            <v-btn style="margin-top:10px; margein-left:5px;" type="button" color="primary" id="sidebarCollapse" class="btn btn-info navbar-btn">
                <v-icon>mdi-magnify</v-icon>
                <span>Tìm kiếm</span>
            </v-btn>
        </div>
    </div>
    
    <br>
    <div style="margin-top:10%;">
<v-simple-table style="width:100%;">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">Mã bộ phận</th>
                    <th class="text-center">Tên bộ phận</th>
                    <th class="text-center">Mô tả</th>
                    <th class="text-center">Tên cấp bộ phận</th>
                    <th class="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="department in datas" :key="department.id">
                    <td class="text-center">{{ department.organizationCode }}</td>
                    <td class="text-center">{{ department.organizationName }}</td>
                    <td class="text-center">{{ department.organizationDescription }}</td>
                    <td class="text-center">{{ department.organizationLevelName }}</td>
                    <td>
                        <div class="d-flex justify-space-around">
                <v-row justify="center">
                  <v-btn color="primary" dark @click.stop="dialogdetail = true" rounded>Chi tiết</v-btn>
                  <v-dialog v-model="dialogdetail" max-width="768">
                    <v-card>
                      <v-card-title class="headline">Thông tin chi tiết người dùng</v-card-title>
                      <v-card-text>Thông tin người dùng</v-card-text>
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
                        <span class="headline">Hồ sơ người dùng</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Legal first name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Legal middle name"
                                hint="example of helper text only on focus"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Legal last name*"
                                hint="example of persistent helper text"
                                persistent-hint
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field label="Email*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field label="Password*" type="password" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                :items="['0-17', '18-29', '30-54', '54+']"
                                label="Age*"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-autocomplete
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interests"
                                multiple
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
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
                      <v-card-title class="headline">Xóa bộ phận?</v-card-title>
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
    </div>
    
    <br>
    <div class="tab">
        <v-btn class="tablinks" v-on:click="openCity(event, 'departmentLevel')">Cấp bậc bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'departmentUser')">Cơ cấu bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'position')">Chức danh</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'kpiEquation')">Lưới tiêu chí KPI</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'log')">Nhật ký hoạt động</v-btn>
    </div> 
    <div id="tabController">   
        <div id="departmentLevel" class="tabcontent">
            <v-simple-table style="width:100%;">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">STT</th>
                        <th class="text-center">Tên cấp bộ phận</th>
                        <th class="text-center">Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(level, index) in levelDatas" :key="level.id">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-center">{{ level.levelName }}</td>
                        <td class="text-center">{{ level.levelDescription }}</td>
                    </tr>
                </tbody>
            </template>
            </v-simple-table>
        </div>
        <div id="departmentUser" class="tabcontent">2</div>
        <div id="position" class="tabcontent">3</div>
        <div id="kpiEquation" class="tabcontent">4</div>
        <div id="log" class="tabcontent">5</div>
    </div>
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
        .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
        }

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
      filter: [
        "Tên bộ phận",
        "Cấp bộ phận",
      ],
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