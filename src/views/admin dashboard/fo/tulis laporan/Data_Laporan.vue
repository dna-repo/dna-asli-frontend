<template>
  <div>
    <div class="laporan">
      <div class="laporan-header">
        <h1>Masukkan data laporan <span>langkah 2/2</span></h1>
        <div class="divider"></div>
      </div>
      <div class="laporan-data-klasifikasi">
        <select required v-model="new_report.klasifikasi">
          <option value="" selected disabled>
            Pilih klasifikasi laporan anda
          </option>
          <option value="aspirasi">Aspirasi</option>
          <option value="pengaduan">Pengaduan</option>
          <option value="permintaan informasi">Permintaan Informasi</option>
          <option value="perceraian" v-if="is_pns">Perceraian</option>
        </select>
      </div>
      <div class="laporan-data">
        <div class="laporan-data-isian-field">
          <div class="laporan-data-isian-field-form">
            <label>Judul laporan</label>
            <input type="text" v-model="new_report.judul" />
          </div>
          <div class="laporan-data-isian-field-form">
            <label>Isi laporan</label>
            <textarea
              v-model="new_report.isi"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div class="laporan-data-isian-field-form">
            <label>Instansi tujuan</label>
            <select required v-model="new_report.instansi_tujuan">
              <option value="" selected disabled>Pilih Instansi Tujuan</option>
              <option v-for="(data, index) in dinas" :value="data" :key="index">
                {{ data }}
              </option>
            </select>
          </div>
          <div
            class="laporan-data-isian-field-form-horizontal"
            v-if="new_report.klasifikasi != 'perceraian'"
          >
            <label for="file" class="laporan-data-isian-field-form-file"
              >Upload lampiran <span>{{ lampiranCount }}</span></label
            >
            <input
              id="file"
              type="file"
              @change="upload($event)"
              style="display: none"
            />
            <div class="laporan-data-isian-field-form-file">
              <input
                type="checkbox"
                name=""
                id=""
                v-model="new_report.isAnonim"
              />
              <label for="">Anonim</label>
            </div>
          </div>
          <div
            class="laporan-data-isian-field-form-horizontal cerai"
            v-if="new_report.klasifikasi == 'perceraian'"
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
                <label for="izin">Upload Keterangan Ijin Atasan</label>
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
          </div>
        </div>
        <button @click="selesai">Selanjutnya</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.dinas = this.$store.state.dinas;
  },
  data() {
    return {
      dinas: [],
      is_pns: true,
      new_report: {
        status: "laporan baru",
        tiket: "",
        klasifikasi: "",
        judul: "",
        isi: "",
        tanggal: "",
        instansi_tujuan: "",
        file_lampiran: [],
        isAnonim: false,
      },
      lampiranCount: 0,
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
    upload(e) {
      this.lampiranCount++;
      let file = e.target.files[0];
      this.new_report.file_lampiran.push(file);
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
      this.file_perceraian.sk_terakhir = file;
    },
    async selesai() {
      // console.log(this.$store.state.new_report.account);
      // console.log(this.new_report);
      if (
        this.new_report.klasifikasi == "perceraian" &&
        this.$store.state.new_report.account.occupation.name != "pns"
      ) {
        let modal = this.$store.state.modal;
        modal.show = true;
        modal.oke_button = true;
        modal.header = "Kesalahan";
        modal.body = "Maaf, klasifikasi perceraian hanya untuk PNS";
        return;
      }
      if (
        this.new_report.klasifikasi.length != 0 &&
        this.new_report.judul.length != 0 &&
        this.new_report.isi.length != 0 &&
        this.new_report.instansi_tujuan.length != 0
      ) {
        let randonNumber = Math.floor(Math.random() * 99990);
        this.new_report.tiket = "LP100" + randonNumber;
        this.new_report.isAnonim =
          this.new_report.isAnonim == true ? "true" : "false";
        // menyiapkan data ke dalam form data
        let formData = new FormData();
        formData.append(
          "account",
          JSON.stringify(this.$store.state.new_report.account)
        );
        formData.append("status", this.new_report.status);
        formData.append("tiket", this.new_report.tiket);
        formData.append("klasifikasi", this.new_report.klasifikasi);
        formData.append("judul", this.new_report.judul);
        formData.append("isi", this.new_report.isi);
        formData.append("tanggal", this.new_report.tanggal);
        formData.append("instansi_tujuan", this.new_report.instansi_tujuan);
        if (this.new_report.klasifikasi == "perceraian") {
          formData.append("file_lampiran", this.file_perceraian.ktp);
          formData.append("file_lampiran", this.file_perceraian.kk);
          formData.append("file_lampiran", this.file_perceraian.sk_terakhir);
          formData.append(
            "file_lampiran",
            this.file_perceraian.keteranga_wilayah
          );
          formData.append("file_lampiran", this.file_perceraian.buku_nikah);
          formData.append("file_lampiran", this.file_perceraian.izin_atasan);
          formData.append(
            "file_lampiran",
            this.file_perceraian.keteranga_wilayah
          );
        } else {
          for (
            let data = 0;
            data < this.new_report.file_lampiran.length;
            data++
          ) {
            formData.append(
              "file_lampiran",
              this.new_report.file_lampiran[data]
            );
            // console.log("lampiran ke : " + this.new_report.file_lampiran[data]);
          }
        }
        formData.append("isAnonim", this.new_report.isAnonim);
        // end menyiapkan data ke dalam form data
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
          .then((res) => {
            this.$router.push("/dashboard/laporan_aktif");
            this.$store.state.new_report.step = "data_pelapor";
            let new_rep = {
              account: {
                occupation: {
                  name: "-",
                },
              },
              status: "laporan baru",
              tiket: "",
              klasifikasi: "",
              judul: "",
              isi: "",
              tanggal: "",
              intansi_tujuan: "",
              file_lampiran: [],
              isAnonim: false,
              step: "data_pelapor",
            };

            this.$store.state.new_report.account = new_rep;
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "success";
            alert.message = res.data.message;
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          })
          .catch(() => {
            // console.log("gagal menambahkan laporan");
            // console.log(err);
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "danger";
            alert.message = "Gagal menambah laporan ";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          });
      } else {
        let modal = this.$store.state.modal;
        modal.show = true;
        modal.oke_button = true;
        modal.header = "Kesalahan";
        modal.body = "Maaf, masukan anda tidak lengkap";
      }
    },
  },
};
</script>

