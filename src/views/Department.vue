<template>
    <v-container>
    <div id="handler_bar">         
                  <v-dialog v-model="dialogCreate" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" rounded>
                        <v-icon>mdi-plus</v-icon>
                        <span>Thêm mới bộ phận</span></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Thêm mới bộ phận</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentCodeTxt" label="Mã bộ phận*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentLevelIdTxt"
                                label="Mã cấp bậc*" 
                                hint="Mã cấp bậc của bộ phận lấy trong bảng cấp bậc bộ phận"
                               required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentNameTxt"
                                label="Tên bộ phận*"
                                hint="Tên chính thức sử dụng cho bộ phận"
                                persistent-hint
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea label="Mô tả" id="txtAreaDescriptionTxt"></v-textarea>
                            </v-col>
                            
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text v-on:click="createDepartment();" >Thêm mới</v-btn>
                        <v-btn color="blue darken-1" text @click="dialogCreate = false">Hủy</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
                    <th class="text-center">Cấp bộ phận</th>
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
                  <v-btn color="primary" dark v-on:click="detail(department.id);" rounded>Chi tiết</v-btn>
                  <!-- <v-dialog v-model="dialogdetail" max-width="768">
                    <v-card>
                      <v-card-title class="headline">Thông tin chi tiết người dùng</v-card-title>
                      <v-card-text>Thông tin người dùng</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogdetail = false">Đóng</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog> -->
                </v-row>
                <UpdateDepartment :department="department"/>
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
        <v-btn class="tablinks" v-on:click="openCity(event, 'position')">Phân quyền theo chức danh</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'kpiEquation')">KPI bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'log')">Nhật ký hoạt động</v-btn>
    </div> 
    <div id="tabController">   
        <div id="departmentLevel" class="tabcontent">
            <v-simple-table style="width:100%;">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">Mã cấp bậc</th>
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
        <div id="departmentUser" class="tabcontent">
          <v-row style="margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%;">
            <v-dialog v-model="dialogPosition" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" rounded>
                        <v-icon>mdi-plus</v-icon>
                        <span>Thêm mới</span></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Thêm mới chức danh</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentCode" label="Mã bộ phận*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentLevelId"
                                label="Mã cấp bậc*" 
                                hint="Mã cấp bậc của bộ phận lấy trong bảng cấp bậc bộ phận"
                               required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentName"
                                label="Tên bộ phận*"
                                hint="Tên chính thức sử dụng cho bộ phận"
                                persistent-hint
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea label="Mô tả" id="txtAreaDescription"></v-textarea>
                            </v-col>
                            
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogPosition = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text @click="dialogPosition = false">Thêm mới</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
          </v-row>
          <v-simple-table style="width:100%;">
          <template>
              <thead>
                    <tr>
                        <th class="text-center">Mã chức danh</th>
                        <th class="text-center">Tên chức danh</th>
                        <th class="text-center">Cấp bộ phận</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pos) in position" :key="pos.id">
                        <td class="text-center">{{ pos.id}}</td>
                        <td class="text-center">{{ pos.positionName }}</td>
                        <td class="text-center">{{ pos.levelId}}</td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
        </div>
        <div id="position" class="tabcontent">
           <v-row style="margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%;">
            <v-dialog v-model="dialogPositionRole" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" rounded>
                        <v-icon>mdi-plus</v-icon>
                        <span>Thêm mới</span></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Thêm mới chức danh</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentCode" label="Mã bộ phận*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentLevelId"
                                label="Mã cấp bậc*" 
                                hint="Mã cấp bậc của bộ phận lấy trong bảng cấp bậc bộ phận"
                               required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field id="departmentName"
                                label="Tên bộ phận*"
                                hint="Tên chính thức sử dụng cho bộ phận"
                                persistent-hint
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea label="Mô tả" id="txtAreaDescription"></v-textarea>
                            </v-col>
                            
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogPositionRole = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text @click="dialogPositionRole = false">Thêm mới</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
          </v-row>
          <v-simple-table style="width:100%;">
          <template>
              <thead>
                    <tr>
                        <th class="text-center">Mã chức danh</th>
                        <th class="text-center">Mã phân quyền</th>
                        <th class="text-center">Ngày tạo</th>
                        <th class="text-center">Ngày cập nhật</th>
                        <th class="text-center">Tên quyền</th>
                        <th class="text-center">Mô tả</th>
                        <th class="text-center">url</th>
                        <th class="text-center">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(posRole) in positionRoleArr" :key="posRole.id">
                        <td class="text-center">{{ 1}}</td>
                        <td class="text-center">{{ posRole.id }}</td>
                        <td class="text-center">{{ posRole.createdDate}}</td>
                        <td class="text-center">{{ posRole.lastUpdated}}</td>
                        <td class="text-center">{{ posRole.name }}</td>
                        <td class="text-center">{{ posRole.description}}</td>
                        <td class="text-center">{{ posRole.url }}</td>
                        <td class="text-center">{{ posRole.statusId}}</td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
        </div>
        <div id="kpiEquation" class="tabcontent"><v-simple-table style="width:100%;">

            <template>
              <thead>
                    <tr>
                        <th class="text-center">Mã bộ phận</th>
                        <th class="text-center">Tên tiêu chí KPI</th>
                        <th class="text-center">Tỉ lệ tiêu chí</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for="(pos) in criteriasDatas" :key="pos.id">
                        <td class="text-center">{{ pos.id}}</td>
                        <td class="text-center">{{ pos.positionName }}</td>
                        <td class="text-center">{{ pos.levelId}}</td>
                    </tr> -->
                </tbody>
            </template>
          </v-simple-table></div>
        <div id="log" class="tabcontent">
          
        </div>
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
import UpdateDepartment from "../components/UpdateDepartment";
export default {
  name: "Tab",
  components:{
    UpdateDepartment
  },
  data() {
    return {
      datas: [],
      levelDatas:[],
      criteriasDatas:[],
      position:[],
      positionRoleArr:[],
      filter: [
        "Tên bộ phận",
        "Cấp bộ phận",
      ],
      dialogCreate: false,
      dialogPosition: false,
      dialogPositionRole:false,
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
      alert(id);
      // await departmentService.deleteDepartment(id);
      // alert("Xóa bộ phận thành công");
      // var response = await departmentService.getAllDepartment();
      // this.datas = response.data;
      
    },
    async criteriasDepartment(id)
    {
      var response = await departmentService.criteriasDepartment(id);
      this.criteriasDatas = response.data;
    },
    async positionDepartment(id)
    {
      var positionResponse = await departmentService.positionDepartment(id);
      this.position = positionResponse.data;
    },
    async positionRole(positionId)
    {
      var positionRole = await departmentService.positionRole(positionId);
      this.positionRoleArr = positionRole.data;
    },
    async createDepartment()
    {
      var code = String(document.getElementById("departmentCodeTxt").value);
      var description = String(document.getElementById("txtAreaDescriptionTxt").value);
      var levelId = String(document.getElementById("departmentLevelIdTxt").value);
      var name = String(document.getElementById("departmentNameTxt").value);
      var levelName;
      switch(levelId)
      {
        case 1: levelName = "HĐQT"; break;
        case 2: levelName = "BGĐ"; break;
        case 3: levelName = "Phòng ban"; break;
        case 4: levelName = "Tổ"; break;
      }

      await departmentService.createDepartment(code, description, levelId, levelName, name);
      alert("Tạo bộ phận thành công");
      var response = await departmentService.getAllDepartment();
      this.datas = response.data;
      this.dialogCreate = false;
    },
    async detail(id)
    {
      alert("Dữ liệu chi tiết được nạp vào tab con bên dưới");
      this.criteriasDepartment(id);
      this.positionDepartment(id);
      this.positionRole(id);
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