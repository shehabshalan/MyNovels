<template>
  <v-footer padless>
    <v-card color="#29302E" class="flex">
      <v-card-title>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/footer.png"
          transition="scale-transition"
          width="300"
        />

        <v-spacer></v-spacer>
        <div class="div-margin">
          <a href="http://bit.ly/moofiyTvInstagram" style="text-decoration:none;">
            <v-icon color="#FFFBE6">mdi-instagram</v-icon>
          </a>
          <div class="mr-5"></div>
          <a href="http://bit.ly/MoofiyTvFacebook" style="text-decoration:none;">
            <v-icon color="#FFFBE6">mdi-facebook</v-icon>
          </a>

          <div class="mr-5"></div>
          <a href="https://bit.ly/MoofiyTvYoutube" style="text-decoration:none;">
            <v-icon color="#FFFBE6">mdi-youtube</v-icon>
          </a>
        </div>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
.v-icon.v-icon {
  font-size: 5rem;
}
.div-margin {
  margin-right: 100px;
  display: flex;
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