<template>
  <div>
    <v-app-bar app color="#29302E" height="120" dark>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/banner.svg"
        transition="scale-transition"
        width="300"
      />

      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-toolbar-title>كل ما تحتاجه هو تقديم PDF</v-toolbar-title>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-7"
          contain
          src="../assets/book.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Navbar"
};
</script>
<style>
.v-toolbar__title {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 35px !important;
  color: #fffbe6;
}
.title-intro {
}
</style>