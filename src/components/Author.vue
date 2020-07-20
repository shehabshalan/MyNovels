<template>
  <div v-if="novels">
    <v-app-bar app color="#29302E" height="170">
      <v-card-title class="mt-10">
        <h1>{{novel.author}}</h1>
        <v-card-text>
          <br />
          <br />
          <h3>{{novel.author_occ}}</h3>
        </v-card-text>
      </v-card-title>
      <v-spacer></v-spacer>
      <router-link :to="{name: 'Index'}">
        <v-icon class="mr-7" x-large color="#FFFBE6">mdi-arrow-left</v-icon>
      </router-link>
    </v-app-bar>

    <v-container fluid class="novel-background">
      <!-- LEFT CONTENT -->
      <div class="left-content float-left mr-16 ml-10">
        <v-img
          v-if="novel.author_avatar"
          :src="novel.author_avatar"
          height="500"
          width="300"
          class="img-circle"
        ></v-img>
        <v-img v-else src="../assets/avatar.png" height="500" width="300" class="img-circle"></v-img>
        <div class="left-content-info">
          <span class="contact-author">تواصل مع الكاتب</span>
          <br />
          <ul>
            <li>
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="#356859">mdi-facebook</v-icon>
              </span>
            </li>
            <li>
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="#356859">mdi-instagram</v-icon>
              </span>
            </li>

            <li>
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="#356859">mdi-twitter</v-icon>
              </span>
            </li>
          </ul>
          <br />
          <div class="story-buttons mt-5 mx-auto">
            <button class="left-story-btn">ادعم الكاتب</button>
          </div>
        </div>
      </div>
      <!-- RIGHT CONTENT -->
      <div class="right-content">
        <div class="author-message">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-information</v-icon>عن الكاتب
            <div class="content">
              <p>{{novel.snippet}}</p>
              <div class="story-buttons mt-8">
                <button class="story-btn mx-10">كيف ترى كتاباتي ؟</button>
              </div>
            </div>
          </span>
        </div>

        <div class="story-status">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-message-alert</v-icon>معلومات عن الكاتب
            <div class="content">
              <strong>العمر : ٣٠ عاماً</strong>
              <br />
              <strong>مكان الإقامة : روسيا</strong>
              <br />
              <strong>العمل : {{novel.author_occ}}</strong>
            </div>
          </span>
        </div>
        <!-- <div class="story-status">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-book-open-variant</v-icon>القصص التي نشرها الكاتب
            <div class="content">
              <strong>العمر : ٣٠ عاماً</strong>
            </div>
          </span>
        </div>-->
        <div class="story-status">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-book-open-variant</v-icon>القصص التي نشرها الكاتب
            <div class="content">
              <!-- <h2 v-for="nov in novels" :key="nov.id">{{nov.title}}</h2> -->
              <v-row>
                <v-col lg="6" md="6" sm="12" xs="12" v-for="nov in novels" :key="nov.id">
                  <v-card
                    class="text-start"
                    color="#fffbe6"
                    width="432px"
                    height="305px"
                    :elevation="hover ? 24 : 6"
                  >
                    <v-img>
                      <img
                        class="float-left"
                        :src="nov.cover_image"
                        alt
                        width="194px"
                        height="305px"
                      />
                      <v-card-title class="justify-start">
                        <h1 class="novel-title">{{nov.title}}</h1>
                      </v-card-title>
                      <v-card-text>
                        <ul class="preview-icons">
                          <li>
                            <span class="icons">
                              {{nov.novel_likes}}
                              <i class="material-icons">favorite_border</i>
                            </span>
                            <span class="icons">
                              {{nov.novel_views}}
                              <i class="material-icons">visibility</i>
                            </span>

                            <span class="icons">
                              {{nov.novel_target}}
                              <i class="material-icons">how_to_reg</i>
                            </span>
                          </li>
                        </ul>
                        <p class="novel-snip">{{nov.snippet.substring(0,150) + "..."}}</p>
                      </v-card-text>
                      <div class="chip-right" style="margin-right:10px">
                        <v-chip
                          class="mx-1 mb-3"
                          color="#356859"
                          small
                          font-family="ara"
                          label
                          text-color="white"
                          v-for="(gen, index) in nov.genres"
                          :key="index"
                        >{{gen}}</v-chip>
                      </div>

                      <v-card-action>
                        <div class="text-center">
                          <router-link
                            :to="{name: 'NovelDetails', params: {novel_slug: nov.novel_slug}}"
                          >
                            <button class="myButton">اقرأ</button>
                          </router-link>
                        </div>
                      </v-card-action>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </span>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  name: "Author",
  data() {
    return {
      novels: [],
      novel: null
      // novels: [
      //   {
      //     title: "خطوط الحياة",
      //     snippet:
      //       "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
      //     genres: ["رومنسي", "دراما", "غموض"],
      //     novel_likes: 100,
      //     novel_target: 200,
      //     novel_views: 400,
      //     id: "1"
      //   },
      //   {
      //     title: "05/05/2125",
      //     snippet:
      //       "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
      //     genres: ["رومنسي", "دراما", "غموض"],
      //     novel_likes: 100,
      //     novel_target: 200,
      //     novel_views: 400,
      //     id: "2"
      //   }
      // ]
    };
  },

  created() {
    let ref = db
      .collection("Novels")
      .where("author_slug", "==", this.$route.params.author_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());

        let novel = doc.data();
        novel.id = doc.id;

        this.novels.push(novel);

        this.novel = doc.data();
        this.novel.id = doc.id;
      });
    });
  }
};
</script>

