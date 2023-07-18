<template>
  <div class="body">
    <header>
      <h1>Verifikasi akun</h1>
    </header>
    <div class="box" v-if="verifikasi.default == true">
      <p>Terima kasih.</p>
      <p>
        Email anda berhasil di verifikasi, silahkan lanjutkan dengan melakukan
        login.
      </p>
      <p style="color: blue; text-decoration: underline" @click="to_login">
        login
      </p>
    </div>
    <div class="box" v-if="verifikasi.register == true">
      <p>Terima kasih.</p>
      <p>
        Kami telah menerima data anda, selanjutnya silahkan cek email anda untuk
        melakukan verifikasi.
      </p>
      <p class="tip" @click="show = !show">tidak menerima email?</p>
      <ul v-if="show == true">
        <li>Pastikan bahwa email anda telah sesuai</li>
        <li>Pastikan koneksi internet anda tersambung</li>
        <li>Cek email di folder spam</li>
      </ul>
    </div>
    <div class="box-verifikasi-ulang" v-if="verifikasi.ulang == true">
      <p>Maaf.</p>
      <p>
        Anda belum melakukan verikasi email, anda harus melakukan verifikasi
        email untuk melanjutkan
      </p>
      <button @click="send_verfikasi">Verifikasi email</button>
      <button v-if="berhasil == true">{{ pesan }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { useRoute } from "vue-router";
export default {
  created() {
    // console.log(useRoute().params);
    if (this.$store.state.verifikasi.ulang == true) {
      this.verifikasi.register = false;
      this.verifikasi.default = false;
      this.verifikasi.ulang = true;
    } else {
      let new_id = localStorage.getItem("new_account_id");
      if (new_id == null) {
        this.$router.push("/login");
      } else {
        this.check_account(new_id);
      }
    }
  },
  data() {
    return {
      show: false,
      verifikasi: {},
      account_to_check: {},
      berhasil: false,
      pesan: "",
      token: "",
    };
  },
  methods: {
    to_login() {
      this.$router.push(`${this.$store.state.common.baseUrl}/login`);
    },
    async check_account(id) {
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/show",
          { user_id: id },
          { headers: { Authorization: 1121321313213456 } }
        )
        .then((res) => {
          this.account_to_check = res.data;
          // console.log(this.account_to_check);
          if (this.account_to_check.status == "pending") {
            this.verifikasi.register = true;
            this.verifikasi.default = false;
            this.verifikasi.ulang = false;
          } else if (this.account_to_check.status == "verified") {
            this.verifikasi.register = false;
            this.verifikasi.default = true;
            this.verifikasi.ulang = false;
          }
        })
        .catch(() => {
          this.$router.push("/login");
        });
    },
    async send_verfikasi() {
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/send_mail",
          {
            id: this.$store.state.currentLogin._id,
            full_name: this.$store.state.currentLogin.full_name,
            email: this.$store.state.currentLogin.email,
          },
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          this.pesan = "Berhasil kirim email";
          this.berhasil = true;
        })
        .catch(() => {
          this.pesan = "Gagal kirim email";
          this.berhasil = true; // untuk munculkan pesan
        });
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

header {
  justify-self: flex-start;
  background-color: rgba(128, 144, 196, 0.534);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 25%;
}

h1 {
  margin: 2rem;
  color: rgb(34, 52, 102);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(255, 255, 255);
  margin-top: -1rem;
  width: 40%;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}

.box p {
  margin: 0.5rem;
  font-size: 0.9rem;
  line-height: 1rem;
  text-align: start;
}

.box .tip {
  text-decoration: underline;
  color: rgba(0, 0, 255, 0.705);
  cursor: pointer;
}

.box ul {
  margin: 0;
  padding: 1rem;
}

.box li {
  list-style: inside;
  font-size: 0.8rem;
  text-align: start;
}

.box-verifikasi-ulang {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(255, 255, 255);
  margin-top: -1rem;
  width: 40%;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}

.box-verifikasi-ulang p {
  margin: 0.5rem;
  font-size: 0.9rem;
  line-height: 1rem;
  text-align: start;
}

.box-verifikasi-ulang button {
  margin: 0.5rem;
  background-color: rgb(138, 138, 255);
  border: solid 1px rgb(125, 125, 255);
  width: 95%;
  align-self: center;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.5s;
}

.box-verifikasi-ulang button:hover {
  margin: 0.5rem;
  background-color: rgb(115, 115, 255);
  border: solid 1px rgb(125, 125, 255);
  width: 95%;
  align-self: center;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
