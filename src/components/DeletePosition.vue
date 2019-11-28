<template>
    <div>
                              <v-row justify="center">
                              <v-dialog v-model="dialogdeleteposition" persistent max-width="270">
                                <template v-slot:activator="{ on }">
                                  <v-btn color="error" dark v-on="on" rounded>Xóa</v-btn>
                                </template>
                                <v-card>
                                  <v-card-title class="headline">Xóa chức danh?</v-card-title>
                                  <v-card-text>Bạn có chắc chắn muốn xóa, thao tác này sẽ không thể quay lại</v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" text v-on:click="deletePostion(pos.id)">Đồng ý</v-btn>
                                    <v-btn color="green darken-1" text @click="dialogdeleteposition = false">Hủy</v-btn>
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
    name: "DeletePosition",
    data() {
    return {
        dialogdeleteposition: false
    };
    },
    props: {
        pos: Object
    },
    methods:{
        async deletePostion(id)
        {
            await departmentService.deletePosition(id);
            alert("Xóa chức danh thành công");
            var positionResponse = await departmentService.positionDepartment(this.lastDetailId);
            this.position = positionResponse.data;
        }
    }
}
</script>