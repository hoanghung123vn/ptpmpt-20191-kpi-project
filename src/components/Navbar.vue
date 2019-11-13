<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <router-link :to="{name: 'home'}" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Trang chủ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="{name: 'set-permission'}" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Phân quyền người dùng</v-list-item-title>
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
    title: "Home",
    current_user: null
  }),
  mounted() {
    this.fetchUser();
    this.listenToEvent();
  },
  methods: {
    listenToEvent() {
      bus.$on("refreshUser", () => {
        console.log("heelllo");
        this.fetchUser();
      });
    },
    fetchUser() {
      this.current_user = {
        user_name: "Hoang Van Hung"
      };
    },
    logout() {
      this.current_user = null;
    }
  }
};
</script>

<style scoped>
a.side_bar_link {
  text-decoration: none;
}
</style>