<style scoped>
.laporan-header {
  padding: 0 3rem;
  text-align: start;
}

.laporan-header h1 {
  margin: 0;
  padding: 0.5rem 0;
  font-size: 1.5rem;
}

.laporan-header span {
  background-color: #9effab;
  padding: 5px;
  border-radius: 30px;
  font-size: 0.7rem;
}

.laporan-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
}
.laporan-data {
  padding: 0 3rem;
}
.laporan-data-klasifikasi {
  padding: 0 3rem;
  margin: 1rem 0;
}
.laporan-data-isian-field-form {
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0;
  text-align: start;
}
.laporan-data-isian-field-form span {
  background-color: #0088ff;
  padding: 5px;
  border-radius: 30px;
  font-size: 0.7rem;
}
.laporan-data button {
  margin-top: 10px;
  padding: 0.5rem 1rem;
  min-width: 100%;
  border: none;
  background-color: #5584ac;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}
.laporan-data-isian-field-form-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.laporan-data-klasifikasi select {
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}
.laporan-data-isian-field-form-file {
  padding: 0.5rem;
  color: #2f5299;
  display: flex;
  align-items: center;
}

.laporan-data-isian-field-form input {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}

.laporan-data-isian-field-form textarea {
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  height: 150px;
  margin: 0.5rem 0;
}
.laporan-data-isian-field-form select {
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}

/* start lampiran pernikahan  */
.cerai ul {
  width: 100%;
  padding: 0.8rem;
  margin: 0;
}
.cerai li {
  list-style: none;
}
.cerai li label {
  list-style: none;
  padding: 0.2rem 0.5rem;
  /* background-color: #005197; */
  /* margin: 0.2rem; */
  /* color: #ffffff; */
  /* border: solid rgb(172, 172, 172) 1px; */
}
.cerai li p {
  color: grey;
  text-align: end;
}
.cerai {
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
input[type="file"] {
  display: none;
}
/* end lampiran pernikahan  */
</style>
