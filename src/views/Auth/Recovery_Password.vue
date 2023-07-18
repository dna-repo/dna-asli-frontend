<template>
  <div class="body">
    <header>
      <h1>Lupa Sandi</h1>
    </header>
    <div class="box">
      <div class="before">
        <p v-if="respon.success == false">Terima kasih.</p>
        <p v-if="respon.success == false">
          Masukkan email atau NIK anda untuk mencari akun anda
        </p>
        <input
          v-if="respon.success == false"
          type="text"
          placeholder="Email atau NIK"
          v-model="email"
        />
        <p
          v-if="sended == true"
          :class="[respon.success == true ? 'success' : 'error']"
        >
          {{ pesan }}
        </p>
        <div v-if="respon.success == false" class="btn">
          <button class="batal" @click="this.$router.back()">Batal</button>
          <button class="kirim" @click="kirim">Kirim</button>
        </div>
      </div>
      <div class="after"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {},
  data() {
    return {
      email: "",
      sended: false,
      pesan: "pesan",
      respon: {
        success: false,
      },
    };
  },
  methods: {
    async kirim() {
      // console.log("kirim");
      await axios
        .post(this.$store.state.common.baseUrl + "/api/user/reset_password", {
          email: this.email,
        })
        .then(() => {
          // console.log(res.data);
          this.respon.success = true;
          this.sended = true;
          this.pesan =
            "Berhasil kirim, silahkan cek email anda untuk melakukan reset password";
        })
        .catch(() => {
          this.respon.success = false;
          // console.log(err.data);
          this.sended = true;
          this.pesan = "Gagal kirim, pastikan email anda sesuai";
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
  width: 340px;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}

.box p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1rem;
  text-align: start;
}
input {
  background-color: rgba(168, 180, 219, 0.137);
  border-radius: 4px;
  padding: 5px 10px;
  border: solid 1px rgb(199, 199, 199);
  width: 100%;
  font-size: 0.9rem;
}
.btn {
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
}
button {
  margin: 1rem 0.5rem;
  margin-bottom: -0.2rem;
  padding: 5px 10px;
  border-radius: 4px;
  border: solid 1px rgb(243, 243, 243);
  color: rgb(23, 30, 117);
}
.kirim {
  background-color: rgb(115, 115, 224);
  color: white;
}
.success {
  color: rgb(0, 182, 0);
  font-size: 0.5rem;
}
.error {
  font-size: 0.5rem;
  color: red;
}
</style>
