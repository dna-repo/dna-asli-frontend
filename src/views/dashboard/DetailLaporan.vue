<template>
  <div
    class="body"
    v-if="isLoading.halaman == false"
    :class="[this.$store.state.open_menu == true ? 'body2' : '']"
  >
    <!-- start header UI  -->
    <HeaderUI />

    <!-- end header UI  -->

    <section class="aduan">
      <!-- start menampilkan detail aduan -->
      <div class="tanggapi-isian">
        <div class="tanggapi-isian-baris1">
          <div class="tanggapi-isian-baris1 nama">
            <span>Oleh </span>
            <h4>
              {{
                report.isAnonim == "true"
                  ? "Anonim"
                  : report.account.full_name.toUpperCase()
              }}
            </h4>
          </div>
          <div class="tanggapi-isian-baris1 jalur">
            <i
              class="pi pi-globe"
              style="margin-right: 0.2rem; color: #1b3f68"
            ></i>
            <p>Melalui Halaman Web</p>
          </div>
          <div class="tanggapi-isian-baris1 status">
            <span
              :class="[
                report.status == 'laporan baru'
                  ? 'laporan-baru'
                  : '' || report.status == 'verifikasi'
                  ? 'verifikasi'
                  : '' || report.status == 'tindak lanjut'
                  ? 'tindak-lanjut-warna'
                  : '' || report.status == 'tanggapan'
                  ? 'tanggapan'
                  : '' || report.status == 'selesai'
                  ? 'selesai'
                  : '',
              ]"
            >
              <i
                class="pi pi-file"
                style="font-size: 0.6rem; margin-right: 0.3rem"
                v-if="report.status == 'laporan baru'"
              ></i>
              <i
                class="pi pi-sync"
                style="font-size: 0.6rem; margin-right: 0.3rem"
                v-if="report.status == 'verifikasi'"
              ></i>
              <i
                class="pi pi-comment"
                style="font-size: 0.6rem; margin-right: 0.3rem"
                v-if="report.status == 'tindak lanjut'"
              ></i>
              <i
                class="pi pi-comments"
                style="font-size: 0.6rem; margin-right: 0.3rem"
                v-if="report.status == 'tanggapan'"
              ></i>
              <i
                class="pi pi-check"
                style="font-size: 0.6rem; margin-right: 0.3rem"
                v-if="report.status == 'selesai'"
              ></i>
              {{ report.status }}</span
            >
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
            <i
              class="pi pi-filter"
              style="margin-right: 0.2rem; color: #1b3f68"
            ></i>
            <p>{{ report.klasifikasi }}</p>
          </div>
        </div>
        <div class="tanggapi-isian-baris3">
          <div class="tanggapi-isian-baris3-judul">
            <h2>{{ report.judul.toUpperCase() }}</h2>
          </div>
          <div class="tanggapi-isian-baris3-isi">
            <p>{{ report.isi }}</p>
            <p
              class="tanggal"
              style="font-size: 0.65rem; color: grey; margin-top: 2rem"
            >
              {{ report.createdAt }}
            </p>
          </div>
        </div>
      </div>
      <!-- end menampilkan detail aduan -->

      <div class="interactive">
        <!-- start navigasi aksi laporan -->
        <ul class="navigasi">
          <li
            class="tindak-lanjut"
            style="text-align: center"
            @click="enableTindakLanjut()"
            :class="[interactive.tindak_lanjut == true ? 'li2' : '']"
            v-if="is_login == true && currentLogin._id == report.account._id"
          >
            <p>Tindak Lanjut</p>
          </li>
          <!-- <li
            class="komentar"
            @click="enableKomentar()"
            :class="[interactive.komentar == true ? 'li2' : '']"
          >
            Komentar
          </li> -->
          <li
            class="lampiran"
            @click="enableLampiran()"
            :class="[interactive.lampiran == true ? 'li2' : '']"
          >
            Lampiran
          </li>
        </ul>
        <!-- end navigasi aksi laporan -->
        <div
          class="balasan-pengajuan"
          v-if="
            report.status != 'selesai' &&
            currentLogin._id == report.account._id &&
            show_ajuan_penutupan == true &&
            ajukan == true
          "
        >
          <div class="text">
            <p>Petugas mengajukan penutupan tiket</p>
            <button @click="tutup_laporan">Konfirmasi</button>
          </div>
          <i @click="ajukan = false" class="pi pi-times"></i>
        </div>
        <!-- start tiket selesai  -->

        <!-- start tiket selesai -->
        <div
          class="balasan-pengajuan"
          v-if="report.status == 'selesai' && ajukan == true"
        >
          <div class="text">
            <p>Tiket sudah ditutup</p>
          </div>
        </div>
        <!-- end tiket selesai -->

        <div class="interactive-content">
          <!-- start aksi tindak lanjut-->
          <div
            class="int tindak-lanjut"
            v-if="interactive.tindak_lanjut == true && is_login == true"
          >
            <p
              v-if="tanggapanToShow.length < 1 && show_tanggapan == false"
              style="color: grey"
            >
              - Belum ada tindak lanjut -
            </p>
            <div
              class="balas-tanggapan"
              v-if="show_tanggapan == true && report.status != 'selesai'"
            >
              <textarea
                placeholder="Ketik tanggapan anda"
                v-model="tanggapan"
              ></textarea>
              <div class="tanggapi-balasan-button">
                <button @click="kirim">Kirim</button>
              </div>
            </div>
            <TransitionGroup tag="div" name="slide">
              <div
                class="int tanggapan-list-konten"
                v-for="(data, index) in tanggapanToShow"
                :key="index"
              >
                <div
                  class="tanggapan-list-photo"
                  v-if="
                    data.tipe == 'tanggapan' ||
                    data.tindak_lanjut == 'mengirim undangan ke pelapor'
                  "
                >
                  <img
                    :src="`${this.$store.state.common.baseUrl}/photo/profil/${data.owner.photo_profile}`"
                    alt="."
                  />
                </div>
                <div
                  v-if="
                    data.tipe == 'tanggapan' ||
                    data.tindak_lanjut == 'mengirim undangan ke pelapor'
                  "
                  class="tanggapan-list-tulisan"
                >
                  <h3>
                    {{ data.owner.full_name }}
                  </h3>
                  <p class="tanggapan-list-isi">
                    {{ data.tindak_lanjut }}
                  </p>
                  <div
                    class="tanggapan-list-isi-file"
                    v-if="data.owner.level != 'user' && data.file.length > 0"
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
          <!-- end aksi tindak lanjut-->

          <!-- start aksi komentar
          <div class="komentar" v-if="interactive.komentar == true">
            <p
              v-if="is_login == false"
              style="color: grey; margin-bottom: 0.3rem"
            >
              - Masuk untuk memberi komentar -
            </p>

            <div
              class="komentar-tambah"
              v-if="is_login == true && report.status != 'selesai'"
            >
              <div class="komentar-textarea">
                <img
                  :src="`${this.$store.state.common.baseUrl}/photo/profil/${currentLogin.photo_profile}`"
                  alt="."
                />
                <textarea
                  v-model="komentar.isi"
                  placeholder="Ketik komentar anda"
                ></textarea>
              </div>
              <div class="komentar-btn">
                <button @click="sendKomentar()">Kirim komentar</button>
              </div>
            </div>
            <p v-if="komentarToShow.length == 0" style="color: grey">
              Belum ada komentar
            </p>
            <TransitionGroup tag="div" name="slide">
              <div
                class="int komentar-konten"
                v-for="data in komentarToShow"
                :key="data.isi"
              >
                <div class="komentar-photo">
                  <img
                    :src="`${this.$store.state.common.baseUrl}/photo/profil/${data.account.photo_profile}`"
                    alt="."
                  />
                </div>
                <div class="komentar-tulisan">
                  <h3>
                    {{ data.account.full_name }}
                  </h3>
                  <p class="komentar-isi">
                    {{ data.isi }}
                  </p>
                  <span>{{ data.tanggal }}</span>
                </div>
              </div>
            </TransitionGroup>
          </div> -->
          <!-- end aksi komentar -->

          <!-- lampiran  -->
          <div
            class="int lampiran"
            v-if="interactive.lampiran == true"
            style="display: flex"
          >
            <p v-if="report.file_lampiran.length == 0" style="color: grey">
              Tidak ada file lampiran
            </p>
            <div
              v-for="data in report.file"
              :key="data.id"
              class="img"
              @click="new_tab_2(data.file)"
            >
              <!-- start jika filenya pdf -->
              <div
                class="file"
                style="display: flex; width: 100%"
                v-if="data.file.includes('.pdf')"
              >
                <div
                  v-if="report.klasifikasi == 'perceraian'"
                  class="lbl"
                  style="width: 200px"
                >
                  <p style="text-align: start">{{ data.name }}</p>
                </div>
                <i class="pi pi-file-pdf" style="margin-right: 0.2rem"></i>
                <p style="cursor: pointer">{{ data.file }}</p>
              </div>
              <div v-if="data.file.includes('.pdf')" class="line"></div>
              <!-- end jika filenya pdf -->

              <!-- start jika filenya photo -->
              <div
                class="file"
                style="display: flex; width: 100%"
                v-if="
                  data.file.includes('.jpg') ||
                  data.file.includes('.jpeg') ||
                  data.file.includes('.gif') ||
                  data.file.includes('.raw') ||
                  data.file.includes('.webp') ||
                  data.file.includes('.png')
                "
              >
                <img
                  :src="`${this.$store.state.common.baseUrl}/photo/file/masuk/${data.file}`"
                  alt="lampiran"
                />
              </div>
              <!-- end jika filenya photo -->

              <!-- start jika filenya lainnya -->
              <div
                class="file"
                style="display: flex; width: 100%"
                v-if="
                  !data.file.includes('.jpg') &&
                  !data.file.includes('.jpeg') &&
                  !data.file.includes('.gif') &&
                  !data.file.includes('.raw') &&
                  !data.file.includes('.webp') &&
                  !data.file.includes('.pdf') &&
                  !data.file.includes('.png')
                "
              >
                <img
                  :src="`${this.$store.state.common.baseUrl}/photo/file/masuk/${data.file}`"
                  alt="lampiran"
                />
              </div>
              <!-- end jika filenya lainnya -->
            </div>
          </div>
          <!-- end lampiran  -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderUI from "./HeaderUI.vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  async created() {
    document.title = `${this.$store.state.app_name} | Detail laporan`;
    this.is_login = this.$store.state.is_login;
    if (this.is_login == true) {
      // console.log("login");
      this.currentLogin = this.$store.state.currentLogin;
      if (this.currentLogin.level != "user") {
        this.$router.back();
      }
    }

    window.scrollTo(0, 0);

    let id = useRouter().currentRoute.value.params.id;
    this.currentLogin = this.$store.state.currentLogin;

    this.is_login = this.$store.state.is_login;

    await axios
      .post(
        this.$store.state.common.baseUrl + "/api/laporan/show",
        { id: id },
        {
          headers: {
            Authorization:
              this.$store.state.common.headers == ""
                ? "public-tokeb=123456789"
                : this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        this.report = res.data.data;
        let title = [
          "Ktp",
          "Kartu Keluarga",
          "SK Cpns",
          "Buku Nikah",
          "SK Kepala Wilayah",
          "Surat ijin atasan",
        ];
        // console.log(this.report);
        this.report.file = [];
        this.report.file_lampiran.map((data, i) => {
          this.report.file.push({
            name: title[i],
            file: data,
          });
        });
        this.report.createdAt = this.date_to_show(this.report.createdAt);
        // this.enableKomentar();
        if (this.is_login == true) {
          console.log("sudah login");
          if (this.currentLogin._id == this.report.account._id) {
            console.log("sudah login - akun sesuai");
            this.enableTindakLanjut();
          }
        }
        this.enableLampiran();
        this.isLoading.halaman = false;
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
  data() {
    return {
      report: {},
      is_login: false,
      komentarToShow: [],
      tanggapanToShow: [],
      currentLogin: {},
      show_tanggapan: false,
      tanggapan: "",
      isLoading: {
        halaman: true,
        komentar: true,
      },
      interactive: {
        tindak_lanjut: false,
        // komentar: false,
        lampiran: true,
      },
      komentar: {
        account: {},
        tanggal: "",
        isi: "",
      },
      ajukan: true,
      is_ajukan: false,
      show_ajuan_penutupan: false,
    };
  },
  computed: {
    owner() {
      let name = "Front office";
      this.tanggapanToShow.map((data) => {
        if (data.tipe == "pengajuan penutupan") {
          name = data.owner.full_name;
        }
      });
      return name;
    },
  },
  methods: {
    date_to_show(dt) {
      // console.log(dt);
      let date = dt;
      let a = date.split(" ");
      let hari = a[0];
      let tanggal = a[2];
      let bulan = a[1];
      let tahun = a[3];
      let jam = a[4];
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
      date = `${hari}, ${tanggal} ${bulan} ${tahun} | ${jam}`;
      // console.log(date);
      return date;
    },
    new_tab(d) {
      window.open(
        `${this.$store.state.common.baseUrl}/photo/file/keluar/${d}`,
        "_blank"
      );
    },
    new_tab_2(d) {
      window.open(
        `${this.$store.state.common.baseUrl}/photo/file/masuk/${d}`,
        "_blank"
      );
    },
    async tutup_laporan() {
      let modal = this.$store.state.modal;
      modal.show = true;
      modal.batal_button = true;
      modal.oke_button = true;
      modal.header = "Konfirmasi";
      modal.body = "Apakah anda yakin menyelesaikan laporan " + name;
      modal.if_false = () => {
        // console.log("false");
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "warning";
        alert.message = "Konfirmasi dibatalkan";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
      };
      modal.if_true = () => {
        // console.log("true");
        this.kirim_tindak_lanjut(
          this.report,
          this.report.tiket,
          this.currentLogin,
          "update status",
          "menutup tiket - " + this.report.tiket
        );
        this.update_status(this.report._id, "selesai");
        this.report.status = "selesai";
      };
    },
    // async sendKomentar() {
    //   // done
    //   // mengambil waktu komentar
    //   let date = new Date();
    //   // Sat Jun 18 2022 + 4:01:02 AM
    //   let tanggal = `${date.toDateString()} ${date.toLocaleTimeString()}`;
    //   // console.log("kirim komentar - " + tanggal);
    //   this.komentar.tanggal = tanggal;
    //   this.komentar.account = this.currentLogin;
    //   this.komentar.tiket = this.report.tiket;
    //   // end mengambil waktu komentar
    //   // console.log("sebelum");
    //   await axios
    //     .post(
    //       this.$store.state.common.baseUrl + "/api/komentar/store",
    //       this.komentar,
    //       {
    //         headers: {
    //           Authorization: this.$store.state.common.headers,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     )
    //     .then(() => {
    //       // console.log(res.data);
    //       let new_komentar = {};
    //       new_komentar.account = this.currentLogin;
    //       new_komentar.isi = this.komentar.isi;
    //       new_komentar.tanggal = this.komentar.tanggal;
    //       this.komentarToShow.unshift(new_komentar);
    //       this.komentar.isi = "";
    //     })
    //     .catch(() => {
    //       // console.log(err.data);
    //       let alert = this.$store.state.alert;
    //       alert.show = true;
    //       alert.type = "error";
    //       alert.message = "Maaf, Terjadi kesalahan";
    //       window.setTimeout(() => {
    //         alert.show = false;
    //       }, 3000);
    //     });
    //   // console.log("sesudah");
    // },
    async enableTindakLanjut() {
      this.interactive.tindak_lanjut = true;
      this.interactive.komentar = false;
      this.interactive.lampiran = false;
      // tanggapanToShow
      if (this.tanggapanToShow.length == 0) {
        await axios
          .post(
            this.$store.state.common.baseUrl + "/api/tindak_lanjut/show",
            { tiket: this.report.tiket },
            {
              headers: {
                Authorization:
                  this.$store.state.common.headers == ""
                    ? this.$store.state.common.public
                    : this.$store.state.common.headers,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            this.tanggapanToShow = res.data.data;
            this.tanggapanToShow.reverse();
            console.log(this.tanggapanToShow);
            let undangan = this.tanggapanToShow.filter(
              (data) => data.tindak_lanjut == "mengirim undangan ke pelapor"
            );
            undangan = undangan[0];
            this.tanggapanToShow.map((data) => {
              data.createdAt = this.date_to_show(data.createdAt);
              if (data.tipe == "tanggapan") {
                this.is_ajukan = true;
              }
              if (data.tindak_lanjut == `mengajukan penutupan tiket`) {
                this.show_ajuan_penutupan = true;
              }
            });
            this.tanggapanToShow = this.tanggapanToShow.filter(
              (data) => data.tindak_lanjut != "mengirim undangan ke pelapor"
            );
            undangan == undefined
              ? console.log("undangan is undefined")
              : this.tanggapanToShow.unshift(undangan);
            if (this.currentLogin._id != undefined) {
              if (
                this.tanggapanToShow.length > 1 &&
                this.currentLogin._id == this.report.account._id
              ) {
                return (this.show_tanggapan = true);
              }
            }
            this.tanggapanToShow.shift();
          })
          .catch(() => {
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "error";
            alert.message = "Maaf, Terjadi kesalahan";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          });
      }
    },
    // async enableKomentar() {
    //   this.isLoading.halaman = true;
    //   this.interactive.komentar = true;
    //   this.interactive.tindak_lanjut = false;
    //   this.interactive.lampiran = false;

    //   // console.log("ambil komentar");
    //   // mengambil komentar
    //   if (this.komentarToShow.length == 0) {
    //     await axios
    //       .post(
    //         this.$store.state.common.baseUrl + "/api/komentar/show",
    //         { tiket: this.report.tiket },
    //         {
    //           headers: {
    //             Authorization:
    //               this.$store.state.common.headers == ""
    //                 ? "public-tokeb=123456789"
    //                 : this.$store.state.common.headers,
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         // console.log(res.data);
    //         this.komentarToShow = res.data.data;
    //         this.komentarToShow.reverse();
    //         this.komentarToShow.map((data) => {
    //           data.tanggal = this.date_to_show(data.tanggal);
    //         });
    //         if (this.komentarToShow != []) {
    //           this.isLoading.komentar = false;
    //           this.isLoading.halaman = false;
    //         }
    //       })
    //       .catch(() => {
    //         // console.log(err);
    //         let alert = this.$store.state.alert;
    //         alert.show = true;
    //         alert.type = "error";
    //         alert.message = "Maaf, Terjadi kesalahan";
    //         window.setTimeout(() => {
    //           alert.show = false;
    //         }, 3000);
    //       });
    //   } else {
    //     this.isLoading.halaman = false;
    //   }

    //   // end mengambil komentar
    // },
    async enableLampiran() {
      this.interactive.tindak_lanjut = false;
      this.interactive.komentar = false;
      this.interactive.lampiran = true;
    },
    async kirim() {
      this.kirim_tindak_lanjut(
        this.report,
        this.report.tiket,
        this.currentLogin,
        "tanggapan",
        this.tanggapan,
        "tanggapan"
      );
      if (this.report.status == "tindak lanjut") {
        this.kirim_tindak_lanjut(
          this.report,
          this.report.tiket,
          this.currentLogin,
          "update status",
          "update status menjadi - tanggapaan "
        );
        this.update_status(this.report._id, "tanggapan");
        this.report.status = " tanggapan";
      }
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
          if (new_status == "selesai") {
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "success";
            alert.message = "Konfirmasi penutupan tiket berhasil";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          }
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
    async kirim_tindak_lanjut(report, tiket, currentLogin, tipe, tanggapan) {
      let formData = new FormData();
      formData.append("laporan", JSON.stringify(report));
      formData.append("tiket", tiket);
      formData.append("owner", JSON.stringify(currentLogin));
      formData.append("tipe", tipe);
      formData.append("tindak_lanjut", tanggapan);

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
          this.tanggapanToShow.unshift(res.data.data);
          this.tanggapan = "";
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
  components: { HeaderUI },
};
</script>

<style scoped>
.body {
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  margin: 0;
}

.body2 {
  overflow: hidden;
}

h1,
h2,
h3 {
  margin: 0;
}

.aduan-tiket {
  padding: 1rem;
  border-radius: 10px;
  border: dotted 1px grey;
}

.aduan {
  background-color: white;
  max-width: 600px;
  min-height: 200px;
  margin: 4rem auto;
  box-shadow: 0 0 5px 0.5px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* interactive  */
.interactive {
  margin-top: 2rem;
  width: 100%;
  min-height: 100px;
}

.interactive ul {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  padding: 0;
}

.navigasi li {
  border-bottom: solid 1px gray;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: 0.5rem 0;
  cursor: pointer;
}

.nav {
  padding: 0.2rem 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: center;
}

.li2 {
  background-color: rgb(185, 213, 255);
  text-align: center;
}

hr {
  margin: 0;
}

/* interactive   */
.int {
  width: 100%;
  border-radius: 4px;
  display: flex;
}

/* end interactive   */

/* start tanggapan  */
.tindak-lanjut {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.balas-tanggapan textarea {
  width: 100%;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  height: 50px;
}

.tanggapi-balasan-button {
  /* background-color: #63707c; */
  display: flex;
  justify-content: flex-end;
}
.tanggapi-balasan-button button {
  padding: 5px 10px;
  border: none;
  background-color: #0088ff;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}
.tanggapan-list-konten {
  display: flex;
  margin: 0.5rem 0;
}

.tanggapan-list-konten img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.tanggapan-list-konten h3 {
  margin: 0;
  font-size: 0.85rem;
  text-align: start;
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

/* end tanggapan  */

/* komentar  */
.komentar img {
  width: 30px;
  height: 30px;
  border: solid 2px grey;
  align-self: center;
  border-radius: 50%;
  background-color: #e7e7e7;
  margin: 0.2rem;
}

.komentar-tulisan {
  background-color: #eff2f86c;
  margin: 0.2rem 0;
  width: 100%;
  border-radius: 10px;
  padding: 0.5rem;
}

.komentar span {
  font-size: 0.65rem;
  text-align: start;
  color: rgba(161, 161, 161, 0.774);
  margin: 0;
  line-height: 0;
}

.komentar p {
  padding: 0.2rem 0;
  width: 100%;
  text-align: start;
  font-size: 0.85rem;
}

.komentar h3 {
  font-size: 0.9rem;
  text-align: start;
}

.komentar textarea {
  width: 100%;
  border: solid 1px rgb(255, 255, 255);
  border-radius: 4px;
  background-color: #eff2f8;
  font-size: 1rem;
}

.komentar-textarea {
  display: flex;
  padding: 0 1rem;
}

.komentar-tambah {
  margin: 1rem 0;
}

.komentar-btn {
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
}

.komentar button {
  padding: 0.4rem 0.8rem;
  border: none;
  background-color: #0088ff;
  border-radius: 4px;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 0.2rem;
}

/* end komentar  */

/* lampiran  */
.lampiran {
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */

  flex-wrap: wrap;
}

img {
  /* height: 50px; */
  background-color: rgb(230, 230, 230);
  margin: 0.2rem;
  border: none;
  cursor: pointer;
  width: 100px;
}

.img {
  /* border: rgb(180, 180, 180) solid 1px; */
  /* box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1); */
  margin: 0.5rem;
}

/* end lampiran  */

/* start animasi untuk table */
.slide-enter-from {
  transform: translateX(300px);
}

.slide-enter-to {
  transform: translateX(0);
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
  transition: 0s all ease-out;
}

/*  end animasi untuk table  */
/* start detail akun header  */
.detail-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.detail-header h1 {
  margin: 0;
}

.detail-header h1 i {
  background-color: #5583ac00;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.detail-header h1 i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}

.detail-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.detail-header .divider {
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
  align-items: center;
}

.tanggapi-isian-baris1 .nama {
  display: flex;
}

.tanggapi-isian-baris1 .nama h4 {
  margin: 0;
  font-weight: bold;
  font-size: 0.8rem;
  text-align: start;
}

.tanggapi-isian-baris1 .nama span {
  font-size: 0.6rem;
  color: #1b3f68;
  margin-right: 0.2rem;
}

.tanggapi-isian-baris1 .jalur {
  display: flex;
  align-items: center;
}

.tanggapi-isian-baris1 .jalur p {
  font-size: 0.7rem;
  text-align: start;
}

.tanggapi-isian-baris1 .status p {
  font-size: 0.7rem;
  font-size: 0.9rem;
}

.tanggapi-isian-baris1 .status span {
  /* background-color: green; */
  color: white;
  font-size: 0.7rem;
  padding: 5px 10px;
  border-radius: 10px;
}

.tanggapi-isian-baris2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.tanggapi-isian-baris2-tiket {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-right: 10px;
  font-weight: bold;
}
.tanggapi-isian-baris2-tiket i {
  font-size: 0.8rem;
  margin-right: 1rem;
  margin-bottom: 0.3rem;
}
.tanggapi-isian-baris2-tiket p {
  font-size: 0.8rem;
  margin-left: 0.5rem;
  margin-bottom: 0.3rem;
}

.tanggapi-isian-baris2-update {
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  margin-right: 10px;
}
.tanggapi-isian-baris2-update p {
  margin-left: 0.5rem;
  margin-bottom: 0.3rem;
  text-transform: capitalize;
  font-weight: bold;
}

.tanggapi-isian-baris3 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
}

.tanggapi-isian-baris3 h2 {
  margin: 0.5rem 0;
}

.komentar-tulisan {
  text-align: start;
}

/* end header 1 */

/* start balasan-pengajuan penutupan tiket  */
.balasan-pengajuan {
  background-color: #407cff;
  margin: 0.5rem 0;
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
  background-color: #00b418;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}

.balasan-pengajuan p {
  margin: 0;
  font-size: 1rem;
  line-height: 1rem;
}

/* end balasan-pengajuan penutupan tiket  */

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
    background-color: white;
    /* width: 95%; */
    height: 100%;
    min-height: 200px;
    box-shadow: 0 0 5px 0.5px rgba(0, 0, 0, 0.15);
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 3rem;
  }
  p {
    text-align: start;
  }
  .tanggapi-isian-baris1 {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8rem;
    margin-right: 1rem;
    align-items: flex-start;
  }
  .tanggapi-isian-baris1 .jalur {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.8rem;
    margin-right: 1rem;
    align-items: flex-start;
  }
}
/* end responsive  */
.line {
  width: 100%;
  height: 1px;
  background-color: rgb(196, 196, 196);
  margin-top: 0.3rem;
}
.files p {
  text-align: start;
}
</style>
