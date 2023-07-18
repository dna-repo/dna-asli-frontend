<template>
  <div class="body">
    <div class="data">
      <div class="btn">
        <input type="text" placeholder="Nomor Tiket" v-model="tiket" />
        <i class="pi pi-search" @click="cari"></i>
      </div>
      <h4>Rincian Tiket :</h4>
      <!-- <hr /> -->
      <table>
        <thead>
          <tr>
            <th width="30%">Tanggal</th>
            <th width="30%">Aktor</th>
            <th width="40%">Keterangan</th>
          </tr>
        </thead>
        <tbody v-if="report != undefined">
          <tr>
            <td>{{ report.createdAt }}</td>
            <td>{{ report.account.full_name }}</td>
            <td>laporan baru</td>
            <td></td>
          </tr>
          <tr v-for="data in tindak_lanjut" :key="data._id">
            <td>{{ data.createdAt }}</td>
            <td>{{ data.owner.full_name }}</td>
            <td>{{ data.tindak_lanjut }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <p width="100%" v-if="report == undefined">
        Masukkan tiket untuk mencari laporan
      </p>

      <!-- start section tracking laporan  -->
      <section class="step" v-if="report != undefined">
        <div class="part s1">
          <div
            class="circle"
            :class="[
              report.status == 'laporan baru' ||
              report.status == 'verifikasi' ||
              report.status == 'tindak lanjut' ||
              report.status == 'tanggapan' ||
              report.status == 'selesai'
                ? 'circle-color'
                : '',
            ]"
          >
            <i class="pi pi-file"></i>
          </div>
          <div class="keterangan">
            <h3>Buat Laporan</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s2">
          <div
            class="circle"
            :class="[
              report.status == 'verifikasi' ||
              report.status == 'tindak lanjut' ||
              report.status == 'tanggapan' ||
              report.status == 'selesai'
                ? 'circle-color'
                : '',
            ]"
          >
            <i class="pi pi-reply"></i>
          </div>
          <div class="keterangan">
            <h3>Verifikasi</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s3">
          <div
            class="circle"
            :class="[
              report.status == 'tindak lanjut' ||
              report.status == 'tanggapan' ||
              report.status == 'selesai'
                ? 'circle-color'
                : '',
            ]"
          >
            <i class="pi pi-comment"></i>
          </div>
          <div class="keterangan">
            <h3>Tindak Lanjut</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s4">
          <div
            class="circle"
            :class="[
              report.status == 'tanggapan' || report.status == 'selesai'
                ? 'circle-color'
                : '',
            ]"
          >
            <i class="pi pi-comments"></i>
          </div>
          <div class="keterangan">
            <h3>Tanggapan</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s5">
          <div
            class="circle"
            :class="[report.status == 'selesai' ? 'circle-color' : '']"
          >
            <i class="pi pi-check"></i>
          </div>
          <div class="keterangan">
            <h3>Selesai</h3>
          </div>
        </div>
      </section>
      <!-- end section tracking laporan  -->

      <!-- start section tracking laporan  -->
      <section class="step" v-if="report == undefined">
        <div class="part s1">
          <div class="circle">
            <i class="pi pi-file"></i>
          </div>
          <div class="keterangan">
            <h3>Buat Laporan</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s2">
          <div class="circle">
            <i class="pi pi-reply"></i>
          </div>
          <div class="keterangan">
            <h3>Verifikasi</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s3">
          <div class="circle">
            <i class="pi pi-comment"></i>
          </div>
          <div class="keterangan">
            <h3>Tindak Lanjut</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s4">
          <div class="circle">
            <i class="pi pi-comments"></i>
          </div>
          <div class="keterangan">
            <h3>Tanggapan</h3>
          </div>
        </div>
        <div class="line"></div>
        <div class="part s5">
          <div class="circle">
            <i class="pi pi-check"></i>
          </div>
          <div class="keterangan">
            <h3>Selesai</h3>
          </div>
        </div>
      </section>
      <!-- end section tracking laporan  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    document.title = `${this.$store.state.app_name} | Tracking laporan`;
  },
  data() {
    return {
      tiket: "",
      report: undefined,
      tindak_lanjut: [],
    };
  },
  computed: {},
  methods: {
    date_to_show(dt) {
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
    cari() {
      // console.log("mencari laporan dengan tiket" + this.tiket);
      axios
        .post(
          this.$store.state.common.baseUrl + "/api/laporan/show_by_tiket",
          { tiket: this.tiket },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.report = res.data.data;
          this.report.createdAt = this.date_to_show(this.report.createdAt);
          this.ambil_tindak_lanjut(this.report.tiket);
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
    ambil_tindak_lanjut() {
      // console.log("mencari tindak lanjut dengan tiket" + tiket);
      axios
        .post(
          this.$store.state.common.baseUrl + "/api/tindak_lanjut/show",
          { tiket: this.tiket },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res.data.data);
          this.tindak_lanjut = res.data.data;
          this.tindak_lanjut = this.tindak_lanjut.filter(
            (data) =>
              data.tipe == "update status" || data.tipe == "upload dokumen"
          );
          this.tindak_lanjut.map((data) => {
            data.createdAt = this.date_to_show(data.createdAt);
          });
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
.body {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
}
.data {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  width: 100%;
  height: 90%;
  max-width: 1000px;
  overflow: scroll;
}
h4 {
  margin: 1rem 0 1rem 0;
}
input {
  width: 200px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px 0 0 4px;
}
.btn {
  display: flex;
  align-items: center;
}
.data .btn .pi-search {
  font-size: 1.19rem;
  padding: 0.5rem 1rem;
  background-color: rgb(201, 213, 231);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: 0.3s ease-in;
}
.data .btn .pi-search:hover {
  background-color: rgb(153, 179, 218);
}
table {
  width: 100%;
  border-collapse: collapse;
}
table td,
table th {
  text-align: start;
  padding: 10px 8px;
  font-size: 0.9rem;
}
table td p {
  font-size: 0.9rem;
}
table td i {
  padding: 0.5rem;
  border-radius: 50%;
}
table td i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}
table thead tr th {
  text-align: start;
}

table thead,
table tr:nth-child(even) {
  background-color: #f3f3f3;
}
.data p {
  text-align: center;
  margin: 5rem auto;
  color: grey;
  font-size: 0.8rem;
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
  color: grey;
}
.part .keterangan p {
  font-size: 0.6rem;
  margin: 0.2rem;
  color: rgba(0, 0, 0, 0.575);
}
.line {
  width: 30px;
  height: 1px;
  background-color: #dddddd;
  margin-top: 1.5rem;
  margin-left: -0.9rem;
}
.step {
  display: flex;
  max-width: 550px;
  padding: 1rem;
  margin: 5rem auto 0 auto;
}
/* end step  */

.circle-color {
  background-color: #00da16;
  color: white;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.3rem;
}
/* end detail status laporan  */
</style>
