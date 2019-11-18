<template>
    <v-container>
    <AddKPI/>
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
                <tr v-for="department in dataKPI" :key="department.name">
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

import Department from "../DepartmentService.js";
const departmentService = new Department();

import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

import bus from "../bus";

export default {
  name: "ConfigKPIDepartment",
  components: {
    EditKPI,
    DeleteKPI,
    AddKPI  
  },
  data() {
    return {
      dataKPI: [],
      datas: [] 
    };
  },
  mounted() {
    
    bus.$on("addKPI", department => {
      const newdepartment = department;
      this.dataKPI.push(newdepartment);
      this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteKPI", name => {
      this.dataKPI = this.dataKPI.filter(department => department.name !== name);
      this.$swal("Great!", "Xóa thành công", "success");
    });
    bus.$on("updateKPI", department => {
      const index = this.dataKPI.findIndex(kpi => kpi.name === department.name);
      this.dataKPI.splice(index, 1, department);
      this.$swal("Great!", "Cập nhật thành công", "success");
    });
  },
  async created()
  {
    var response = await configurationKPIService.getKPIDepartmentById(1);
    this.dataKPI = response.data.criterias;
    
    var responseDepartment = await departmentService.getAllDepartment();
    this.datas = responseDepartment.data;

  }
  
};
</script>

<style>
.v-autocomplete.v-input > .v-input__control > .v-input__slot {
  cursor: pointer !important;
}
</style>