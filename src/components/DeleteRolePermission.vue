<template>
    <div style="margin-left:2%">
        <v-row>
                  <v-dialog v-model="dialogdeleterole" persistent max-width="270">
                    <template v-slot:activator="{ on }">
                      <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Xóa quyền ?</v-card-title>
                      <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text v-on:click="deletePermissionForRole(rolePermission.id, rolePermission.groupId);">Đồng ý</v-btn>
                        <v-btn color="green darken-1" text @click="dialogdeleterole = false">Hủy</v-btn>
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
    name: "DeleteRolePermission",
    data() {
    return {
        dialogdeleterole: false
    };
    },
    props: {
        rolePermission: Object
    },
    methods:{
        async deletePermissionForRole(id,groupId)
        {
            var authTokenStr = localStorage.getItem("auth");
            departmentService.authToken = authTokenStr;
            await departmentService.deleteRolePermission(id, groupId);
            alert("Xóa quyền thành công");
            this.dialogdeleterole = false;
            location.reload();
        }
    }
}
</script>