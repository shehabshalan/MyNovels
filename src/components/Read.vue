<template>
  <div v-if="novel">
    <Navbar />
    <v-container fluid>
      <h1 class="novel-title-read text-right">تقرأ الان {{novel.title}}</h1>
      <div class="text-center pages">
        <Paginate
          v-model="page"
          :page-count="numPages"
          :page-range="1"
          :margin-pages="1"
          :clickHandler="clickCallback"
          :next-text="'التالي >'"
          :prev-text="'< السابق'"
          style="display: inline-flex;list-style-type: none; "
          :containerClass="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'items'"
          :next-link-class="'next-link-class'"
          :prev-link-class="'prev-link-class'"
        >
          <span slot="prevContent">Changed previous button</span>
          <span slot="nextContent">Changed next button</span>
          <span slot="breakViewContent">
            <svg width="16" height="4" viewBox="0 0 16 4">
              <circle fill="#999999" cx="2" cy="2" r="2" />
              <circle fill="#999999" cx="8" cy="2" r="2" />
              <circle fill="#999999" cx="14" cy="2" r="2" />
            </svg>
          </span>
        </Paginate>
      </div>
      <div class="novel-display container">
        <pdf
          ref="pdf"
          style="display: inline-block; width: 100%"
          :src="src"
          :page="page"
          @num-pages="numPages = $event"
          @link-clicked="page = $event"
          @page-loaded="currentPage = $event"
        ></pdf>
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
import Paginate from "vuejs-paginate";
// var loadPDF = pdf.createLoadingTask(
//   "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"
// );

export default {
  name: "Read",
  components: {
    Navbar,
    Footer,
    pdf,
    Paginate,
  },
  data() {
    return {
      novel: null,
      src: null,
      currentPage: 0,
      page: 1,
      numPages: undefined,
    };
  },
  methods: {
    clickCallback: function (page) {
      console.log(page);
    },
    viewCounter() {
      this.novel.novel_views++;
      let ref = db.collection("Novels").doc(this.novel.id);
      ref.update({
        novel_views: this.novel.novel_views,
      });
      console.log(this.novel.novel_views);
    },
  },

  created() {
    let ref = db
      .collection("Novels")
      .where("novel_slug", "==", this.$route.params.novel_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
        this.novel = doc.data();
        this.novel.id = doc.id;
        this.viewCounter();
      });
      this.src = pdf.createLoadingTask(this.novel.novel_url);
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
    });
  },
  mounted() {
    // this.viewCounter();
  },
};
</script>

<style>
.pages {
  direction: rtl;
}
.novel-display {
  border-style: solid;
  width: 50%;
}
.novel-title-read {
  font-family: ara;
  font-size: 44px;
  color: #356859;
  font-style: normal;
  font-weight: normal;
}
.page-item {
  margin-left: 20px;
}

.next-link-class {
  color: #356859 !important;
}
.prev-link-class {
  color: #356859 !important;
  margin-left: 20px;
}

.items {
  color: #356859 !important;
}
.pagination {
  font-family: ara;
  font-size: 20px;
}
</style>