<template>
  <header>
    <!-- start jika bukan mobile -->
    <div class="non-mobile">
      <!-- <h1>{{ this.$store.state.app_name }}</h1> -->
      <div>
        <router-link to="/beranda">
          <img
            style="width: 90px; margin: 1rem 2rem; cursor: pointer"
            src="../../../public/asli.png"
            alt=""
          />
        </router-link>
      </div>
      <ul>
        <li>
          <router-link to="/beranda"><p>BERANDA</p></router-link>
        </li>
        <li>
          <router-link to="/lapor"><p>LAPOR</p></router-link>
        </li>
      </ul>
      <ul v-if="is_login == false" class="not-login">
        <li>
          <router-link to="/login"
            ><p style="padding: 5px">MASUK</p></router-link
          >
        </li>
        <li>
          <router-link to="/register"
            ><p style="padding: 5px">DAFTAR</p></router-link
          >
        </li>
      </ul>
      <div class="account" v-if="is_login">
        <li @click="open_account">
          <div class="nama">
            <i class="pi pi-user" style="font-size: 1rem"></i>
            <p class="userName">{{ nameToShow }}</p>
            <i
              v-if="accHov == false"
              class="pi pi-angle-down"
              style="font-size: 1rem"
            ></i>
            <i
              v-if="accHov == true"
              class="pi pi-angle-up"
              style="font-size: 1rem"
            ></i>
          </div>
          <transition name="nama">
            <ul class="menu" v-if="accHov == true">
              <li style="padding: 5px 10px">
                <button @click="this.$router.push('/laporan_saya')">
                  <i class="pi pi-user"></i>Laporan Saya
                </button>
              </li>
              <li style="padding: 5px 10px">
                <button @click="profile">
                  <i class="pi pi-user"></i>Profile
                </button>
              </li>
              <li style="padding: 5px 10px" @click="logout">
                <button @click="logout">
                  <i class="pi pi-sign-out"></i> Logout
                </button>
              </li>
            </ul>
          </transition>
        </li>
      </div>
    </div>
    <!-- end jika bukan mobile -->

    <!-- start jika mobile -->
    <div class="mobile">
      <div class="un-open">
        <i class="pi pi-bars" @click="open_menu"></i>
        <h1>{{ this.$store.state.app_name }}</h1>
      </div>
      <transition name="menu">
        <div class="bg" v-if="this.$store.state.open_menu == true">
          <div class="open">
            <div class="logo">
              <i
                class="pi pi-times"
                @click="this.$store.state.open_menu = false"
              ></i>
              <h1>{{ this.$store.state.app_name }}</h1>
            </div>
            <ul>
              <li @click="this.$store.state.open_menu = false">
                <i class="pi pi-home"></i>
                <router-link to="/beranda"><p>Beranda</p></router-link>
              </li>
              <li @click="this.$store.state.open_menu = false">
                <i class="pi pi-pencil"></i>
                <router-link to="/lapor"><p>Lapor</p></router-link>
              </li>
            </ul>
            <hr />
            <ul v-if="is_login == true">
              <li @click="this.$store.state.open_menu = false">
                <i class="pi pi-user"></i>
                <router-link to="/laporan_saya"
                  ><p>Laporan Saya</p></router-link
                >
              </li>
              <li @click="this.$store.state.open_menu = false">
                <i class="pi pi-user"></i>
                <router-link to="/edit_account"><p>Profil</p></router-link>
              </li>
              <li @click="logout">
                <i class="pi pi-sign-out"></i>
                <router-link to="#"><p>Keluar</p></router-link>
              </li>
            </ul>
            <ul v-if="is_login == false">
              <li @click="this.$store.state.open_menu = false">
                <i class="pi pi-sign-in"></i>
                <router-link to="/login"><p>Masuk</p></router-link>
              </li>
              <li @click="this.$store.state.open_menu = false">
                <i class="pi pi-user-plus"></i>
                <router-link to="/register"><p>Daftar</p></router-link>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- start jika bukan mobile -->
  </header>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.is_login = this.$store.state.is_login;
    this.currentLogin = this.$store.state.currentLogin;
    // this.is_open = this.$store.state.open_menu;
  },
  data() {
    return {
      is_home: false,
      is_login: false,
      accHov: false,
    };
  },
  computed: {
    nameToShow() {
      let name = "nama";
      let nm = this.currentLogin.full_name.slice(0, 5);
      name = nm + " ...";
      return name;
    },
  },
  methods: {
    open_menu() {
      this.is_open = true;
      this.$store.state.open_menu = true;
    },
    open_account() {
      // console.log("acc hover" + this.accHov);
      this.accHov = !this.accHov;
    },
    profile() {
      this.$router.push("/edit_account");
    },
    async logout() {
      axios
        .post(this.$store.state.common.baseUrl + "/api/auth/logout")
        .then(() => {
          // console.log(res);
          this.$store.state.open_menu = false;
          localStorage.removeItem("activeUser");
          localStorage.removeItem("token");
          this.$store.dispatch("logout", null);
          localStorage.removeItem("token");
          localStorage.removeItem("activeUser");
          this.$router.push("/beranda");
        })
        .catch(() => {
          // console.log({ err });
          // console.log("gagal logout");
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    hovering() {
      if (this.accHov == false) {
        this.accHov = true;
      } else if (this.accHov == true) {
        this.accHov = false;
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: #1161ff;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
}
.mobile {
  display: none;
}
/* tampilan user yang login  */
/* tombol akun  */
button {
  background-color: transparent;
  border: none;
  color: rgb(189, 189, 189);
  display: flex;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
button:hover {
  background-color: transparent;
  border: none;
  color: rgb(189, 189, 189);
  display: flex;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  font-weight: bold;
}
/* jika button bukan di home  */
.non-mobile {
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* color: rgb(0, 57, 133); */
  font-weight: bold;
  z-index: 10;
  /* position: relative; */
}
ul {
  display: flex;
  margin: 0;
}
li {
  list-style: none;
  margin: 5px 25px;
  /* padding: 10px 25px; */
  color: white;
  align-items: center;
}
li p {
  color: white;
}
.not-login li {
  color: white;
  border: solid white 1px;
  margin: 0.5rem;
  font-size: 0.7rem;
}
li a {
  text-decoration: none;
}
h1 {
  margin: 0.5rem;
  color: white;
}
/* start account  */
.account {
  /* border: solid rgba(240, 248, 255, 0.185) 1px; */
  /* background-color: #ffffff10; */
  margin-left: 3rem;
}
.account li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0.3rem 0.8rem;
  cursor: pointer;
}
.account li .nama {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0.8rem;
  cursor: pointer;
}
.account li p {
  margin: 0 0.5rem;
  font-weight: normal;
  font-size: 0.9rem;
}
.menu {
  position: absolute;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin-top: 1.8rem;
  border-radius: 4px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}
.menu i {
  margin: 0 0.5rem;
}
.menu li {
  margin: 0;
  padding: 0;
  transition: all ease-in 0.2s;
}
/* end account  */
/* start responsive  */
@media screen and (max-width: 600px) {
  .non-mobile {
    display: none;
    width: 100%;
  }
  .mobile {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    position: fixed;
    z-index: 99999;
  }
  header {
    display: flex;
    justify-content: flex-start;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  }
  .un-open {
    display: flex;
    padding: 0.3rem 1rem;
    width: 100vw;
    /* position: relative; */
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    background-color: #1161ff;
    /* justify-content: flex-start; */
  }
  .un-open i {
    margin: 0.5rem 1rem;
    font-size: 1.7rem;
    color: white;
  }
  .un-open h1 {
    font-size: 1.5rem;
    margin: 0.5rem;
    color: white;
  }
  .open i {
    margin: 0.5rem 1rem;
    font-size: 1.7rem;
    color: white;
  }
  .open h1 {
    font-size: 2rem;
    margin: 0.5rem;
    color: white;
  }
  .bg {
    width: 100vw;
    height: 100vh;
    /* background-color: rgba(4, 14, 43, 0.418); */
    position: absolute;
    z-index: 999;
    justify-self: flex-start;
  }
  .open {
    height: 100%;
    width: 70%;
    background-color: #0055ff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    justify-content: flex-start;
  }
  .open .logo {
    display: flex;
    background-color: #1161ff;
    padding: 1rem;
    align-items: center;
  }
  .open ul {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .open li {
    font-size: 1rem;
    text-align: start;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .open li p {
    font-size: 1.2rem;
    text-align: start;
    font-weight: bold;
    color: white;
    margin-left: 0.5rem;
  }
  .open hr {
    width: 90%;
  }
  .open i {
    margin-right: 0.5rem;
  }
}
/* end responsive  */

/* start animasi untuk open menu  */

.menu-enter-from {
  transform: translateX(-300px);
}
.menu-enter-to {
  transform: translateX(0);
}
.menu-enter-active {
  transition: all 0.3s ease-in;
}
.menu-leave-from {
  transform: translateX(0);
}
.menu-leave-to {
  transform: translateX(-300px);
}
.menu-leave-active {
  transition: all 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
}
/*  end animasi untuk open menu */

/* start animasi untuk open menu  */

.nama-enter-from {
  transform: translateY(-300px);
}
.nama-enter-to {
  transform: translateY(0);
}
.nama-enter-active {
  transition: all 0.3s ease-in;
}
.nama-leave-from {
  transform: translateY(0);
}
.nama-leave-to {
  transform: translateY(-300px);
}
.nama-leave-active {
  transition: all 0.3s ease-out;
}
/*  end animasi untuk open menu */
</style>
