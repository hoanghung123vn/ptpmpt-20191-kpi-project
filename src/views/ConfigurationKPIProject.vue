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
        <div>
        <v-select @change="ProjectChange();" v-model="ProjectId" label="Lựa chọn dự án" :items="nameProject"
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
                <tr v-for="department in dataKPI.criterias" :key="department.id">
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
    <div class="block-1" v-if="bRet == true">
      <UpdateAllKPIProject :dataKPI=this.dataKPI />
    </div>
    <div class="block-2" v-else-if="bRet == false">
      <PostAllKPIProject :dataKPI=this.dataKPI />
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
import UpdateAllKPIProject from "../components/UpdateAllKPIProject";
import PostAllKPIProject from "../components/PostAllKPIProject";
import bus from "../bus";


import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

export default {
  name: "ConfigKPIProject",
  components: {
    EditKPI,
    DeleteKPI,
    AddKPI,
    UpdateAllKPIProject,
    PostAllKPIProject
  },
  data() {
    return {
      dataKPI: {
        criterias: [],
        id: "",
      },
      bRet: true,
      arrCriterias: [],
      datas: [],
      levelDatas:[],
      ProjectId : "",
      nameProject: [],
      listProject: [],
      dialogdetail: false,
      dialogupdate: false,
      dialogdelete: false
    };
  },
  mounted() {   
     bus.$on("addKPI", department => {
      const newdepartment = department;
      newdepartment.id = this.dataKPI.criterias.length + 1;
      this.arrCriterias.push(newdepartment);
      //this.dataKPI.criterias.push(newdepartment);
      this.dataKPI.criterias = this.arrCriterias;
      alert("Bạn đã thêm mới tiêu chí KPI. Hãy cập nhật lưới tiêu chí KPI bên dưới");
      //this.$swal("Great!", "Tạo mới thành công", "success");
    });
    bus.$on("deleteKPI", name => {
      this.arrCriterias = this.arrCriterias.filter(department => department.name !== name);
      alert("Bạn đã xóa tiêu chí KPI. Hãy cập nhật lưới tiêu chí KPI bên dưới");
      this.dataKPI.criterias = this.dataKPI.criterias.filter(department => department.name !== name);
      //this.$swal("Great!", "Xóa thành công", "success");
    });
    bus.$on("updateKPI", department => {
      const index = this.dataKPI.criterias.findIndex(kpi => kpi.id === department.id);
      this.dataKPI.criterias.splice(index, 1, department);
      alert("Bạn đã thay đổi tiêu chí KPI. Hãy cập nhật lưới tiêu chí KPI bên dưới");
      const index2 = this.arrCriterias.findIndex(kpi => kpi.id === department.id);
      this.arrCriterias.splice(index2, 1, department);

      //this.$swal("Great!", "Cập nhật thành công", "success");
    });
    if(this.bRet == true){
      bus.$on("updateAllKPIProject", dataKPI => {
        this.dataKPI = dataKPI;
        this.$swal("Great!", "Cập nhật thành công", "success");
      });
    }
    else{
      bus.$on("postAllKPIProject", dataKPI => {
        this.dataKPI = dataKPI;
        this.$swal("Great!", "Cập nhật thành công", "success");
      });
      
    }
    
  },
  async created() {
    var response = await configurationKPIService.getlistProject();
      this.listProject = response.data.results;

      for (var i = 0; i < this.listProject.length; i++) {
        this.nameProject.push(this.listProject[i].name);
      }
  },

  methods:{
    async getKPIProject(id){
      try {
        this.dataKPI.criterias = [];
        this.dataKPI.id = "";
        var response = await configurationKPIService.getKPIProjectById(id);
        let data=[]
        response.data.criterias.map(async(value,index)=>{
          let ob={
            id:index+1,
            name: value.name,
            note:value.note,
            ratio: value.ratio
          }
         await data.push(ob)
        })
        this.dataKPI.criterias = await data;
        this.arrCriterias = this.dataKPI.criterias;

        this.dataKPI.id = response.data.id;
        this.bRet = true;
      } catch (error) {
        alert("Dự án này chưa được cấu hình KPI");
        this.setKPIProject(id);
      }
    },

    async setKPIProject(id){
      this.dataKPI.id = id;
      this.dataKPI.criterias = [];
      this.arrCriterias = [];
      this.bRet = false;
    },

    async ProjectChange() {
      const found = this.nameProject.findIndex(element => element === this.ProjectId);
      const idProject = this.listProject[found].id;
      this.getKPIProject(idProject);
    }
     
  }
};
</script>