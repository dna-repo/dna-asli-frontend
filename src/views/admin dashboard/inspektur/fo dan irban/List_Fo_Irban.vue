<template>
  <div class="body">
    <div class="list">
      <div class="list-header">
        <h3>Daftar Front Office dan Irban</h3>
        <button @click="this.$router.push('/dashboard/tambah_fo_irban')">
          <i
            class="pi pi-plus"
            style="font-size: 0.9rem; margin-right: 0.2rem"
          ></i>
          Tambah akun
        </button>
      </div>
      <div class="list-body">
        <div class="list-body-table">
          <table>
            <thead>
              <tr>
                <th width="5%">No</th>
                <th width="25%">Nama</th>
                <th width="20%">Role</th>
                <!-- <th width="20%">Email</th> -->
                <th width="25%">No. Telepon</th>
                <th width="25%" style="text-align: center">Aksi</th>
              </tr>
            </thead>
            <transition-group tag="tbody" name="tables" class="tbody">
              <tr v-for="(data, index) in accounts" :key="data._id">
                <td>{{ ++index }}</td>
                <td>{{ data.full_name }}</td>
                <td>{{ data.occupation.name }}</td>
                <!-- <td>{{ data.email }}</td> -->
                <td>{{ data.phone }}</td>
                <td class="aksi">
                  <i
                    @click="
                      this.$router.push({
                        name: 'edit_fo_irban',
                        params: { id: data._id, isEdit: true },
                      })
                    "
                    class="pi pi-pencil"
                    style="
                      font-size: 0.95rem;
                      margin-right: 0.2rem;
                      color: blue;
                    "
                  ></i>
                  <i
                    @click="confirmModal(data.fullName, data._id, index)"
                    class="pi pi-trash"
                    style="font-size: 0.95rem; margin-right: 0.2rem; color: red"
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
    document.title = `${this.$store.state.app_name} | Fo dan irban`;
    this.accounts = this.$store.state.accounts;
    if (this.accounts.length <= 1) {
      await axios
        .get(this.$store.state.common.baseUrl + "/api/user/fo_irban", {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.accounts = res.data.data;
          this.$store.state.accounts = this.accounts;
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
    }
  },
  data() {
    return {
      accounts: [],
      modal: {},
    };
  },
  methods: {
    confirmModal(name, id, index) {
      let modal = this.$store.state.modal;
      modal.show = true;
      modal.batal_button = true;
      modal.oke_button = true;
      modal.header = "Hapus";
      modal.body = "Apakah anda yakin mengapus akun " + name;
      modal.if_false = () => {
        // console.log("false");
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "warning";
        alert.message = "Hapus akun dibatalkan";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
      };
      modal.if_true = () => {
        // console.log("true");
        this.delete(id, index);
      };
    },
    async delete(id) {
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/delete",
          { user_id: id },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = res.data.message;
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          this.accounts = this.accounts.filter((data) => data._id != id);
        })
        .catch((err) => {
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = err.data.message;
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

.list {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  max-width: 1000px;
  overflow: scroll;
  height: 90%;
}

/* end main body background  */
/* start list akun header  */
.list-header {
  display: flex;
  /* background-color: rgba(196, 148, 148, 0.301); */
  width: 100%;
  align-items: flex-start;
  padding: 1rem 0;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  margin-bottom: 1rem;
}

.list-header button {
  display: flex;
  background-color: #00a2c783;
  border: solid 1px transparent;
  border-radius: 4px;
  align-self: flex-end;
  padding: 5px 10px;
  color: white;
  transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
.list-header button:hover {
  display: flex;
  background-color: #00a0c4;
  border: solid 1px transparent;
  border-radius: 4px;
  align-self: flex-end;
  padding: 5px 10px;
  color: white;
}

.list-header h3 {
  margin: 0;
}

/* end list akun header  */
/* start list body  */
.list-body {
  display: flex;
  width: 100%;
  height: 90%;
  align-items: flex-start;
  overflow-y: scroll;
}
.list-body-table {
  width: 100%;
  max-height: 90%;
}
.list-body table {
  width: 100%;
  border-collapse: collapse;
}
.list-body table td,
.list-body table th {
  text-align: left;
  padding: 10px 8px;
}
.list-body table td i {
  padding: 0.5rem;
  border-radius: 50%;
}
.list-body table td i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}
.list-body table thead tr th {
  text-align: start;
}
.list-body table thead,
.list-body table tr:nth-child(even) {
  background-color: #f3f3f3;
}
.list-body table .aksi {
  display: flex;
  justify-content: space-around;
}
/* end list body  */

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
</style>
