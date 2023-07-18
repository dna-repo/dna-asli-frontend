<template>
  <div class="body">
    <div class="full">
      <div class="modal" v-if="showModal == true">
        <div class="login">
          <p>Kesalahan, {{ errorMsg }}</p>
          <button @click="closeModal">Oke</button>
        </div>
      </div>
      <div class="awal">
        <h1>Masuk</h1>
        <p>Silahkan Masuk untuk melanjutkan</p>
      </div>
      <hr />
      <div class="form">
        <div class="input">
          <label for="">Email</label>
          <input
            type="email"
            style="text-transform: lowercase"
            v-model="email"
          />
        </div>
        <div class="input">
          <div class="lupa">
            <label for="">Password</label>
            <a @click="this.$router.push('/recovery_password')"
              >Lupa password?</a
            >
          </div>
          <input
            style="padding-right: 2rem"
            v-if="show_password == true"
            type="text"
            v-model="password"
            @keyup.enter="login"
          />
          <input
            style="padding-right: 2rem"
            v-if="show_password == false"
            type="password"
            v-model="password"
            @keyup.enter="login"
          />
          <i
            @click="show_password = true"
            class="pi pi-eye"
            v-if="show_password == false"
          ></i>
          <i
            @click="show_password = false"
            class="pi pi-eye-slash"
            v-if="show_password == true"
          ></i>
        </div>
        <!-- <span>Error! {{ errorMsg }}</span> -->
        <button v-if="loading.login == false" @click="login">Masuk</button>
        <button
          v-if="loading.login == true"
          @click="login"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            color: aliceblue;
          "
        >
          Loading
          <i
            class="pi pi-spin pi-spinner"
            style="font-size: 1rem; margin-left: 0.5rem"
          ></i>
        </button>
        <div class="daftar">
          <p>Anda belum memiliki akun?</p>
          <router-link to="register">DAFTAR SEKARANG</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Login`;
    if (this.$store.state.is_login == true) {
      if (this.$store.state.currentLogin.level == "user") {
        this.$router.push("/lapor");
      } else {
        this.$router.push("/dashboard");
      }
    }
  },
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "Plain",
      showModal: false,
      lupa_sandi: true,
      show_password: false,
      loading: {
        login: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    async login() {
      this.loading.login = true;
      await axios
        .post(this.$store.state.common.baseUrl + "/api/auth/login", {
          email: this.email.toLocaleLowerCase(),
          password: this.password,
        })
        .then((res) => {
          this.loading.login = false;
          // console.log("berhasil 1");
          // console.log(res);
          this.$store.state.is_login = true;
          this.$store.dispatch("login", res.data.data);
          // console.log(res.data.data);
          if (res.data.data.user.level == "user") {
            this.$router.push("/lapor");
          } else if (res.data.data.user.level != "user") {
            this.$router.push("/dashboard");
          }
        })
        .catch(() => {
          this.loading.login = false;
          // console.log("login gagal");
          // console.log(err);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Maaf, akun tidak sesuai";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
/* span error  */
span {
  position: relative;
  font-size: 0.7rem;
  color: red;
  padding: 2px 5px;
  background-color: rgb(255, 158, 158);
}

/* end span error  */
div {
  display: grid;
  place-items: center;
}

body {
  margin: 0;
  padding: 0;
  background-color: rgb(50, 58, 66);
  margin: 0;
}

.body {
  background-color: rgb(50, 58, 66);
  margin: 0;
  height: 100vh;
  width: 100vw;
}

h1,
p {
  margin: 0;
}

.full {
  margin-top: 100px;
  background-color: white;
  min-width: 400px;
  max-width: 50%;
  border-radius: 4px;
  border: solid 1px grey;
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
  /* justify-content: stretch; */
  margin: 0.5rem 0;
}

input {
  width: 100%;
  font-size: 1.2rem;
  padding: 0.7rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  width: 250px;
}

.awal {
  padding: 1.5rem;
}

p {
  color: rgba(0, 0, 0, 0.644);
}

.form {
  width: 300px;
  padding: 2rem 0;
}

button {
  margin-top: 10px;
  padding: 0.5rem 1rem;
  min-width: 250px;
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
  cursor: pointer;
}

.daftar p {
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.daftar {
  padding: 1rem;
}

.lupa {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.lupa a {
  font-weight: normal;
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
  width: 350px;
  height: 150px;
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

/* start responsive  */
@media screen and (max-width: 600px) {
  .full {
    background-color: white;
    min-width: auto;
    max-width: 95%;
    border-radius: 4px;
    border: solid 1px grey;
  }
}
/* end responsive  */
.pi-eye,
.pi-eye-slash {
  position: absolute;
  margin-top: 2.3rem;
  margin-left: 14rem;
}
</style>
