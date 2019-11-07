<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-row align="center">
          <v-col cols="6">
            <v-card>
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                    :rules="usernamerules"
                    v-model="username"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                    :rules="passwordrules"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="submit" color="primary" :disabled="!valid">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserService from "../UserService";
const userService = new UserService();
export default {
  name: "signin",
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      usernamerules: [v => !!v || "Username is required"],
      passwordrules: [v => !!v || "Username is required"]
    };
  },
  methods: {
    async submit() {
      try {
        await userService.signIn(this.username, this.password);
        this.$swal("Great!", "You are ready to start", "success");
        this.$router.push({ name: "home" });
      } catch (error) {
        const message = error;
        this.$swal("Đã có lỗi xảy ra!", `${message}`);
      }
    }
  }
};
</script>

<style>
</style>