<style scoped>
/* CARDS */

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

/* END */
.contact-author {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 43px;
  /* identical to box height */

  color: #000000;
}
.social-list {
  align-items: center;
}
.v-icon.v-icon {
  display: inline;
}

h1 {
  font-family: rawa;
  font-style: normal;
  font-weight: normal;
  font-size: 70px;
  /* line-height: 92px; */
  margin: 0;
  padding: 0;
  text-transform: capitalize;

  color: #ffffff;
}
h3 {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  /* identical to box height */
  color: #f8e71c;
}

.v-application a {
  color: black;
  text-decoration: none;
}

ul {
  display: inline-flex;
  list-style-type: none;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
}
.novel-background {
  background-color: #fffbe6;
}
.left-story-btn {
  background: #fd5523;
  border-radius: 10px;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  /* margin-bottom: 16px; */
  cursor: pointer;
  height: 52px;
  width: 300px;
  color: white;
  font-family: ara;
  font-size: 24px;
  line-height: 50px;
  text-decoration: none;
}
.left-story-icons {
  font-size: 50px;
}
.headings-left-content {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 38px;
  vertical-align: inherit;
  margin-right: 20px;
  color: #000000;
}
.left-content-info {
  margin-top: 20px;
  text-align: -webkit-center;
}

/* .left-content {
  text-align: center;
} */
.story-chip {
  height: 48px;
  width: 103px;

  font-size: 20px;
}
.story-btn {
  background: #000000;
  border-radius: 10px;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  /* margin-bottom: 16px; */
  cursor: pointer;
  height: 56px;
  width: 324px;
  color: #fcff7a;
  font-family: ara;
  font-size: 24px;
  line-height: 50px;
  text-decoration: none;
}
.story-icons {
  font-size: 50px;
}
.img-circle {
  border-radius: 10px;
}

.right-content {
  margin-top: 70px;
  padding-right: 70px;
}
.headings {
  font-family: tajawal;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 38px;
  color: #356859;
}

.content {
  font-family: tajawal;
  font-style: normal;
  font-weight: normal;
  margin-right: 60px;
  text-align: justify;
  font-size: 20px;
  line-height: 29px;
  text-transform: capitalize;
  margin-top: 16px;
  margin-bottom: 40px;
  color: #000000;
}

/* MOBILE  */
@media (min-width: 1264px) {
  .col-lg-6 {
    flex: 0 0 50%;
    /* display: contents; */
    /* margin-right: 100px; */
    /* margin-right: -70px; */
    margin-left: -15%;
    max-width: 50%;
  }
}
</style>