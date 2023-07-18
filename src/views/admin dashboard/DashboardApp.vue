<template>
  <div class="bodies" v-if="this.$store.state.is_login == true">
    <HeaderAdmin />
    <section class="page">
      <section class="sidebar">
        <div class="account">
          <h3>{{ currentLogin.full_name }}</h3>
          <p>
            {{ currentLogin.occupation.id }}
          </p>
        </div>
        <div class="menu">
          <div class="menu1">
            <ul>
              <li :class="[currentRoute == '/dashboard' ? 'active' : 'act']">
                <router-link to="/dashboard">DASHBOARD</router-link>
              </li>
              <!-- start menu untk super admin  -->
              <li
                v-if="currentLogin.level == 'super admin'"
                :class="[
                  currentRoute == '/dashboard/list_fo_irban' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/list_fo_irban"
                  >Fo dan Irban</router-link
                >
              </li>
              <li
                v-if="currentLogin.level == 'super admin'"
                :class="[
                  currentRoute == '/dashboard/laporan_terbaru'
                    ? 'active'
                    : 'act',
                ]"
              >
                <router-link to="/dashboard/laporan_terbaru"
                  >Laporan terbaru</router-link
                >
              </li>
              <!-- end menu untk super admin  -->

              <!-- start menu untk fo  -->
              <li
                v-if="currentLogin.level == 'fo'"
                :class="[
                  currentRoute == '/dashboard/tulis_laporan' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/tulis_laporan"
                  >Tulis Laporan</router-link
                >
              </li>
              <li
                v-if="currentLogin.level == 'fo'"
                :class="[
                  currentRoute == '/dashboard/permintaan_informasi'
                    ? 'active'
                    : 'act',
                ]"
              >
                <router-link to="/dashboard/permintaan_informasi"
                  >Permintaan Informasi</router-link
                >
              </li>
              <li
                v-if="currentLogin.level == 'fo'"
                :class="[
                  currentRoute == '/dashboard/aspirasi' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/aspirasi">Aspirasi</router-link>
              </li>
              <!-- end menu untk fo -->

              <!-- start menu untk irban  -->
              <li
                v-if="currentLogin.level == 'irban'"
                :class="[
                  currentRoute == '/dashboard/pengaduan' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/pengaduan">Pengaduan</router-link>
              </li>
              <li
                v-if="currentLogin.level == 'irban'"
                :class="[
                  currentRoute == '/dashboard/perceraian' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/perceraian">Perceraian</router-link>
              </li>
              <!-- end menu untk irban  -->

              <li
                :class="[
                  currentRoute == '/dashboard/laporan_aktif' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/laporan_aktif"
                  >Laporan Aktif</router-link
                >
              </li>
              <li
                :class="[
                  currentRoute == '/dashboard/tracking_laporan'
                    ? 'active'
                    : 'act',
                ]"
              >
                <router-link to="/dashboard/tracking_laporan"
                  >Tracking Laporan</router-link
                >
              </li>
              <li
                :class="[
                  currentRoute == '/dashboard/semua_laporan' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/semua_laporan"
                  >Semua Laporan</router-link
                >
              </li>
            </ul>
          </div>

          <div class="menu2">
            <ul>
              <li
                :class="[currentRoute == '/dashboard/arsip' ? 'active' : 'act']"
              >
                <router-link to="/dashboard/arsip">ARSIP</router-link>
              </li>
              <li
                style="
                  font-size: 0.8rem;
                  font-weight: normal;
                  margin-left: 1rem;
                  padding: 0.5rem;
                "
                :class="[
                  currentRoute == '/dashboard/surat_masuk' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/surat_masuk"
                  >Surat Masuk</router-link
                >
              </li>
              <li
                style="
                  font-size: 0.8rem;
                  padding: 0.5rem;
                  font-weight: normal;
                  margin-left: 1rem;
                "
                :class="[
                  currentRoute == '/dashboard/surat_keluar' ? 'active' : 'act',
                ]"
              >
                <router-link to="/dashboard/surat_keluar"
                  >Surat Keluar</router-link
                >
              </li>
            </ul>
          </div>
          <hr width="100%" />
          <div class="menu2">
            <ul>
              <li
                :class="[currentRoute == '/dashboard/ams' ? 'active' : 'act']"
              >
                <router-link to="/dashboard/ams">AMS</router-link>
              </li>
              <li
                style="
                  font-size: 0.8rem;
                  font-weight: normal;
                  margin-left: 1rem;
                  padding: 0.5rem;
                "
                :class="[
                  currentRoute == '/dashboard/ams_surat_masuk'
                    ? 'active'
                    : 'act',
                ]"
              >
                <router-link to="/dashboard/ams_surat_masuk"
                  >Surat Masuk</router-link
                >
              </li>
              <li
                style="
                  font-size: 0.8rem;
                  padding: 0.5rem;
                  font-weight: normal;
                  margin-left: 1rem;
                "
                :class="[
                  currentRoute == '/dashboard/ams_surat_keluar'
                    ? 'active'
                    : 'act',
                ]"
              >
                <router-link to="/dashboard/ams_surat_keluar"
                  >Surat Keluar</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section
        class="contents"
        v-if="this.$store.state.modal.show == true ? 'cont-rel' : 'contents'"
      >
        <div
          class="dashboard"
          v-if="currentRoute == '/dashboard' || currentRoute == '/dashboard/'"
        >
          <transition name="slides">
            <Dashboard_Content />
          </transition>
        </div>
        <router-view v-slot="{ Component }">
          <transition name="slides">
            <component :is="Component" />
          </transition>
        </router-view>
      </section>
    </section>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import HeaderAdmin from "@/ui/HeaderAdmin.vue";
