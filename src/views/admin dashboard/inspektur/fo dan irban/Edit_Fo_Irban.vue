<template>
  <div class="body">
    <div class="edit-akun">
      <div class="edit-akun-header">
        <h1>
          <i
            class="pi pi-arrow-left"
            @click="this.$router.back()"
            style="font-size: 1rem; margin-right: 0.5rem"
          ></i
          >Daftarkan akun Front Office atau Irban
        </h1>
        <p>Lengkapi data dibawah ini untuk mendafarkan akun baru</p>
        <div class="divider"></div>
      </div>
      <div class="edit-akun-isian">
        <div class="edit-akun-isian-field">
          <div class="edit-akun-isian-field-form">
            <label>NIK</label>
            <input type="number" v-model="account.nik" />
          </div>
          <div class="edit-akun-isian-field-form">
            <label>Nama Lengkap</label>
            <input type="text" v-model="account.full_name" />
          </div>
          <div class="edit-akun-isian-field-form">
            <label>Tempat tinggal saat ini</label>
            <input type="text" v-model="account.address" />
          </div>
          <div class="edit-akun-isian-field-form">
            <label>Tanggal lahir</label>
            <input
              type="date"
              v-model="account.birth_date"
              required
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <div class="edit-akun-isian-field-form">
            <label>Jenis kelamin</label>
            <select v-model="account.gender">
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div class="edit-akun-isian-field-form">
            <label>No. Telp aktif</label>
            <input type="text" v-model="account.phone" />
          </div>
          <div class="edit-akun-isian-field-form">
            <label>Pekerjaan</label>
            <input type="text" v-model="account.occupation.name" />
          </div>
          <div class="edit-akun-isian-field-form">
            <label>Email</label>
            <input type="text" v-model="account.email" />
          </div>
          <div class="edit-akun-isian-field-form">
            <label>Password</label>
            <input type="password" v-model="account.password" />
          </div>
          <button @click="update">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Edit akun`;
    let id = useRoute().params.id;
    this.isEdit = useRoute().params.isEdit;
    axios
      .post(
        this.$store.state.common.baseUrl + "/api/user/show",
        { id: id },
        {
          headers: {
            Authorization: this.$store.state.common.headers,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        this.account = res.data.data;
        // console.log(this.account);
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
  computed: {},
  data() {
    return {
      account: {
        nik: "",
        full_name: "",
        email: "",
        password: "",
        gender: "",
        address: "",
        occupation: {
          name: "Front Office",
        },
        birth_date: "",
        phone: "",
        level: "",
      },
      confirmPass: "12345678",
      showModal: false,
      isEdit: false,
    };
  },
  methods: {
    async update() {
      this.onEdit = false;
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/update",
          this.account,
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          // console.log(res);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil edit data";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        })
        .catch(() => {
          // console.log(err);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Gagal edit data";
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

.edit-akun {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  justify-content: flex-start;
  max-width: 1000px;
  overflow: scroll;
}

/* end main body background  */
/* start edit-akun akun header  */
.edit-akun-header {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 3rem;
  justify-content: space-between;
}
.edit-akun-header h1 {
  margin: 0;
}
.edit-akun-header h1 i {
  background-color: #5583ac00;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.edit-akun-header h1 i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}
.edit-akun-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}
.edit-akun-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
}

/* end edit akun header  */
/* start edit akun isian  */
.edit-akun-isian {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  /* border: rgba(128, 128, 128, 0.39) 1px solid; */
}

.edit-akun-isian-field-form {
  flex-direction: column;
  display: flex;
  margin: 0.2rem 0;
}

.edit-akun-isian-field {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 3rem;
}

.edit-akun-isian-field-form label {
  align-self: flex-start;
  color: #63707c;
  margin: 0.2rem;
  font-size: 0.8rem;
}

.edit-akun-isian-field-form input {
  width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 240px;
}
.edit-akun-isian-field-form .photo {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #2a6294;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
}

.edit-akun-isian-field-form select {
  max-width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 240px;
}
.edit-akun-isian-field-form span {
  color: red;
  font-size: 0.8rem;
  position: absolute;
  margin-top: 4.2rem;
}

.edit-akun-isian-field button {
  margin-top: 20px;
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  background-color: #5584ac;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}

/* end edit akun isian  */
</style>
