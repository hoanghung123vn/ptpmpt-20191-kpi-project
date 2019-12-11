<template>
    <v-container>
      <div>
      <p style="color:blue;"><b>DANH SÁCH CẤP BỘ PHẬN TRỰC THUỘC CÔNG TY</b></p>
      <div >
      <v-dialog v-model="dialogCreateDeptLevel" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" rounded>
                        <v-icon>mdi-plus</v-icon>
                        <span>Thêm mới cấp bộ phận</span></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Thêm mới cấp bộ phận</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field id="departmentLevelCodeTxt" label="Tên cấp bộ phận*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea label="Mô tả cấp bộ phận" id="departmentLevelDescriptionTxt"></v-textarea>
                            </v-col>
                            
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text v-on:click="createLevelDepartment();">Thêm mới</v-btn>
                        <v-btn color="blue darken-1" text @click="dialogCreateDeptLevel = false">Hủy</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
        </div>
    <v-simple-table style="width:100%;">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">Mã cấp bậc</th>
                        <th class="text-center">Tên cấp bộ phận</th>
                        <th class="text-center">Mô tả</th>
                       <th class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="level in levelDatas" :key="level.id">
                        <td class="text-center">{{ level.id }}</td>
                        <td class="text-center">{{ level.levelName }}</td>
                        <td class="text-center">{{ level.levelDescription }}</td>
                        <td>
                           <div class="d-flex justify-space-around">
                          <UpdateDepartmentLevel :departmentLevel="level"/>
                          <DeleteDepartmentLevel :departmentLevel="level"/>
                          </div>
                        </td>
                    </tr>
                </tbody>
            </template>
            </v-simple-table> 
    </div>
    <div  class="text-right mt-5">
      <v-pagination v-model="page" :length="1"></v-pagination>
    </div>
    <br>
    <div id="handler_bar">
      <p style="color:blue;"><b>DANH SÁCH BỘ PHẬN TRỰC THUỘC CÔNG TY</b></p>          
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
                              <!-- <v-text-field id="departmentLevelIdTxt"
                                label="Mã cấp bậc*" 
                                hint="Mã cấp bậc của bộ phận lấy trong bảng cấp bậc bộ phận"
                               required></v-text-field> -->
                               <v-select v-model="selectLevelForDepartment" label="Lựa chọn cấp bộ phận" id="departmenLeveltFilter" :items="levelDatas"
                                item-text="levelName" item-value="id" style="float: left">
                              </v-select>
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
            <v-select v-model="selectFilter" label="Lựa chọn điều kiện lọc" id="departmentFilter" :items="filter"
              item-text="name" style="float: left">
            </v-select>
            <v-btn v-on:click="search();" style="margin-top:10px; margein-left:5px;" type="button" color="primary" id="sidebarCollapse" class="btn btn-info navbar-btn">
                <v-icon>mdi-magnify</v-icon>
                <span>Tìm kiếm</span>
            </v-btn>
        </div>
    </div>
    <br>
    <div style="margin-top:10%;">
    <v-simple-table style="width:100%;" id="department_table">
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
                <tr class="table_row" v-for="department in datas" :key="department.id" v-bind:id="department.id">
                    <td class="text-center">{{ department.organizationCode }}</td>
                    <td class="text-center">{{ department.organizationName }}</td>
                    <td class="text-center">{{ department.organizationDescription }}</td>
                    <td class="text-center">{{ department.organizationLevelName }}</td>
                    <td>
                    <div class="d-flex justify-space-around">
                      <v-row justify="center">
                        <v-btn id="btnDetail" color="primary" dark v-on:click="detail(department.id, department.organizationLevelId);" rounded>Chi tiết</v-btn>
                      </v-row>
                      <UpdateDepartment :department="department"/>
                      <div style="width:25px;"></div>
                      <DeleteDepartment :department="department"/> 
              </div>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
    </div>
    <div  class="text-right mt-5">
      <v-pagination v-model="page" :length="1"></v-pagination>
    </div>
    <br>
      
    <p style="color:blue;"><b>Chi tiết bộ phận {{detailDepartment.organizationName}}</b></p>
    <div class="tab">
        
        <v-btn class="tablinks" v-on:click="openCity(event, 'departmentUser')">Cơ cấu bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'departmentPermission')">Bộ quyền của bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'position')">Phân quyền chức danh</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'comparePermission')">So sánh quyền</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'kpiEquation')">KPI bộ phận</v-btn>
        <v-btn class="tablinks" v-on:click="openCity(event, 'log')">Nhật ký hoạt động</v-btn>
    </div> 
    <div id="tabController">   
        <div id="departmentUser" class="tabcontent">
          <v-row style="margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%;">
            <v-dialog v-model="dialogPosition" persistent max-width="400px">
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
                            <v-col cols="12">
                              <p>Tên chức danh:</P>
                              <v-text-field id="departmentPositionName" style="width:100%;" label="Tên chức danh*" required></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogPosition = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text v-on:click="createPosition();">Thêm mới</v-btn>
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
                        <th class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pos) in position" :key="pos.id">
                        <td class="text-center">{{ pos.id}}</td>
                        <td class="text-center">{{ pos.positionName }}</td>
                        <td class="text-center">{{ pos.levelId}}</td>
                        <td>
                          <DeletePosition :pos="pos"/>
                        </td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
        </div>
        <div id="departmentPermission" class="tabcontent">
          <v-row style="margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%;">
            <v-dialog v-model="dialogDepartmentRule" persistent max-width="400px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" rounded>
                        <v-icon>mdi-plus</v-icon>
                        <span>Thêm mới</span></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Thêm mới quyền cho bộ phận</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <p>Quyền được thêm:</p>
                              <v-select v-model="selectedModule" label="Lựa chọn module quyền" id="moduleFilter" :items="allModule"
              item-text="name" item-value="id" style="float: left;width:100%;"></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogDepartmentRule = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text v-on:click="addDepartmentModule();">Thêm mới</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
          </v-row>
          <v-row style="margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%;">
            <v-dialog v-model="dialogDeleteDepartmentRule" persistent max-width="400px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="red" dark v-on="on" rounded>
                        <v-icon>mdi-delete</v-icon>
                        <span>Xóa quyền</span></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Xóa quyền cho bộ phận</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <p>Quyền bị xóa</p>
                              <v-select v-model="deleteModule" label="Lựa chọn module quyền"  :items="departmentModule"
              item-text="name" item-value="id" style="float: left;width:100%"></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogDeleteDepartmentRule = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text v-on:click="deleteDepartmentModule();">Xác nhận</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
          </v-row>
          <v-simple-table style="width:100%;">
          <template>
              <thead>
                    <tr>
                        <th class="text-center">Mã quyền</th>
                        <th class="text-center">Mã module</th>
                        <th class="text-center">Tên module</th>
                        <th class="text-center">Tên quyền</th>
                        <th class="text-center">Ngày tạo</th>
                        <th class="text-center">Ngày cập nhật cuối</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(permisson) in departmentPermission" :key="permisson.id">
                        <td class="text-center">{{ permisson.id}}</td>
                        <td class="text-center">{{ permisson.moduleId }}</td>
                        <td class="text-center">{{ permisson.description}}</td>
                        <td class="text-center">{{ permisson.name}}</td>
                        <td class="text-center">{{ new Date(permisson.createdDate).toLocaleDateString()}}</td>
                        <td class="text-center">{{new Date(permisson.lastUpdated).toLocaleDateString()}}</td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
        </div>
        <div id="position" class="tabcontent">
           <v-row style="margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%;">
            <v-dialog v-model="dialogPositionRole" persistent max-width="400px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" rounded>
                        <v-icon>mdi-plus</v-icon>
                        <span>Thêm mới</span></v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Thêm mới quyền cho chức danh</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <p>Chức danh:</p>
                              <v-select :items="position" item-value="id"
              item-text="positionName" v-model="selectPermissionRole" style="width:100%;" label="Lựa chọn chức danh"></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" >
                              <p>Quyền</p>
                              <v-select :items="departmentPermission" item-value="id"
              item-text="name" v-model="selectPermission" style="width:100%;" label="Lựa chọn quyền"></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small style="color:red;">* là các trường bắt buộc</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogPositionRole = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" text @click="addPermissionToRole()">Thêm mới</v-btn>
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
                        <th class="text-center">Mã quyền</th>
                        <th class="text-center">Ngày tạo</th>
                        <th class="text-center">Ngày cập nhật</th>
                        <th class="text-center">Tên quyền</th>
                        <th class="text-center">Mô tả</th>
                        <th class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(posRole) in positionRoleArr" :key="posRole.groupId">
                        <td class="text-center">{{ posRole.groupId}}</td>
                        <td class="text-center">
                          <v-select :items="position" item-value="id"
              item-text="positionName" v-model="posRole.groupId" disabled=true></v-select>
                        </td>
                        <td class="text-center">{{ posRole.id}}</td>
                        <td class="text-center">{{ new Date(posRole.createdDate).toLocaleDateString()}}</td>
                        <td class="text-center">{{ new Date(posRole.lastUpdated).toLocaleDateString()}}</td>
                        <td class="text-center">{{ posRole.name }}</td>
                        <td class="text-center">{{ posRole.description}}</td>
                        <td class="text-center">
                          <DeleteRolePermission :rolePermission="posRole"/>
                        </td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
        </div>
        <div id="comparePermission" class="tabcontent">
           <v-select v-model="firstRoleId" :items="position" item-value="id"
              item-text="positionName" style="width:100%; " label="Lựa chọn chức danh trong bộ phận"></v-select>
          <p>Vui lòng lựa chọn bộ phận muốn so sánh và chức danh trong bộ phận đó</p>
          <v-select @change="onClickChange();" v-model="secondRoleDepartment" :items="datas" item-value="id"
              item-text="organizationName" style="width:100%;" label="Lựa chọn bộ phận muốn so sánh"></v-select>
          <v-select id="secondRoleCompare"  v-model="secondRoleId" :items="secondPosition" item-value="id"
              item-text="positionName" style="width:100%;" label="Lựa chọn chức danh thứ hai muốn so sánh"></v-select>            
    
            <v-col cols="12">
              <v-btn v-on:click="comparePermission();" style="margin-top:10px;" type="button" color="primary" id="sidebarCollapse" class="btn btn-info navbar-btn">
                  <v-icon>mdi-magnify</v-icon>
                  <span>So sánh</span>
              </v-btn>
            </v-col>
            <br/>
            <div id="div_container" style="display:none">
            <p id="p_1" style="margin_left:15px; color:blue;"></p>
              <div id="div_role_1">
                 <v-simple-table style="width:100%;">
                  <template>
                    <thead>
                    <tr>
                        <th class="text-center">Mã quyền</th>
                        <th class="text-center">Ngày tạo</th>
                        <th class="text-center">Ngày cập nhật</th>
                        <th class="text-center">Tên quyền</th>
                        <th class="text-center">Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(posRole) in firstRole" :key="posRole.groupId">
                        <td class="text-center">{{ posRole.id}}</td>
                        <td class="text-center">{{ new Date(posRole.createdDate).toLocaleDateString()}}</td>
                        <td class="text-center">{{ new Date(posRole.lastUpdated).toLocaleDateString()}}</td>
                        <td class="text-center">{{ posRole.name }}</td>
                        <td class="text-center">{{ posRole.description}}</td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
              </div>
              <p id="p_2" style="margin_left:15px; color:blue;"></p>
              <div id="div_role_2">
                <v-simple-table style="width:100%;">
                  <template>
                    <thead>
                    <tr>
                        <th class="text-center">Mã quyền</th>
                        <th class="text-center">Ngày tạo</th>
                        <th class="text-center">Ngày cập nhật</th>
                        <th class="text-center">Tên quyền</th>
                        <th class="text-center">Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(posRole) in secondRole" :key="posRole.groupId">
                        <td class="text-center">{{ posRole.id}}</td>
                        <td class="text-center">{{ new Date(posRole.createdDate).toLocaleDateString()}}</td>
                        <td class="text-center">{{ new Date(posRole.lastUpdated).toLocaleDateString()}}</td>
                        <td class="text-center">{{ posRole.name }}</td>
                        <td class="text-center">{{ posRole.description}}</td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
              </div>
            </div>  
        </div>
        <div id="kpiEquation" class="tabcontent">
            <div >
              <div>
                <v-select @change="kpiChange();" v-model="kpiType" label="Lựa chọn điều kiện tìm kiếm" :items="kpiFilter"
                               style="float: left;width:300px;"></v-select>
              </div>
              <div style="float:right"> 
              <div id="kpiDate" style="display:none">
                <v-col cols="12">
                <p>Từ ngày: </p>
                  <datetime id="from_date" format="DD/MM/YYYY" width="300px" v-model="from_date" ></datetime>
                </v-col>
                <v-col cols="12">
                  <p>Tới ngày: </p>
                  <datetime id="to_date" format="DD/MM/YYYY" width="300px" v-model="to_date" ></datetime>
              </v-col>
              </div>
              <div id="kpiQuarter" style="display:none">
                 <p>Quý: </p>
                 <v-select v-model="kpi_quarter" :items="quarter" style="width:300px"></v-select>
                 <p>Năm: </p>
                 <v-text-field v-model="kpi_quarter_year" style="width:300px"></v-text-field>
              </div>
              <div id="kpiYear" style="display:none">
                <v-col cols="12">
                <p>Năm: </p>
                  <v-text-field v-model="kpi_year" style="width:300px"></v-text-field>
                </v-col>
              </div> 
                <v-col cols="12">
                  <v-btn v-on:click="getKpi();" style="margin-top:10px; margein-left:5px; float:right;" type="button" color="primary" id="sidebarCollapse" class="btn btn-info navbar-btn">
                  <v-icon>mdi-magnify</v-icon>
                  <span>Tìm kiếm</span>
                 </v-btn>
                </v-col>
               </div>

            </div>
            <p style="clear:both"></p>
            <br>
            <div>
            <v-simple-table style="width:100%;">
              <template>
              <thead>
                    <tr>
                        <th class="text-center">Từ ngày</th>
                        <th class="text-center">Đến ngày</th>
                        <th class="text-center">KPI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(kpi) in kpiArr" :key="kpi.deparmentId">
                        <td class="text-center">{{ kpi.startTime}}</td>
                        <td class="text-center">{{ kpi.endTime}}</td>
                        <td class="text-center">{{ kpi.kpiValue}}</td>
                    </tr>
                </tbody>
            </template>
          </v-simple-table>
            </div>
        </div>
        <div id="log" class="tabcontent">
          <v-simple-table style="width:100%;">
              <template>
              <thead>
                    <tr>
                        <th class="text-center">Số thứ tự</th>
                        <th class="text-center">Mã bộ phận(optional)</th>
                        <th class="text-center">Mã cấp bậc(optional)</th>
                        <th class="text-center">Mã chức danh(optional)</th>
                        <th class="text-center">Loại hành động</th>
                        <th class="text-center">Đối tượng tác động</th>
                        <th class="text-center">Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(logDepartment) in log" :key="logDepartment.id">
                        <td class="text-center">{{logDepartment.id}}</td>
                        <td class="text-center">{{logDepartment.organizationId}}</td>
                        <td class="text-center">{{logDepartment.levelId}}</td>
                        <td class="text-center">{{logDepartment.positionId}}</td>
                        <td class="text-center">{{logDepartment.typeAction}}</td>
                        <td class="text-center">{{logDepartment.typeObject}}</td>
                        <td class="text-center">{{logDepartment.time}}</td>
                    </tr>
                </tbody>
                
            </template>
          </v-simple-table>
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
import DeleteDepartment from "../components/DeleteDepartment";
import UpdateDepartmentLevel from "../components/UpdateDepartmentLevel";
import DeleteDepartmentLevel from "../components/DeleteDepartmentLevel";
import DeletePosition from "../components/DeletePosition";
import datetime from 'vuejs-datetimepicker';
import DeleteRolePermission from "../components/DeleteRolePermission";

