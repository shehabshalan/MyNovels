<template>
  <div>
    <Navbar />
    <v-container fluid>
      <h1>تقرأ الان {{novel.title}}</h1>
      <div class="novel-display">
        <!-- <pdf src="https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK" :page="1"></pdf> -->
        <pdf :src="novel.novel_url" :page="10"></pdf>
      </div>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import Navbar from "./Navbar";
import Footer from "./Footer";
import pdf from "vue-pdf";
import db from "../firebase/init";

export default {
  name: "Read",
  components: {
    Navbar,
    Footer,
    pdf
  },
  data() {
    return {
      novel: null
    };
  },
  created() {
    let ref = db
      .collection("Novels")
      .where("novel_slug", "==", this.$route.params.novel_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.data());
        this.novel = doc.data();
        this.novel.id = doc.id;
      });
    });
    // this.$vuetify.rtl = false;
  }
};
</script>

<style scoped>
.novel-display {
  border-style: solid;
  width: 50%;
  height: 10%;
}
</style>