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
          >Tambah Disposisi
        </h1>
        <p>Lengkapi data dibawah ini untuk menambahkan disposisi</p>
        <div class="divider"></div>
      </div>
      <div class="tambah-surat-isian">
        <div class="tambah-surat-isian-field">
          <div class="tambah-surat-isian-field-form">
            <label>Tujuan Disposisi</label>
            <select name="" id="" v-model="disposisi_baru.irban">
              <option value="" selected disabled>Pilih Irban</option>
              <option v-for="(data, i) in irban" :key="i" :value="data">
                {{ data.full_name }}
              </option>
            </select>
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Batas Waktu</label>
            <input type="date" v-model="disposisi_baru.batas_waktu" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Catatan</label>
            <input type="text" v-model="disposisi_baru.catatan" />
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Sifat</label>
            <select name="" id="" v-model="disposisi_baru.sifat">
              <option value="" selected disabled>Pilih Sifat</option>
              <option v-for="(data, i) in sifat" :key="i" :value="data">
                {{ data }}
              </option>
            </select>
          </div>
          <div class="tambah-surat-isian-field-form">
            <label>Isi Diposisi</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              v-model="disposisi_baru.isi"
            ></textarea>
          </div>
          <button @click="kirim_data">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  async created() {
    document.title = `${this.$store.state.app_name} | Tambah Disposisi`;
    this.ambil_data();
    this.id = useRoute().params.id;
  },
  data() {
    return {
      id: "",
      disposisi_baru: {
        owner: {},
        irban: undefined,
        surat: {},
        isi: "",
        batas_waktu: "",
        catatan: "",
        sifat: "",
      },
      sifat: ["Biasa", "Penting", "Segera", "Rahasia"],
      irban: [],
      surat: {},
    };
  },
  methods: {
    async kirim_data() {
      if (this.disposisi_baru.irban == undefined) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Tujuan disposisi tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.disposisi_baru.batas_waktu.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Batas waktu tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.disposisi_baru.catatan.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Catatan tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.disposisi_baru.sifat.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Sifat tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.disposisi_baru.isi.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Isi tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else {
        await axios
          .post(
            this.$store.state.common.baseUrl + "/api/disposisi/store",
            {
              owner: JSON.stringify(this.$store.state.currentLogin),
              irban: JSON.stringify(this.disposisi_baru.irban),
              surat: JSON.stringify(this.surat),
              id_surat: this.surat._id,
              isi: this.disposisi_baru.isi,
              batas_waktu: this.disposisi_baru.batas_waktu,
              catatan: this.disposisi_baru.catatan,
              sifat: this.disposisi_baru.sifat,
            },
            {
              headers: {
                Authorization: this.$store.state.common.headers,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            this.$router.back();
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "success";
            alert.message = "Berhasil tambah disposisi";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          })
          .catch(() => {
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "error";
            alert.message = "Maaf, Gagal tambah disposisi";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          });
      }
      //
    },
    async ambil_data() {
      await axios
        .get(this.$store.state.common.baseUrl + "/api/user/fo_irban", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.irban = res.data.data;
          this.ambil_surat();
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
    },
    async ambil_surat() {
      // let id = useRoute().params.id;
      // console.log(id);
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/surat/show",
          { id: this.id },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.surat = res.data.data;
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
  align-items: flex-start;
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
  width: 300px;
}

.tambah-surat-isian-field-form input {
  width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 300px;
}

.tambah-surat-isian-field-form select {
  max-width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 300px;
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
  align-items: center;
  width: 240px;
  margin: 0.5rem 0;
}

.upload-file span {
  margin: 0;
  position: static;
  align-self: flex-start;
  text-align: start;
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