export default {
  name: "Tab",
  components:{
    UpdateDepartment,
    DeleteDepartment,
    UpdateDepartmentLevel,
    DeleteDepartmentLevel,
    datetime,
    DeletePosition,
    DeleteRolePermission
  },
  data() {
    return {
      log: [
      ],
      page:1,
      departmentModule:[],
      departmentPermission:[],
      selectLevelForDepartment:0,
      selectFilter:"",
      datas: [],
      levelDatas:[],
      criteriasDatas:[],
      position:[
      ],
      positionRoleArr:[
      ],
      filter: [
        "Tên bộ phận",
        "Cấp bộ phận",
      ],
      detailDepartment:[],
      dialogCreateDeptLevel:false,
      dialogCreate: false,
      dialogPosition: false,
      dialogPositionRole:false,
      dialogdetail: false,
      dialogupdate: false,
      dialogdelete: false,
      dialogDepartmentRule: false,
      levelId: 0,
      lastDetailId: -1,
      kpi:{
        
      },
      from_date: "",
      to_date: "",
      kpiArr:[],
      kpiType: "",
      kpiFilter: [
        "Theo ngày",
        "Theo quý",
        "Theo năm",
      ],
      kpi_year:"",
      kpi_quarter:-1,
      quarter: [
        1,
        2,
        3,
        4
      ],
      allModule:[],
      selectedModule: -1,
      dialogDeleteDepartmentRule: false,
      deleteModule: -1,
      selectPermissionRole: -1,
      selectPermission:-1,
      kpi_quarter_year: 2019,
      firstRoleId: -1,
      secondRoleDepartment: -1,
      secondRoleId: -1,
      secondPosition: [],
      firstRole:[],
      secondRole:[],
    };
  },
  methods:{
      openCity(evt, cityName) {
        // Declare all variables
        if(this.lastDetailId == -1)
        {
          alert("Vui lòng lựa chọn chi tiết một bộ phận trong danh mục \"DANH SÁCH BỘ PHẬN TRỰC THUỘC CÔNG TY\" để thao tác !");
          return;
        }
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
    async positionRole()
    {
      var list = "";
      for(var i=0;i<this.position.length;i++)
      {
        if(i==this.position.length-1)
          list+=this.position[i].id;
        else
          list+=this.position[i].id+",";
      }
      var positionRole = await departmentService.positionRole(list);
      this.positionRoleArr = positionRole.data;
      // console.log(this.positionRoleArr);
    },
    async createDepartment()
    {
      var code = String(document.getElementById("departmentCodeTxt").value);
      var description = String(document.getElementById("txtAreaDescriptionTxt").value);
      var levelId = this.selectLevelForDepartment;
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
    async detail(id, levelId)
    {
      this.lastDetailId = id;
      this.levelId = levelId;
      alert("Dữ liệu chi tiết được nạp vào tab con bên dưới");
      var detailDepartmentRes = await departmentService.getDepartmentDetail(id);
      this.detailDepartment = detailDepartmentRes.data;
      //this.criteriasDepartment(id);
      var all = document.getElementsByClassName('table_row');
      for (var i = 0; i < all.length; i++) {
          all[i].style.backgroundColor = 'white';
      }

      var currentNode = document.getElementById(id);
      currentNode.style.backgroundColor ="yellow";
      
      this.positionDepartment(id);
      this.getDepartmentPermission(id);

      var dModule = await departmentService.getDepartmentModule(this.lastDetailId);
      // console.log(dModule.data);
      this.departmentModule = dModule.data;
      this.positionRole();
    },

    async getDepartmentPermission(id)
    {
      var response = await departmentService.getDepartmentPermission(id);
      this.departmentPermission = response.data;
    },

    async createPosition()
    {
      var pName = document.getElementById("departmentPositionName").value;
      await departmentService.createPosition(pName,this.lastDetailId,this.levelId);
      alert("Thêm mới chức danh thành công");
      this.dialogPosition = false;
      this.positionDepartment(this.lastDetailId);
    },

    async createLevelDepartment()
    {
        var levelName = String(document.getElementById("departmentLevelCodeTxt").value);
        var levelDescription = String(document.getElementById("departmentLevelDescriptionTxt").value);
        await departmentService.createLevelDepartment(levelName, levelDescription);
        alert("Thêm mới cấp bộ phận thành công !");
        var levelResponse = await departmentService.getAllDepartmentLevel();
        this.levelDatas = levelResponse.data;
        this.dialogCreateDeptLevel = false;
    },

    async search()
    {
        var keyword = document.getElementById("search_input").value;
        var filter = this.selectFilter;
        if(filter == "")
        {
          alert("Vui lòng chọn điều kiện lọc");
          return;
        }
        if(filter == "Tên bộ phận")
        {
          var resp = await departmentService.findByname(keyword);
          this.datas = resp.data;
        }
        else 
        {
          if(isNaN(keyword))
          {
            alert("Cấp bộ phận yêu cầu số");
            return;
          }
          var res = await departmentService.findByLevelId(keyword);
          this.datas = res.data;
        }
    },
    
    async getKpi()
    {
      var currentYear = new Date().getFullYear(); 
      if(this.kpiType == "Theo ngày")
      {
        var resDate = await departmentService.getKpi(this.from_date, this.to_date, this.lastDetailId);
        var arrDate = [];
        arrDate.push(resDate.data.data);
        // console.log(resDate.data.data);
        this.kpiArr = arrDate;
      }

      if(this.kpiType == "Theo năm")
      {
        if(isNaN(this.kpi_year))
        {
          alert("Năm phải là số !");
          return;
        }
        
        if(parseInt(this.kpi_year)<2000 || parseInt(this.kpi_year)>parseInt(currentYear))
        {
          alert("Giá trị năm không hợp lệ !");
          return;
        }
        var resYear = await departmentService.getKpiYear(this.kpi_year,this.lastDetailId);
        var arrYear = [];
        arrYear.push(resYear.data.data);
        // console.log(resYear.data.data);
        this.kpiArr = arrYear;
      }

      if(this.kpiType == "Theo quý")
      {
        if(this.kpi_quarter == -1 || this.kpi_quarter_year == -1)
        {
          alert("Quý và năm không được bỏ trống");
          return;
        }
        if(parseInt(this.kpi_quarter_year)<2000 || parseInt(this.kpi_quarter_year)>parseInt(currentYear))
        {
          alert("Giá trị năm không hợp lệ !");
          return;
        }
        var resQuar = await departmentService.getKpiQuarter(this.kpi_quarter,this.kpi_quarter_year,this.lastDetailId);
        var arrQuar = [];
        arrQuar.push(resQuar.data.data);
        // console.log(resQuar.data.data);
        this.kpiArr = arrQuar;
      }
      
    },

    kpiChange()
    {
      var kpiDate = document.getElementById("kpiDate");
      var kpiYear = document.getElementById("kpiYear");
      var kpiQuarter = document.getElementById("kpiQuarter");
      kpiDate.style.display = 'none';
      kpiYear.style.display = 'none';
      kpiQuarter.style.display = 'none';
      if(this.kpiType == "Theo ngày")
      {
        kpiDate.style.display = 'block';
      }

      if(this.kpiType == "Theo năm")
      {
        kpiYear.style.display = 'block';
      }

      if(this.kpiType == "Theo quý")
      {
        kpiQuarter.style.display = 'block';
      }
    },

    async addDepartmentModule()
    {
      if(this.selectedModule == -1)
      {
        alert("Vui lòng lựa chọn quyền");
        return;
      }
      for(var i =0;i<this.departmentPermission.length;i++)
      {
        if(this.selectedModule == this.departmentPermission[i].moduleId)
        {
          alert("Bộ phận đã quyền này !");
          return;
        }
      }
      await departmentService.addDepartmentModule(this.selectedModule, this.lastDetailId);
      alert("Thêm quyền thành công !");
      this.getDepartmentPermission(this.lastDetailId);
      this.dialogDepartmentRule =false;
    },

    async deleteDepartmentModule()
    {
      if(this.deleteModule == -1)
      {
        alert("Vui lòng lựa chọn quyền muốn xóa");
        return;
      }
      await departmentService.deleteDepartmentModule(this.deleteModule, this.lastDetailId);
      alert("Xóa quyền thành công");
      this.getDepartmentPermission(this.lastDetailId);
      this.dialogDeleteDepartmentRule = false;
    },

    async addPermissionToRole()
  {
    if(this.selectPermission == -1 || this.selectPermissionRole == -1)
    {
      alert("Chức danh hoặc quyền còn trống ! Vui lòng lựa chọn");
      return;
    }
    await departmentService.addRolePermission(this.selectPermission,this.selectPermissionRole);
    alert("Thêm quyền cho chức danh thành công");
    this.dialogPositionRole = false;
    this.positionRole();
  },
  async onClickChange()
  {
    var responseRole = await departmentService.positionDepartment(this.secondRoleDepartment);
    this.secondPosition = responseRole.data;
  },
  
  async comparePermission()
  {
    if(this.firstRoleId == -1 || this.secondRoleId == -1)
    {
      alert("Vui lòng lựa chọn đầy đủ thông tin");
      return;
    }
    var firstDetailPos = await departmentService.getDetailPosition(this.firstRoleId);
    var firstPosName = firstDetailPos.data["positionName"];
    var firstDep = await departmentService.getDepartmentDetail(this.lastDetailId);
    var firstDepName = firstDep.data["organizationName"];
    document.getElementById("p_1").innerHTML = "Chi tiết quyền "+firstPosName+" - Bộ phận: "+firstDepName;
    var secondDetailPos = await departmentService.getDetailPosition(this.firstRoleId);
    var secondPosName = secondDetailPos.data["positionName"];
    var secondDep = await departmentService.getDepartmentDetail(this.secondRoleDepartment);
    var secondDepName = secondDep.data["organizationName"];
    document.getElementById("p_2").innerHTML = "Chi tiết quyền"+secondPosName+" - Bộ phận: "+secondDepName;
    document.getElementById("div_container").style.display = 'block';
    var firstRes = await departmentService.positionRole(this.firstRoleId);
    this.firstRole = firstRes.data;
    var secondRes = await departmentService.positionRole(this.secondRoleId);
    this.secondRole = secondRes.data;

  }
    
  },
  async created()
  {
    var response = await departmentService.getAllDepartment();
    this.datas = response.data;
    
    var levelResponse = await departmentService.getAllDepartmentLevel();
    this.levelDatas = levelResponse.data;

    var logRes = await departmentService.getLog();
    this.log = logRes.data;

    var allModuleRes = await departmentService.getAllModule();
    // console.log(allModuleRes.data);
    this.allModule = allModuleRes.data;
  },

  
};
</script>
