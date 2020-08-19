<template >
  <div>
    <v-app-bar app color="#29302E" height="120" dark>
      <div class="login-menu">
        <v-img
          v-if="!isLoggedIn"
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="../assets/user.svg"
          transition="scale-transition"
          width="50"
        />
        <v-img
          v-if="isLoggedIn"
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="user.image"
          transition="scale-transition"
          width="50"
        />

        <v-btn class="login-btn" text v-if="!isLoggedIn" @click="login">
          <span class="login-user">تسجيل الدخول</span>
        </v-btn>
        <v-btn text v-if="isLoggedIn" @click="logout">
          <span class="login-user">تسجيل الخروج</span>
          <span class="login-user">{{user.name}}</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <router-link :to="{name: 'Index'}">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/banner.svg"
          transition="scale-transition"
          width="300"
        />
      </router-link>
    </v-app-bar>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
// import { db } from "../firebase";
export default {
  name: "Navbar",
  computed: mapState("auth", ["user", "isLoggedIn"]),
  methods: mapActions("auth", ["login", "logout"]),
};
</script>
<style>
.login-menu {
  list-style-type: none;
  display: contents;
}
.login-btn {
  display: inline-flex;
}
.v-toolbar__title {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 35px !important;
  color: #fffbe6;
}
.login-user {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  /* line-height: 29px; */
  text-transform: capitalize;

  color: #fffbe6;
}
</style>