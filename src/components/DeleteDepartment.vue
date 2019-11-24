<template>
    <div style="margin-left:2%">
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
                        <v-btn color="green darken-1" text v-on:click="DeleteDepartment(department.id);">Đồng ý</v-btn>
                        <v-btn color="green darken-1" text @click="dialogdelete = false">Hủy</v-btn>
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
    name: "DeleteDepartment",
    data() {
    return {
        dialogdelete: false
    };
    },
    props: {
        department: Object
    },
    methods:{
        async DeleteDepartment(id)
        {
            await departmentService.deleteDepartment(id);
            alert("Xóa bộ phận thành công");
            this.dialogdelete = false;
            location.reload();
        }
    }
}
</script>