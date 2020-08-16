<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
      crossorigin="anonymous"
    />
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" x-large color="#FFFBE6">mdi-share-variant</v-icon>
      </template>
      <v-card class="popup-share">
        <v-card-title class="share-novel-header">مشاركة الرواية</v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="share-network-list">
            <ShareNetwork
              v-for="network in networks"
              :network="network.network"
              :key="network.network"
              :style="{backgroundColor: network.color}"
              :url="novelURL"
              :title="novel.title"
              :description="novel.snippet"
            >
              <i :class="network.icon"></i>
              <span>{{ network.name }}</span>
            </ShareNetwork>
          </div>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../db";

export default {
  name: "SocialSharing",
  components: {},
  data() {
    return {
      dialog: false,
      novelURL: window.location.href,
      novel: null,
      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },

        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
      ],
    };
  },
  methods: {
    getURL() {
      console.log(window.location.href);
    },
  },
  created() {
    let ref = db
      .collection("Novels")
      .where("novel_slug", "==", this.$route.params.novel_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        this.novel = doc.data();
        this.novel.id = doc.id;
      });
    });
  },
};
</script>

<style>
.share-novel-header {
  background-color: #29302e;
  color: white;
  font-family: ara;
}
.popup-share {
  direction: rtl;
}
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^="share-network-"] {
  flex: none;
  color: #ffffff !important;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>