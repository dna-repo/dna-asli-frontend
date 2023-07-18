<template>
  <div class="body">
    <div class="detail-surat">
      <div class="detail-surat-header">
        <h1>
          <i
            class="pi pi-arrow-left"
            @click="this.$router.back()"
            style="font-size: 1rem; margin-right: 0.5rem"
          ></i
          >Detail Surat Masuk
        </h1>
        <!-- <p>lakukan perubahan data </p> -->
        <div class="divider"></div>
      </div>
      <div class="detail-surat-isian">
        <div class="detail-surat-isian-field" style="width: 100%">
          <div class="detail-surat-isian-field-form">
            <label>Nomor Agenda</label>
            <h2 style="text-align: start">{{ surat_baru.no_agenda }}</h2>
          </div>
          <div class="detail-surat-isian-field-form">
            <label>Asal Surat</label>
            <h2 style="text-align: start">{{ surat_baru.asal_surat }}</h2>
          </div>
          <div class="detail-surat-isian-field-form">
            <label>Nomor Surat</label>
            <h2 style="text-align: start">{{ surat_baru.no_surat }}</h2>
          </div>
          <div class="detail-surat-isian-field-form">
            <label>Kode Klasifikasi</label>
            <h2 style="text-align: start">{{ surat_baru.kode_klasifikasi }}</h2>
          </div>
          <div class="detail-surat-isian-field-form">
            <label>Indeks Berkas</label>
            <h2 style="text-align: start">{{ surat_baru.indeks_berkas }}</h2>
          </div>
          <div class="detail-surat-isian-field-form">
            <label>Tanggal Surat</label>
            <h2 style="text-align: start">{{ surat_baru.tanggal_surat }}</h2>
          </div>
          <div class="detail-surat-isian-field-form">
            <label>Isi Ringkas</label>
            <p style="text-align: start">{{ surat_baru.isi_ringkas }}</p>
          </div>
          <div class="detail-surat-isian-field-form">
            <label>Keterangan</label>
            <p style="text-align: start">{{ surat_baru.keterangan }}</p>
          </div>
          <div class="detail-surat-isian-field-form" style="width: 100%">
            <label>File</label>
            <p
              @click="new_tab(surat_baru.file)"
              style="
                text-align: start;
                color: grey;
                text-decoration: underline;
                display: flex;
                align-items: flex-start;
                cursor: pointer;
              "
            >
              {{ surat_baru.file }}
              <i style="font-size: 0.5rem" class="pi pi-external-link"></i>
            </p>
          </div>
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
      surat_baru: {},
    };
  },
  methods: {
    new_tab(d) {
      window.open(
        `${this.$store.state.common.baseUrl}/photo/surat/${d}`,
        "_blank"
      );
    },
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

.detail-surat {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  min-height: 85%;
  overflow: scroll;
}

/* end main body background  */
/* start detail akun header  */
.detail-surat-header {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  /* background-color: rgba(196, 148, 148, 0.301); */
  width: 100%;
  align-items: flex-start;
}

.detail-surat-header h1 {
  margin: 0;
}

.detail-surat-header h1 i {
  background-color: #5583ac00;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.detail-surat-header h1 i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}

.detail-surat-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.detail-surat-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
  margin-bottom: 1rem;
}

/* end detail akun header  */

/* start detail akun isian  */
.detail-surat-isian {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  /* border: rgba(128, 128, 128, 0.39) 1px solid; */
}

.detail-surat-isian-tipe {
  width: 100%;
  display: flex;
  /* background-color: aliceblue; */
  justify-content: space-around;
  padding: 2rem 1rem 0.5rem 1rem;
}

.detail-surat-isian-tipe li {
  font-size: 1.1rem;
  list-style: none;
  background-color: rgb(228, 243, 255);
  cursor: pointer;
  margin: 0;
  padding: 0.5rem 1rem;
  width: 50%;
}

.detail-surat-isian-tipe .li2 {
  background-color: rgb(149, 207, 255);
}

.detail-surat-isian-field-form {
  flex-direction: column;
  display: flex;
  margin: 0.5rem 0;
  min-width: 50%;
}

.detail-surat-isian-field {
  margin: 2rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1rem;
  /* margin: 0 1rem; */
}

.detail-surat-isian-field-form label {
  align-self: flex-start;
  color: #63707c;
  margin: 0.2rem;
  font-size: 0.8rem;
}
h2 {
  margin: 0.2rem 0;
}
</style>
