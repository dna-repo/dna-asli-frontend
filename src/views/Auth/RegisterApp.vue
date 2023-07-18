<template>
  <div class="body">
    <div class="modal" v-if="showModal == true">
      <div class="login">
        <p>{{ pesan }}</p>
        <button @click="closeModal">Oke</button>
      </div>
    </div>
    <div class="berhasil" v-if="berhasil == true">
      <p>Pendaftaran berhasil, mengarahkan ke halaman login</p>
    </div>
    <div class="full">
      <div class="awal">
        <h1>DAFTAR</h1>
        <p>Silahkan masukkan data anda untuk mendaftar</p>
      </div>
      <hr />
      <div class="form">
        <div class="input">
          <label for="">NIK</label>
          <input
            @input="input_nik($event)"
            type="number"
            v-model="account.nik"
          />
          <span
            v-if="errMsg.duplicateNik.status == true"
            style="color: red; padding: 0.2rem"
            ><i class="pi pi-times"></i> {{ errMsg.duplicateNik.msg }}</span
          >
          <span v-if="nik.must_16 == true" style="color: grey; padding: 0.2rem"
            ><i class="pi pi-info-circle"></i> Nik harus 16 digit</span
          >
          <span v-if="nik.loading == true" style="color: grey; padding: 0.2rem"
            ><i class="pi pi-spin pi-spinner"></i> Mencari Nik</span
          >
          <span v-if="nik.valid == true" style="color: green; padding: 0.2rem"
            ><i class="pi pi-check"></i> Nik ditemukan</span
          >
          <span v-if="nik.invalid == true" style="color: red; padding: 0.2rem"
            ><i class="pi pi-times"></i> Nik tidak ditemukan</span
          >
          <span v-if="nik.error == true" style="color: red; padding: 0.2rem"
            ><i class="pi pi-times"></i> Terjadi kesalahan, coba lagi
            nanti</span
          >
        </div>

        <div class="input">
          <label for="">Nama Lengkap</label>
          <input type="text" v-model="account.full_name" />
        </div>
        <div class="input">
          <label for="">Jenis Kelamin</label>
          <select name="" id="" v-model="account.gender">
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>
        <div class="input">
          <label for="">Tanggal Lahir</label>
          <input
            type="date"
            v-model="account.birth_date"
            required
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </div>
        <div class="input">
          <label for="">Tempat tinggal saat ini</label>
          <input type="text" v-model="account.address" />
        </div>
        <div class="input">
          <label for="">Pekerjaan</label>
          <select name="" id="" v-model="account.occupation.name">
            <option value="pns">Pegawai Negeri Sipil</option>
            <option value="aph">Aparat Penegak Hukum</option>
            <option value="lsm">Lembaga Swadaya Masyarakat</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div class="input" v-if="account.occupation.name != ''">
          <label for="">{{ occ_id }}</label>
          <input type="text" v-model="account.occupation.id" />
        </div>
        <div class="input">
          <label for="">Email</label>
          <input
            style="text-transform: lowercase"
            type="email"
            v-model="account.email"
          />
          <span
            v-if="errMsg.duplicateEmail.status == true"
            style="color: red; padding: 0.2rem"
            ><i class="pi pi-times"></i> {{ errMsg.duplicateEmail.msg }}</span
          >
        </div>
        <div class="input">
          <label for="">No. Telp Aktif</label>
          <input type="number" v-model="account.phone" />
          <span
            v-if="errMsg.duplicatePhone.status == true"
            style="color: red; padding: 0.2rem"
            ><i class="pi pi-times"></i> {{ errMsg.duplicatePhone.msg }}</span
          >
        </div>
        <!-- awalan  -->
        <div class="input" v-if="account.occupation.name == ''">
          <label for="">Password</label>
          <input
            style="padding-right: 2.5rem"
            v-if="show_password.a == true"
            type="text"
            v-model="account.password"
          />
          <input
            v-if="show_password.a == false"
            type="password"
            v-model="account.password"
            style="font-size: 0.8rem; padding-right: 2.5rem"
          />
          <i
            @click="show_password.a = true"
            class="pi pi-eye"
            v-if="show_password.a == false"
          ></i>
          <i
            @click="show_password.a = false"
            class="pi pi-eye-slash"
            v-if="show_password.a == true"
          ></i>
        </div>
        <!-- awalan  -->
        <div class="input" v-if="account.occupation.name != ''">
          <label for="">Password</label>
          <input
            v-if="show_password.b == true"
            type="text"
            v-model="account.password"
            style="padding-right: 2.5rem"
          />
          <input
            v-if="show_password.b == false"
            type="password"
            v-model="account.password"
            style="font-size: 0.8rem; padding-right: 2.5rem"
          />
          <i
            @click="show_password.b = true"
            class="pi pi-eye"
            v-if="show_password.b == false"
          ></i>
          <i
            @click="show_password.b = false"
            class="pi pi-eye-slash"
            v-if="show_password.b == true"
          ></i>
        </div>
        <div class="input" v-if="account.occupation.name != ''">
          <label for="">Konfirmasi Password</label>
          <input
            v-if="show_password.c == true"
            type="text"
            v-model="confirmPass"
            style="padding-right: 2.5rem"
          />
          <input
            v-if="show_password.c == false"
            type="password"
            v-model="confirmPass"
            style="font-size: 0.8rem; padding-right: 2.5rem"
          />
          <i
            @click="show_password.c = true"
            class="pi pi-eye"
            v-if="show_password.c == false"
          ></i>
          <i
            @click="show_password.c = false"
            class="pi pi-eye-slash"
            v-if="show_password.c == true"
          ></i>
          <span v-if="isCorrect == true">Password tidak sesuai!</span>
        </div>
        <div class="input" v-if="account.occupation.name == ''">
          <label for="">Konfirmasi Password</label>
          <input
            v-if="show_password.d == true"
            type="text"
            v-model="confirmPass"
            style="padding-right: 2.5rem"
          />
          <input
            v-if="show_password.d == false"
            type="password"
            v-model="confirmPass"
            style="font-size: 0.8rem; padding-right: 2.5rem"
          />
          <i
            @click="show_password.d = true"
            class="pi pi-eye"
            v-if="show_password.d == false"
          ></i>
          <i
            @click="show_password.d = false"
            class="pi pi-eye-slash"
            v-if="show_password.d == true"
          ></i>
          <span v-if="isCorrect == true">Password tidak sesuai!</span>
        </div>
      </div>
      <button @click="daftar">DAFTAR</button>
      <div class="daftar">
        <p>Anda sudah memiliki akun?</p>
        <router-link to="login">LOGIN</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Daftar`;
    localStorage.clear();
  },
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
          name: "",
          id: "",
        },
        birth_date: "",
        phone: "",
        level: "user",
        status: "pending",
      },
      confirmPass: "",
      showModal: false,
      pesan: "ada kesalahan",
      berhasil: false,
      show_password: {
        a: false,
        b: false,
        c: false,
        d: false,
      },
      nik: {
        must_16: false,
        valid: false,
        invalid: false,
        loading: false,
        error: false,
      },
      errMsg: {
        duplicateNik: { status: false, msg: "Nik sudah terdaftar" },
        duplicateEmail: { status: false, msg: "Email sudah terdaftar" },
        duplicatePhone: { status: false, msg: "Nomor Telepon sudah terdaftar" },
      },
    };
  },
  computed: {
    occ_id() {
      let occ = "Detail Pekerjaan";
      if (this.account.occupation.name == "aph") {
        occ = "ARP";
      } else if (this.account.occupation.name == "lsm") {
        occ = "ID Pers";
      } else if (this.account.occupation.name == "pns") {
        occ = "NIP";
      }
      return occ;
    },
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
    async input_nik(e) {
      let nik = e.target.value;
      // console.log(nik);
      // console.log(nik.length);
      if (nik.length > 0 && nik.length < 16) {
        this.nik.must_16 = true;
        this.nik.loading = false;
        this.nik.valid = false;
        this.nik.invalid = false;
        this.nik.error = false;
      } else if (nik.length === 16) {
        console.log("nik 16 digit");
        this.nik.must_16 = false;
        this.nik.loading = true;
        this.nik.error = false;
        this.nik.valid = false;
        this.nik.invalid = false;
        await axios
          .post(
            this.$store.state.common.baseUrl + "/api/ktp/show",
            {
              nik: nik,
            },
            {
              headers: {
                Authorization: this.$store.state.common.public,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.data.length == 0) {
              this.nik.must_16 = false;
              this.nik.loading = false;
              this.nik.error = false;
              this.nik.valid = false;
              this.nik.invalid = true;
              console.log("nik tidak ditemukan");
            } else {
              this.nik.must_16 = false;
              this.nik.loading = false;
              this.nik.error = false;
              this.nik.valid = true;
              this.nik.invalid = false;
              console.log("nik ditemukan");
            }
          })
          .catch(() => {
            this.nik.must_16 = false;
            this.nik.loading = false;
            this.nik.error = true;
            this.nik.valid = false;
            this.nik.invalid = false;
            let alert = this.$store.state.alert;
            alert.show = true;
            alert.type = "error";
            alert.message = "Maaf, akun tidak sesuai";
            window.setTimeout(() => {
              alert.show = false;
            }, 3000);
          });
      } else {
        this.nik.must_16 = false;
        this.nik.loading = false;
        this.nik.valid = false;
        this.nik.invalid = false;
        this.nik.error = false;
      }
    },
    async daftar() {
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
      if (this.nik.valid == false) {
        this.pesan = "NIK tidak ditemukan";
        return;
      }
      if (this.account.nik.length != 16) {
        this.pesan = "NIK harus 16 digit";
        this.showModal = true;
        return;
      } else if (this.account.full_name.length == 0) {
        this.pesan = "Nama tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.address.length == 0) {
        this.pesan = "Alamat tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.birth_date.length == 0) {
        this.pesan = "Tanggal lahir tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.gender.length == 0) {
        this.pesan = "Jenis kelamin tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.phone.length == 0) {
        this.pesan = "Nomor HP tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.occupation.name.length == 0) {
        this.pesan = "Pekerjaan tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.occupation.id.length == 0) {
        this.pesan = "Detail pekerjaan tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.email.length == 0) {
        this.pesan = "Email tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.password.length == 0) {
        this.pesan = "Password tidak boleh kosong";
        this.showModal = true;
        return;
      } else if (this.account.password.length < 6) {
        this.pesan = "Password harus minimal 6 digit";
        this.showModal = true;
        return;
      } else {
        this.nik.must_16 = false;
        this.nik.valid = false;
        this.nik.invalid = false;
        this.nik.loading = false;
        this.nik.error = false;
        await axios
          .post(
            this.$store.state.common.baseUrl + "/api/user/store",
            this.account,
            {
              headers: {
                Authorization: this.$store.state.common.public,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            // console.log(res.data);
            this.berhasil = true;
            setTimeout(() => {
              this.$router.push("/verifikasi_akun");
            }, 3000);
          })
          .catch((err) => {
            let errCode = err.response.data.data.code;
            console.log(errCode);
            if (err.response.data.data.keyPattern.nik != undefined) {
              this.errMsg.duplicateNik.status = true;
            }
            if (err.response.data.data.keyPattern.email != undefined) {
              this.errMsg.duplicateEmail.status = true;
            }
            if (err.response.data.data.keyPattern.phone != undefined) {
              this.errMsg.duplicatePhone.status = true;
            }
            console.log(err.response.data.data.keyPattern);
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
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
div {
  display: grid;
  place-items: center;
}
body {
  padding: 0;
}
.body {
  background-color: rgb(50, 58, 66);
  min-height: 100vh;
  height: 100%;
  width: 100%;
  overflow: scroll;
}

h1,
p {
  margin: 0;
}
.full {
  background-color: white;
  border-radius: 4px;
  padding: 2rem;
  max-width: 600px;
}
hr {
  width: 99%;
  background-color: #5584ac;
}
label {
  align-self: flex-start;
  color: #63707c;
  margin: 0.2rem;
  font-size: 0.8rem;
}
.input {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0.5rem 0;
  min-width: 48%;
  /* background-color: #2887e0; */
}
input {
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 100%;
}
select {
  font-size: 1rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 100%;
  max-width: 260px;
}

.awal {
  padding: 1rem;
}
p {
  color: rgba(0, 0, 0, 0.644);
}
.form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}
button {
  margin-top: 20px;
  padding: 0.5rem 1rem;
  min-width: 100%;
  border: none;
  background-color: #5584ac;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}
a {
  color: #2887e0;
  font-size: 0.9rem;
  text-decoration: none;
  margin: 0.5rem;
  justify-self: center;
  font-weight: bold;
  margin: 0;
}
.form1 {
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.form2 {
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.daftar p {
  font-size: 0.9rem;
  margin: 0.5rem 0;
}
.daftar {
  padding: 1rem;
}
/* start - modal  */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #00000093;
  position: relative;
  z-index: 20;
  position: absolute;
  overflow-y: hidden;
}
.login {
  background-color: white;
  padding: 1rem;
  width: 500px;
  height: 100px;
  z-index: 20;
  top: 50vh;
  border: solid rgb(204, 204, 204) 1px;
  border-radius: 4px;
}
.login button {
  /* justify-self: flex-end; */
  min-width: 30px;
  margin-top: 1rem;
}
/* end - modal  */
span {
  position: absolute;
  margin-top: 65px;
  font-size: 0.6rem;
  color: red;
}

/* start berhasil  */
.berhasil {
  background-color: rgb(136, 255, 165);
  padding: 1rem;
  position: absolute;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-weight: bold;
}
/* end berhasil  */

/* start responsive  */
@media screen and (max-width: 600px) {
  .body {
    max-width: 600px;
    height: 100%;
  }
  .full {
    margin: 2rem 0;
    border-radius: 4px;
    padding: 2rem;
    width: 90%;
  }
  /* .form {
    display: flex;
  } */
  .input {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
    width: 100%;
    /* min-width: 48%; */
    /* background-color: #2887e0; */
  }
  select {
    max-width: 100%;
  }
  input {
    font-size: 1rem;
    padding: 0.7rem 1rem;
    background-color: rgb(233, 239, 248);
    border: solid rgb(197, 197, 197) 0.5px;
    border-radius: 4px;
    width: 100%;
  }
  .pi-eye,
  .pi-eye-slash {
    position: absolute;
    right: 70px;
  }
}
/* end responsive  */
.pi-eye,
.pi-eye-slash {
  position: absolute;
  margin-top: 2rem;
  margin-left: 14rem;
}
</style>
