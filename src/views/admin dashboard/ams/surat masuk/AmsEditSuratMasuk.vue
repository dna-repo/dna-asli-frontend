<template>
  <div class="body">
    <div class="tambah-surat">
      <div class="tambah-surat-header">
        <h1>
          <i
            class="pi pi-arrow-left"
            @click="this.$router.back()"
            style="font-size: 1rem; margin-right: 0.5rem"
          ></i
          >Edit Surat Masuk
        </h1>
        <!-- <p>lakukan perubahan data </p> -->
        <div class="divider"></div>
      </div>
      <div class="tambah-surat-isian">
        <div class="tambah-surat-isian-field">
          <div class="tambah-surat-isian-field-form">
            <label>Nomor Agenda</label>
            <input type="number" v-model="surat_baru.no_agenda" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Asal Surat</label>
            <input type="text" v-model="surat_baru.asal_surat" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Nomor Surat</label>
            <input type="text" v-model="surat_baru.no_surat" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Kode Klasifikasi</label>
            <input type="text" v-model="surat_baru.kode_klasifikasi" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Indeks Berkas</label>
            <input type="text" v-model="surat_baru.indeks_berkas" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Tanggal Surat</label>
            <input type="date" v-model="surat_baru.tanggal_surat" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Isi Ringkas</label>
            <textarea v-model="surat_baru.isi_ringkas"></textarea>
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Keterangan</label>
            <textarea v-model="surat_baru.keterangan"></textarea>
          </div>
          <div class="upload-file" style="width: 100%">
            <label for="file">
              <i
                class="pi pi-upload"
                style="color: white; margin-right: 0.3rem"
              ></i
              >Upload File</label
            >
            <span style="margin-left: 0.3rem; font-size: 0.8rem; color: grey">
              {{
                surat_baru.file_name == undefined
                  ? surat_baru.file
                  : surat_baru.file_name
              }}</span
            >
            <input
              id="file"
              @change="upload_file($event)"
              style="display: none"
              type="file"
              accept="application/pdf"
            />
          </div>
          <button @click="update_data">Simpan</button>
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
    this.ambil_data();
  },
  data() {
    return {
      surat_baru: {
        file_name: "",
        no_agenda: "",
        asal_surat: "",
        no_surat: "",
        isi_ringkas: "",
        kode_klasifikasi: "",
        indeks_berkas: "",
        tanggal_surat: "",
        keterangan: "",
        file: undefined,
      },
    };
  },
  methods: {
    async ambil_data() {
      let id = useRoute().params.id;
      // console.log(id);
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/surat/show",
          { id: id },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.surat_baru = res.data.data;
          console.log(this.surat_baru);
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
    upload_file(e) {
      let file = e.target.files[0];
      this.surat_baru.file_name = file.name;
      this.surat_baru.file = file;
    },
    async update_data() {
      let no_agenda = this.surat_baru.no_agenda.toString();
      if (no_agenda.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Nomor agenda tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.asal_surat.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Asal surat tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.no_surat.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Nomor surat tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.isi_ringkas.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Isi Ringkas tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.kode_klasifikasi.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Kode Klasifikasi tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.indeks_berkas.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Indeks Beras tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.tanggal_surat.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Tanggal Surat tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.keterangan.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Keterangan tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.surat_baru.file == undefined) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "File tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else {
        let formData = new FormData();
        formData.append("id", this.surat_baru._id);
        formData.append("no_agenda", this.surat_baru.no_agenda);
        formData.append("asal_surat", this.surat_baru.asal_surat);
        formData.append("no_surat", this.surat_baru.no_surat);
        formData.append("kode_klasifikasi", this.surat_baru.kode_klasifikasi);
        formData.append("indeks_berkas", this.surat_baru.indeks_berkas);
        formData.append("tanggal_surat", this.surat_baru.tanggal_surat);
        formData.append("isi_ringkas", this.surat_baru.isi_ringkas);
        formData.append("keterangan", this.surat_baru.keterangan);
        formData.append("file", this.surat_baru.file);
        await axios
          .post(
            this.$store.state.common.baseUrl + "/api/surat/edit",
            formData,
            {
              headers: {
                Authorization: this.$store.state.common.headers,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            this.$router.push({ name: "ams_surat_masuk" });
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "success";
            alert.message = "Berhasil edit surat";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          })
          .catch(() => {
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "error";
            alert.message = "Maaf, Gagal edit surat";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          });
      }
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

.tambah-surat {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  min-height: 85%;
  overflow: scroll;
}

/* end main body background  */
/* start tambah akun header  */
.tambah-surat-header {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  /* background-color: rgba(196, 148, 148, 0.301); */
  width: 100%;
  align-items: flex-start;
}

.tambah-surat-header h1 {
  margin: 0;
}

.tambah-surat-header h1 i {
  background-color: #5583ac00;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.tambah-surat-header h1 i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}

.tambah-surat-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.tambah-surat-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
  margin-bottom: 1rem;
}

/* end tambah akun header  */

/* start tambah akun isian  */
.tambah-surat-isian {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  /* border: rgba(128, 128, 128, 0.39) 1px solid; */
}

.tambah-surat-isian-tipe {
  width: 100%;
  display: flex;
  /* background-color: aliceblue; */
  justify-content: space-around;
  padding: 2rem 1rem 0.5rem 1rem;
}

.tambah-surat-isian-tipe li {
  font-size: 1.1rem;
  list-style: none;
  background-color: rgb(228, 243, 255);
  cursor: pointer;
  margin: 0;
  padding: 0.5rem 1rem;
  width: 50%;
}

.tambah-surat-isian-tipe .li2 {
  background-color: rgb(149, 207, 255);
}

.tambah-surat-isian-field-form {
  flex-direction: column;
  display: flex;
  margin: 0.2rem 0;
}

.tambah-surat-isian-field {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1rem;
  /* margin: 0 1rem; */
}

.tambah-surat-isian-field-form label {
  align-self: flex-start;
  color: #63707c;
  margin: 0.2rem;
  font-size: 0.8rem;
}

textarea {
  width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 240px;

  height: auto;
}
.tambah-surat-isian-field-form input {
  width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 240px;
}

.tambah-surat-isian-field-form .photo {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #2a6294;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
}

.tambah-surat-isian-field-form select {
  max-width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 240px;
}

.tambah-surat-isian-field-form span {
  color: red;
  font-size: 0.8rem;
  position: absolute;
  margin-top: 4.2rem;
}

.tambah-surat-isian-field button {
  margin-top: 20px;
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  background-color: #5584ac;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}
/* end tambah akun isian  */
.upload-file {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  margin: 0.5rem 0;
}
.upload-file label {
  align-self: flex-start;
  font-size: 0.8rem;
  background-color: #0088ff;
  border-radius: 4px;
  color: white;
  padding: 5px 10px;
}
</style>
