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
            <span
              :class="[
                report.status == 'laporan baru'
                  ? 'laporan-baru'
                  : '' || report.status == 'verifikasi'
                  ? 'verifikasi'
                  : '' || report.status == 'tindak lanjut'
                  ? 'tindak-lanjut-warna'
                  : '' || report.status == 'tanggapan'
                  ? 'tanggapan-icon'
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
          <div class="tanggapi-isian-baris2-tiket" style="display: flex">
            <i
              class="pi pi-hashtag"
              style="margin-right: 0.2rem; color: #1b3f68"
            ></i>
            <p>{{ report.tiket }}</p>
          </div>
          <div class="tanggapi-isian-baris-klasifikasi" style="display: flex">
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
          </div>
        </div>
      </div>

      <!-- ===== start jika klasifikasi perceraian =====  -->
      <!-- start upload dokumen  -->
      <div
        class="modal-upload"
        v-if="modal.cek_laporan == true"
        style="width: 400px"
      >
        <h3>Cek Kelengkapan Laporan</h3>
        <div class="close-modal" @click="modal.cek_laporan = false">
          <p style="font-size: 1rem">X</p>
        </div>
        <hr />
        <p style="font-size: 0.9rem; margin-bottom: 0.5rem">
          Silahkan cek kelengkapan laporan di file lampiran dan konfirmasi jika
          sudah lengkap.
        </p>
        <p style="font-size: 0.9rem">
          Laporan akan ditutup jika tidak lengkap.
        </p>
        <div class="btn">
          <button
            style="background-color: transparent; color: red"
            @click="laporan_tidak_lengkap"
          >
            Laporan tidak lengkap
          </button>
          <button @click="laporan_lengkap">Laporan lengkap</button>
        </div>
      </div>

      <div class="modal-upload" v-if="upload.show == true">
        <h3>Upload {{ upload.title }}</h3>
        <hr />
        <input
          @change="upload_undangan($event)"
          v-if="upload.type == 'undangan'"
          type="file"
        />
        <input
          @change="upload_lhp($event)"
          v-if="upload.type == 'lhp'"
          type="file"
        />
        <div class="btn">
          <button
            @click="upload.show = false"
            style="background-color: transparent; color: grey"
          >
            Batal
          </button>
          <button @click="upload_dokumen">Kirim</button>
        </div>
      </div>
      <!-- end upload dokumen  -->

      <!-- start jika laporan perceraian  -->
      <div
        v-if="report.klasifikasi == 'perceraian' && report.status != 'selesai'"
        class="tanggapi-pengaduan"
      >
        <h4>Irban Pelaksana : {{ report.owner.full_name }}</h4>
        <ul>
          <li>
            <i
              v-if="pelaksana.cek_laporan == false"
              class="pi pi-times"
              style="color: red"
            ></i>
            <i
              v-if="pelaksana.cek_laporan == true"
              class="pi pi-check"
              style="color: green"
            ></i>
            <button @click="modal.cek_laporan = true" style="cursor: pointer">
              Cek Kelengkapan Laporan
            </button>
            <p
              v-if="this.pelaksana.cek_laporan == true"
              style="
                font-size: 0.7rem;
                margin-left: 2rem;
                background-color: #0082fc;
                color: white;
                padding: 2px 5px;
                border-radius: 4px;
                display: flex;
                align-items: center;
              "
            >
              Laporan lengkap
            </p>
          </li>
          <li>
            <div class="row1" style="display: flex; align-items: center">
              <i
                v-if="pelaksana.is_undangan == false"
                class="pi pi-times"
                style="color: red"
              ></i>
              <i
                v-if="pelaksana.is_undangan == true"
                class="pi pi-check"
                style="color: green"
              ></i>
              <button
                :disabled="pelaksana.ready_undangan == false"
                @click="upload.show = true"
                style="cursor: pointer"
              >
                Undang Pelapor
              </button>
            </div>
            <div
              class="fields"
              v-if="dokumen.undangan != '' && dokumen.undangan != undefined"
            >
              <p style="cursor: auto">{{ dokumen.undangan }}</p>
              <div class="ic">
                <i
                  @click="new_tab(dokumen.undangan)"
                  class="pi pi-external-link"
                  style="color: #1b3f68; padding: 0.2rem 0.5rem"
                ></i>
              </div>
            </div>
          </li>
          <li>
            <div class="row1" style="display: flex; align-items: center">
              <i
                v-if="pelaksana.is_lhp == false"
                class="pi pi-times"
                style="color: red"
              ></i>
              <i
                v-if="pelaksana.is_lhp == true"
                class="pi pi-check"
                style="color: green"
              ></i>
              <button
                style="cursor: pointer"
                :disabled="pelaksana.ready_lhp == false"
                @click="
                  upload.show = true;
                  upload.type = 'lhp';
                  upload.title = 'LHP';
                "
              >
                Upload LHP
              </button>
            </div>
            <div
              class="fields"
              v-if="dokumen.lhp != '' && dokumen.lhp != undefined"
            >
              <p style="cursor: auto">{{ dokumen.lhp }}</p>
              <div class="ic">
                <i
                  @click="new_tab(dokumen.lhp)"
                  class="pi pi-external-link"
                  style="color: #1b3f68; padding: 0.2rem 0.5rem"
                ></i>
              </div>
            </div>
          </li>
          <li v-if="adm_input == false">
            <i
              v-if="pelaksana.is_pengajuan == false"
              class="pi pi-times"
              style="color: red"
            ></i>
            <i
              v-if="pelaksana.is_pengajuan == true"
              class="pi pi-check"
              style="color: green"
            ></i>
            <button
              style="cursor: pointer"
              :disabled="pelaksana.ready_pengajuan == false"
              @click="ajukan_penutupan"
            >
              Ajukan penutupan laporan
            </button>
          </li>
          <li v-if="adm_input == true">
            <i
              v-if="pelaksana.is_pengajuan == false"
              class="pi pi-times"
              style="color: red"
            ></i>
            <i
              v-if="pelaksana.is_pengajuan == true"
              class="pi pi-check"
              style="color: green"
            ></i>
            <button
              style="cursor: pointer"
              :disabled="pelaksana.ready_pengajuan == false"
              @click="tutup_laporan"
            >
              Tutup Laporan
            </button>
          </li>
        </ul>
      </div>
      <!-- end jika laporan perceraian  -->
      <!-- ===== end jika klasifikasi perceraian =====  -->

      <!-- ===== start jika klasifikasi pengaduan =====  -->
      <!-- start upload dokumen  -->
      <div
        class="modal-upload"
        v-if="upload.show == true && report.klasifikasi == 'pengaduan'"
      >
        <h3>Upload {{ upload.title }}</h3>
        <hr />
        <input
          @change="upload_undangan($event)"
          v-if="upload.type == 'undangan'"
          type="file"
        />
        <input
          @change="upload_lhp($event)"
          v-if="upload.type == 'lhp'"
          type="file"
        />
        <div class="btn">
          <button
            @click="upload.show = false"
            style="background-color: transparent; color: grey"
          >
            Batal
          </button>
          <button @click="upload_dokumen">Kirim</button>
        </div>
      </div>
      <!-- end upload dokumen  -->

      <!-- start jika laporan pengaduan  -->
      <div
        v-if="report.klasifikasi == 'pengaduan' && report.status != 'selesai'"
        class="tanggapi-pengaduan"
      >
        <h4>Irban Pelaksana : {{ report.owner.full_name }}</h4>
        <ul>
          <li>
            <div class="row1" style="display: flex; align-items: center">
              <i
                v-if="pelaksana.is_undangan == false"
                class="pi pi-times"
                style="color: red"
              ></i>
              <i
                v-if="pelaksana.is_undangan == true"
                class="pi pi-check"
                style="color: green"
              ></i>
              <div @click="upload.show = true">Undang Pelapor</div>
            </div>
            <div
              class="fields"
              v-if="dokumen.undangan != '' && dokumen.undangan != undefined"
            >
              <p style="cursor: auto">{{ dokumen.undangan }}</p>
              <div class="ic">
                <i
                  @click="new_tab(dokumen.undangan)"
                  class="pi pi-external-link"
                  style="color: #1b3f68; padding: 0.2rem 0.5rem"
                ></i>
              </div>
            </div>
          </li>
          <li>
            <div class="row1" style="display: flex; align-items: center">
              <i
                v-if="pelaksana.is_lhp == false"
                class="pi pi-times"
                style="color: red"
              ></i>
              <i
                v-if="pelaksana.is_lhp == true"
                class="pi pi-check"
                style="color: green"
              ></i>
              <button
                :disabled="pelaksana.ready_lhp == false"
                @click="
                  upload.show = true;
                  upload.type = 'lhp';
                  upload.title = 'LHP';
                "
              >
                Upload LHP
              </button>
            </div>
            <div
              class="fields"
              v-if="dokumen.lhp != '' && dokumen.lhp != undefined"
            >
              <p style="cursor: auto">{{ dokumen.lhp }}</p>
              <div class="ic">
                <i
                  @click="new_tab(dokumen.lhp)"
                  class="pi pi-external-link"
                  style="color: #1b3f68; padding: 0.2rem 0.5rem"
                ></i>
              </div>
            </div>
          </li>
          <li v-if="adm_input == false">
            <i
              v-if="pelaksana.is_pengajuan == false"
              class="pi pi-times"
              style="color: red"
            ></i>
            <i
              v-if="pelaksana.is_pengajuan == true"
              class="pi pi-check"
              style="color: green"
            ></i>
            <button
              :disabled="pelaksana.ready_pengajuan == false"
              @click="ajukan_penutupan"
            >
              Ajukan penutupan laporan
            </button>
            <p v-if="dokumen.ajukan == true" class="ajukan2">
              Pengajuan penutupan laporan sudah dikirim
            </p>
          </li>
          <li v-if="adm_input == true">
            <i
              v-if="pelaksana.is_pengajuan == false"
              class="pi pi-times"
              style="color: red"
            ></i>
            <i
              v-if="pelaksana.is_pengajuan == true"
              class="pi pi-check"
              style="color: green"
            ></i>
            <button
              :disabled="pelaksana.ready_pengajuan == false"
              @click="tutup_laporan"
            >
              Tutup laporan
            </button>
          </li>
        </ul>
      </div>
      <!-- end jika laporan pengaduan  -->
      <!-- ===== end jika klasifikasi pengaduan =====  -->

      <div class="tanggapi-balasan">
        <div class="tanggapi-balasan-nav">
          <nav>
            <li
              @click="ambil_tanggapan(report.tiket)"
              :class="[show === 'tanggapan' ? 'li2' : '']"
            >
              Tanggapi
            </li>
            <!-- <li
              :class="[show == 'komentari' ? 'li2' : '']"
              @click="this.ambil_komentar()"
            >
              Komentar
            </li> -->
            <li
              @click="show = 'lampiran'"
              :class="[show === 'lampiran' ? 'li2' : '']"
            >
              Lampiran
            </li>
          </nav>

          <!-- start mengajukan penutupan tiket jika aspirasi dan permintaan informasi  -->
          <!-- jika diinput oleh fo  -->
          <div
            class="ajukan"
            v-if="
              ajukan == true &&
              is_ajukan == false &&
              report.klasifikasi != 'pengaduan' &&
              report.klasifikasi != 'perceraian'
            "
          >
            <div class="text">
              <h1>Ajukan penutupan tiket?</h1>
              <button @click="ajukan_penutupan">Ajukan</button>
            </div>
            <i @click="ajukan = false" class="pi pi-times"></i>
          </div>

          <!-- jika diinput oleh fo jika laporan diinput oleh admin -->
          <div
            class="ajukan"
            v-if="
              adm_input == true &&
              report.status == 'tindak lanjut' &&
              report.klasifikasi != 'pengaduan' &&
              report.klasifikasi != 'perceraian'
            "
          >
            <div class="text">
              <h1>Tutup Laporan?</h1>
              <button @click="tutup_laporan">Tutup</button>
            </div>
            <i @click="ajukan = false" class="pi pi-times"></i>
          </div>
          <!-- end mengajukan penutupan tiket jika aspirasi dan permintaan informasi  -->

          <!-- start mengajukan penutupan tiket jika pengaduan dan perceraian  -->
          <div
            class="ajukan"
            v-if="
              ajukan == true &&
              is_ajukan == false &&
              report.klasifikasi == 'pengaduan' &&
              report.klasifikasi == 'perceraian' &&
              penutupan_pengaduan
            "
          >
            <div class="text">
              <h1>Ajukan penutupan tiket?</h1>
              <button @click="ajukan_penutupan">Ajukan</button>
            </div>
            <i @click="ajukan = false" class="pi pi-times"></i>
          </div>
          <!-- end mengajukan penutupan tiket jika pengaduan dan perceraian  -->

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
                v-if="show == 'tanggapan' && report.status != 'selesai'"
                v-model="tanggapan.tanggapan"
                placeholder="Ketik tanggapan anda"
              ></textarea>
              <div
                class="tanggapi-balasan-button"
                v-if="show == 'tanggapan' && report.status != 'selesai'"
              >
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
                          <p @click="new_tab(d.file)">
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
            <!-- <div class="komentar" v-if="show == 'komentari'">
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
            </div> -->
            <div class="lampiran" v-if="show == 'lampiran'">
              <p v-if="report.file_lampiran.length == 0">tidak ada lampiran</p>
              <div
                v-for="data in report.file"
                :key="data.id"
                class="img"
                @click="new_tab_2(data.file)"
              >
                <!-- start jika filenya bukan photo -->
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
                <!-- end jika filenya bukan photo -->

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
    this.report.status = "verifikasi";
  },
  computed: {
    penutupan_pengaduan() {
      let pengaduan = false;
      this.tanggapanToShow.map((data) => {
        if (
          data.tipe == "upload LHP" &&
          (this.report.klasifikasi == "pengaduan" ||
            this.report.klasifikasi == "perceraian")
        ) {
          pengaduan = true;
        }
      });
      return pengaduan;
    },
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
      fo_tutup_laporan: false,
      upload: {
        show: false,
        type: "undangan",
        title: "undangan",
        file: undefined,
      },
      pelaksana: {
        is_undangan: false,
        ready_undangan: false,
        is_lhp: false,
        ready_lhp: false,
        is_pengajuan: false,
        ready_pengajuan: false,
        cek_laporan: false,
      },
      modal: {
        cek_laporan: false,
      },
      adm_input: false,
      dokumen: {
        undangan: "",
        lhp: "",
        ajukan: false,
      },
    };
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
    upload_undangan(e) {
      this.upload.title = "Undangan";
      this.upload.type = "undangan";
      let file = e.target.files[0];
      this.upload.file = file;
      console.log(this.upload.file);
    },
    upload_lhp(e) {
      let file = e.target.files[0];
      this.upload.file = file;
      // console.log(this.upload.file);
    },
    file(e) {
      let file = e.target.files[0];
      this.tanggapan.fileCount.push(file);
      // console.log(file);
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
      if (this.report.status == "verifikasi") {
        this.kirim_tindak_lanjut(
          this.report,
          this.report.tiket,
          this.$store.state.currentLogin,
          "update status",
          "update status menjadi - tindak lanjut"
        );
        this.update_status(this.report._id, "tindak lanjut");
      }
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
          let title = [
            "Ktp",
            "Kartu Keluarga",
            "SK Cpns",
            "Buku Nikah",
            "SK Kepala Wilayah",
            "Surat ijin atasan",
          ];
          this.report.file = [];
          this.report.file_lampiran.map((data, i) => {
            this.report.file.push({
              name: title[i],
              file: data,
            });
          });
          console.log(this.report);
          this.ambil_tanggapan(this.report.tiket);
          if (this.report.account._id == undefined) {
            // console.log("input by admin");
            this.adm_input = true;
          }
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
          let fl = [];
          let fl2 = [];
          this.tindak_lanjut.map((data) => {
            if (data.tiket == this.report.tiket) {
              data.createdAt = this.date_to_show(data.createdAt);
              if (
                this.report.klasifikasi == "perceraian" &&
                this.report.status == "tanggapan" &&
                data.tindak_lanjut == "mengajukan penutupan tiket"
              ) {
                this.is_ajukan = true;
              } else if (
                data.tipe == "update status" &&
                this.report.status == "tindak lanjut" &&
                this.report.account._id == undefined
              ) {
                this.fo_tutup_laporan = true;
              }
              //
              if (
                this.report.status == "tanggapan" &&
                data.tindak_lanjut == "mengajukan penutupan tiket"
              ) {
                this.is_ajukan = true;
              }
              //

              // start menu untuk pengaduan dan perceraian

              if (
                this.report.klasifikasi == "pengaduan" ||
                this.report.klasifikasi == "perceraian"
              ) {
                if (data.tindak_lanjut == "mengirim undangan ke pelapor") {
                  this.pelaksana.is_undangan = true;
                  this.pelaksana.ready_lhp = true;
                  fl.push(data.file[0]);
                }
                if (data.tindak_lanjut == "mengupload dokumen LHP") {
                  this.pelaksana.is_lhp = true;
                  this.pelaksana.ready_pengajuan = true;
                  fl2.push(data.file[0]);
                }
                if (data.tindak_lanjut == "mengajukan penutupan tiket") {
                  this.pelaksana.is_pengajuan = true;
                }
                if (
                  data.tindak_lanjut == "cek laporan selesai, laporan lengkap"
                ) {
                  this.pelaksana.cek_laporan = true;
                  this.pelaksana.ready_undangan = true;
                }
              }
            }
            // end menu untuk pengaduan dan perceraian
          });
          this.dokumen.undangan = fl[0];
          this.dokumen.lhp = fl2[0];
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
          alert.message = "Berhasil Update Status";
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
      modal.header = "Tutup";
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
          "update status",
          "mengajukan penutupan tiket"
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
      files
    ) {
      let formData = new FormData();
      formData.append("laporan", JSON.stringify(report));
      formData.append("tiket", tiket);
      formData.append("owner", JSON.stringify(currentLogin));
      formData.append("tipe", tipe);
      formData.append("tindak_lanjut", tanggapan);
      if (files) {
        if (this.tanggapan.fileCount.length == 0) {
          formData.append("file", this.upload.file);
        } else {
          for (let data = 0; data < this.tanggapan.fileCount.length; data++) {
            formData.append("file", this.tanggapan.fileCount[data]);
            // console.log("file ke- " + data);
          }
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
          // jika ingin mengupdate status laporan
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil, melakukan " + tipe;
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
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
    tutup_laporan() {
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
    upload_dokumen() {
      if (this.upload.type == "undangan") {
        this.kirim_tindak_lanjut(
          this.report,
          this.report.tiket,
          this.$store.state.currentLogin,
          "upload dokumen",
          "mengirim undangan ke pelapor",
          this.upload.file
        );
        let date = new Date();
        let ins = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
        this.dokumen.undangan = `${ins}-${this.upload.file.name}`;

        if (this.report.status == "verifikasi") {
          this.kirim_tindak_lanjut(
            this.report,
            this.report.tiket,
            this.$store.state.currentLogin,
            "update status",
            "update status menjadi tindak lasnjut"
          );
          this.update_status(this.report._id, "tindak lanjut");
          this.report.status = "tindak lanjut";
        }
        this.upload.show = false;
        this.pelaksana.is_undangan = true;
        this.pelaksana.ready_lhp = true;
      } else if (this.upload.type == "lhp") {
        this.kirim_tindak_lanjut(
          this.report,
          this.report.tiket,
          this.$store.state.currentLogin,
          "upload dokumen",
          "mengupload dokumen LHP",
          this.upload.file
        );
        let date = new Date();
        let ins = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
        this.dokumen.lhp = `${ins}-${this.upload.file.name}`;

        this.upload.show = false;
        this.pelaksana.is_lhp = true;
        this.pelaksana.ready_pengajuan = true;
      }
    },
    laporan_lengkap() {
      // console.log("laporan lengkap");
      // jika laporan lengkap maka akan dilanjutkan
      this.kirim_tindak_lanjut(
        this.report,
        this.report.tiket,
        this.$store.state.currentLogin,
        "update status",
        "cek laporan selesai, laporan lengkap"
      );
      this.kirim_tindak_lanjut(
        this.report,
        this.report.tiket,
        this.$store.state.currentLogin,
        "update status",
        "update status menjadi - tindak lanjut"
      );
      this.update_status(this.report._id, "tindak lanjut");
      this.report.status = "tindak lanjut";
      this.pelaksana.cek_laporan = true;
      this.pelaksana.ready_undangan = true;
      this.modal.cek_laporan = false;
    },
    laporan_tidak_lengkap() {
      // jika laporan tidak lengkap maka tiket akan ditutup
      this.kirim_tindak_lanjut(
        this.report,
        this.report.tiket,
        this.$store.state.currentLogin,
        "update status",
        "menutup laporan karena tidak lengkap"
      );
      this.update_status(this.report._id, "selesai");
      this.modal.cek_laporan = false;
    },
  },
};
</script>

<style scoped>
/* main body background  */
.body {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
}

.tanggapi {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  justify-content: flex-start;
  max-width: 1000px;
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
  /* background-color: green; */
  color: white;
  font-size: 0.7rem;
  padding: 3px 5px;
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
  border-radius: 50%;
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

/* start tanggapi pengaduan  */
.tanggapi-pengaduan {
  margin: 1rem 0;
  width: 100%;
  /* border: solid grey 1px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.tanggapi-pengaduan h4 {
  margin: 0.5rem 0;
}

.tanggapi-pengaduan ul {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.tanggapi-pengaduan ul li {
  list-style: none;
  text-align: start;
  cursor: pointer;
}

.tanggapi-pengaduan ul li button {
  border: none;
  background-color: transparent;
  text-decoration: underline;
}

.tanggapi-pengaduan ul li i {
  margin: 0.3rem;
}

/* end tanggapi pengaduan  */

/* start upload dokumen  */
.modal-upload {
  box-shadow: 0 0 10px 1000px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: absolute;
  align-self: center;
  justify-self: flex-start;
  background-color: white;
  margin-top: 20%;
  border: solid rgb(212, 212, 212) 1px;
  border-radius: 4px;
  width: 300px;
  text-align: start;
  overflow-x: scroll;
}

.modal-upload .btn {
  display: flex;
  justify-content: flex-end;
}

.modal-upload button {
  background-color: #0088ff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  margin: 1rem 1rem 0 1rem;
  cursor: pointer;
}

/* end upload dokumen  */

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

.tanggapan-icon {
  background-color: #00b8e0;
}

.selesai {
  background-color: #1161ff;
}

/* end detail status laporan  */

/* start field upload dokumen  */
.fields {
  display: flex;
  width: 100%;
  /* background-color: #00529e; */
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
}
.fields {
  font-size: 0.8rem;
}
.fields p {
  color: grey;
}
/* end field upload dokumen  */

.ajukan2 {
  font-size: 0.7rem;
  margin-left: 2rem;
  background-color: #0082fc;
  color: white;
  padding: 2px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.close-modal {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f8f8f8;
  padding: 10px;
  width: 30px;
  height: 30px;
  color: red;
  border-bottom: solid rgb(204, 204, 204) 1px;
  border-left: solid rgb(204, 204, 204) 1px;
  cursor: pointer;
}
.line {
  width: 100%;
  height: 1px;
  background-color: rgb(196, 196, 196);
  margin-top: 0.3rem;
}
</style>
