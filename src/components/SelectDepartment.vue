<template>
    <div>
    <v-overflow-btn
          :items="nameDepartment"
          label="Chọn phòng ban"
          target="#dropdown-example"
          outlined
          background-color="blue lighten-3"
          @click="refresh"
          v-model="name"
        ></v-overflow-btn>
    </div>
</template>


<script>
import ConfigurationKPIService from "../ConfigurationKPIService.js";
const configurationKPIService = new ConfigurationKPIService();

export default {
    name: "SelectProject",
    data() {
        return {
            nameDepartment: [],
            listDepartment: [],
            name: ""
        };
    },

    async created()
    {
        console.log(this.name);
        var response = await configurationKPIService.getlistDepartment();
        this.listDepartment = response.data.departments;
        for (var i = 0; i < this.listDepartment.length; i++) {
            this.nameDepartment.push(this.listDepartment[i].department_name);
        }
        
    },
    methods: {
        refresh(){
            console.log(this.name);
        }
    }
};
</script>