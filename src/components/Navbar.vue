<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <router-link :to="{name: 'home'}" class="side_bar_link">
          <v-list-item link @click="changeto1">
            <v-list-item-action>
              <v-icon :color="active1">mdi-account-edit</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Quản lý người dùng</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/department" class="side_bar_link">
          <v-list-item link @click="changeto2">
            <v-list-item-action>
              <v-icon :color="active2">mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Quản lý cơ cấu bộ phận</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-group v-model="model1">
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-action class="ml-n4">
                <v-icon>mdi-settings</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Quản lý cấu hình KPI</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <router-link to="/configdepartment" class="side_bar_link">
            <v-list-item link class="ml-2" @click="changeto3">
              <v-list-item-action>
                <v-icon :color="active3">mdi-folder-settings-variant</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Cấu hình KPI phòng ban</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/configpositionindepartment" class="side_bar_link">
            <v-list-item link class="ml-2" @click="changeto8">
              <v-list-item-action>
                <v-icon :color="active8">mdi-folder-settings-variant</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Cấu hình KPI chức vụ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/configproject" class="side_bar_link">
            <v-list-item link class="ml-2" @click="changeto6">
              <v-list-item-action>
                <v-icon :color="active6">mdi-folder-settings-variant</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Cấu hình KPI dự án</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-group>
        <v-list-group v-model="model2">
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-action class="ml-n4">
                <v-icon>mdi-key-star</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Phân quyền người dùng</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <router-link :to="{name: 'set-group-user'}" class="side_bar_link">
            <v-list-item link class="ml-2" @click="changeto4">
              <v-list-item-action>
                <v-icon :color="active4">mdi-account-multiple-plus</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Thiết lập nhóm người dùng</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link
            :to="{name: 'set-group-permission-by-id', params: {groupId: 0}}"
            class="side_bar_link"
          >
            <v-list-item link class="ml-2" @click="changeto5">
              <v-list-item-action>
                <v-icon :color="active5">mdi-shield-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Thiết lập quyền cho nhóm</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-group>
        <router-link :to="{name: 'task-label-management'}" class="side_bar_link">
          <v-list-item link @click="changeto7">
            <v-list-item-action>
              <v-icon :color="active7">mdi-label-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Quản lý nhãn công việc</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="{name: 'reports'}" class="side_bar_link">
          <v-list-item link @click="changeto9">
            <v-list-item-action>
              <v-icon :color="active9">mdi-content-save-edit-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Quản lý mẫu báo cáo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn id="avatar" text v-if="current_user">
          <v-avatar size="40px" class="mr-4">
            <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
          </v-avatar>
        </v-btn>
        <v-btn id="user_name" text v-if="current_user">{{current_user.user_name}}</v-btn>
        <v-btn id="login_btn" text v-if="!current_user" to="/signin">Login</v-btn>
        <v-btn id="logout_btn" text v-if="current_user" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import bus from "../bus";
export default {
  name: "Navbar",
  data: () => ({
    drawer: null,
    title: "Danh sách người dùng",
    current_user: null,
    model1: false,
    model2: false,
    active1: "primary",
    active2: "",
    active3: "",
    active4: "",
    active5: "",
    active6: "",
    active7: "",
    active8: "",
    active9: ""
  }),
  mounted() {
    //this.fetchUser();
    this.listenToEvent();
  },
  methods: {
    listenToEvent() {
      bus.$on("refreshUser", name => {
        this.fetchUser(name);
      });
      bus.$on("refreshActive", () => {
        this.changeto5();
      });
    },
    fetchUser(name) {
      this.current_user = {
        user_name: name
      };
    },
    logout() {
      this.current_user = null;
      localStorage.setItem("auth", null);
    },
    changeto1() {
      this.active1 = "primary";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      this.active6 = "";
      this.active7 = "";
      this.active8 = "";
      this.active9 = "";
      this.title = "Danh sách người dùng";
    },
    changeto2() {
      this.active1 = "";
      this.active2 = "primary";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      this.active6 = "";
      this.active7 = "";
      this.active8 = "";
      this.active9 = "";
      this.title = "Quản lý cơ cấu bộ phận";
    },
    changeto3() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "primary";
      this.active4 = "";
      this.active5 = "";
      this.active6 = "";
      this.active7 = "";
      this.active8 = "";
      this.active9 = "";
      this.title = "Cấu hình KPI phòng ban";
    },
    changeto4() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "primary";
      this.active5 = "";
      this.active6 = "";
      this.active7 = "";
      this.active8 = "";
      this.active9 = "";
      this.title = "Thiết lập nhóm người dùng";
    },
    changeto5() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "primary";
      this.active6 = "";
      this.active7 = "";
      this.active8 = "";
      this.active9 = "";
      this.title = "Thiết lập quyền cho nhóm";
    },
    changeto6() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      this.active6 = "primary";
      this.active7 = "";
      this.active8 = "";
      this.active9 = "";
      this.title = "Cấu hình KPI dự án";
    },
    changeto7() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      this.active6 = "";
      this.active8 = "";
      this.active9 = "";
      this.active7 = "primary";
      this.title = "Quản lý nhãn công việc";
    },
    changeto8() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      this.active6 = "";
      this.active7 = "";
      this.active8 = "primary";
      this.active9 = "";
      this.title = "Cấu hình KPI chức vụ";
    },
    changeto9() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      this.active6 = "";
      this.active7 = "";
      this.active8 = "";
      this.active9 = "primary";
      this.title = "Quản lý báo cáo";
    }
  }
};
</script>

<style scoped>
a.side_bar_link {
  text-decoration: none;
}
</style>
