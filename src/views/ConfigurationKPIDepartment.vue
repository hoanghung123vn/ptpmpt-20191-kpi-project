<template>
    <v-container>   
    <br>
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
import Department from "../DepartmentService.js";
const departmentService = new Department();

import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

export default {
  name: "ConfigKPIDepartment",
  components: {
    EditKPI,
    DeleteKPI
   
  },
  data() {
    return {
      dataKPI: [],
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
    }
  },
  async created()
  {
    var response = await configurationKPIService.getKPIDepartmentById(1);
    this.dataKPI = response.data;
    
    var responseDepartment = await departmentService.getAllDepartment();
    this.datas = responseDepartment.data;

    var levelResponse = await departmentService.getAllDepartmentLevel();
    this.levelDatas = levelResponse.data;
  },

  
};
</script>

<style>
.v-autocomplete.v-input > .v-input__control > .v-input__slot {
  cursor: pointer !important;
}
</style>