<template>
  <div class="body">
    <div class="tambah-akun">
      <div class="tambah-akun-header">
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
      <div class="tambah-akun-isian">
        <div class="tambah-akun-isian-tipe">
          <li
            @click="toFo"
            :class="[account.occupation.name == 'Front Office' ? 'li2' : '']"
          >
            Tambah akun Front Office
          </li>
          <li
            @click="toIrban"
            :class="[account.occupation.name == 'Irban' ? 'li2' : '']"
          >
            Tambah akun Irban
          </li>
        </div>
        <div class="tambah-akun-isian-field">
          <div class="tambah-akun-isian-field-form">
            <label>NIK</label>
            <input type="number" v-model="account.nik" />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Nama Lengkap</label>
            <input type="text" v-model="account.full_name" />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Tempat tinggal saat ini</label>
            <input type="text" v-model="account.address" />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Tanggal lahir</label>
            <input type="date" v-model="account.birth_date" />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Jenis kelamin</label>
            <select v-model="account.gender">
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>No. Telp aktif</label>
            <input type="text" v-model="account.phone" />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Pekerjaan</label>
            <input type="text" v-model="account.occupation.name" />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Email</label>
            <input
              style="text-transform: lowercase"
              type="text"
              v-model="account.email"
            />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Password</label>
            <input type="" v-model="account.password" />
          </div>
          <div class="tambah-akun-isian-field-form">
            <label>Konfirm Password</label>
            <input
              style="padding-right: 2.5rem"
              type="text"
              v-model="confirmPass"
            />
            <span v-if="isCorrect == true">Password tidak sesuai!</span>
          </div>
          <button @click="daftar">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    // this.account = this.exmAccount;
    document.title = `${this.$store.state.app_name} | Tambah Fo dan Irban`;
  },
  data() {
    return {
      exmAccount: {
        nik: "1231231231231231",
        full_name: "Akun FO",
        email: "fo1@mail.com",
        password: "12345678",
        gender: "perempuan",
        address: "gunung tua",
        occupation: {
          name: "Front Office",
        },
        birth_date: "2002-10-05",
        phone: "123456789123",
        level: "fo",
        status: "verfied",
      },
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
        level: "fo",
        status: "verfied",
      },
      confirmPass: "",
    };
  },
  computed: {
    isCorrect() {
      let crt = false;
      if (
        this.account.password != this.confirmPass &&
        this.account.password != "" &&
        this.confirmPass != ""
      ) {
        return (crt = true);
      }
      return crt;
    },
  },
  methods: {
    async daftar() {
      // console.log(this.account);
      let nik = this.account.nik.toString();
      let phn = this.account.phone.toString();
      this.account.nik = nik;
      this.account.phone = phn;
      if (
        this.account.occupation.name == "pns" ||
        this.account.occupation.name == "aph" ||
        this.account.occupation.name == "lsm"
      ) {
        let oc = this.account.occupation.name.toString();
        this.account.occupation.occupation_id = oc;
      }
      if (this.account.nik.length != 16) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "NIK harus 16 digit";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.full_name.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Nama tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.address.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Alamat tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.birth_date.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Tanggal lahir tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.gender.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Jenis kelamin lahir tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.phone.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Nomor telepon tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.occupation.name.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Pekerjaan tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.email.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Email tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.password.length == 0) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Password tidak boleh kosong";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else if (this.account.password.length < 6) {
        let alert = this.$store.state.alert;
        alert.show = true;
        alert.type = "error";
        alert.message = "Password minimal 6 digit";
        window.setTimeout(() => {
          alert.show = false;
        }, 3000);
        return;
      } else {
        // console.log("data  lengkap");
        await axios
          .post(
            this.$store.state.common.baseUrl + "/api/user/store",
            this.account,
            {
              headers: {
                Authorization: this.$store.state.common.headers,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "success";
            alert.message = res.data.message;
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
            this.$router.push({ name: "list_fo_irban" });
          })
          .catch((err) => {
            // console.log(err);
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "error";
            alert.message = err.response.data.message;
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          });
      }
    },
    toIrban() {
      this.account.occupation.name = "Irban";
      this.account.level = "irban";
    },
    toFo() {
      this.account.occupation.name = "Front Office";
      this.account.level = "fo";
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

.tambah-akun {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  min-height: 85%;
}

/* end main body background  */
/* start tambah akun header  */
.tambah-akun-header {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  /* background-color: rgba(196, 148, 148, 0.301); */
  width: 100%;
  align-items: flex-start;
}

.tambah-akun-header h1 {
  margin: 0;
}

.tambah-akun-header h1 i {
  background-color: #5583ac00;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.tambah-akun-header h1 i:hover {
  background-color: #89a5be85;
  padding: 0.5rem;
  border-radius: 50%;
}

.tambah-akun-header p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.tambah-akun-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
}

/* end tambah akun header  */
/* start tambah akun isian  */
.tambah-akun-isian {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  /* border: rgba(128, 128, 128, 0.39) 1px solid; */
}

.tambah-akun-isian-tipe {
  width: 100%;
  display: flex;
  /* background-color: aliceblue; */
  justify-content: space-around;
  padding: 2rem 1rem 0.5rem 1rem;
}

.tambah-akun-isian-tipe li {
  font-size: 1.1rem;
  list-style: none;
  background-color: rgb(228, 243, 255);
  cursor: pointer;
  margin: 0;
  padding: 0.5rem 1rem;
  width: 50%;
}

.tambah-akun-isian-tipe .li2 {
  background-color: rgb(149, 207, 255);
}

.tambah-akun-isian-field-form {
  flex-direction: column;
  display: flex;
  margin: 0.2rem 0;
}

.tambah-akun-isian-field {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1rem;
}

.tambah-akun-isian-field-form label {
  align-self: flex-start;
  color: #63707c;
  margin: 0.2rem;
  font-size: 0.8rem;
}

.tambah-akun-isian-field-form input {
  width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 240px;
}

.tambah-akun-isian-field-form .photo {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #2a6294;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
}

.tambah-akun-isian-field-form select {
  max-width: 100%;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 240px;
}

.tambah-akun-isian-field-form span {
  color: red;
  font-size: 0.8rem;
  position: absolute;
  margin-top: 4.2rem;
}

.tambah-akun-isian-field button {
  margin-top: 20px;
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  background-color: #5584ac;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}

/* end tambah akun isian  */
</style>
