<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <router-link to="/" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Trang chủ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/department" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Quản lý cơ cấu bộ phận</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>    
        <router-link to="/configuration" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Quản lý cấu hình</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>    
        <router-link to="/about" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-contact-mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Liên hệ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Giao diện Admin</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: null
  })
};
</script>

<style>
</style>
