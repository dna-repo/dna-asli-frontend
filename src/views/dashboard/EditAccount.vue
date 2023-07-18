<template>
  <div class="body" v-if="is_login == true">
    <HeaderUI />
    <section class="box">
      <!-- poto profil  -->
      <div class="poto">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
          v-if="currentLogin.photo_profile == undefined && previewImage == ''"
        />
        <img
          :src="`${this.$store.state.common.baseUrl}/${image}`"
          alt=""
          v-if="previewImage == '' && currentLogin.photo_profile != undefined"
        />
        <img :src="previewImage" alt="" v-if="previewImage != ''" />
        <!-- sebelum pilih photo  -->
        <div class="inp">
          <label v-if="selectedImage == ''" for="pp"
            ><i
              class="pi pi-pencil success"
              style="font-size: 0.7rem; margin: 0"
            ></i>
          </label>
          <label
            v-if="selectedImage != ''"
            :class="[selectedImage == '' ? '' : 'check']"
          >
            <i
              @click="uploadPhoto"
              class="pi pi-check"
              style="font-size: 0.7rem; margin: 0; color: white"
            ></i>
          </label>

          <input
            @change="inpPhoto($event)"
            type="file"
            id="pp"
            style="display: none"
            accept="image/*"
          />
        </div>
        <!-- end sesudah pilih photo  -->
      </div>
      <!-- end poto profil  -->
      <!-- button edit -->
      <button @click="toEdit" v-if="onEdit == false">Edit Profile</button>
      <!-- end  button edit -->

      <section class="profile">
        <!-- menampilkan profil  -->
        <ul v-if="onEdit == false">
          <li>
            <p>NIK</p>
            <h2>{{ currentLogin.nik }}</h2>
          </li>
          <li>
            <p>Nama Lengkap</p>
            <h2>{{ currentLogin.full_name.toUpperCase() }}</h2>
          </li>
          <li>
            <p>Jenis Kelamin</p>
            <h2>{{ currentLogin.gender }}</h2>
          </li>
          <li>
            <p>Alamat</p>
            <h2>{{ currentLogin.address }}</h2>
          </li>
          <li>
            <p>Tanggal Lahir</p>
            <h2>{{ currentLogin.birth_date }}</h2>
          </li>
          <li>
            <p>Pekerjaan</p>
            <h2>{{ currentLogin.occupation.name }}</h2>
          </li>
          <li>
            <p>{{ occ_id }}</p>
            <h2>{{ currentLogin.occupation.id }}</h2>
          </li>
          <li>
            <p>Email</p>
            <h2>{{ currentLogin.email }}</h2>
          </li>
          <li>
            <p>Nomor Telepon</p>
            <h2>{{ currentLogin.phone }}</h2>
          </li>
        </ul>
        <!-- end menampilkan profil  -->
        <!-- jika mode edit  -->
        <ul v-if="onEdit == true">
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>NIK</p>
            <input type="number" disabled v-model="currentLogin.nik" />
          </li>
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>Nama Lengkap</p>
            <input type="text" v-model="currentLogin.full_name" />
          </li>
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>Jenis Kelamin</p>
            <select v-model="currentLogin.gender">
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </li>
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>Alamat</p>
            <input type="text" v-model="currentLogin.address" />
          </li>
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>Tanggal Lahir</p>
            <input type="date" v-model="currentLogin.birth_date" />
          </li>
          <!-- <li :class="[onEdit == true ? 'li2' : '']">
            <p>Pekerjaan</p>
            <select v-model="currentLogin.occupation.name">
              <option value="pns">Pegawai Negeri Sipil</option>
              <option value="aph">Aparat Penegak Hukum</option>
              <option value="lsm">Lembaga Swadaya Masyarakat</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </li> -->
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>{{ occ_id }}</p>
            <input type="text" v-model="currentLogin.occupation.id" />
          </li>
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>Email</p>
            <input type="text" v-model="currentLogin.email" />
          </li>
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>Nomor Telepon</p>
            <input type="text" v-model="currentLogin.phone" />
          </li>
          <li :class="[onEdit == true ? 'li2' : '']">
            <p>Password</p>
            <input type="password" v-model="currentLogin.password" />
          </li>
          <button @click="saveChanges" class="btn2">Simpan Perubahan</button>
        </ul>
        <!-- end jika mode edit  -->
      </section>
    </section>
  </div>
</template>

