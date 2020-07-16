<template>
  <v-footer padless>
    <v-card color="#29302E" class="flex">
      <v-card-title>
        <div class="div-margin"></div>
        <v-icon color="#FFFBE6">mdi-instagram</v-icon>
        <div class="mr-5"></div>
        <v-icon color="#FFFBE6">mdi-facebook</v-icon>
        <div class="mr-5"></div>
        <v-icon color="#FFFBE6">mdi-youtube</v-icon>

        <v-spacer></v-spacer>

        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/footer.png"
          transition="scale-transition"
          width="300"
        />
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "Footer"
};
</script>
<style scoped>
.v-icon.v-icon {
  font-size: 5rem;
}
.div-margin {
  margin-right: 100px;
}

@media only screen and (max-width: 450px) {
  .v-icon.v-icon[data-v-40ab164b] {
    font-size: 3rem;
    margin-bottom: 30px;
  }
  .div-margin[data-v-40ab164b] {
    margin-right: 23%;
    /* margin-left: auto; */
  }
}
</style>