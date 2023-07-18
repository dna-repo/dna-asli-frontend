<template>
  <div class="body">
    <div class="data">
      <h1>
        Jumlah Laporan Aktif
        <span
          style="
            background-color: darkmagenta;
            color: white;
            padding: 5px 10px;
            border-radius: 50%;
          "
          >{{
            this.number[0].data.length +
            this.number[1].data.length +
            this.number[2].data.length +
            this.number[3].data.length
          }}</span
        >
      </h1>
      <hr width="100%" />
      <div class="angka">
        <div class="angka-aktif">
          <h2>{{ this.number[0].data.length }}</h2>
          <p>Permintaan Informasi</p>
        </div>
        <div class="angka-aktif">
          <h2>{{ this.number[1].data.length }}</h2>
          <p>Aspirasi</p>
        </div>
        <div class="angka-aktif">
          <h2>{{ this.number[2].data.length }}</h2>
          <p>Pengaduan</p>
        </div>
        <div class="angka-aktif">
          <h2>{{ this.number[3].data.length }}</h2>
          <p>Perceraian</p>
        </div>
      </div>
      <hr width="100%" />
      <h3 style="text-align: start">Grafik Laporan Perminggu</h3>
      <Chart
        style="overflow-y: scroll"
        type="line"
        :data="basicData"
        :options="basicOptions"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";
