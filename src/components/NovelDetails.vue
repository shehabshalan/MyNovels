<template>
  <div v-if="novel && user">
    <v-app-bar app color="#29302E" height="140">
      <router-link :to="{name: 'Index'}">
        <v-icon class="mr-7" x-large color="#FFFBE6">mdi-arrow-left</v-icon>
      </router-link>
      <SocialSharing />
      <v-spacer></v-spacer>

      <h1>{{novel.title}}</h1>
      <v-fab-transition>
        <v-btn
          @click="likeStory"
          :color="color"
          fab
          dark
          large
          absolute
          bottom
          right
          class="like-icon"
        >
          <v-icon>mdi-cards-heart</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-app-bar>

    <v-container fluid class="novel-background">
      <!-- LEFT CONTENT -->
      <div class="left-content float-left mr-16 ml-10">
        <v-img :src="novel.cover_image" height="500" width="300" class="img-circle"></v-img>
        <div class="left-content-info">
          <ul>
            <li v-if="novel.novel_view > 1000">
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="rgba(0, 0, 0, 0.6)">mdi-eye</v-icon>
                {{novel.novel_views}}
                الف مشاهدة
              </span>
            </li>
            <li v-else>
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="rgba(0, 0, 0, 0.6)">mdi-eye</v-icon>
                {{novel.novel_views}}
                مشاهدة
              </span>
            </li>
            <li>
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="rgba(0, 0, 0, 0.6)">mdi-heart-outline</v-icon>
                {{novel.novel_likes}}
                أحبوا القصة
              </span>
            </li>

            <li>
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="rgba(0, 0, 0, 0.6)">mdi-account-check</v-icon>
                {{novel.novel_target}}
                طلبو تكملة القصة
              </span>
            </li>

            <li>
              <span class="headings-left-content">
                <v-icon
                  class="left-story-icons"
                  color="rgba(0, 0, 0, 0.6)"
                >mdi-book-open-page-variant</v-icon>60
                عدد الصفحات
              </span>
            </li>
            <li>
              <span class="headings-left-content">
                <v-icon class="left-story-icons" color="rgba(0, 0, 0, 0.6)">mdi-calendar-range</v-icon>تم النشر في 2020-01-04
              </span>
            </li>
          </ul>

          <br />
          <div class="story-buttons mt-1 mx-auto">
            <router-link :to="{name: 'Read', params: {novel_slug: novel.novel_slug}}">
              <button class="left-story-btn">إقرأ القصة</button>
            </router-link>
          </div>
        </div>
      </div>
      <!-- RIGHT CONTENT -->
      <div class="right-content">
        <div class="story-snippet">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-information</v-icon>نبذة عن القصة
            <div class="content">
              <p>{{novel.snippet}}</p>
            </div>
          </span>
        </div>
        <div class="story-genre">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-message-alert</v-icon>نوع القصة
            <div class="content">
              <div class="chip-right">
                <v-chip
                  class="ma-auto mx-1"
                  color="#356859"
                  font-family="ara"
                  label
                  text-color="white"
                  v-for="(gen, index) in novel.genres"
                  :key="index"
                >{{gen}}</v-chip>
              </div>
            </div>
          </span>
        </div>
        <div class="story-status">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-account-check</v-icon>حالة القصة
            <div class="content">
              <p>يحتاج الكاتب الى 100 طلب لإكمال القصة وقام {{novel.novel_target}} شخص بطلب إكمال القصة</p>
              <strong>مع العلم بأن تكملة القصة سوف تباع ب 5 دولارات</strong>
              <div class="story-buttons mt-8">
                <button
                  class="story-btn disable-button mx-10"
                  @click="requestStory"
                >إطلب تكملة القصة</button>

                <a href="https://forms.gle/qBSF8vWFefWMQ8eK9">
                  <button class="story-btn">أعطنا رأيك الصادق بما قرأت</button>
                </a>
              </div>
              <div>
                <v-snackbar color="#29302E" v-model="snackbar" :timeout="timeout">
                  {{ text }}
                  <template v-slot:action="{ attrs }">
                    <v-btn color="#fffbe6" text v-bind="attrs" @click="snackbar = false">إغلاق</v-btn>
                  </template>
                </v-snackbar>
                <!-- <v-alert :value="true" dense text width="400" type="success">شكراً لطلبك إكمال القصة</v-alert> -->
              </div>
            </div>
          </span>
        </div>
        <div class="author-message">
          <span class="headings">
            <v-icon class="ml-7 mr-5 story-icons" color="#356859">mdi-email</v-icon>رسالة من الكاتب
            <div class="content">
              <p>أحبائي اريد مساعدتكم ، عند طلب ١٠٠ شخص القصة ، سأقوم بتكملتها ، لكنني الآن لا ألك الوقت الكافي، لذلك اريد منكم الدعم</p>
              <div class="story-buttons mt-8">
                <router-link :to="{name: 'Paypal', params: {novel_slug: novel.novel_slug}}">
                  <button v-if="isLoggedIn" class="story-btn mx-10">إدعم القصة</button>
                </router-link>

                <button v-if="!isLoggedIn" class="story-btn mx-10">إدعم القصة</button>
              </div>
            </div>
          </span>
        </div>
        <span class="author">
          <router-link :to="{name: 'Author', params: {author_slug: novel.author_slug}}">
            <v-avatar v-if="novel.author_avatar" color="white" size="100" class="mb-7 ml-6">
              <img :src="novel.author_avatar" alt="author" />
            </v-avatar>
            <v-avatar v-else color="white" size="100" class="mb-7 ml-6">
              <img src="../assets/avatar.png" alt="author" />
            </v-avatar>
            <span class="author-name">للكاتب {{novel.author}}</span>
          </router-link>
        </span>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SocialSharing from "./SocialSharing";
