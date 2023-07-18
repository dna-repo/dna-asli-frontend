<template>
  <div v-if="is_loading == false">
    <transition name="bg">
      <div
        :class="[this.$store.state.open_menu == true ? 'open-menus' : '']"
      ></div>
    </transition>
    <transition name="modalui">
      <ModalUi />
    </transition>
    <transition name="alertui">
      <AlertUi />
    </transition>
    <Pilih_Irban />
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import ModalUi from "@/ui/ModalUi.vue";
import AlertUi from "@/ui/AlertUi.vue";
import Pilih_Irban from "./ui/Pilih_Irban.vue";
export default {
  components: { ModalUi, AlertUi, Pilih_Irban },
  async created() {
    // console.log(this.$store.state.new_report.account.occupation.name);
    // melakukan check status login
    // jika pengguna me-refresh halaman, informasi login akan hilang
    // maka data login dari local storage akan diambil dandi store lagi ke vuex
    let currentLogin = localStorage.getItem("activeUser");
    let token = localStorage.getItem("token");
    if (
      token == null ||
      this.$store.state.currentLogin == null ||
      token == undefined ||
      currentLogin == undefined ||
      token == "null" ||
      currentLogin == "null" ||
      token == "undefined" ||
      currentLogin == "undefined"
    ) {
      this.is_loading = false;
      this.$store.state.is_login = false;
      // console.log(
      //   "NO_LOGIN | CHECK STATUS LOGIN - APP.VUE\n ISLOGIN == " +
      //     this.$store.state.is_login
      // );
    } else {
      //
      let user = JSON.parse(currentLogin);
      // console.log(currentLogin._id);
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/show",
          { id: user._id },
          { headers: { Authorization: this.$store.state.common.public } }
        )
        .then((res) => {
          // console.log(res.data.data);
          this.$store.dispatch("login", {
            user: res.data.data,
            token: JSON.parse(token),
          });
          this.$store.state.is_login = true;
          this.is_loading = false;
        })
        .catch(() => {
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          this.$router.push({ name: "list_fo_irban" });
        });
      //
    }
    // console.log(
    //   "LOGIN | CHECK STATUS LOGIN - APP.VUE\n ISLOGIN == " +
    //     this.$store.state.is_login
    // );
  },
  data() {
    return {
      is_loading: true,
    };
  },
  methods: {
    async get_user(id) {
      // console.log(id);
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/show",
          { user_id: id },
          { headers: { Authorization: this.$store.state.common.public } }
        )
        .then(() => {
          // console.log(res);
        })
        .catch(() => {
          // console.log(err);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* overflow: hidden; */
  background-color: #f5f5f59a;
  height: 100%;
  min-height: 100vh;
  /* overflow: hidden; */
}
.open-menus {
  background-color: #05223f7c;
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 100%;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
/* custom scroller  */
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffffffef;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(189, 189, 189);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* end custom scroller  */

/* start animasi untuk modal  */

.modalui-enter-from {
  transform: scale(0);
  opacity: 0;
}
.modalui-enter-to {
  transform: scale(1);
  opacity: 1;
}
.modalui-enter-active {
  transition: all 0.2s ease-in;
}
.modalui-leave-from {
  transform: scale(1);
  opacity: 1;
}
.modalui-leave-to {
  transform: scale(0);
  opacity: 0;
}
.modalui-leave-active {
  transition: all 0.2s ease-out;
}
/*  end animasi untuk modal  */

/* start animasi untuk alert  */

.alertui-enter-from {
  transform: translateX(300px);
}
.alertui-enter-to {
  transform: translateX(0);
}
.alertui-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.alertui-leave-from {
  transform: translateX(0);
}
.alertui-leave-to {
  transform: translateX(300px);
}
.alertui-leave-active {
  transition: all 0.5s cubic-bezier(0.47, 0, 0.745, 0.715);
}
/*  end animasi untuk alert  */

/* start animasi untuk bg*/

.bg-enter-from {
  opacity: 0;
}
.bg-enter-to {
  opacity: 1;
}
.bg-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.bg-leave-from {
  opacity: 1;
}
.bg-leave-to {
  opacity: 0;
}
.bg-leave-active {
  transition: all 0.5s cubic-bezier(0.47, 0, 0.745, 0.715);
}
/*  end animasi untuk bg*/
</style>
