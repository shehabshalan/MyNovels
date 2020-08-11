
<template>
  <div class="novel">
    <Navbar />
    <v-btn
      color="#FD5523"
      dark
      fab
      large
      fixed
      bottom
      right
      class="mr-7"
      href="https://forms.gle/qBSF8vWFefWMQ8eK9"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <h1 class="heading dark--text mb-n1 mt-6 mr-8">من اعمال كتابنا الرائعين</h1>

    <!-- delete the margin below if it didn't work -->
    <v-container class="fill-height" fluid>
      <v-row>
        <!-- xs="12" sm="12" md="6" lg="4" -->
        <v-col cols="xs12 sm12 md6 lg4" v-for="novel in novels" :key="novel.id">
          <router-link :to="{name: 'NovelDetails', params: {novel_slug: novel.novel_slug}}">
            <v-card
              class="text-start mx-auto"
              color="#fffbe6"
              width="432px"
              height="305px"
              :elevation="hover ? 24 : 6"
            >
              <v-img>
                <img class="float-left" :src="novel.cover_image" alt width="194px" height="305px" />
                <v-card-title class="justify-start">
                  <h1 class="novel-title">{{novel.title}}</h1>
                </v-card-title>
                <v-card-text>
                  <!-- <p>{{novel.novel_slug}}</p> -->
                  <ul class="preview-icons">
                    <li>
                      <span class="icons">
                        {{novel.novel_likes}}
                        <i class="material-icons">favorite_border</i>
                      </span>
                      <span class="icons">
                        {{novel.novel_views}}
                        <i class="material-icons">visibility</i>
                      </span>

                      <span class="icons">
                        {{novel.novel_target}}
                        <i class="material-icons">how_to_reg</i>
                      </span>
                    </li>
                  </ul>
                  <p class="novel-snip">{{novel.snippet.substring(0,150) + "..."}}</p>
                </v-card-text>
                <div class="chip-right" style="margin-right:10px">
                  <v-chip
                    class="mx-1 mb-3"
                    color="#356859"
                    small
                    font-family="ara"
                    label
                    text-color="white"
                    v-for="(gen, index) in novel.genres"
                    :key="index"
                  >{{gen}}</v-chip>
                </div>

                <v-card-action>
                  <div class="text-center">
                    <router-link :to="{name: 'Read', params: {novel_slug: novel.novel_slug}}">
                      <button class="myButton">اقرأ</button>
                    </router-link>

                    <!-- <v-btn rounded>اقرأ</v-btn> -->
                  </div>
                </v-card-action>
              </v-img>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import db from "../db";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
  name: "Index",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      novels: [],
    };
  },

  created() {
    db.collection("Novels")
      .get()
      .then((snapshot) => {
        //snapshot is a view of that collection we have meaning the data we stored
        snapshot.forEach((doc) => {
          //we grabed each doc in that snapshot
          // console.log(doc.data());
          let novel = doc.data();
          novel.id = doc.id;
          this.novels.push(novel);
        });
      });
  },
};
</script>

<style scoped>
/* .layout {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap !important;
  min-width: 0;
} */
/* .col {
  flex-basis: 0;
  flex-grow: 0;
  max-width: 100%;
} */
.v-application a {
  text-decoration: none;
}
.myButton {
  background-color: #000000;
  border-radius: 50px;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  /* margin-bottom: 16px; */
  cursor: pointer;
  height: 48px;
  width: 200px;
  color: #fcff7a;
  font-family: ara;
  font-size: 24px;
  line-height: 50px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}
.myButton:hover {
  background-color: #000000;
}
.myButton:active {
  position: relative;
  top: 1px;
}

.heading {
  margin-top: 20px;
  /* text-align: right; */
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 44px;
  line-height: 59px;
  color: #356859;
}
/* img {
  float: left;
} */
.icons {
  font-size: 14px;
  display: inline-block;
  margin-left: 15px;
  color: #a1a1a1;
}
.material-icons {
  letter-spacing: 0;
  line-height: 0;
  font-size: 20px;
  vertical-align: sub;
  display: inline-block;
  color: #000000;
}

.novel-title {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: -10px;
  color: #356859;
}
.novel-snip {
  font-family: tajawal;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #121212;
}

.v-card__text {
  margin-bottom: -20px;
}
.preview-icons {
  margin-bottom: 5px;
  list-style-type: none;
}
.v-chip {
  font-family: ara;
  font-size: 14px !important;
}

@media only screen and (max-width: 450px) {
  *,
  ::before,
  ::after {
    background-repeat: no-repeat;
    box-sizing: content-box;
  }
}
</style>