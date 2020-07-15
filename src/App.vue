<template>
  <v-app>
    <Navbar />
    <v-main>
      <Index />
      <v-btn color="#FD5523" dark large fixed bottom right fab class="mr-7">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Index from "../src/components/Index";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export default {
  name: "App",

  components: {
    Index,
    Navbar,
    Footer
  },

  data: () => ({
    //
  }),

  created() {
    this.$vuetify.rtl = true;
  }
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