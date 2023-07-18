<template>
  <div v-if="loading == false">
    <header>
      <h1>{{ this.$store.state.app_name }}</h1>
      <ul>
        <li>
          <div class="account">
            <button @click="onAcc">
              <i class="pi pi-user" style="font-size: 1rem"></i>
              <p class="userName">{{ nameToShow }}</p>
              <i
                v-if="accHover == false"
                class="pi pi-angle-down"
                style="font-size: 1rem"
              ></i>
              <i
                v-if="accHover == true"
                class="pi pi-angle-up"
                style="font-size: 1rem"
              ></i>
            </button>
            <ul :class="[accHover == true ? 'ul2' : '']">
              <li style="padding: 5px 10px">
                <button @click="profile">
                  <i class="pi pi-user" style="margin-right: 0.5rem"></i>
                  Profile
                </button>
              </li>
              <li style="padding: 5px 10px">
                <button @click="logout">
                  <i class="pi pi-sign-out" style="margin-right: 0.5rem"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.is_login = this.$store.state.is_login;
    if (this.is_login == false) {
      this.$router.push("/login");
      // console.log("ds-> login");
    } else {
      this.currentLogin = this.$store.state.currentLogin;
      this.loading = false;
    }
  },
  data() {
    return {
      accHover: false,
      currentLogin: {},
      loading: true,
      is_login: false,
    };
  },
  methods: {
    onAcc() {
      if (this.accHover == false) {
        this.accHover = true;
      } else if (this.accHover == true) {
        this.accHover = false;
      }
    },
    profile() {
      this.$router.push("/dashboard/edit_account_db");
      this.accHover = false;
    },
    async logout() {
      axios
        .post(this.$store.state.common.baseUrl + "/api/auth/logout")
        .then(() => {
          // console.log(res);
          localStorage.removeItem("activeUser");
          localStorage.removeItem("token");
          this.$store.dispatch("logout", null);
          this.$router.push("/login");
        })
        .catch(() => {
          // console.log({ err });
          // console.log("gagal logout");
        });
    },
  },
  computed: {
    nameToShow() {
      let name = "nama";
      let nm = this.currentLogin.full_name.slice(0, 5);
      name = nm + " ...";
      return name;
    },
  },
};
</script>

<style scoped>
/* account  */
.account {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.account button {
  cursor: pointer;
  display: flex;
  background-color: transparent;
  border: solid 1px transparent;
  color: rgb(24, 24, 73);
}

.account p {
  color: rgb(24, 24, 73);
  margin: 0 0.5rem;
}

/* account hover  */
.account ul {
  display: none;
}

.account .ul2 {
  display: flex;
  flex-direction: column;
  background-color: rgb(57, 199, 255);
  position: absolute;
  width: 120px;
  z-index: 10;
  margin-top: 1.5rem;
  border-radius: 4px;
}

.account li {
  margin: 0;
  padding: 0;
}

.account li button {
  cursor: pointer;
  color: white;
  margin: 0;
  padding: 0;
  text-align: start;
}
.account li button:hover {
  cursor: pointer;
  color: white;
  margin: 0;
  padding: 0;
  text-align: start;
  font-weight: bold;
}

/* end account hover  */
/* end account  */
header {
  box-shadow: 0 0 5px 0.5px rgba(0, 0, 0, 0.2);
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  max-height: 40px;
}

h1,
h3 {
  margin: 0;
  font-size: 1.3rem;
}

h3 {
  color: white;
  margin: 0.2rem;
}

p {
  margin: 0;
  color: white;
  font-size: 0.8rem;
}

header ul {
  display: flex;
  align-items: center;
  margin: 0.5rem;
  padding: 0;
}

li {
  list-style: none;
  margin: 5px 10px;
}
</style>
