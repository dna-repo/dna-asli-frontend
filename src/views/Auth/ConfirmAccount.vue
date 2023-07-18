<template>
  <div class="body">
    <header>
      <h1>Berhasil</h1>
    </header>
    <div class="box">
      <p style="color: green">email anda telah terverifikasi.</p>
      <button
        style="background-color: lightblue"
        @click="this.$router.push({ name: 'login' })"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {},
  data() {
    return {};
  },
  computed: {
    check() {
      let isEqual = false;
      if (
        this.new_password != this.confirm_password &&
        this.confirm_password != ""
      ) {
        isEqual = true;
      }
      if (this.new_password.length < 6 && this.confirm_password != "") {
        isEqual = true;
      }
      return isEqual;
    },
    err_msg() {
      let pesan = "Password tidak sesuai";
      if (this.new_password.length < 6 && this.confirm_password != "") {
        pesan = "Password minimal 6 digit";
      }
      return pesan;
    },
  },
  methods: {
    async kirim() {
      // console.log("kirim");
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/new_password",
          {
            id: this.id,
            password: this.new_password,
          },
          {
            headers: {
              Authorization: this.$store.state.common.public,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          // console.log(res.data);
          this.sended.status = true;
          this.sended.val = "success";
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil ubah sandi";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          this.$router.push("/login");
        })
        .catch(() => {
          // console.log(err.data);
          this.sended.status = true;
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, Terjadi kesalahan";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          this.$router.push("/login");
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
  width: 35%;
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
input {
  margin: 0.2rem;
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
  margin: 0.5rem;
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
span {
  position: absolute;
  color: red;
  margin-left: -9.7rem;
  font-size: 0.7rem;
}
.success {
  color: green;
}
</style>
