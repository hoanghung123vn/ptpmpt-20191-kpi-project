<template>
    <v-container>
    <v-row class="hidden-sm-and-down">
    <v-col>
        <AddKPI/> 
    </v-col>

    <v-col>
    </v-col>

    <v-col>   
        <div id="kpiPositions" style="display:none">
            <v-select @change="PositionsChange();" v-model="PositionsId" label="Lựa chọn chức vụ" :items="namePositions"
              style="float: left;width:300px;">
            </v-select>
        
        </div> 
    </v-col>
    <v-col>
      <div>
        <v-select @change="DepartmentChange();" v-model="DepartmentId" label="Lựa chọn phòng ban" :items="nameDepartment"
          style="float: left;width:300px;"></v-select>
      </div>
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
    <UpdateAllKPIPositions :dataKPI="dataKPI" />
    </v-container>
</template>

<style>
    .tab {
        width: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
    }

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
import UpdateAllKPIPositions from "../components/UpdateAllKPIPositions";


import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

import bus from "../bus";

export default {
  name: "ConfigKPIDepartment",
  components: {
    EditKPI,
    DeleteKPI,
    AddKPI,
    UpdateAllKPIPositions
  },
  data() {
    return {
      dataKPI: [],
      DepartmentId : "",
      idDepartment : "",
      PositionsId: "",
      nameDepartment: [],
      listDepartment: [],
      namePositions: [],
      listPositions: [],
      listIdEmployee: []
    };
  },
  mounted() {
    
    bus.$on("addKPI", department => {
      const newdepartment = department;
      this.dataKPI.criterias.push(newdepartment);
      alert("Bạn đã thêm mới tiêu chí KPI. Hãy cập nhật lưới tiêu chí KPI bên dưới");
      //this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteKPI", name => {
      this.dataKPI.criterias = this.dataKPI.criterias.filter(department => department.name !== name);
      alert("Bạn đã xóa tiêu chí KPI. Hãy cập nhật lưới tiêu chí KPI bên dưới");
      //this.$swal("Great!", "Xóa thành công", "success");
    });
    bus.$on("updateKPI", department => {
      const index = this.dataKPI.criterias.findIndex(kpi => kpi.name === department.name);
      alert("Bạn đã thay đổi tiêu chí KPI. Hãy cập nhật lưới tiêu chí KPI bên dưới");
      this.dataKPI.criterias.splice(index, 1, department);
      //this.$swal("Great!", "Cập nhật thành công", "success");
    });
    bus.$on("updateAllKPIPositions", dataKPI => {
      this.dataKPI = dataKPI;
      this.$swal("Great!", "Cập nhật thành công", "success");
    });
  },
  async created() {
    var response = await configurationKPIService.getlistDepartment();
    this.listDepartment = response.data.departments;
    for (var i = 0; i < this.listDepartment.length; i++) {
      this.nameDepartment.push(this.listDepartment[i].department_name);
    }
  },
  methods:{
   async getKPIPositions(idDepartment, idEmployee){
      try {
        var response = await configurationKPIService.getKPIPositionsInDepartment(idDepartment,idEmployee);
        this.dataKPI = response.data;
      } catch (error) {
        //const message = error;
        alert("Chức vụ này chưa được cấu hình KPI");
        //this.$swal("Đã có lỗi xảy ra!", `${message}`);
      }
   },

    async DepartmentChange() {
      this.namePositions = [];
      this.listIdEmployee = [];
      var kpiPositions = document.getElementById("kpiPositions");    
      kpiPositions.style.display = 'none'; 
      const found = this.nameDepartment.findIndex(element => element === this.DepartmentId);
      const idDepartment = this.listDepartment[found].id;
      this.idDepartment = idDepartment;
      if(idDepartment > 0)
      {    
        kpiPositions.style.display = 'block';    
        var responsePositions = await configurationKPIService.getlistEmployeeByDepartmentID(idDepartment);
        this.listPositions = responsePositions.data.department.positions;
        for (var i = 0; i < this.listPositions.length; i++) {
          //console.log(this.listPositions[i].name);
          this.namePositions.push(this.listPositions[i].name);
        }
      }
    },

    async PositionsChange() {
      if(this.PositionsId == "Nhân viên"){
        for (var i = 0; i < this.listPositions.length; i++) {
          if(this.listPositions[i].name == "Nhân viên") {
            this.listIdEmployee.push(this.listPositions[i].employee_id);
            console.log(this.listPositions[i].employee_id);     
          }
        }
      }
      const found = this.namePositions.findIndex(element => element === this.PositionsId);
      const employee_id = this.listPositions[found].employee_id;
      console.log(employee_id);
      this.getKPIPositions(this.idDepartment,employee_id);
      
    }
  }
};
</script>

<style>
.v-autocomplete.v-input > .v-input__control > .v-input__slot {
  cursor: pointer !important;
}
</style>