<template>
  <div>
    <Navbar />
    <v-container fluid class="mx-auto">
      <h1>تقرأ الان {{novel.title}}</h1>
      <div class="novel-display">
        <!-- <pdf src="https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK" :page="1"></pdf> -->
        <pdf :src="novel.novel_url" :page="1"></pdf>
      </div>
      <p>{{novel.novel_url}}</p>
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
        console.log(doc.data());
        this.novel = doc.data();
        this.novel.id = doc.id;
      });
    });
  }
};
</script>

<style scoped>
.novel-display {
  border-style: solid;
}
</style>