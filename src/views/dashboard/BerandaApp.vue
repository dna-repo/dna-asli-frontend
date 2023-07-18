<template>
  <div
    class="body"
    :class="[this.$store.state.open_menu == true ? 'body2' : '']"
  >
    <HeaderUI />
    <progress-spinner
      style="margin-top: 10rem"
      v-if="is_loading.page == true"
    ></progress-spinner>
    <section class="text">
      <h2>ADUAN TERBARU</h2>
      <p
        v-if="laporan.length == 0"
        style="text-align: center; color: grey; display: inline; margin: 2rem 0"
      >
        - Belum ada aduan -
      </p>
    </section>
    <section class="aduan">
      <div class="adu" v-for="data in laporan" :key="data.id">
        <h3>{{ data.judul }}</h3>
        <p>
          {{ data.toShow }}
        </p>
        <div class="pelapor">
          <i class="pi pi-user" style="margin-right: 0.2rem"></i>
          <div class="pelapor detail">
            <span>{{
              data.isAnonim == "true" ? "Anonim" : data.account.full_name
            }}</span>
            <p>{{ data.createdAt }}</p>
          </div>
        </div>
        <div
          class="status"
          @click="
            this.$router.push({
              name: 'detail',
              params: { id: data._id },
            })
          "
          :class="[
            data.status == 'laporan baru'
              ? 'laporan-baru'
              : '' || data.status == 'verifikasi'
              ? 'verifikasi'
              : '' || data.status == 'tindak lanjut'
              ? 'tindak-lanjut-warna'
              : '' || data.status == 'tanggapan'
              ? 'tanggapan'
              : '' || data.status == 'selesai'
              ? 'selesai'
              : '',
          ]"
        >
          <p>
            <i
              class="pi pi-file"
              style="font-size: 0.75rem; margin-right: 0.3rem"
              v-if="data.status == 'laporan baru'"
            ></i>
            <i
              class="pi pi-sync"
              style="font-size: 0.75rem; margin-right: 0.3rem"
              v-if="data.status == 'verifikasi'"
            ></i>
            <i
              class="pi pi-comment"
              style="font-size: 0.75rem; margin-right: 0.3rem"
              v-if="data.status == 'tindak lanjut'"
            ></i>
            <i
              class="pi pi-comments"
              style="font-size: 0.75rem; margin-right: 0.3rem"
              v-if="data.status == 'tanggapan'"
            ></i>
            <i
              class="pi pi-check"
              style="font-size: 0.75rem; margin-right: 0.3rem"
              v-if="data.status == 'selesai'"
            ></i>
            {{ data.status }}
          </p>
          <i
            class="pi pi-arrow-right"
            style="font-size: 0.75rem; margin-left: 9rem"
          ></i>
        </div>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
