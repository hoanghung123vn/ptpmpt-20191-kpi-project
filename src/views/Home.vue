<template>
  <v-container>
    <UserTable />
  </v-container>
</template>

<script>
// @ is an alias to /src
import UserTable from "../components/UserTable";
export default {
  name: "home",
  components: {
    UserTable
  }
};
</script>
