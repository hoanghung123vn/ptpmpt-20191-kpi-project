<template>
    <div>
    <v-overflow-btn
          :items="nameProject"
          label="Chọn dự án"
          target="#dropdown-example"
          outlined
          background-color="blue lighten-3"
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
            nameProject: [],
            listProject: [],
        };
    },

    async created()
    {
        var response = await configurationKPIService.getlistProject();
        console.log("this.listProject");
        this.listProject = response.data.results;
        console.log(this.listProject);

        for (var i = 0; i < this.listProject.length; i++) {
                this.nameProject.push(this.listProject[i].name);
                
            }
    }
};
</script>