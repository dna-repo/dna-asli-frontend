<template>
  <div class="body" v-if="is_loading == false">
    <div class="laporan-aktif">
      <div class="laporan-aktif-header">
        <h1>ARSIP | Surat Keluar</h1>
        <p>Menampilkan semua surat keluar</p>
        <div class="divider"></div>
        <div class="laporan-aktif-body">
          <table>
            <thead>
              <tr>
                <th width="5%">No</th>
                <th width="10%">Tiket</th>
                <th width="35%">Surat Keluar</th>
                <th width="10%">Detail</th>
              </tr>
            </thead>
            <transition-group tag="tbody" name="tables" class="tbody">
              <tr v-for="(data, index) in laporan" :key="data._id">
                <td>{{ ++index }}</td>
                <td>{{ data.tiket }}</td>

                <td v-if="data.file_keluar.length != 0">
                  <ul class="file-lampiran">
                    <li v-for="(dt, index) in data.file_keluar" :key="index">
                      <p @click="open_file(dt[0], 'keluar')">{{ dt[0] }}</p>
                    </li>
                  </ul>
                </td>
                <td v-if="data.file_keluar.length == 0">
                  <p style="color: grey; font-size: 0.8rem; text-align: center">
                    -Tidak ada file lampiran-
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
    document.title = `${this.$store.state.app_name} | Arsip`;
    this.ambil_laporan();
  },
  data() {
    return {
      laporan: [],
      tindak_lanjut: [],
      is_loading: true,
    };
  },
  methods: {
    async ambil_laporan() {
      await axios
        .get(this.$store.state.common.baseUrl + "/api/laporan", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.laporan = res.data.data;
          this.laporan.reverse();
          this.ambil_tindak_lanjut();
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
    async ambil_tindak_lanjut() {
      await axios
        .get(this.$store.state.common.baseUrl + "/api/tindak_lanjut", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.tindak_lanjut = res.data.data;
          this.tindak_lanjut.reverse();
          for (let data of this.laporan) {
            data.file_keluar = [];
            for (let dt of this.tindak_lanjut) {
              if (dt.tiket == data.tiket) {
                if (dt.file.length > 0) {
                  data.file_keluar.unshift(dt.file);
                }
              }
            }
            // console.log(data.file_keluar);
          }
          this.is_loading = false;
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
    open_file(e, cat) {
      // console.log(e);
      if (cat == "masuk") {
        window.open(
          this.$store.state.common.baseUrl + "/photo/file/masuk/" + e
        );
      } else if (cat == "keluar") {
        window.open(
          this.$store.state.common.baseUrl + "/photo/file/keluar/" + e
        );
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

.laporan-aktif {
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
.laporan-aktif-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
}
.laporan-aktif-header h1 {
  margin: 0;
}
.laporan-aktif-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}
.laporan-aktif-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
  margin-bottom: 1rem;
}

/* start table  */
.laporan-aktif-body {
  width: 100%;
  max-height: 90%;
}
.laporan-aktif-body table {
  width: 100%;
  border-collapse: collapse;
}
.laporan-aktif-body table td,
.laporan-aktif-body table th {
  text-align: start;
  padding: 10px 8px;
  font-size: 0.9rem;
}
.laporan-aktif-body table td i {
  padding: 0.5rem;
  border-radius: 50%;
}
.laporan-aktif-body table td i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}
.laporan-aktif-body table thead tr th {
  text-align: start;
}
.laporan-aktif-body table thead,
.laporan-aktif-body table tr:nth-child(even) {
  background-color: #f3f3f3;
}
.laporan-aktif-body table .aksi {
  display: flex;
  justify-content: space-around;
}
/* end table  */

/* start detail status laporan  */
.laporan-baru {
  background-color: #00da16;
  padding: 3px 6px;
  border-radius: 10px;
  color: white;
}
.verifikasi {
  background-color: #00529e;
  padding: 3px 6px;
  border-radius: 10px;
  color: white;
}
.tindak-lanjut-warna {
  background-color: #ff4040;
  padding: 3px 6px;
  border-radius: 10px;
  color: white;
}
.tanggapan {
  background-color: #00b8e0;
  padding: 3px 6px;
  border-radius: 10px;
  color: white;
}
.selesai {
  background-color: #1161ff;
  padding: 3px 6px;
  border-radius: 10px;
  color: white;
}
/* end detail status laporan  */
.laporan-aktif-body table td .file-lampiran {
  font-size: 2rem;
}
.laporan-aktif-body table td .file-lampiran p:hover {
  background-color: transparent;
  border-radius: 50%;
  text-decoration: underline;
}
.file-lampiran {
  margin: 0;
}
.file-lampiran li {
  list-style: decimal;
  font-size: 0.7rem;
  padding: 0.5rem;
  margin: 0;
  padding-left: 0;
}

.file-lampiran li p {
  font-size: 0.7rem;
  margin: 0;
}
</style>