import db from "../db";
import firebase from "../firebase";
export default {
  name: "NovelDetails",
  components: {
    SocialSharing,
  },
  data() {
    return {
      novel: null,
      color: "#000000",
      value: false,
      text: "شكراً لطلبك إكمال القصة",
      snackbar: false,
      timeout: 2000,
      isLiked: null,
      isRequested: false,
    };
  },
  computed: mapState("auth", ["user", "isLoggedIn"]),
  // "#FD5523"
  // "#000000"
  methods: {
    // GET NOVEL
    getNovel() {
      let ref = db
        .collection("Novels")
        .where("novel_slug", "==", this.$route.params.novel_slug);
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          this.novel = doc.data();
          this.novel.id = doc.id;
          this.getIsLiked();
          this.getIsReq();
        });
      });
    },
    // GET USER
    async likeStory() {
      if (this.isLoggedIn && !this.isLiked) {
        this.novel.novel_likes++;
        this.isLiked = true;
        this.color = "#FD5523";
        let ref = await db.collection("Novels").doc(this.novel.id);
        ref.update({
          userLikeId: firebase.firestore.FieldValue.arrayUnion(this.user.id),
          novel_likes: this.novel.novel_likes,
        });
        console.log("like check");
      } else {
        this.novel.novel_likes--;
        this.isLiked = false;
        this.color = "#000000";
        let ref = await db.collection("Novels").doc(this.novel.id);
        ref.update({
          userLikeId: firebase.firestore.FieldValue.arrayRemove(this.user.id),
          novel_likes: this.novel.novel_likes,
        });
        console.log("dislike check");
      }
    },
    // REQUEST CONTINUTATION
    requestStory() {
      // let matchId = this.novel.userReqId.find((id) => {
      //   if (this.user.id === id) {
      //     return true;
      //   }
      // });

      if (this.isLoggedIn && this.isRequested) {
        this.novel.novel_target--;
        this.isRequested = false;
        let ref = db.collection("Novels").doc(this.novel.id);
        ref.update({
          userReqId: firebase.firestore.FieldValue.arrayRemove(this.user.id),
          novel_target: this.novel.novel_target,
        });
      } else {
        this.novel.novel_target++;
        this.isRequested = true;
        let ref = db.collection("Novels").doc(this.novel.id);
        ref.update({
          userReqId: firebase.firestore.FieldValue.arrayUnion(this.user.id),
          novel_target: this.novel.novel_target,
        });
        this.snackbar = true;
      }
    },
    getIsLiked() {
      if (this.isLoggedIn) {
        let matchId = this.novel.userLikeId.find((id) => {
          if (this.user.id === id) {
            return true;
          }
        });
        if (matchId === this.user.id) {
          this.color = "#FD5523";
          this.isLiked = true;
          console.log("liked this before");
        } else {
          console.log("didn't like it before");
          this.isLiked = false;
        }
      }
    },
    getIsReq() {
      if (this.isLoggedIn) {
        let matchId = this.novel.userReqId.find((id) => {
          if (this.user.id === id) {
            return true;
          }
        });
        if (matchId === this.user.id) {
          this.isRequested = true;
          console.log("requested this before");
        } else {
          this.isRequested = false;
          console.log("didn't request it before");
        }
      }
    },
  },

  created() {
    this.getNovel();
  },
  firestore: {
    novel: db.collection("Novels"),
  },
};
</script>
<style scoped>
/* .v-chip__content {
  margin: auto !important;
} */
.like-icon {
  margin-right: 75px;
}
.v-application a {
  color: black;
  text-decoration: none;
}
.author {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 43px;
  text-align: right;
  text-transform: uppercase;
  color: #fd5523;
  /* color: #f8e71c; */
}
.author-name {
  color: #fd5523;
}
ul {
  display: inline;
  list-style-type: none;
  text-align: inherit;
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
.left-content {
  direction: rtl;
}
.left-story-icons {
  font-size: 30px;
  margin-left: 16px;
}
.headings-left-content {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  margin-right: 50px;
  font-size: 25px;
  line-height: 38px;
  vertical-align: inherit;
  color: #000000;
}
.left-content-info {
  margin-top: 20px;
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
h1 {
  font-family: rawa;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  margin-right: 150px !important;
  /* line-height: 92px; */
  margin: 0;
  padding: 0;
  text-transform: capitalize;

  color: #ffffff;
}
.v-icon.v-icon {
  display: inline;
}

.right-content {
  direction: rtl;
  margin-top: 40px;
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
  margin-right: 100px;
  text-transform: capitalize;
  margin-top: 16px;
  margin-bottom: 40px;
  color: #000000;
}

@media only screen and (max-width: 450px) {
  .content {
    font-family: tajawal;
    font-style: normal;
    font-weight: normal;
    text-align: justify, center;
    font-size: 20px;
    line-height: 29px;
    margin-right: -30px;
    text-transform: capitalize;
    margin-top: 16px;
    margin-bottom: 40px;
    color: #000000;
  }
  .story-icons {
    font-size: 50px;
    margin-right: -40px !important;
  }
  .left-story-btn {
    background: #fd5523;
    border-radius: 10px;
    display: inline-block;
    font-style: normal;
    font-weight: normal;
    /* margin-bottom: 16px; */
    cursor: pointer;
    margin-bottom: 20px;
    height: 52px;
    width: 300px;
    color: white;
    font-family: ara;
    font-size: 24px;
    line-height: 50px;
    text-decoration: none;
  }
  .author {
    font-family: ara;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 43px;
    text-align: right;
    text-transform: uppercase;
    margin-right: -30px;

    color: #fd5523;
    /* color: #f8e71c; */
  }
  .author-name {
    color: #fd5523;
  }
  .story-btn {
    background: #000000;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    display: inline-block;

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
}
</style>