import Chart from "primevue/chart";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Dashboard`;
    this.ambil_laporan();
  },
  components: { Chart },
  data() {
    return {
      laporan: [],
      date: "",
      tanggal: [],
      number: [
        {
          klasifikasi: "Permintaan Informasi",
          number: 0,
          data: [],
        },
        {
          klasifikasi: "Aspirasi",
          number: 0,
          data: [],
        },
        {
          klasifikasi: "Pengaduan",
          number: 0,
          data: [],
        },
        {
          klasifikasi: "Perceraian",
          number: 0,
          data: [],
        },
      ],
      lap: {
        permintaan_informasi: [],
        aspirasi: [],
        pengaduan: [],
        perceraian: [],
      },
      label: {
        permintaan_informasi: [],
        aspirasi: [],
        pengaduan: [],
        perceraian: [],
      },
      basicData: {
        labels: [],
        datasets: [
          {
            label: "Permintaan Informasi",
            data: [],
            fill: false,
            borderColor: "#42A5F5",
            tension: 0.4,
          },
          {
            label: "Aspirasi",
            data: [],
            fill: false,
            borderColor: "#FFA726",
            tension: 0.4,
          },
          {
            label: "Pengaduan",
            data: [],
            fill: false,
            borderColor: "#3FB832",
            tension: 0.4,
          },
          {
            label: "Perceraian",
            data: [],
            fill: false,
            borderColor: "#B8327B",
            tension: 0.4,
          },
        ],
      },
      basicOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
    };
  },
  methods: {
    ambil_laporan() {
      axios
        .get(this.$store.state.common.baseUrl + "/api/laporan", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.laporan = res.data.data;
          this.laporan = this.laporan.filter(
            (data) => data.status != "selesai"
          );
          this.laporan.map((data) => {
            if (data.klasifikasi == "permintaan informasi") {
              this.number[0].data.push(data);
            } else if (data.klasifikasi == "aspirasi") {
              this.number[1].data.push(data);
            } else if (data.klasifikasi == "pengaduan") {
              this.number[2].data.push(data);
            } else if (data.klasifikasi == "perceraian") {
              this.number[3].data.push(data);
            }
          });
          this.number[0].number = this.number[0].data.length;
          this.number[1].number = this.number[1].data.length;
          this.number[2].number = this.number[2].data.length;
          this.number[3].number = this.number[3].data.length;

          // untuk membuat label
          for (let data = 0; data < 7; data++) {
            let dd2 = this.getDateFrom(data);
            let ds = dd2.toString().split(" ")[2];
            console.log(ds);
            this.basicData.labels.unshift(ds);
          }
          for (let data = 0; data < this.laporan.length; data++) {
            let tanggal_laporan = this.laporan[data].createdAt
              .split(" ")[2]
              .replace(",", "");
            for (let d = 0; d < 7; d++) {
              let label = this.basicData.labels[d].split(" ")[0];
              if (tanggal_laporan == label) {
                if (this.laporan[data].klasifikasi == "permintaan informasi") {
                  this.lap.permintaan_informasi.push(this.laporan[data]);
                }
                if (this.laporan[data].klasifikasi == "aspirasi") {
                  this.lap.aspirasi.push(this.laporan[data]);
                }
                if (this.laporan[data].klasifikasi == "pengaduan") {
                  this.lap.pengaduan.push(this.laporan[data]);
                }
                if (this.laporan[data].klasifikasi == "perceraian") {
                  this.lap.perceraian.push(this.laporan[data]);
                }
              }
            }
          }

          let lbl = [];
          for (let data = 0; data < this.basicData.labels.length; data++) {
            let d = this.basicData.labels[data].split(" ")[0];
            lbl.push(d);
          }

          let tgl = [];
          for (
            let data = 0;
            data < this.lap.permintaan_informasi.length;
            data++
          ) {
            let d = this.lap.permintaan_informasi[data].createdAt
              .split(" ")[2]
              .replace(",", "");
            tgl.push(d);
          }

          let tgl2 = [];
          for (let data = 0; data < this.lap.aspirasi.length; data++) {
            let d = this.lap.aspirasi[data].createdAt
              .split(" ")[2]
              .replace(",", "");
            tgl2.push(d);
          }

          let tgl3 = [];
          for (let data = 0; data < this.lap.pengaduan.length; data++) {
            let d = this.lap.pengaduan[data].createdAt
              .split(" ")[2]
              .replace(",", "");
            tgl3.push(d);
          }

          let tgl4 = [];
          for (let data = 0; data < this.lap.perceraian.length; data++) {
            let dd = this.lap.perceraian[data].createdAt
              .split(" ")[2]
              .replace(",", "");
            tgl4.push(dd);
            // console.log(this.lap.perceraian[data]);
          }
          // console.log(tgl);

          // lbl = [5 , 6, 7 , 8 , 9 , 10, 11]
          // tgl = [6, 6, 6, 6, 6, 5, 5, 2, 2,]

          // output = [ 2, 5, 0, 0, 0, 0, 0 ]

          // for (let data = 0; data < lbl.length; data++) {
          //   let num = 0;
          //   this.label.permintaan_informasi[data] = num;
          //   for (let dt = 0; dt < tgl.length; dt++) {
          //     if (lbl[data] == tgl[dt]) {
          //       num++;
          //       this.label.permintaan_informasi[data] = num;
          //     }
          //   }
          // }
          // this.basicData.datasets[0].data = this.label.permintaan_informasi;
          this.basicData.datasets[0].data = this.labels(lbl, tgl);
          this.basicData.datasets[1].data = this.labels(lbl, tgl2);
          this.basicData.datasets[2].data = this.labels(lbl, tgl3);
          this.basicData.datasets[3].data = this.labels(lbl, tgl4);
          // this.labels(lbl, tgl2);
          // this.labels(lbl, tgl3);
          // this.labels(lbl, tgl4);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDateFrom(d) {
      var today = new Date();
      var nextweek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - d
      );
      return nextweek;
    },
    labels(tanggal, laporan) {
      let arr = [];
      for (let data = 0; data < tanggal.length; data++) {
        let num = 0;
        arr[data] = num;
        for (let dt = 0; dt < laporan.length; dt++) {
          if (tanggal[data] == laporan[dt]) {
            num++;
            arr[data] = num;
          }
        }
      }
      // console.log(arr);
      return arr;
    },
  },
};
</script>

<style scoped>
.body {
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  max-width: 1000px;
}

.data {
  height: 90%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  max-width: 1000px;
}

.angka {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0rem;
}
.angka-aktif {
  /* background-color: aqua; */
  width: 23%;
}
h1 {
  margin: 0;
  text-align: start;
}
.angka-aktif p {
  font-size: 0.88rem;
}
</style>