// import { useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import axios from "axios";
import HeaderUI from "./HeaderUI.vue";
export default {
  components: {
    ProgressSpinner,
    HeaderUI,
  },
  async created() {
    // console.log(useRouter());
    document.title = `${this.$store.state.app_name} | Beranda`;
    this.is_login = this.$store.state.is_login;
    if (this.is_login == true) {
      // console.log("login");
      this.currentLogin = this.$store.state.currentLogin;
      if (this.currentLogin.level != "user") {
        this.$router.push("/dashboard");
      }
    }
    if (this.laporan.length == 0) {
      axios
        .get(this.$store.state.common.baseUrl + "/api/laporan", {
          headers: {
            Authorization:
              this.$store.state.common.headers == ""
                ? this.$store.state.common.public
                : this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.is_loading.page = false;
          this.laporan = res.data.data.filter(
            (data) => data.klasifikasi != "perceraian"
          );
          // console.log(res.data.data);
          this.$store.state.data = this.laporan;
          this.laporan.reverse();
          this.laporan.map((data) => {
            data.createdAt = this.date_to_show(data.createdAt);
            // console.log(data.createdAt);
          });
        })
        .catch(() => {
          // console.log(err);
          this.is_loading.page = false;
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    }
    // }
  },
  data() {
    return {
      is_login: false,
      laporan: [],
      shortedText: [],
      currentLogin: {},
      is_loading: {
        page: true,
      },
    };
  },
  methods: {
    date_to_show(dt) {
      let date = dt;
      let a = date.split(" ");
      let hari = a[0];
      let tanggal = a[2];
      let bulan = a[1];
      let tahun = a[3];
      // let jam = a[4];
      if (hari == "Sunday,") {
        hari = "Minggu";
      } else if (hari == "Monday,") {
        hari = "Senin";
      } else if (hari == "Tuesday,") {
        hari = "Selasa";
      } else if (hari == "Wednesday,") {
        hari = "Rabu";
      } else if (hari == "Thursday,") {
        hari = "Kamis";
      } else if (hari == "Friday,") {
        hari = "Jumat";
      } else if (hari == "Saturday,") {
        hari = "Sabtu";
      }
      tanggal = tanggal.replace(",", "");
      if (bulan == "January") {
        bulan = "Januari";
      } else if (bulan == "February") {
        bulan = "Februari";
      } else if (bulan == "March") {
        bulan = "Maret";
      } else if (bulan == "May") {
        bulan = "Mei";
      } else if (bulan == "June") {
        bulan = "Juni";
      } else if (bulan == "July") {
        bulan = "Juli";
      } else if (bulan == "August") {
        bulan = "Agustus";
      } else if (bulan == "October") {
        bulan = "Oktober";
      } else if (bulan == "December") {
        bulan = "Desember";
      }
      // console.log(a);
      date = `${hari}, ${tanggal} ${bulan} ${tahun}`;
      // console.log(date);
      return date;
    },
  },
};
</script>

<style scoped>
.body {
  min-height: 100vw;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.body2 {
  min-height: 100vw;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
h1,
h2 {
  margin: 0;
}
/* override dari component header  */
ul {
  display: flex;
  margin: 0;
}
li {
  list-style: none;
  margin: 5px 10px;
  padding: 10px 20px;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 0;
}
.bgblue {
  background-color: #ffffff;
  height: 50px;
}
.text {
  position: relative;
  color: rgb(255, 255, 255);
  font-size: 1.2rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h2 {
  font-weight: bold;
  color: rgb(0, 57, 133);
  font-weight: bold;
}
hr {
  background-color: white;
  width: 20px;
  height: 3px;
  position: relative;
  display: block;
  margin: 2rem auto;
}
li a {
  color: rgb(0, 57, 133);
  text-decoration: none;
  padding-bottom: 5px;
  transition: cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
li a:hover {
  color: rgb(0, 57, 133);
  text-decoration: none;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: solid rgba(0, 58, 133, 0.377) 3px;
}
.aduan {
  width: 800px;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: center;
  align-self: center;
}
.adu {
  background-color: white;
  /* border-radius: 4px; */
  width: 300px;
  margin: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 3px 0.1px rgba(0, 0, 0, 0.05);
  text-align: start;
}
h3 {
  margin: 0.5rem 0;
  text-transform: uppercase;
}
p {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}
.pelapor {
  margin: 5px;
  display: flex;
  display: flex;
  align-items: center;
}
.pelapor span {
  font-size: 0.8rem;
}
.detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.detail p {
  font-size: 0.65rem;
  color: #b6b6b6;
}
a {
  color: white;
  text-decoration: none;
}
.status {
  background-color: rgb(0, 95, 32);
  color: white;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  cursor: pointer;
  /* border-radius: 4px; */
}

.texting {
  height: 50px;
  display: flex;
}
/* start detail status laporan  */

.laporan-baru {
  background-color: #00da16;
}
.verifikasi {
  background-color: #00529e;
}
.tindak-lanjut-warna {
  background-color: #ff4040;
}
.tanggapan {
  background-color: #00b8e0;
}
.selesai {
  background-color: #1161ff;
}
/* end detail status laporan  */

/* start responsive  */
@media screen and (max-width: 600px) {
  .aduan {
    min-height: 200px;
    width: 90%;
    border-radius: 4px;
    margin: auto;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .adu {
    background-color: white;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
    margin: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 3px 0.1px rgba(0, 0, 0, 0.05);
    text-align: start;
  }
  .text {
    font-size: 1rem;
    margin-top: 1rem;
  }
}
/* end responsive  */
</style>
