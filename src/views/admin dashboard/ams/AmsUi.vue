<template>
  <div class="body">
    <div class="ams">
      <progress-spinner
        style="margin-top: 10rem"
        v-if="is_loading.page == true"
      ></progress-spinner>
      <div class="ams-header" v-if="is_loading.page == false">
        <h2 style="margin-bottom: 0.2rem">Selamat Datang di</h2>
        <h1>Alikasi Manajemen Surat</h1>
        <div class="number-row">
          <div v-for="(data, index) in number" :key="index" class="number-box">
            <section @click="this.$router.push({ name: data.link })">
              <h2
                style="
                  display: flex;
                  align-items: flex-start;
                  justify-content: center;
                "
              >
                {{ data.number }}
                <i
                  style="font-size: 0.5rem; margin-left: 0.5rem"
                  class="pi pi-external-link"
                ></i>
              </h2>
              <p>{{ data.title }}</p>
            </section>
          </div>
        </div>
        <div class="divider"></div>
        <div class="ams-body">
          <Chart
            style="overflow-y: scroll; width: 100%"
            type="line"
            :data="basicData"
            :options="basicOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProgressSpinner from "primevue/progressspinner";
import Chart from "primevue/chart";
export default {
  components: {
    ProgressSpinner,
    Chart,
  },
  created() {
    this.ambil_data();
  },
  data() {
    return {
      number: [
        {
          title: "Surat Masuk",
          number: 0,
          link: "ams_surat_masuk",
        },
        {
          title: "Surat Keluar",
          number: 0,
          link: "ams_surat_keluar",
        },
        {
          title: "Disposisi",
          number: 0,
          link: "",
        },
      ],
      data: {
        surat_masuk: [],
        surat_keluar: [],
        disposisi: [],
      },
      is_loading: {
        page: true,
      },
      basicData: {
        labels: [],
        datasets: [
          {
            label: "Surat Masuk",
            data: [],
            fill: false,
            borderColor: "#42A5F5",
            tension: 0.4,
          },
          {
            label: "Surat Keluar",
            data: [],
            fill: false,
            borderColor: "#FFA726",
            tension: 0.4,
          },
          {
            label: "Disposisi",
            data: [],
            fill: false,
            borderColor: "#3FB832",
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
    async ambil_data() {
      await axios
        .get(this.$store.state.common.baseUrl + "/api/surat/", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.is_loading.page = false;
          res.data.data.map((data) => {
            if (data.klasifikasi == "surat masuk") {
              this.data.surat_masuk.push(data);
              this.number[0].number++;
            } else if (data.klasifikasi == "surat keluar") {
              this.data.surat_keluar.push(data);
              this.number[1].number++;
            }
          });
          this.ambil_disposisi();
        })
        .catch(() => {
          this.is_loading.page = false;
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    async ambil_disposisi() {
      await axios
        .get(this.$store.state.common.baseUrl + "/api/disposisi", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.number[2].number = res.data.data.length;
          this.data.disposisi = res.data.data;
          this.setup_chart();
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
    setup_chart() {
      let d = new Date();
      let current_date = d.getDate();
      let dates = [];
      for (let i = 0; i < 7; i++) {
        if (current_date <= 0) {
          return;
        }
        dates.push(current_date);
        current_date--;
      }
      dates.reverse();
      this.basicData.labels = dates;

      //
      let a1 = [];
      for (let j = 0; j < this.basicData.labels.length; j++) {
        let b = 0;
        console.log(this.basicData.labels[j]);
        for (let i = 0; i < this.data.surat_masuk.length; i++) {
          let data = this.data.surat_masuk[i].createdAt
            .split(" ")[2]
            .replace(",", "");
          if (this.basicData.labels[j] == data) {
            console.log("sama");
            b++;
          }
          a1[j] = b;
        }
      }
      this.basicData.datasets[0].data = a1;
      //
      let a2 = [];
      for (let j = 0; j < this.basicData.labels.length; j++) {
        let c = 0;
        console.log(this.basicData.labels[j]);
        for (let i = 0; i < this.data.surat_keluar.length; i++) {
          let data = this.data.surat_keluar[i].createdAt
            .split(" ")[2]
            .replace(",", "");
          if (this.basicData.labels[j] == data) {
            console.log("sama");
            c++;
          }
          a2[j] = c;
        }
      }
      this.basicData.datasets[1].data = a2;
      //
      let a3 = [];
      for (let j = 0; j < this.basicData.labels.length; j++) {
        let c = 0;
        // console.log(this.basicData.labels[j]);
        for (let i = 0; i < this.data.disposisi.length; i++) {
          let data = this.data.disposisi[i].createdAt
            .split(" ")[2]
            .replace(",", "");
          if (this.basicData.labels[j] == data) {
            console.log("sama");
            c++;
          }
          a3[j] = c;
        }
      }
      this.basicData.datasets[2].data = a3;
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

.ams {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  justify-content: flex-start;
  max-width: 1000px;
  height: 90%;
  overflow: scroll;
}

/* end main body background  */
.ams-header {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}

.ams-header h1 {
  margin: 0;
  font-size: 2rem;
}

.ams-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.ams-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
  margin-bottom: 1rem;
}

.number-row {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.number-box {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.ams-body {
  width: 100%;
}
</style>
