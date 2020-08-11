<template>
  <div>
    <Navbar />
    <v-container fluid>
      <h1>تقرأ الان {{novel.title}}</h1>
      <div class="novel-display container">
        <pdf
          v-for="i in numPages"
          :key="i"
          :src="src"
          :page="i"
          style="display: inline-block; width: 100%"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
        ></pdf>
      </div>
      <div class="text-center">
        <v-pagination v-model="currentPage" :length="pageCount" :total-visible="7" circle></v-pagination>
      </div>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import Navbar from "./Navbar";
import Footer from "./Footer";
import pdf from "vue-pdf";
import db from "../db";
// var loadPDF = pdf.createLoadingTask(
//   "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"
// );

export default {
  name: "Read",
  components: {
    Navbar,
    Footer,
    pdf,
  },
  data() {
    return {
      novel: null,
      src: null,
      currentPage: 0,
      pageCount: 0,
      numPages: undefined,
    };
  },

  created() {
    let ref = db
      .collection("Novels")
      .where("novel_slug", "==", this.$route.params.novel_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.novel = doc.data();
        this.novel.id = doc.id;
      });
      this.src = pdf.createLoadingTask(this.novel.novel_url);
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
    });
    // this.$vuetify.rtl = false;
  },
};
</script>

<style scoped>
.novel-display {
  border-style: solid;
  width: 50%;
  height: 10%;
}
</style>