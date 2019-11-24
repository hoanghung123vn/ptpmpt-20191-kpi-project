<template>
    <div style="margin-left:2%">
        <v-row justify="right">
                  <v-dialog v-model="dialogdeletelevel" persistent max-width="270">
                    <template v-slot:activator="{ on }">
                      <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Xóa cấp bậc bộ phận?</v-card-title>
                      <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text v-on:click="DeleteDepartment(departmentLevel.id);">Đồng ý</v-btn>
                        <v-btn color="green darken-1" text @click="dialogdeletelevel = false">Hủy</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
    </div>
</template>

<script>
import Department from "../DepartmentService.js";
const departmentService = new Department();
export default {
    name: "DeleteDepartmentLevel",
    data() {
    return {
        dialogdeletelevel: false
    };
    },
    props: {
        departmentLevel: Object
    },
    methods:{
        async DeleteDepartment(id)
        {
            await departmentService.deleteDepartmentLevel(id);
            alert("Xóa cấp bộ phận thành công");
            this.dialogdeletelevel = false;
            location.reload();
        }
    }
}
</script>