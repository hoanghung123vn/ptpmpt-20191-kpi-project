<template>
    <v-container>   
    <v-row class="hidden-sm-and-down">
    <v-col>
        <AddKPI/> 
    </v-col>
    <v-col>
    </v-col>
    <v-col>
    </v-col>
    <v-col>
        <SelectProject/>
    </v-col>
    </v-row>
    <v-simple-table style="width:100%;">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">Tên tiêu chí</th>
                    <th class="text-center">Tỉ lệ</th>
                    <th class="text-center">Chú thích</th>
                    <th class="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="department in dataKPI.criterias" :key="department.name">
                    <td class="text-center">{{ department.name }}</td>
                    <td class="text-center">{{ department.ratio }}</td>                  
                    <td class="text-center">{{ department.note }}</td> 
                    <td>
                    <div class="d-flex justify-space-around">
                    <EditKPI :department="department" />
                    <DeleteKPI :department="department" />
                    </div>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
    <UpdateAllKPI :dataKPI=this.dataKPI />
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
import EditKPI from "../components/EditKPI";
import DeleteKPI from "../components/DeleteKPI";
import AddKPI from "../components/AddKPI";
import SelectProject from "../components/SelectProject";
import UpdateAllKPI from "../components/UpdateAllKPI";

import bus from "../bus";

import Department from "../DepartmentService.js";
const departmentService = new Department();

import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

export default {
  name: "ConfigKPIProject",
  components: {
    EditKPI,
    DeleteKPI,
    AddKPI,
    SelectProject,
    UpdateAllKPI
  },
  data() {
    return {
      dataKPI: [],
      criteriasKPI: [],
      datas: [],
      levelDatas:[],
      dialogdetail: false,
      dialogupdate: false,
      dialogdelete: false
    };
  },
  mounted() {   
     bus.$on("addKPI", department => {
      const newdepartment = department;
      this.dataKPI.criterias.push(newdepartment);
      this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteKPI", name => {
      this.dataKPI.criterias = this.dataKPI.criterias.filter(department => department.name !== name);
      this.$swal("Great!", "Xóa thành công", "success");
    });
    bus.$on("updateKPI", department => {
      const index = this.dataKPI.criterias.findIndex(kpi => kpi.name === department.name);
      this.dataKPI.criterias.splice(index, 1, department);
      this.$swal("Great!", "Cập nhật thành công", "success");
    });
    bus.$on("updateAllKPI", dataKPI => {
      this.dataKPI = dataKPI;
      this.$swal("Great!", "Cập nhật thành công", "success");
    });
  },
  async created()
  {
    //eda3b9b1-ce95-47f7-91ec-e03d1eb2bc4d, 1664a77a-9c82-46af-83fe-b05b5e2e4bf8
    var response = await configurationKPIService.getKPIProjectById("eda3b9b1-ce95-47f7-91ec-e03d1eb2bc4d");
    this.dataKPI = response.data;

    this.criteriasKPI =  this.dataKPI.criterias

    var responseDepartment = await departmentService.getAllDepartment();
    this.datas = responseDepartment.data;

    var levelResponse = await departmentService.getAllDepartmentLevel();
    this.levelDatas = levelResponse.data;
  },

  
};
</script>