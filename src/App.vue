<template>
  <v-app class="black">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),

  created() {
    this.$vuetify.rtl = true;
  },
};
</script>
<style>
@font-face {
  font-family: "tajawal";
  src: url("./assets/fonts/Tajawal-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "ara";
  src: url("./assets/fonts/Ara-Hamah-Homs-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "rawa";
  src: url("./assets/fonts/Rawafed-Zainab.otf") format("opentype");
}
</style>