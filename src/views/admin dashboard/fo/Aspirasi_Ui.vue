<template>
  <div class="body">
    <div class="permintaan-informasi">
      <div class="permintaan-informasi-header">
        <h1>Daftar laporan aspirasi</h1>
        <p>Menampilkan daftar aspirasi</p>
        <div class="divider"></div>
        <div class="permintaan-informasi-body">
          <table>
            <thead>
              <tr>
                <th width="5%">No</th>
                <th width="15%">Tiket</th>
                <th width="27%">Nama Pelapor</th>
                <th width="23%">Klasifikasi</th>
                <th width="18%">Status</th>
                <th width="7%">Detail</th>
              </tr>
            </thead>
            <transition-group tag="tbody" name="tables" class="tbody">
              <tr v-for="(data, index) in laporan" :key="data._id">
                <td>{{ ++index }}</td>
                <td>{{ data.tiket }}</td>
                <td style="text-transform: capitalize">
                  {{ data.account.full_name }}
                </td>
                <td style="text-transform: capitalize">
                  <p>
                    {{ data.klasifikasi }}
                  </p>
                </td>
                <td>
                  <p
                    style="text-align: center"
                    :class="[
                      data.status == 'laporan baru'
                        ? 'laporan-baru'
                        : '' || data.status == 'verifikasi'
                        ? 'verifikasi'
                        : '' || data.status == 'tindak lanjut'
                        ? 'tindak-lanjut-warna'
                        : '' || data.status == 'tanggapan'
                        ? 'tanggapan'
                        : '' || data.status == 'selesai'
                        ? 'selesai'
                        : '',
                    ]"
                  >
                    {{ data.status }}
                  </p>
                </td>
                <td class="aksi">
                  <i
                    @click="
                      this.$router.push({
                        name: 'tanggapi_laporan',
                        params: { id: data._id },
                      })
                    "
                    class="pi pi-sync"
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
    document.title = `${this.$store.state.app_name} | Permintaan informasi`;
    await axios
      .get(this.$store.state.common.baseUrl + "/api/laporan/show_aspirasi", {
        headers: {
          Authorization: this.$store.state.common.headers,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        this.laporan = res.data.data;
        // console.log(this.laporan);
        this.laporan = this.laporan.reverse();
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
  data() {
    return {
      laporan: [],
      shortedText: [],
    };
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

.permintaan-informasi {
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
.permintaan-informasi-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
}
.permintaan-informasi-header h1 {
  margin: 0;
}
.permintaan-informasi-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}
.permintaan-informasi-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
  margin-bottom: 1rem;
}

/* start table  */
.permintaan-informasi-body {
  width: 100%;
  max-height: 90%;
}
.permintaan-informasi-body table {
  width: 100%;
  border-collapse: collapse;
}
.permintaan-informasi-body table td,
.permintaan-informasi-body table th {
  text-align: start;
  padding: 10px 8px;
  font-size: 0.9rem;
}
.permintaan-informasi-body table td p {
  font-size: 0.9rem;
}
.permintaan-informasi-body table td i {
  padding: 0.5rem;
  border-radius: 50%;
}
.permintaan-informasi-body table td i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}
.permintaan-informasi-body table thead tr th {
  text-align: start;
}
.permintaan-informasi-body table thead,
.permintaan-informasi-body table tr:nth-child(even) {
  background-color: #f3f3f3;
}
.permintaan-informasi-body table .aksi {
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
</style>
