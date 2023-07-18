<template>
  <div class="body" v-if="isLoading == false">
    <div class="tanggapi">
      <div class="tanggapi-header">
        <h1>
          <i
            class="pi pi-arrow-left"
            @click="this.$router.back()"
            style="font-size: 1rem; margin-right: 0.5rem"
          ></i
          >Tanggapi laporan
        </h1>
        <p>Memanggapi laporan untuk membantu pelapor</p>
        <div class="divider"></div>
      </div>
      <div class="tanggapi-isian">
        <div class="tanggapi-isian-baris1">
          <div class="tanggapi-isian-baris1 nama">
            <span>Oleh </span>
            <h4>{{ report.account.full_name.toUpperCase() }}</h4>
          </div>
          <div class="tanggapi-isian-baris1 jalur">
            <i
              class="pi pi-globe"
              style="margin-right: 0.2rem; color: #1b3f68"
            ></i>
            <p>Melalui Halaman Web</p>
          </div>
          <div class="tanggapi-isian-baris1 status">
            <span>{{ report.status }}</span>
          </div>
        </div>
        <div class="tanggapi-isian-baris2">
          <div class="tanggapi-isian-baris2-tiket">
            <i
              class="pi pi-hashtag"
              style="margin-right: 0.2rem; color: #1b3f68"
            ></i>
            <p>{{ report.tiket }}</p>
          </div>
          <div class="tanggapi-isian-baris2-update">
            Lorem ipsum dolor sit amet.
          </div>
        </div>
        <div class="tanggapi-isian-baris3">
          <div class="tanggapi-isian-baris3-judul">
            <h2>{{ report.judul.toUpperCase() }}</h2>
          </div>
          <div class="tanggapi-isian-baris3-isi">
            <p>{{ report.isi }}</p>
          </div>
        </div>
      </div>
      <div class="tanggapi-balasan">
        <div class="tanggapi-balasan-nav">
          <nav>
            <li
              @click="ambil_tanggapan(report.tiket)"
              :class="[show === 'tanggapan' ? 'li2' : '']"
            >
              Tanggapi
            </li>
            <li
              :class="[show == 'komentari' ? 'li2' : '']"
              @click="this.ambil_komentar()"
            >
              Komentar
            </li>
            <li
              @click="show = 'lampiran'"
              :class="[show === 'lampiran' ? 'li2' : '']"
            >
              Lampiran
            </li>
          </nav>
          <div class="ajukan" v-if="ajukan == true && is_ajukan == false">
            <div class="text">
              <h1>Ajukan penutupan tiket?</h1>
              <button @click="ajukan_penutupan">Ajukan</button>
            </div>
            <i @click="ajukan = false" class="pi pi-times"></i>
          </div>
          <div
            class="balasan-pengajuan"
            v-if="ajukan == true && is_ajukan == true"
          >
            <div class="text">
              <h1>Pengajuan penutupan tiket sudah dikirim</h1>
            </div>
            <i @click="ajukan = false" class="pi pi-times"></i>
          </div>
          <div class="balasan-pengajuan" v-if="report.status == 'selesai'">
            <div class="text">
              <h1>Tiket sudah ditutup</h1>
            </div>
          </div>
          <main>
            <div class="tanggapan" v-if="show == 'tanggapan'">
              <textarea
                v-model="tanggapan.tanggapan"
                placeholder="Ketik tanggapan anda"
              ></textarea>
              <div class="tanggapi-balasan-button">
                <div class="tanggapi-balasan-button-form">
                  <label for="balasan"
                    >Lampirkan file
                    <span>{{ tanggapan.fileCount.length }}</span></label
                  >
                  <input
                    @change="file($event)"
                    type="file"
                    style="display: none"
                    id="balasan"
                  />
                </div>
                <button @click="kirim">Kirim</button>
              </div>
              <div class="tanggapan-list">
                <TransitionGroup tag="div" name="slide">
                  <div
                    class="int tanggapan-list-konten"
                    v-for="(data, index) in tindak_lanjut"
                    :key="index"
                  >
                    <div
                      class="tanggapan-list-photo"
                      v-if="data.tipe == 'tanggapan'"
                    >
                      <img
                        :src="`${this.$store.state.common.baseUrl}/photo/profil/${data.owner.photo_profile}`"
                        alt="."
                      />
                    </div>
                    <div
                      class="tanggapan-list-tulisan"
                      v-if="data.tipe == 'tanggapan'"
                    >
                      <h3>
                        {{ data.owner.full_name }}
                      </h3>
                      <p class="tanggapan-list-isi">
                        {{ data.tindak_lanjut }}
                      </p>
                      <div
                        class="tanggapan-list-isi-file"
                        v-if="data.file.length != 0"
                      >
                        <h5>File terlampir :</h5>
                        <div class="files" v-for="d in data.file" :key="d">
                          <p @click="new_tab(d)">
                            {{ d }}
                          </p>
                        </div>
                      </div>
                      <span>{{ data.createdAt }}</span>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </div>
            <div class="komentar" v-if="show == 'komentari'">
              <p v-if="komentar.length == 0">belum ada komentar</p>
              <div
                class="komentar-isi"
                v-for="data in komentar"
                :key="data._id"
              >
                <div class="komentar-isi-photo">
                  <img
                    :src="`${this.$store.state.common.baseUrl}/photo/profil/${data.account.photo_profile}`"
                    alt="."
                  />
                </div>
                <div class="komentar-isi-tulisan">
                  <h3>
                    {{ data.account.full_name }}
                  </h3>
                  <p class="komentar-isi-isi">
                    {{ data.isi }}
                  </p>
                  <span>{{ data.tanggal }}</span>
                </div>
              </div>
            </div>
            <div class="lampiran" v-if="show == 'lampiran'">
              <p v-if="report.file_lampiran.length == 0">tidak ada lampiran</p>
              <div
                v-for="data in report.file_lampiran"
                :key="data.id"
                class="img"
                @click="new_tab_2(data)"
              >
                <img
                  :src="`${this.$store.state.common.baseUrl}/photo/file/masuk/${data}`"
                  alt="lampiran"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Tanggapi laporan`;
    let id = useRoute().params.id;
    this.tanggapan.id = id;
    this.ambil_laporan(id, "verifikasi");
  },
  data() {
    return {
      report: {},
      isLoading: true,
      show: "komentari",
      fileCount: [],
      tindak_lanjut: [],
      tanggapan: {
        tanggapan: "",
        fileCount: [],
      },
      komentar: [],
      ajukan: false,
      is_ajukan: false,
    };
  },
  methods: {
    file(e) {
      let file = e.target.files[0];
      this.tanggapan.fileCount.push(file);
      // console.log(file);
    },
    new_tab(d) {
      let link = `${this.$store.state.common.baseUrl}/photo/file/keluar/${d}`;
      window.open(link, "_blank");
    },
    new_tab_2(d) {
      let link = `${this.$store.state.common.baseUrl}/photo/file/masuk/${d}`;
      window.open(link, "_blank");
    },
    // untuk mengirim tindak lanjut ke backend
    async kirim() {
      this.kirim_tindak_lanjut(
        this.report,
        this.report.tiket,
        this.$store.state.currentLogin,
        "tanggapan",
        this.tanggapan.tanggapan,
        "tindak lanjut",
        this.file
      );
    },
    async ambil_laporan(ide) {
      // console.log("ambil laporan");
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/laporan/show",
          { id: ide },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
            },
          }
        )
        .then((res) => {
          this.report = res.data.data;
          this.isLoading = false;
          this.ambil_tanggapan(this.report.tiket);
          if (this.report.status == "laporan baru") {
            this.update_status(this.report._id, "verifikasi");
            this.report.status = "verifikasi";
            // mengupdate status laporan menjadi verifikasi
            this.kirim_tindak_lanjut(
              this.report,
              this.report.tiket,
              this.$store.state.currentLogin,
              "update status",
              "update status",
              "verifikasi"
            );
          }
          if (this.report.status == "tanggapan") {
            this.ajukan = true;
          }
        })
        .catch(() => {
          // console.log(err.data);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    async ambil_tanggapan(tiket) {
      this.show = "tanggapan";
      if (this.tindak_lanjut.length != 0) {
        return;
      }
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/tindak_lanjut/show",
          { tiket: tiket },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          this.tindak_lanjut = res.data.data;
          this.tindak_lanjut.reverse();
          this.tindak_lanjut.map((data) => {
            if (data.tipe == "pengajuan penutupan") {
              // console.log("tipe ditemukan");
              this.is_ajukan = true;
            }
          });
        })
        .catch(() => {
          // console.log(err.data);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    async ambil_komentar() {
      this.show = "komentari";
      // mengambil komentar
      axios
        .post(
          this.$store.state.common.baseUrl + "/api/komentar/show",
          { tiket: this.report.tiket },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          this.komentar = res.data.data;
          this.komentar.reverse();
        })
        .catch(() => {
          // console.log(err);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
      // end mengambil komentar
    },
    async update_status(id, new_status) {
      axios
        .post(
          this.$store.state.common.baseUrl + "/api/laporan/update_status",
          { id: id, new_status: new_status },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          // console.log(res.data);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil update data";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        })
        .catch(() => {
          // console.log(err);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    async ajukan_penutupan() {
      let modal = this.$store.state.modal;
      modal.show = true;
      modal.batal_button = true;
      modal.oke_button = true;
      modal.header = "Hapus";
      modal.body =
        "Apakah anda yakin untuk mengajukan penutupan tiket " +
        this.report.tiket;
      modal.if_false = () => {
        // console.log("false");
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "warning";
        alert.message = "Pengajuan dibatalkan";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
      };
      modal.if_true = () => {
        // console.log("akan membuat pengajuan penutupan tiket");
        this.kirim_tindak_lanjut(
          this.report,
          this.report.tiket,
          this.$store.state.currentLogin,
          "pengajuan penutupan",
          "pengajuan penutupan tiket" + this.report.tiket
        );
        this.is_ajukan = true;
      };
    },
    async kirim_tindak_lanjut(
      report,
      tiket,
      currentLogin,
      tipe,
      tanggapan,
      update,
      files
    ) {
      if (tipe == "update status") {
        tanggapan = `${tanggapan} menjadi - ${update}`;
      }

      let formData = new FormData();
      formData.append("laporan", JSON.stringify(report));
      formData.append("tiket", tiket);
      formData.append("owner", JSON.stringify(currentLogin));
      formData.append("tipe", tipe);
      formData.append("tindak_lanjut", tanggapan);
      if (files) {
        for (let data = 0; data < this.tanggapan.fileCount.length; data++) {
          formData.append("file", this.tanggapan.fileCount[data]);
          // console.log("file ke- " + data);
        }
      }

      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/tindak_lanjut/store",
          formData,
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          // tambahkan list tanggapan dari respon
          this.tindak_lanjut.unshift(res.data.data);
          this.tanggapan.tanggapan = "";
          this.report.status = "tindak lanjut";
          // jika ingin mengupdate status laporan
          if (update) {
            this.update_status(report._id, update);
          }
        })
        .catch(() => {
          // console.log(err.data);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
/* main body background  */
.body {
  display: block;
  margin: 2rem auto;
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.tanggapi {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  max-width: 100%;
  justify-content: flex-start;
  height: 85%;
  overflow: scroll;
}

/* end main body background  */

/* start tanggapi akun header */
.tanggapi-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  /* padding: 0 2rem; */
  justify-content: space-between;
  margin-bottom: 1rem;
}

.tanggapi-header h1 {
  margin: 0;
}

.tanggapi-header h1 i {
  background-color: #5583ac00;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.tanggapi-header h1 i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}

.tanggapi-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.tanggapi-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
}

/* end edit akun header  */

/* start header 1 */
.tanggapi-isian {
  border: dotted 1px grey;
  padding: 1rem;
  border-radius: 5px;
}

.tanggapi-isian-baris1 {
  display: flex;
  margin-bottom: 0.8rem;
  margin-right: 1rem;
  justify-content: space-between;
}

.tanggapi-isian-baris1 .nama {
  display: flex;
}

.tanggapi-isian-baris1 .nama h4 {
  margin: 0;
  font-weight: bold;
}

.tanggapi-isian-baris1 .nama span {
  font-size: 0.9rem;
  color: #1b3f68;
  margin-right: 0.2rem;
}

.tanggapi-isian-baris1 .jalur {
  display: flex;
  align-items: center;
}

.tanggapi-isian-baris1 .jalur p {
  font-size: 0.9rem;
}

.tanggapi-isian-baris1 .status p {
  font-size: 0.9rem;
}

.tanggapi-isian-baris1 .status span {
  background-color: green;
  color: white;
  font-size: 0.7rem;
  padding: 2px 5px;
  border-radius: 10px;
}

.tanggapi-isian-baris2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.tanggapi-isian-baris3 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
}

/* end header 1 */

.tanggapi-balasan nav {
  border-bottom: solid rgb(192, 192, 192) 1px;
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
  padding: 2rem 0 0 0;
}

.tanggapi-balasan li {
  list-style: none;
  flex-grow: 1;
  padding: 5px 10px;
  cursor: pointer;
}

.li2 {
  background-color: #6c95c4;
  color: white;
}

.tanggapi-balasan main {
  border-radius: 5px;
  margin: 0.5rem 0;
}

.tanggapi-balasan main textarea {
  width: 100%;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  height: 50px;
}

.tanggapi-balasan-button {
  display: flex;
  justify-content: space-between;
  /* padding: 0 1rem; */
}

.tanggapi-balasan-button-form label {
  border-radius: 5px;
  margin: 1rem 0;
  color: #1b3f68;
}

.tanggapi-balasan-button-form span {
  background-color: #0088ff;
  color: white;
  font-size: 0.6rem;
  padding: 3px;
  border-radius: 50%;
}

.tanggapi-balasan-button button {
  padding: 5px 10px;
  border: none;
  background-color: #0088ff;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}

/* start field tanggapan list*/
.tanggapan-list-konten {
  display: flex;
  margin: 0.5rem 0;
}

.tanggapan-list-konten img {
  width: 30px;
  height: 30px;
}

.tanggapan-list-konten h3 {
  margin: 0;
  font-size: 0.85rem;
}

.tanggapan-list-konten p {
  padding: 0.5rem 0;
  width: 100%;
  text-align: start;
  font-size: 0.85rem;
}

.tanggapan-list-tulisan {
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  width: 100%;
  background-color: #eff2f86c;
  flex-direction: column;
  text-align: start;
}

.tanggapan-list-tulisan span {
  font-size: 0.65rem;
  text-align: start;
  color: rgba(161, 161, 161, 0.774);
  margin-top: 0.5rem;
  line-height: 0;
}

.tanggapan-list-isi-file {
  background-color: #d8dfec6c;
  border-radius: 5px;
  padding: 10px;
}

.tanggapan-list-isi-file h5 {
  margin: 0;
}

.tanggapan-list-isi-file p {
  font-size: 0.8rem;
  color: #1b3f68;
  text-decoration: underline;
  cursor: pointer;
}

/* end field tanggapan list */

.komentar-isi {
  display: flex;
}

/* start komentar */
.komentar-isi img {
  width: 30px;
  height: 30px;
  border: solid 2px grey;
  align-self: center;
  border-radius: 50%;
  background-color: #e7e7e7;
  margin: 0.2rem;
}

.komentar-isi-tulisan {
  background-color: #eff2f86c;
  margin: 0.2rem 0;
  width: 100%;
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.komentar-isi-tulisan h3 {
  margin: 0.2rem 0;
}

.komentar-isi span {
  font-size: 0.65rem;
  text-align: start;
  color: rgba(161, 161, 161, 0.774);
  margin-top: 0.5rem;
  line-height: 0;
}

.komentar-isi p {
  padding: 0.2rem 0;
  width: 100%;
  text-align: start;
  font-size: 0.85rem;
}

.komentar-isi h3 {
  font-size: 0.9rem;
}

.lampiran img {
  background-color: rgb(230, 230, 230);
  border: none;
  width: 150px;
  /* height: 100px; */
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  border: rgb(180, 180, 180) solid 1px;
}

.lampiran .img {
  margin: 0.2rem;
  margin: 0.5rem;
  cursor: pointer;
}

/* end komentar */

/* start animasi untuk table */
.slide-enter-from {
  transform: translateX(300px);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-leave-from {
  /* transform: translateX(0); */
  opacity: 1;
}
.slide-leave-to {
  /* transform: translateX(100px); */
  opacity: 0;
}
.slide-leave-active {
  transition: 0.1s all ease-out;
}

/*  end animasi untuk table  */

/* start ajukan penutupan tiket  */
.ajukan {
  background-color: #0088ffb9;
  margin: 0.2rem 0;
  padding: 0.5rem;
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ajukan i {
  color: #1b3f68;
  font-size: 0.7rem;
}

.ajukan .text {
  display: flex;
}

.ajukan button {
  margin-left: 1rem;
  padding: 5px 10px;
  border: none;
  background-color: #7ac1ff;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}

.ajukan h1 {
  margin: 0;
}

/* end ajukan penutupan tiket  */

/* start balasan-pengajuan penutupan tiket  */
.balasan-pengajuan {
  background-color: #005cadb9;
  margin: 0.2rem 0;
  padding: 0.5rem;
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balasan-pengajuan i {
  color: #1b3f68;
  font-size: 0.7rem;
}

.balasan-pengajuan .text {
  display: flex;
}

.balasan-pengajuan button {
  margin-left: 1rem;
  padding: 5px 10px;
  border: none;
  background-color: #7ac1ff;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}

.balasan-pengajuan h1 {
  margin: 0;
  font-size: 0.7rem;
  font-weight: normal;
}

/* end balasan-pengajuan penutupan tiket  */
</style>
