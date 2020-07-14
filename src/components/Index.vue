<template>
  <div class="novel">
    <h1 class="heading dark--text my-6 mr-8">من اعمال كتابنا الرائعين</h1>
    <!-- delete the margin below if it didn't work -->
    <v-row class="mx-sm-16">
      <v-col class="flex sm12 md6 lg4" v-for="novel in novels" :key="novel.id">
        <v-card
          class="mb-3 text-start mx-sm-auto"
          color="#fffbe6"
          width="432px"
          height="305px"
          :elevation="hover ? 24 : 6"
        >
          <v-img>
            <img class="float-left" src="../assets/novel.png" alt width="194px" height="305px" />
            <v-card-title class="justify-start">
              <h1 class="novel-title">{{novel.title}}</h1>
            </v-card-title>
            <v-card-text>
              <ul class="preview-icons">
                <li>
                  <span class="icons">
                    10M
                    <i class="material-icons">favorite_border</i>
                  </span>
                  <span class="icons">
                    18K
                    <i class="material-icons">visibility</i>
                  </span>

                  <span class="icons">
                    100
                    <i class="material-icons">how_to_reg</i>
                  </span>
                </li>
              </ul>
              <p class="novel-snip">{{novel.snippet}}</p>
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
                <a href="#" class="myButton">اقرأ</a>

                <!-- <v-btn rounded>اقرأ</v-btn> -->
              </div>
            </v-card-action>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      novels: [
        {
          title: "خطوط الحياة",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "1"
        },
        {
          title: "05/05/2125",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "2"
        },
        {
          title: "خطوط الحياة",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "3"
        },
        {
          title: "05/05/2125",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "4"
        },
        {
          title: "خطوط الحياة",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "5"
        },
        {
          title: "05/05/2125",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "6"
        },
        {
          title: "خطوط الحياة",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "7"
        },
        {
          title: "05/05/2125",
          snippet:
            "داخل أحد الفنادق الكبرى، اجتمع سكان العمارة على طاولةٍ واحدة؛ لحضور حفل زفاف ابن صاحب العمارة... كانوا عشرة أشخاص... تناولوا نفس الطعام... لكن اثنين... اثنين فقط ماتا با...",
          genres: ["رومنسي", "دراما", "غموض"],
          id: "8"
        }
      ]
    };
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap !important;
  min-width: 0;
}
.myButton {
  background-color: #000000;
  border-radius: 50px;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 16px;
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
/* .v-btn__content {
  color: #fcff7a !important;
  font-family: ara;
  font-size: 20px;
} */
/* .v-btn {
  background-color: #000000 !important;
  border-radius: 50px;
} */
/* .v-btn:not(.v-btn--round).v-size--default {
  height: 48px !important;
  min-width: 200px !important;
  padding: 0 16px;
} */

.v-chip {
  font-family: ara;
  font-size: 14px !important;
  margin-bottom: 10px;
}
</style>