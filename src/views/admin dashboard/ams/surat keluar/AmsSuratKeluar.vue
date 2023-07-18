<template>
  <div class="body">
    <div class="ams">
      <progress-spinner
        style="margin-top: 10rem"
        v-if="is_loading.page == true"
      ></progress-spinner>
      <div class="ams-header" v-if="is_loading.page == false">
        <h1>AMS | Surat Keluar</h1>
        <p>Menampilkan semua surat keluar</p>
        <div class="divider"></div>
        <div class="ams-body">
          <div
            class="button"
            v-if="this.$store.state.currentLogin.level == 'fo'"
          >
            <button
              @click="this.$router.push('ams_tambah_surat_keluar')"
              style="margin: 0.5rem"
            >
              <i class="pi pi-plus"></i> Tambah
            </button>
          </div>
          <div class="no-data" v-if="data.length == 0">
            <p>Tidak ada data ditemukan</p>
          </div>
          <table v-if="data.length != 0">
            <thead>
              <tr>
                <th width="5%">No</th>
                <th width="15%">Nomor Surat</th>
                <th width="15%">Asal Surat</th>
                <th width="35%">Isi Ringkas</th>
                <th style="text-align: center" width="20%">Aksi</th>
              </tr>
            </thead>
            <transition-group
              tag="tbody"
              name="tables"
              class="tbody"
              v-if="this.$store.state.currentLogin.level != 'irban'"
            >
              <tr v-for="(dt, index) in data" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ dt.no_surat }}</td>
                <td>{{ dt.asal_surat }}</td>
                <td>{{ dt.isi_ringkas }}</td>
                <td
                  v-if="this.$store.state.currentLogin.level == 'fo'"
                  style="display: flex; justify-content: space-around"
                >
                  <i
                    @click="
                      this.$router.push({
                        name: 'ams_detail_surat_keluar',
                        params: { id: dt._id },
                      })
                    "
                    class="pi pi-external-link"
                  >
                  </i
                  ><i
                    @click="
                      this.$router.push({
                        name: 'ams_edit_surat_keluar',
                        params: { id: dt._id },
                      })
                    "
                    style="color: blue"
                    class="pi pi-pencil"
                  ></i
                  ><i
                    @click="hapus(dt._id)"
                    style="color: red"
                    class="pi pi-trash"
                  ></i>
                </td>

                <td
                  v-if="this.$store.state.currentLogin.level == 'super admin'"
                  style="display: flex; justify-content: space-around"
                >
                  <i
                    @click="
                      this.$router.push({
                        name: 'ams_detail_surat_keluar',
                        params: { id: dt._id },
                      })
                    "
                    class="pi pi-external-link"
                  >
                  </i
                  ><i
                    @click="
                      this.$router.push({
                        name: 'ams_disposisi',
                        params: { id: dt._id },
                      })
                    "
                    style="color: blue"
                    class="pi pi-sync"
                  ></i>
                </td>
              </tr>
            </transition-group>

            <transition-group
              tag="tbody"
              name="tables"
              class="tbody"
              v-if="this.$store.state.currentLogin.level == 'irban'"
            >
              <tr v-for="(dt, index) in data" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ dt.surat.no_surat }}</td>
                <td>{{ dt.surat.asal_surat }}</td>
                <td>{{ dt.surat.isi_ringkas }}</td>
                <td
                  v-if="this.$store.state.currentLogin.level == 'irban'"
                  style="display: flex; justify-content: space-around"
                >
                  <i
                    @click="
                      this.$router.push({
                        name: 'ams_detail_surat_keluar',
                        params: { id: dt.surat._id },
                      })
                    "
                    class="pi pi-external-link"
                  >
                  </i>
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
import ProgressSpinner from "primevue/progressspinner";
export default {
  components: {
    ProgressSpinner,
  },
  async created() {
    document.title = this.$store.state.app_name + " | Surat Keluar ";
    if (this.$store.state.currentLogin.level == "irban") {
      this.ambil_disposisi();
    } else {
      this.ambil_data();
    }
  },
  data() {
    return {
      data: [],
      is_loading: {
        page: true,
      },
    };
  },
  methods: {
    // async ambil
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
          this.data = res.data.data;
          console.log(this.data);
          this.data = this.data.filter(
            (data) => data.klasifikasi == "surat keluar"
          );
          this.data = this.data.reverse();
        })
        .catch(() => {
          // console.log(err);
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
    async hapus(id) {
      let modal = this.$store.state.modal;
      modal.show = true;
      modal.batal_button = true;
      modal.oke_button = true;
      modal.header = "Hapus";
      modal.body = "Apakah anda yakin untuk menghapus surat ini ";
      modal.if_false = () => {
        // console.log("false");
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "warning";
        alert.message = "Hapus surat dibatalkan";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
      };
      modal.if_true = () => {
        console.log("hapus");
        axios
          .post(
            this.$store.state.common.baseUrl + "/api/surat/delete",
            { id: id },
            {
              headers: {
                Authorization: this.$store.state.common.headers,
              },
            }
          )
          .then(() => {
            // console.log("berhasil hapus surat");
            this.data = this.data.filter((dt) => dt._id != id);
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "success";
            alert.message = "Berhasil hapus surat ";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          })
          .catch(() => {
            // console.log("gagal hapus surat");
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "error";
            alert.message = "Maaf, Terjadi kesalahan";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          });
      };
    },
    async ambil_disposisi() {
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/disposisi/show_irban",
          { id: this.$store.state.currentLogin._id },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.data = res.data.data;
          console.log(this.data);
          this.is_loading.page = false;
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
  background-color: white;
  width: 100%;
  max-width: 1000px;
  height: 90%;
  overflow: scroll;
}
/* end main body background  */
.ams-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
}
.ams-header h1 {
  margin: 0;
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
.ams-body {
  width: 100%;
  max-height: 90%;
}
.ams-body table {
  width: 100%;
  border-collapse: collapse;
}
.ams-body table td,
.ams-body table th {
  text-align: start;
  padding: 10px 8px;
  font-size: 0.9rem;
}
.ams-body table td i {
  padding: 0.5rem;
  border-radius: 50%;
}
.ams-body table td i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}
.ams-body table thead tr th {
  text-align: start;
}
.ams-body table thead,
.ams-body table tr:nth-child(even) {
  background-color: #f3f3f3;
}
.ams-body table .aksi {
  display: flex;
  justify-content: space-around;
}
/* end table  */
.button {
  display: flex;
  justify-content: flex-end;
}
.button button {
  border-radius: 50px;
  padding: 5px 10px;
  border: none;
  background-color: cornflowerblue;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
}
.button button i {
  font-size: 0.7rem;
}

/* start animasi untuk table  */

.tables-enter-from {
  transform: translateX(300px);
}
.tables-enter-to {
  transform: translateX(0);
}
.tables-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.tables-leave-from {
  transform: translateX(0);
}
.tables-leave-to {
  transform: translateX(300px);
}
.tables-leave-active {
  transition: all 0.5s cubic-bezier(0.47, 0, 0.745, 0.715);
}
/*  end animasi untuk table  */
.no-data {
  margin: 2rem 0;
  color: #8d8d8d;
}
</style>
