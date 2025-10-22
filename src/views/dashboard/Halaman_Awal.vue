<template>
  <div :class="[this.$store.state.open_menu == true ? 'body2' : '']">
    <!-- start verifikasi email  -->
    <div class="verif-email" v-if="is_verify == false && modal.email == true">
      <p>
        <i
          class="pi pi-exclamation-circle"
          style="font-size: 1rem; margin-right: 0.5rem"
        ></i>
        Anda belum melakukan verifikasi email, verifikasi sekarang untuk memulai
        laporan anda | <a @click="kirim_verifikasi">Kirim verifikasi</a>
      </p>

      <i @click="modal.email = false" class="pi pi-times"></i>
    </div>
    <!-- end verifikasi email  -->

    <!-- start buat laporan tapi belum login  -->
    <div class="verif-email" v-if="modal.login == true">
      <p>
        <i
          class="pi pi-exclamation-circle"
          style="font-size: 1rem; margin-right: 0.5rem"
        ></i>
        Anda harus login untuk membuat laporan baru |
        <a @click="this.$router.push('login')">LOGIN</a> |
        <a @click="this.$router.push('register')">DAFTAR</a>
      </p>

      <i @click="modal.login = false" class="pi pi-times"></i>
    </div>
    <!-- end buat laporan tapi belum login  -->

    <!-- start background  -->
    <div class="bg">
      <div class="bgblue"></div>
      <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#1161ff"
          fill-opacity="1"
          d="M0,64L30,80C60,96,120,128,180,160C240,192,300,224,360,208C420,192,480,128,540,138.7C600,149,660,235,720,256C780,277,840,235,900,218.7C960,203,1020,213,1080,213.3C1140,213,1200,203,1260,176C1320,149,1380,107,1410,85.3L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        >
          >
        </path>
      </svg> -->
    </div>
    <!-- end background  -->

    <!-- start main header UI -->
    <HeaderUI />
    <!-- end main header UI -->

    <!-- start section text besar -->
    <LogoAsli />
    <section class="text">
      <h2>Administrasi Surat dan Laporan Informasi</h2>
      <br />
      <p>
        Sampaikan laporan Anda langsung kepada instansi pemerintah berwenang
      </p>
    </section>
    <hr />
    <!-- end section text besar -->

    <!-- start section lapor form  -->
    <section class="lapor">
      <h2 class="sampaikan">Sampaikan laporan anda</h2>
      <div class="input cat">
        <select required v-model="laporan_baru.klasifikasi">
          <option value="" selected disabled>
            Pilih Klasifikasi Laporan anda
          </option>
          <option value="aspirasi">Aspirasi</option>
          <option value="pengaduan">Pengaduan</option>
          <option value="permintaan informasi">Permintaan Informasi</option>
          <option v-if="is_pns == true" value="perceraian">Perceraian</option>
        </select>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="laporan_baru.judul"
          placeholder="Ketik judul laporan anda"
        />
      </div>
      <div class="input">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="laporan_baru.isi"
          placeholder="Ketik rincian laporan anda"
        ></textarea>
      </div>
      <div class="input cat" v-if="laporan_baru.klasifikasi != 'perceraian'">
        <select required v-model="laporan_baru.intansi_tujuan">
          <option value="" selected disabled>Pilih Instansi Tujuan</option>
          <option v-for="(data, index) in dinas" :value="data" :key="index">
            {{ data }}
          </option>
        </select>
      </div>
      <div class="lampiran">
        <p
          v-if="laporan_baru.klasifikasi == 'perceraian'"
          style="
            font-size: 0.9rem;
            margin: 0.5rem;
            padding: 0.5rem;
            background-color: #90cbff;
            border-radius: 4px;
          "
        >
          Lengkapi File Lampiran
        </p>
        <div
          class="file cerai"
          v-if="is_pns == true && laporan_baru.klasifikasi == 'perceraian'"
        >
          <ul>
            <li>
              <label for="ktp">Upload KTP</label>
              <input
                type="file"
                @change="input_ktp($event)"
                id="ktp"
                accept=".pdf"
              />
              <p v-if="file_perceraian.ktp != undefined">
                {{ file_perceraian.ktp.name }}
              </p>
            </li>
            <li>
              <label for="kk">Upload Kartu Keluarga</label>
              <input
                type="file"
                accept=".pdf"
                @change="input_kk($event)"
                id="kk"
              />
              <p v-if="file_perceraian.kk != undefined">
                {{ file_perceraian.kk.name }}
              </p>
            </li>
            <li>
              <label for="sk">Upload SK CPNS Terakhir</label>
              <input
                type="file"
                @change="input_sk($event)"
                id="sk"
                accept=".pdf"
              />
              <p v-if="file_perceraian.sk_terakhir != undefined">
                {{ file_perceraian.sk_terakhir.name }}
              </p>
            </li>
            <li>
              <label for="nikah">Upload Buku Nikah</label>
              <input
                type="file"
                @change="input_nikah($event)"
                id="nikah"
                accept=".pdf"
              />
              <p v-if="file_perceraian.buku_nikah != undefined">
                {{ file_perceraian.buku_nikah.name }}
              </p>
            </li>
            <li>
              <label for="keterangan">Upload Keterangan Kepala Wilayah</label>
              <input
                type="file"
                @change="input_keterangan($event)"
                id="keterangan"
                accept=".pdf"
              />
              <p v-if="file_perceraian.keteranga_wilayah != undefined">
                {{ file_perceraian.keteranga_wilayah.name }}
              </p>
            </li>
            <li>
              <label for="izin">Upload Surat Ijin Atasan</label>
              <input
                type="file"
                @change="input_izin($event)"
                id="izin"
                accept=".pdf"
              />
              <p v-if="file_perceraian.izin_atasan != undefined">
                {{ file_perceraian.izin_atasan.name }}
              </p>
            </li>
            <p style="color: grey; font-size: 0.6rem; margin: 0.3rem">
              *pastikan file inputan adalah pdf
            </p>
          </ul>
          <input @change="upload($event)" id="file" type="file" />
        </div>
        <div class="file" v-if="laporan_baru.klasifikasi != 'perceraian'">
          <label for="file" @change="upload($event)"
            >Upload Lampiran <span>{{ lampiranCount }}</span></label
          >
          <input @change="upload($event)" id="file" type="file" />
        </div>
        <div class="button">
          <div
            class="input-radio"
            v-if="laporan_baru.klasifikasi != 'perceraian'"
          >
            <input type="checkbox" v-model="laporan_baru.isAnonim" />
            <label>Anonim</label>
          </div>
          <button
            v-if="on_send == false"
            @click="buatLaporan"
            :class="[
              is_login == true
                ? ''
                : 'btn-disable' || modal.email == true
                ? ''
                : 'btn-disable',
            ]"
          >
            Buat Laporan
          </button>
          <button
            v-if="on_send == true"
            style="display: flex; align-items: center"
            @click="buatLaporan"
            :class="[
              is_login == true
                ? ''
                : 'btn-disable' || modal.email == true
                ? ''
                : 'btn-disable',
            ]"
          >
            Loading
            <i class="pi pi-spin pi-spinner" style="margin-left: 0.5rem"></i>
          </button>
        </div>
      </div>
    </section>
    <!-- end section lapor form  -->

    <!-- start section tracking laporan  -->
    <section class="step">
      <div class="part s1">
        <div class="circle 1">
          <i class="pi pi-file"></i>
        </div>
        <div class="keterangan">
          <h3>Buat Laporan</h3>
          <p>Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="part s2">
        <div class="circle 1">
          <i class="pi pi-reply"></i>
        </div>
        <div class="keterangan">
          <h3>Verifikasi</h3>
          <p>Laporan anda akan diteruskan kepada instansi berwenang</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="part s3">
        <div class="circle 1">
          <i class="pi pi-comment"></i>
        </div>
        <div class="keterangan">
          <h3>Tindak Lanjut</h3>
          <p>Laporan anda akan di tindak lanjuti</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="part s4">
        <div class="circle 1">
          <i class="pi pi-comments"></i>
        </div>
        <div class="keterangan">
          <h3>Tanggapan</h3>
          <p>Anda menanggapi tindak lanjut yang diberikan</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="part s5">
        <div class="circle 1">
          <i class="pi pi-check"></i>
        </div>
        <div class="keterangan">
          <h3>Selesai</h3>
          <p>Laporan selesai setelah anda memberikan tanggapan</p>
        </div>
      </div>
    </section>
    <!-- end section tracking laporan  -->
  </div>