<script>
import HeaderUI from "./HeaderUI.vue";
import axios from "axios";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Profil`;
    // ambil data pengguna yang sedang login dari vuex
    this.is_login = this.$store.state.is_login;
    if (this.is_login == true) {
      this.currentLogin = this.$store.state.currentLogin;
      if (this.currentLogin.level != "user") {
        this.$router.push("/dashboard");
      }
    }
  },
  data() {
    return {
      currentLogin: {},
      onEdit: false,
      is_login: false,
      previewImage: "",
      selectedImage: "",
    };
  },
  methods: {
    // fungsi untuk update photo profil, hanya untuk photo  profil
    async uploadPhoto() {
      // menyiapkan form data
      let data = new FormData();
      data.append("nik", this.currentLogin.nik);
      data.append("photo_profil", this.selectedImage);
      // end menyiapkan form data
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/updateProfil",
          data,
          {
            headers: {
              Authorization: this.$store.state.common.headers,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          // console.log(res);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = "Berhasil update photo";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          this.selectedImage = "";
        })
        .catch(() => {
          // console.log(err);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Gagal edit photo";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    inpPhoto(e) {
      let date = new Date();
      let file = e.target.files[0];
      this.selectedImage = file;
      this.currentLogin.photo_profile = `${date.getDate()}${date.getMonth()}${date.getFullYear()}-${
        file.name
      }`;
      this.previewImage = URL.createObjectURL(file);
    },
    // fungsi untuk update data user isinya berasal dari objek pengguna yang nilainya menyesuaikan nilai masukan dari pengguna
    // nilai yang bisa diubah =  [ fullName, email, gender, address, birthDate, occupation.name, occupation.id, email, phone ]
    // nilai yang tidak bisa diubah =  [ nik ]
    async saveChanges() {
      this.onEdit = false;
      await axios
        .post(
          this.$store.state.common.baseUrl + "/api/user/update",
          this.currentLogin,
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
          alert.message = "Berhasil edit akun";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
          // update vuex dan local local storage
          this.$store.dispatch("editAccount", this.currentLogin);
          // end update vuex dan local local storage
        })
        .catch(() => {
          // console.log(err);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Gagal edit akun";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    toEdit() {
      if (this.onEdit == true) {
        this.onEdit = false;
      } else if (this.onEdit == false) {
        this.onEdit = true;
      }
    },
  },
  computed: {
    image() {
      let link = this.currentLogin.photo_profile;
      // console.log(link);
      let image = `photo/profil/${link}`;
      return image;
    },
    occ_id() {
      let occ = "Detail Pekerjaan";
      if (this.currentLogin.occupation.name == "pns") {
        occ = "NIP";
      } else if (this.currentLogin.occupation.name == "aph") {
        occ = "ARP";
      } else if (this.currentLogin.occupation.name == "lsm") {
        occ = "LSM";
      }
      return occ;
    },
  },
  components: { HeaderUI },
};
</script>

<style scoped>
.body {
  background-color: #f5f5f59a;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}
h1,
h2 {
  margin: 0;
}

ul {
  display: flex;
  margin: 0;
}
li {
  list-style: none;
  margin: 5px 0;
  padding: 10px 25px;
}
a {
  text-decoration: none;
}
li a:hover {
  color: rgb(0, 57, 133);
  text-decoration: none;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: solid rgba(0, 58, 133, 0.377) 3px;
}
/* start - box  */
.box {
  padding: 2rem;
  width: 500px;
  min-height: 200px;
  background-color: white;
  margin: 3rem auto;
  border: solid rgb(230, 230, 230) 1px;
  border-radius: 4px;
}
.sect {
  /* margin: 1rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 10px 25px;
}
.sect p {
  color: grey;
  margin-left: 1rem;
}
button {
  background-color: transparent;
  border: none;
}
/* start - sectb  */
.sectb {
  display: flex;
  flex-direction: column;
}
/* .key-val:nth-child(even) {
  background-color: #bdbdbd8c;
} */
input {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(255, 255, 255);
  border: solid rgb(240, 240, 240) 0.5px;
  border-radius: 4px;
  width: 205px;
}
select {
  width: 205px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(255, 255, 255);
  border: solid rgb(240, 240, 240) 0.5px;
  border-radius: 4px;
}
/* end - box  */

/* edit  */
.profile ul {
  display: flex;
  flex-direction: column;
  padding: 0;
}
ul li {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  justify-content: space-between;
}
.li2 {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 16px;
  justify-content: space-between;
}
h2 {
  font-size: 1.1rem;
}
/* end edit  */
nav {
  display: flex;
  padding: 0;
  width: 100%;
}
.sect.a {
  padding: 0.5rem;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: rgb(187, 187, 187);
  margin-bottom: 1rem;
}
/* poto profil  */
.poto img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: solid rgb(226, 226, 226) 3px;
  object-fit: cover;
}
/* end poto profil  */
button {
  border: solid rgb(216, 216, 216) 1px;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: rgb(228, 228, 228);
  margin-bottom: 1rem;
  cursor: pointer;
}
i {
  margin-right: 5px;
}
.btn2 {
  background-color: #0055ffd0;
  color: white;
  margin: 10px 16px;
  padding: 8px 16px;
}
.inp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  padding: 5px;
  border-radius: 50%;
  border: solid rgb(177, 177, 177) 1px;
  /* width: 50px; */
  font-size: 0.7rem;
  margin-bottom: 1rem;
  margin-top: -3.5rem;
  margin-left: 6rem;
}
.check {
  background-color: green;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  border: solid rgb(177, 177, 177) 1px;
  /* width: 50px; */
  font-size: 0.7rem;
  margin-bottom: 1rem;
  margin-top: -3.5rem;
  margin-left: 6rem;
}

/* start responsive  */
@media screen and (max-width: 600px) {
  .box {
    padding: 1rem;
    width: 100%;
    height: 100%;
    min-height: 200px;
    background-color: white;
    margin: 3rem auto 0 auto;
    border: solid rgb(230, 230, 230) 1px;
    border-radius: 4px;
  }
  p {
    font-size: 0.8rem;
  }
  h2 {
    font-size: 0.8rem;
  }
}
/* end responsive  */
</style>
