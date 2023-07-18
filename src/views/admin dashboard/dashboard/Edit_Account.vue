<template>
  <div class="body" v-if="isLoading == false">
    <div class="edit">
      <div class="edit-photo">
        <div
          class="edit-photo-lingkaran"
          :class="[onEdit == true ? 'margin' : '']"
        >
          <img
            :src="`${this.$store.state.common.baseUrl}/${image}`"
            alt=""
            v-if="previewImage == ''"
          />
          <img :src="previewImage" alt="" v-if="previewImage != ''" />
          <div class="edit-photo-lingkaran-inp">
            <label v-if="selectedImage == ''" for="pp"
              ><i
                class="pi pi-pencil success"
                style="font-size: 0.6rem; margin: 0"
              ></i>
            </label>
            <label
              v-if="selectedImage != ''"
              :class="[selectedImage == '' ? '' : 'check']"
            >
              <i
                @click="uploadPhoto"
                class="pi pi-check"
                style="font-size: 0.6rem; margin: 0; color: green"
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
        </div>
        <button @click="toEdit" v-if="onEdit == false">Edit Profile</button>
        <div class="edit-photo-data">
          <div class="edit-photo-data-form">
            <label for="nik">NIK</label>
            <h2 v-if="onEdit == false">{{ currentLogin.nik }}</h2>
            <input
              v-if="onEdit == true"
              type="text"
              v-model="currentLogin.nik"
            />
          </div>
          <div class="edit-photo-data-form">
            <label for="nik">Nama Lengkap</label>
            <h2 v-if="onEdit == false">
              {{ currentLogin.full_name.toUpperCase() }}
            </h2>
            <input
              v-if="onEdit == true"
              type="text"
              v-model="currentLogin.full_name"
            />
          </div>
          <div class="edit-photo-data-form">
            <label for="nik">Jenis Kelamin</label>
            <h2 v-if="onEdit == false">
              {{ currentLogin.gender.toUpperCase() }}
            </h2>
            <select v-model="currentLogin.gender" v-if="onEdit == true">
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div class="edit-photo-data-form">
            <label for="nik">Alamat</label>
            <h2 v-if="onEdit == false">
              {{ currentLogin.address.toUpperCase() }}
            </h2>
            <input
              v-if="onEdit == true"
              type="text"
              v-model="currentLogin.address"
            />
          </div>
          <div class="edit-photo-data-form">
            <label for="nik">Tanggal Lahir</label>
            <h2 v-if="onEdit == false">{{ currentLogin.birth_date }}</h2>
            <input
              v-if="onEdit == true"
              type="date"
              v-model="currentLogin.birthDate"
              required
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <!-- <div class="edit-photo-data-form">
            <label for="nik">Pekerjaan</label>
            <h2 v-if="onEdit == false">
              {{ currentLogin.occupation.name.toUpperCase() }}
            </h2>
            <select v-if="onEdit == true">
              <option value="pns">Pegawai Negeri Sipil</option>
              <option value="aph">Aparat Penegak Hukum</option>
              <option value="lsm">Lembaga Swadaya Masyarakat</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div> -->
          <div
            class="edit-photo-data-form"
            v-if="currentLogin.level == 'super admin'"
          >
            <label for="nik">{{ occ_id }}</label>
            <h2 v-if="onEdit == false">
              {{ currentLogin.occupation.id.toUpperCase() }}
            </h2>
            <input
              v-if="onEdit == true"
              v-model="currentLogin.occupation.id"
              type="text"
            />
          </div>
          <div class="edit-photo-data-form">
            <label for="nik">Email</label>
            <h2 v-if="onEdit == false">
              {{ currentLogin.email }}
            </h2>
            <input
              v-if="onEdit == true"
              type="text"
              v-model="currentLogin.email"
            />
          </div>
          <div class="edit-photo-data-form">
            <label for="nik">Nomor Telepon</label>
            <h2 v-if="onEdit == false">
              {{ currentLogin.phone }}
            </h2>
            <input
              v-if="onEdit == true"
              type="text"
              v-model="currentLogin.phone"
            />
          </div>
          <div v-if="onEdit == true" class="edit-photo-data-form">
            <label for="nik">Password</label>
            <input type="password" v-model="currentLogin.password" />
          </div>
          <button
            :class="[onEdit == true ? 'button-edit' : '']"
            @click="update"
            v-if="onEdit == true"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = `${this.$store.state.app_name} | Edit akun`;
    // mengambil data user login
    this.currentLogin = this.$store.state.currentLogin;
    // console.log(this.currentLogin);
    if (this.currentLogin) {
      this.isLoading = false;
    }
  },
  data() {
    return {
      currentLogin: {},
      onEdit: false,
      is_login: false,
      previewImage: "",
      selectedImage: "",
      isLoading: true,
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
        .then((res) => {
          this.selectedImage = "";
          // console.log(this.currentLogin);
          this.$store.dispatch("updatePhotoProfil", this.currentLogin);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "success";
          alert.message = res.data.message;
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        })
        .catch(() => {
          // console.log(err);
          let alert = this.$store.state.alert;
          alert.show = true;
          alert.type = "error";
          alert.message = "Gagal memperbaharui photo profil";
          window.setTimeout(() => {
            alert.show = false;
          }, 3000);
        });
    },
    async update() {
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
    inpPhoto(e) {
      let date = new Date();
      let file = e.target.files[0];
      this.selectedImage = file;
      this.currentLogin.photo_profile = `${date.getDate()}${date.getMonth()}${date.getFullYear()}-${
        file.name
      }`;
      this.previewImage = URL.createObjectURL(file);
    },
  },
  computed: {
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
    image() {
      let link = this.currentLogin.photo_profile;
      // console.log(link);
      let image = `photo/profil/${link}`;
      return image;
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
.edit {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  align-items: center;
  max-width: 1000px;
  overflow: scroll;
  height: 90%;
}
/* end main body background  */
/* photo profil  */
.edit-photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
}
.edit-photo-data {
  min-height: 200px;
  min-width: 100%;
}
.edit-photo-lingkaran {
  margin-bottom: 1rem;
}
.margin {
  margin-bottom: 3rem;
}
.edit-photo-lingkaran img {
  border-radius: 50%;
  border: solid rgb(226, 226, 226) 3px;
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.edit-photo-data {
  display: flex;
  flex-direction: column;
}
.edit-photo-data-form {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.2rem 0;
}
.edit-photo-data-form input {
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  background-color: rgba(233, 239, 248, 0.699);
  border: solid rgba(197, 197, 197, 0) 0.5px;
  border-radius: 4px;
  width: 50%;
}
.edit-photo-data-form h2 {
  font-size: 1rem;
  margin: 0.5rem;
}

.edit-photo-data-form select {
  width: 50%;
  background-color: rgba(233, 239, 248, 0.699);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: solid rgb(240, 240, 240) 0.5px;
  border-radius: 4px;
}
.edit-photo-lingkaran-inp {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgb(243, 243, 243);
  border: solid grey 1px;
  margin-top: -2.5rem;
  margin-left: 7rem;
  position: relative;
  text-align: center;
  cursor: pointer;
}
.edit-photo-lingkaran-inp i {
  cursor: pointer;
}
.edit-photo button {
  /* margin: 1rem; */
  border: solid rgb(216, 216, 216) 1px;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: rgb(228, 228, 228);
  margin: 1rem 0;
  cursor: pointer;
}
.edit-photo .button-edit {
  /* margin: 1rem; */
  border: solid rgb(216, 216, 216) 1px;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: rgb(208, 227, 255);
  margin: 1rem 0;
  cursor: pointer;
}
/* end photo profil  */
</style>