</template>

<script>
import axios from "axios";
import HeaderUI from "./HeaderUI.vue";
import LogoAsli from "./halaman awal/LogoAsli.vue";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Lapor`;
    this.is_login = this.$store.state.is_login;
    this.dinas = this.$store.state.dinas;
    if (this.is_login == true) {
      this.currentLogin = this.$store.state.currentLogin;
      if (this.currentLogin.occupation.name == "pns") {
        this.is_pns = true;
      }
      if (this.currentLogin.level != "user") {
        this.$router.push("/dashboard");
      }
    }
  },
  computed: {
    is_verify() {
      let is_verify = Boolean;
      if (this.is_login == true) {
        if (this.currentLogin.status == "verified") {
          is_verify = true;
        } else {
          is_verify = false;
        }
      }
      return is_verify;
    },
  },
  data() {
    return {
      is_login: false,
      modal: {
        email: true,
        login: false,
      },
      is_pns: false,
      on_send: false,
      currentLogin: {},
      lampiranCount: 0,
      dinas: [],
      laporan_baru: {
        account: {},
        status: "laporan baru",
        tiket: "",
        klasifikasi: "",
        judul: "",
        isi: "",
        tanggal: "",
        intansi_tujuan: "",
        file_lampiran: [],
        isAnonim: false,
      },
      file_perceraian: {
        ktp: undefined,
        kk: undefined,
        buku_nikah: undefined,
        keteranga_wilayah: undefined,
        sk_terakhir: undefined,
        izin_atasan: undefined,
      },
    };
  },
  methods: {
    // untuk event change input file lampiran
    upload(e) {
      this.lampiranCount++;
      let file = e.target.files[0];
      this.laporan_baru.file_lampiran.push(file);
    },
    input_kk(e) {
      let file = e.target.files[0];
      this.file_perceraian.kk = file;
      // console.log(file);
      // console.log(file.name);
    },
    input_ktp(e) {
      let file = e.target.files[0];
      this.file_perceraian.ktp = file;
    },
    input_nikah(e) {
      let file = e.target.files[0];
      this.file_perceraian.buku_nikah = file;
    },
    input_keterangan(e) {
      let file = e.target.files[0];
      this.file_perceraian.keteranga_wilayah = file;
    },
    input_sk(e) {
      let file = e.target.files[0];
      this.file_perceraian.sk_terakhir = file;
    },
    input_izin(e) {
      let file = e.target.files[0];
      this.file_perceraian.izin_atasan = file;
    },
    async buatLaporan() {
      //
      if (this.laporan_baru.klasifikasi == "") {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Klasifikasi laporan tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        window.scrollTo(0, 0);
        return;
      }
      if (this.laporan_baru.judul == "") {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Judul laporan tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        window.scrollTo(0, 0);
        return;
      }
      if (this.laporan_baru.klasifikasi == "") {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Rincian laporan tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        window.scrollTo(0, 0);
        return;
      }
      if (this.laporan_baru.klasifikasi != "perceraian") {
        if (this.laporan_baru.klasifikasi == "") {
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Dinas tujuan tidak boleh kosong";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          window.scrollTo(0, 0);
          return;
        }
      }
      if (this.laporan_baru.klasifikasi == "perceraian") {
        this.laporan_baru.intansi_tujuan = "null";
      } //

      this.on_send = true;
      // start cek status login
      if (this.is_login == false) {
        window.scrollTo(0, 0);
        this.modal.login = true;
        this.laporan_baru.account = {};
        this.laporan_baru.status = "laporan baru";
        this.laporan_baru.tiket = "";
        this.laporan_baru.klasifikasi = "";
        this.laporan_baru.judul = "";
        this.laporan_baru.isi = "";
        this.laporan_baru.tanggal = "";
        this.laporan_baru.intansi_tujuan = "";
        this.laporan_baru.file_lampiran = [];
        this.lampiranCount = 0;
        this.laporan_baru.isAnonim = false;
        return;
      }
      // end cek status login

      // start cek status akun
      if (this.currentLogin.status == "pending") {
        window.scrollTo(0, 0);
        this.modal.email = true;
        this.laporan_baru.account = {};
        this.laporan_baru.status = "laporan baru";
        this.laporan_baru.tiket = "";
        this.laporan_baru.klasifikasi = "";
        this.laporan_baru.judul = "";
        this.laporan_baru.isi = "";
        this.laporan_baru.tanggal = "";
        this.laporan_baru.intansi_tujuan = "";
        this.laporan_baru.file_lampiran = [];
        this.lampiranCount = 0;
        this.laporan_baru.isAnonim = false;
        return;
      }
      // end cek status akun

      if (this.laporan_baru.klasifikasi == "perceraian") {
        if (
          this.file_perceraian.ktp == undefined ||
          this.file_perceraian.kk == undefined ||
          this.file_perceraian.sk_terakhir == undefined ||
          this.file_perceraian.keteranga_wilayah == undefined ||
          this.file_perceraian.buku_nikah == undefined ||
          this.file_perceraian.izin_atasan == undefined
        ) {
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "File lampiran tidak lengkap";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          return;
        }
      }

      let randonNumber = Math.floor(Math.random() * 99990);
      this.laporan_baru.tiket = "LP100" + randonNumber;
      this.laporan_baru.account = this.currentLogin;
      this.laporan_baru.isAnonim =
        this.laporan_baru.isAnonim == true ? "true" : "false";

      // menyiapkan data ke dalam form data
      let formData = new FormData();
      formData.append("account", JSON.stringify(this.laporan_baru.account));
      formData.append("status", this.laporan_baru.status);
      formData.append("tiket", this.laporan_baru.tiket);
      formData.append("klasifikasi", this.laporan_baru.klasifikasi);
      formData.append("judul", this.laporan_baru.judul);
      formData.append("isi", this.laporan_baru.isi);
      formData.append("tanggal", this.laporan_baru.tanggal);
      formData.append("instansi_tujuan", this.laporan_baru.intansi_tujuan);
      // console.log(
      //   "jumlah file lampiran : " + this.laporan_baru.file_lampiran.length
      // );
      if (this.laporan_baru.klasifikasi == "perceraian") {
        formData.append("file_lampiran", this.file_perceraian.ktp);
        formData.append("file_lampiran", this.file_perceraian.kk);
        formData.append("file_lampiran", this.file_perceraian.sk_terakhir);
        formData.append("file_lampiran", this.file_perceraian.buku_nikah);
        formData.append(
          "file_lampiran",
          this.file_perceraian.keteranga_wilayah
        );
        formData.append("file_lampiran", this.file_perceraian.izin_atasan);
      } else {
        for (
          let data = 0;
          data < this.laporan_baru.file_lampiran.length;
          data++
        ) {
          formData.append(
            "file_lampiran",
            this.laporan_baru.file_lampiran[data]
          );
          // console.log("lampiran ke : " + this.laporan_baru.file_lampiran[data]);
        }
      }
      formData.append("isAnonim", this.laporan_baru.isAnonim);
      // end menyiapkan data ke dalam form data
      // console.log(formData);
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/laporan/store",
          formData,
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          window.scrollTo(0, 0);
          // console.log(res.data);
          this.$router.push("/laporan_saya");
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil mengirim laporan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          this.on_send = false;
        })
        .catch(() => {
          // console.log(err);
          window.scrollTo(0, 0);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Gagal tambah laporan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          this.on_send = false;
        });
    },
    async kirim_verifikasi() {
      this.modal.email = false;
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/send_mail",
          {
            id: this.currentLogin._id,
            full_name: this.currentLogin.full_name,
            email: this.currentLogin.email,
          },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          // console.log(res);
          this.pesan = "Berhasil kirim email";
          this.berhasil = true;
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil kirim email";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        })
        .catch(() => {
          this.pesan = "Gagal kirim email";
          this.berhasil = true;
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Gagal kirim email";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
  },
  components: { HeaderUI, LogoAsli },
};
</script>

<style scoped>
.body {
  height: 100%;
  width: 100vw;
  margin: 0;
  overflow-y: scroll;
}

.body2 {
  min-height: 100vw;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* custom header dari komponen   */
li a {
  background-color: rgb(255, 255, 255);
}

/* end custom header dari komponen   */
h1,
h2 {
  margin: 0;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 0;
}

.bgblue {
  background-color: #1161ff;
  /* max-height: 40vh; */
  height: 600px;
}

.text {
  position: relative;
  color: rgb(255, 255, 255);
  font-size: 1.2rem;
  animation: text-animation 1s;
}

@keyframes text-animation {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  50% {
    transform: translateY(-30px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
  }
}

.text h2 {
  font-size: 1.5rem;
}

.lapor {
  position: relative;
  color: rgb(0, 0, 0);
  width: 600px;
  min-width: 300px;
  min-height: 500px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 2rem;
  display: block;
  margin: 0 auto;
  text-align: start;
  border-radius: 4px;
}

.sampaikan {
  padding: 0.5rem;
  background-color: #004fec;
  color: white;
}

h2 {
  font-weight: bold;
}

hr {
  background-color: white;
  width: 30px;
  height: 5px;
  border-radius: 4px;
  position: relative;
  display: block;
  margin: 1.5rem auto;
  border: none;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: 0.5rem 0;
}

textarea {
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}

select {
  width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  /* width: 240px; */
}

button {
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  background-color: #0088ff;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}

select:required:invalid {
  color: gray;
}

option[value=""][disabled] {
  display: none;
}

option {
  color: black;
}

.cat {
  margin: 1.5rem 0;
}

.lampiran {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lampiran input {
  background-color: transparent;
  border: none;
}

input[type="file"] {
  display: none;
}

label {
  /* background-color: #2f5299; */
  color: #2f5299;
  padding: 0.5rem;
  border-radius: 4px;
}

.file {
  display: flex;
  flex-direction: row;
}

span {
  background-color: #0088ff;
  padding: 5px;
  border-radius: 30px;
  font-size: 0.7rem;
}

h3 {
  margin: 0.2rem;
  font-size: 0.95rem;
}

p.ket {
  width: 100px;
  margin: 0;
  font-size: 0.7rem;
  color: #48475f8c;
}

h3 {
  color: #0f2c67;
}

li a {
  color: white;
  text-decoration: none;
  padding-bottom: 5px;
  font-weight: bold;
  transition: cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

li a:hover {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: solid white 3px;
}

.input-radio {
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.input-radio label {
  color: gray;
  padding: 0 0.2rem;
}

.input-radio input {
  width: 15px;
  height: 15px;
}

.button {
  display: flex;
  width: 50%;
  align-self: flex-end;
}

.auth {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  /* background-color: #9adcff; */
}

input {
  width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}

.auth ul {
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-left: 2rem;
}

.auth li {
  margin: 0.5rem;
  border: solid 1px white;
  padding: 0.5rem;
  border-radius: 4px;
}

.auth a {
  color: white;
  font-size: 0.85rem;
}

/* start - modal  */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #33334d93;
  z-index: 20;
  position: absolute;
  overflow-y: hidden;
}

.login {
  background-color: white;
  padding: 1rem;
  width: 500px;
  height: 100px;
  z-index: 20;
  top: 50vh;
  border: solid rgb(204, 204, 204) 1px;
  border-radius: 4px;
}

.login button {
  justify-self: flex-end;
  width: 20%;
  margin-top: 1rem;
}

/* end - modal  */
.panah {
  justify-self: flex-end;
  /* align-self: flex-end; */
}

.userName {
  font-size: 0.78rem;
  overflow: hidden;
}

.hovered {
  position: absolute;
}

/* start verif-email */
.verif-email {
  position: relative;
  background-color: rgb(255, 254, 194);
  z-index: 99;
  padding: 0.8rem 2rem;
  align-self: center;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
}

.verif-email a {
  text-decoration: underline;
  color: #0088ff;
  cursor: pointer;
  margin-left: 0.2rem;
}

.verif-email p {
  display: flex;
  align-items: center;
}

.verif-email i {
  font-size: 0.8rem;
  cursor: pointer;
}

/* end verif-email */

.btn-disable {
  background-color: rgb(199, 199, 199);
}

/* start step  */
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 7px 0.7px rgba(0, 0, 0, 0.1);
}

.part {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -1rem;
}

.part .keterangan {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  width: 80px;
}

.part .keterangan h3 {
  font-size: 0.7rem;
  margin: 0.2rem;
}

.part .keterangan p {
  font-size: 0.6rem;
  margin: 0.2rem;
  color: grey;
}

.line {
  width: 1000px;
  height: 1px;
  background-color: #dddddd;
  margin-top: 1.5rem;
  margin-left: -0.9rem;
}

.step {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 550px;
  padding: 1rem;
  margin: 1rem auto 0 auto;
}

/* end step  */

/* start responsive  */
@media screen and (max-width: 600px) {
  .body {
    width: 100vw;
  }

  .text {
    margin-top: 5rem;
    margin: 0;
    margin-top: -4rem;
    min-height: 50px;
    animation: text-animation 1s;
  }

  @keyframes text-animation {
    0% {
      transform: translateY(-30px);
      opacity: 0;
    }
    50% {
      transform: translateY(-30px);
      opacity: 0;
    }

    100% {
      transform: translateY(0px);
    }
  }

  .text h2 {
    font-size: 1.5rem;
  }

  .text p {
    font-size: 1rem;
    margin-top: 0.2rem;
  }

  .lapor {
    width: 90vw;
    padding: 1rem;
  }

  button {
    padding: 10px 10px;
    border: none;
    background-color: #0088ff;
    border-radius: 4px;
    color: white;
    font-size: 0.9rem;
    width: 50%;
  }

  input {
    width: 100%;
    font-size: 1rem;
    padding: 0.7rem 1rem;
    background-color: rgb(233, 239, 248);
    border: solid rgb(197, 197, 197) 0.5px;
    border-radius: 4px;
  }

  .lampiran {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
}

/* end responsive  */

/* start lampiran pernikahan  */
.lampiran {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.lampiran .cerai ul {
  width: 100%;
  padding: 0.8rem;
  margin: 0;
}

.lampiran .cerai li {
  list-style: none;
}

.lampiran .cerai li label {
  list-style: none;
  padding: 0.2rem 0.5rem;
  /* background-color: #005197; */
  /* margin: 0.2rem; */
  /* color: #ffffff; */
  /* border: solid rgb(172, 172, 172) 1px; */
}

.lampiran .cerai li p {
  color: grey;
  text-align: end;
}

.lampiran .cerai {
  border-radius: 4px;
  border: solid rgb(172, 172, 172) 1px;
  width: 100%;
  margin-bottom: 1rem;
}

.cerai ul li {
  list-style: none;
  display: flex;
  justify-content: space-between;
}

/* end lampiran pernikahan  */
</style>