import Dashboard_Content from "./Dashboard_Content.vue";

export default {
  created() {
    this.is_login = this.$store.state.is_login;
    if (this.is_login == false) {
      this.$router.push("/login");
      // console.log("ds-> login");
    } else {
      this.currentLogin = this.$store.state.currentLogin;
      if (this.currentLogin.level == "user") {
        this.$router.push("/lapor");
      }
    }
  },
  computed: {
    currentRoute() {
      return useRouter().currentRoute.value.path;
    },
    arsip() {
      let ars = false;
      if (
        this.currentRoute == "/dashboard/arsip" ||
        this.currentRoute == "/dashboard/surat_keluar" ||
        this.currentRoute == "/dashboard/surat_masuk"
      ) {
        ars = true;
      }
      return ars;
    },
  },
  data() {
    return {
      modal: {},
      currentLogin: {},
      is_login: false,
    };
  },
  methods: {},
  components: { HeaderAdmin, Dashboard_Content },
};
</script>

<style scoped>
.bodies {
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
}
/* akun john doe  */
h1,
h3 {
  margin: 0;
  font-size: 1.3rem;
}
h3 {
  color: white;
  margin: 0.2rem;
}
p {
  margin: 0;
  color: white;
  font-size: 0.8rem;
}
/* end akun john doe  */
.page {
  width: 100vw;
  height: 95vh;
  display: flex;
}
.sidebar {
  flex-basis: 25%;
  max-width: 250px;
  background-color: #193e46;
  height: 100vh;
}
.contents {
  /* flex-basis: 80%; */
  background-color: #e4e4e4;
  height: 100vh;
  /* max-height: 95vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 2;
}
.cont-rel {
  position: static;
  z-index: unset;
}
.account {
  padding: 2rem;
  text-align: start;
}
li a {
  color: white;
  text-decoration: none;
  /* padding: 1rem; */
}
.menu1,
.menu2 {
  text-align: start;
}
.menu ul {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

li {
  width: 100%;
  /* background-color: #ffffff2f; */
  margin: 0;
  padding: 0.7rem;
}
.active {
  width: 100%;
  background-color: #ffffff2f;
  margin: 0;
  font-weight: bold;
  /* padding: 1rem; */
}
.act {
  width: 100%;
  /* background-color: #ffffff2f; */
  margin: 0;
  /* padding: 1rem; */
}
hr {
  width: 90%;
  background-color: #ff000000;
  color: rgb(216, 216, 216);
}
/* start - konten dashboard  */
.dashboard {
  background-color: #e4e4e4;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* max-height: 95vh; */
}
h1 {
  margin: 1rem;
}
.counts {
  width: 100%;
  height: 150px;
  background-color: white;
  box-shadow: 0 0 3px 0.2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}
.count h1 {
  font-size: 3rem;
}
.count p {
  font-size: 1.2rem;
  color: #193e46;
}
.two {
  display: flex;
}
.graphic {
  margin: 2rem 2rem 0 0;
  width: 60%;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 3px 0.2px rgba(0, 0, 0, 0.1);
}
.latest {
  margin: 2rem 0 0;
  width: 40%;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 3px 0.2px rgba(0, 0, 0, 0.1);
}
/* end - konten dashboard  */

/* start animasi untuk slides halaman  */

.slides-enter-from {
  transform: translateX(500px);
}
.slides-enter-to {
  transform: translateX(20);
}
.slides-enter-active {
  transition: 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: absolute;
  z-index: 1;
}
.slides-leave-from {
  /* transform: translateX(0); */
  opacity: 1;
}
.slides-leave-to {
  /* transform: translateX(100px); */
  opacity: 0;
}
.slides-leave-active {
  transition: 0.2s all ease;
  position: absolute;
  z-index: 0;
}
/*  end animasi untuk slides halaman  */
</style>
