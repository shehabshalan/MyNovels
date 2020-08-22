<template>
  <div>
    <v-app-bar app color="#29302E" height="120" dark>
      <div class="login-menu">
        <v-img
          v-if="!isLoggedIn"
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="../assets/user.svg"
          transition="scale-transition"
          width="50"
        />
        <v-img
          v-if="isLoggedIn"
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="user.image"
          transition="scale-transition"
          width="50"
        />
        <v-btn class="login-btn" text v-if="!isLoggedIn" @click="login">
          <span class="login-user">تسجيل الدخول</span>
        </v-btn>
        <v-btn text v-if="isLoggedIn" @click="logout">
          <span class="login-user">تسجيل الخروج</span>
          <span class="login-user">{{user.name}}</span>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <router-link :to="{name: 'Index'}">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/banner.svg"
          transition="scale-transition"
          width="300"
        />
      </router-link>
    </v-app-bar>
    <!-- <v-card class="mx-auto" max-width="400">
      <v-img class="white--text align-end" height="200px" :src="novel.cover_image">
        <v-card-title>{{novel.title}}</v-card-title>
      </v-img>
    </v-card>-->

    <div class="paypal-style">
      <div v-if="!paidFor">
        <h1 class="thanku-msg">شكراً لأختيارك لدعم الكاتب والقصة</h1>
        <p class="payment-type">بإمكانك الدفع عن طريق Paypal</p>

        <p></p>
      </div>

      <div v-if="paidFor">
        <h1 class="thanku-msg">شكراً لدعمك للكاتب</h1>
      </div>

      <div ref="paypal" class="container-style"></div>
    </div>
  </div>
</template>

<script>
// import image from "../assets/lamp.png"

import db from "../db";
import { mapState } from "vuex";
export default {
  name: "Paypal",
  data: function () {
    return {
      loaded: false,
      paidFor: false,
      novel: null,
      product: {
        price: 25,
        description: "leg lamp from that one movie",
        img: "./assets/novel.png",
      },
    };
  },
  computed: mapState("auth", ["user", "isLoggedIn"]),
  mounted: function () {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AX37UvfELmmbsXU94FABgKOW3TKbxiZdwpw4E13TyAzArpl4weO4NX_lRPad620ejl8IGG5dsgmTwXXh";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },

  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          style: {
            layout: "horizontal",
            color: "gold",
            shape: "rect",
            label: "paypal",
            size: "small",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.novel.title,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
            db.collection("Payments")
              .add({
                userId: this.user.id,
                userEmail: this.user.email,
                paymentId: order.id,
                time: order.create_time,
                novel: this.novel.title,
                payer: order.payer,
                status: order.status,
                novel_slug: this.novel.novel_slug,
                amount: [
                  order.purchase_units[0].amount.value,
                  order.purchase_units[0].amount.currency_code,
                ],
              })
              .then(() => {
                console.log("saved to firebase");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },

    getNovel() {
      let ref = db
        .collection("Novels")
        .where("novel_slug", "==", this.$route.params.novel_slug);
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          this.novel = doc.data();
          this.novel.id = doc.id;
          console.log(this.novel);
        });
      });
    },
  },
  created() {
    this.getNovel();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paypal-style {
  text-align: center;
  padding-top: 10%;
}
.container-style {
  text-align: center;
  margin: auto;
  width: 50%;
  border: 3px solid #356859;
  padding: 10px;
}
.thanku-msg {
  font-family: ara;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 32px;
  color: #356859;
}
.payment-type {
  font-family: ara;
  font-style: normal;
  font-weight: lighter;
  font-size: 20px;
  line-height: 32px;
  color: #356859;
}
/* #zoid-paypal-buttons-879cee9a16_mtc6mdq6ntg {
  position: relative !important;
  display: inline-block;
  width: 20%;
  min-height: 35px;
  min-width: 200px;
  max-width: 750px;
  font-size: 0;
} */
/* .buttons-container {
  transition: all 0.3s ease-in-out;
  text-align: center !important;
}
.paypal-button {
  width: 50% !important;
} */
</style>
