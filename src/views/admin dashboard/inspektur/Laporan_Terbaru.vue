<template>
  <div class="body">
    <div class="laporan-terbaru">
      <div class="laporan-terbaru-header">
        <h1>Daftar laporan terbaru</h1>
        <p>
          Menampilkan daftar laporan terbaru yang belum di tugaskan ke irban
        </p>
        <div class="divider"></div>
        <div class="laporan-terbaru-body">
          <table>
            <thead>
              <tr>
                <th width="5%">No</th>
                <th width="20%">Tiket</th>
                <th width="25%">Nama Pelapor</th>
                <th width="20%">Status</th>
                <th width="30%">Irban Pelaksana</th>
                <th width="30%">Detail Laporan</th>
              </tr>
            </thead>
            <transition-group tag="tbody" name="tables" class="tbody">
              <tr v-for="(data, index) in laporan" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ data.tiket }}</td>
                <td>{{ data.account.full_name }}</td>
                <td>{{ data.status }}</td>
                <td>
                  <button
                    v-if="data.owner == undefined"
                    @click="pilih_irban(index)"
                  >
                    Pilih irban
                  </button>
                  <p v-if="data.owner != undefined">
                    {{ data.owner.full_name }}
                  </p>
                </td>
                <td class="aksi">
                  <i
                    @click="
                      this.$router.push({
                        name: 'detail_laporan',
                        params: { id: data._id },
                      })
                    "
                    class="pi pi-external-link"
                    style="
                      font-size: 0.95rem;
                      margin-right: 0.2rem;
                      color: blue;
                    "
                  ></i>
                </td>
              </tr>
            </transition-group>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async created() {
    document.title = `${this.$store.state.app_name} | Laporan terbaru`;
    this.ambil_laporan();
    this.ambil_irban();
  },
  data() {
    return {
      laporan: [],
      list_irban: ["Irban-1", "Irban-2", "Irban-3", "Irban-4"],
    };
  },
  methods: {
    pilih_irban(index) {
      // console.log(index);
      this.$store.state.modal_pilih.index = index;
      let irban = this.$store.state.modal_pilih;
      irban.irban = this.list_irban;
      irban.show = true;
      irban.if_false = () => {
        this.$store.state.modal_pilih.index = 0;
        irban.show = false;
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "warning";
        alert.message = "Pemilihan irban dibatalkan";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
      };
      irban.if_true = () => {
        this.laporan[this.$store.state.modal_pilih.index - 1].owner =
          this.$store.state.modal_pilih.choosen;
        this.kirim_tindak_lanjut(
          this.laporan[this.$store.state.modal_pilih.index - 1],
          this.laporan[this.$store.state.modal_pilih.index - 1].tiket,
          this.$store.state.currentLogin,
          "pilih irban",
          "memilih irban"
        );
        this.update_owner(
          this.laporan[this.$store.state.modal_pilih.index - 1]
        );
        this.$store.state.modal_pilih.index = undefined;
        irban.show = false;
        irban.index = undefined;
        irban.choosen = undefined;
      };
    },
    async ambil_laporan() {
      await axios
        .get(
          this.$store.state.common.baseUrl +
            "/api/laporan/show_pengaduan_perceraian",
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.laporan = res.data.data;
          // console.log(this.laporan);
          this.laporan = this.laporan.filter((data) => data.owner == undefined);
          this.laporan.reverse();
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
    async ambil_irban() {
      await axios
        .get(this.$store.state.common.baseUrl + "/api/user/show_irban", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.list_irban = res.data.data;
          // console.log(this.list_irban);
          this.$store.state.modal_pilih.irban = this.list_irban;
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
        .then(() => {
          // console.log(res.data);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil memilih irban";
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
    async update_owner(laporan) {
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/laporan/update_owner",
          { owner: laporan.owner, tiket: laporan.tiket },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
            },
          }
        )
        .then(() => {
          // console.log(res.data);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil memilih irban";
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

.laporan-terbaru {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  justify-content: flex-start;
  max-width: 1000px;
  overflow: scroll;
  height: 90%;
}
/* end main body background  */
.laporan-terbaru-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
}
.laporan-terbaru-header h1 {
  margin: 0;
}
.laporan-terbaru-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}
.laporan-terbaru-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
  margin-bottom: 1rem;
}

/* start table  */
.laporan-terbaru-body {
  width: 100%;
  max-height: 90%;
}
.laporan-terbaru-body table {
  width: 100%;
  border-collapse: collapse;
}
.laporan-terbaru-body table td,
.laporan-terbaru-body table th {
  text-align: left;
  padding: 10px 8px;
}
.laporan-terbaru-body table td i {
  padding: 0.5rem;
  border-radius: 50%;
}
.laporan-terbaru-body table td i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}
.laporan-terbaru-body table thead tr th {
  text-align: start;
}
.laporan-terbaru-body table thead,
.laporan-terbaru-body table tr:nth-child(even) {
  background-color: #f3f3f3;
}
.laporan-terbaru-body table .aksi {
  display: flex;
  justify-content: space-around;
}
/* end table  */
</style>
