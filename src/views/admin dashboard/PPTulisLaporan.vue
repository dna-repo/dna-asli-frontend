<template>
  <div class="body">
    <section class="inputan">
      <div class="identitas" v-if="step == 1">
        <h2 class="sampaikan">Identitas Pelapor <span>langkah 1/2</span></h2>
        <div class="input">
          <select
            name=""
            id=""
            required
            v-model="laporan_baru.account.klasifikasi"
          >
            <option value="" selected disabled>Klasifikasi Pelapor</option>
            <option value="aph">Aparat Penegak Hukum</option>
            <option value="lsm">Lembaga Swadaya Masyrakat</option>
            <option value="masyarakat">Masyarakat</option>
            <option value="pns">PNS</option>
          </select>
        </div>
        <div class="isian">
          <div class="kiri">
            <div class="input cat">
              <input
                type="number"
                v-model="laporan_baru.account.nik"
                placeholder="NIK"
              />
            </div>
            <!-- @input="onChangeNik($event)" -->
            <div class="input">
              <select
                name=""
                id=""
                required
                v-model="laporan_baru.account.gender"
              >
                <option value="" selected disabled>Pilih Jenis Kelamin</option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div class="input cat">
              <input
                type="text"
                v-model="laporan_baru.account.occupation"
                placeholder="Pekerjaan"
              />
            </div>
            <div class="input cat">
              <input
                style="text-transform: lowercase"
                type="text"
                v-model="laporan_baru.account.email"
                placeholder="Email"
              />
            </div>
            <div
              class="input cat"
              v-if="laporan_baru.account.klasifikasi === 'aph'"
            >
              <input
                type="number"
                v-model="laporan_baru.account.aph.nrp"
                placeholder="NRP"
              />
            </div>
            <div
              class="input cat"
              v-if="laporan_baru.account.klasifikasi === 'lsm'"
            >
              <input
                type="number"
                v-model="laporan_baru.account.lsm.id_pres"
                placeholder="ID PRES"
              />
            </div>
            <div
              class="input cat"
              v-if="laporan_baru.account.klasifikasi === 'pns'"
            >
              <input
                type="number"
                v-model="laporan_baru.account.pns.nip"
                placeholder="NIP"
              />
            </div>
          </div>
          <div class="kanan">
            <div class="input cat">
              <input
                type="text"
                v-model="laporan_baru.account.fullName"
                placeholder="Nama Lengkap"
              />
            </div>
            <div class="input cat">
              <input
                type="text"
                v-model="laporan_baru.account.addres"
                placeholder="Alamat"
              />
            </div>
            <div class="input cat">
              <input
                type="date"
                v-model="laporan_baru.account.birthDate"
                placeholder="Tanggal Lahir"
                required
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
            <div class="input cat">
              <input
                type="number"
                v-model="laporan_baru.account.phoneNumber"
                placeholder="Nomor Telepon"
              />
            </div>
          </div>
        </div>
        <button class="btn" @click="nextStep">Selanjutnya</button>
      </div>
      <section class="lapor" v-if="step == 2">
        <h2 class="sampaikan">
          Sampaikan laporan anda <span>langkah 2/2</span>
        </h2>
        <div class="input cat">
          <select required v-model="laporan_baru.klasifikasi">
            <option value="" selected disabled>
              Pilih klasifikasi laporan anda
            </option>
            <option value="aspirasi">Aspirasi</option>
            <option value="pengaduan">Pengaduan</option>
            <option value="permintaan informasi">Permintaan Informasi</option>
            <option
              value="perceraian"
              v-if="laporan_baru.account.klasifikasi == 'pns'"
            >
              Perceraian
            </option>
          </select>
        </div>
        <div class="input">
          <input
            type="text"
            v-model="laporan_baru.judul"
            placeholder="Ketik judul laporan anda"
          />
        </div>
        <div class="input">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="laporan_baru.isi"
            placeholder="Ketik isi laporan anda"
          ></textarea>
        </div>
        <div class="input cat">
          <select required v-model="laporan_baru.instansi_tujuan">
            <option value="" selected disabled>Pilih Instansi Tujuan</option>
            <option v-for="(data, index) in dinas" :value="data" :key="index">
              {{ data }}
            </option>
          </select>
        </div>
        <div class="lampiran">
          <div class="file">
            <label for="file"
              >Upload Lampiran <span>{{ jumlah_lampiran }}</span></label
            >
            <input id="file" type="file" @change="uploadFile($event)" />
          </div>
          <button @click="buatLaporan">Buat Laporan</button>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  created() {
    // this.served_account = this.$store.state;
    document.title = `${this.$store.state.app_name} | Laporan Aktif`;
    this.dinas = this.$store.state.dinas;
    // this.laporan_baru.account = this.served_account[2];
  },
  data() {
    return {
      served_account: [],
      jumlah_lampiran: 0,
      dinas: [],
      laporan_baru: {
        status: "buat laporan",
        id: 1,
        tiket: "LP10000",
        klasifikasi: "",
        account: {
          klasifikasi: "",
          nik: "",
          fullName: "",
          addres: "",
          birthDate: "",
          gender: "",
          phoneNumber: "",
          occupation: "",
          email: "",
          isAnonim: false,
          pns: {
            nip: "",
          },
          aph: {
            nrp: "",
          },
          lsm: {
            id_pres: "",
          },
        },
        judul: "",
        isi: "",
        tanggal: "",
        instansi_tujuan: "",
        file_lampiran: [],
      },
      toast: {
        color: "ff0000",
        message: "Toast Message",
        theme: "primary",
      },
      step: 2,
      isToast: false,
      isOpen: {
        dinas: false,
      },
      results: [],
    };
  },
  methods: {
    uploadFile(e) {
      console.log(e.target.files[0]);
      let data = e.target.files[0];
      this.laporan_baru.file_lampiran.push(data);
      this.jumlah_lampiran = this.laporan_baru.file_lampiran.length;
    },
    // handleClickOutside(event) {
    //   if (!this.$el.contains(event.target)) {
    //     this.isOpen = false;
    //   }
    // },
    // setResult(data) {
    //   this.laporan_baru.isntansi_tujuan = data;
    //   console.log(this.laporan_baru.isntansi_tujuan);
    //   this.isOpen.dinas = false;
    // },
    // onchangeDinas(e) {
    //   this.results = this.dinas.filter(
    //     (item) => item.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    //   );
    //   this.isOpen.dinas = true;
    //   if (e.target.value.toLowerCase() == "") {
    //     this.isOpen.dinas = false;
    //   }
    // },
    // onChangeNik(e) {
    //   console.log(e.target.value);
    //   for (let i = 0; i < this.served_account.length; i++) {
    //     if (e.target.value == this.served_account[i].nik) {
    //       console.log(this.served_account[i]);
    //       this.laporan_baru.account = this.served_account[i];
    //     }
    //   }
    // },
    buatLaporan() {
      let date = new Date();
      this.laporan_baru.tanggal = date.toLocaleDateString();
      // console.log(this.laporan_baru);
      if (
        this.laporan_baru.klasifikasi == "" ||
        this.laporan_baru.judul == "" ||
        this.laporan_baru.isi == "" ||
        this.laporan_baru.tanggal == "" ||
        this.laporan_baru.instansi_tujuan == ""
      ) {
        this.toast.message = "Data masukan anda belum lengkap!";
        this.toast.theme = "warning";
        this.isToast = true;
        setInterval(() => {
          this.isToast = false;
        }, 2000);
        return;
      } else {
        this.$router.push("/dashboard/semua_laporan");
      }
    },
    nextStep() {
      // console.log(this.laporan_baru.account);
      if (
        this.laporan_baru.account.nik.length != 16 ||
        this.laporan_baru.account.fullName == "" ||
        this.laporan_baru.account.addres == "" ||
        this.laporan_baru.account.birthDate == "" ||
        this.laporan_baru.account.gender == "" ||
        this.laporan_baru.account.phoneNumber == "" ||
        this.laporan_baru.account.phoneNumber < 11 ||
        this.laporan_baru.account.occupation == "" ||
        this.laporan_baru.account.email == ""
      ) {
        if (this.laporan_baru.account.klasifikasi == "pns") {
          if (this.laporan_baru.account.pns.nip == "") {
            this.toast.message = "Data masukan anda belum lengkap!";
            this.toast.theme = "warning";
            this.isToast = true;
            setInterval(() => {
              this.isToast = false;
            }, 2000);
            return;
          }
        } else if (this.laporan_baru.account.klasifikasi == "aph") {
          if (this.laporan_baru.account.aph.nrp == "") {
            this.toast.message = "Data masukan anda belum lengkap!";
            this.toast.theme = "warning";
            this.isToast = true;
            setInterval(() => {
              this.isToast = false;
            }, 2000);
            return;
          }
        } else if (this.laporan_baru.account.klasifikasi == "lsm") {
          if (this.laporan_baru.account.lsm.id_pres == "") {
            this.toast.message = "Data masukan anda belum lengkap!";
            this.toast.theme = "warning";
            this.isToast = true;
            setInterval(() => {
              this.isToast = false;
            }, 2000);
            return;
          }
        } else {
          this.toast.message = "Data masukan anda belum lengkap!";
          this.toast.theme = "warning";
          this.isToast = true;
          setInterval(() => {
            this.isToast = false;
          }, 2000);
          return;
        }
        this.toast.message = "Data masukan anda belum lengkap!";
        this.toast.theme = "warning";
        this.isToast = true;
        setInterval(() => {
          this.isToast = false;
        }, 2000);
        return;
      } else {
        this.step++;
      }
    },
    hideToast() {
      this.isToast = false;
    },
  },
};
</script>

<style scoped>
.body {
  width: 90%;
  height: 90%;
  margin: 1rem auto;
}
header {
  text-align: start;
  padding: 0.5rem 0;
}
h2 {
  margin: 0;
}
/* identitas */
.identitas {
  position: relative;
  padding: 2rem;
  display: block;
  margin: 0 auto;
  text-align: start;
  display: flex;
  flex-direction: column;
}
.isian {
  display: flex;
  justify-content: space-between;
}
.kiri {
  width: 48%;
}
.kanan {
  width: 48%;
}
.btn {
  align-self: flex-end;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* lapor */
.inputan {
  width: 100%;
  display: block;
  background-color: #fff;
  border-radius: 4px;
  padding-top: 4px;
}
.lapor {
  position: relative;
  padding: 2rem;
  display: block;
  margin: 0 auto;
  text-align: start;
}
.input {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: 0.5rem 0;
}
input {
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  /* width: 245px; */
}
textarea {
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  height: 150px;
  margin: 0.5rem 0;
}
select {
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
  /* width: 240px; */
}
button {
  padding: 0.5rem 1rem;
  width: 50%;
  border: none;
  background-color: #0088ff;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}
select:required:invalid {
  color: gray;
}
option[value=""][disabled] {
  display: none;
}
option {
  color: black;
}
.cat {
  margin: 1rem 0;
}
.lampiran {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lampiran input {
  background-color: transparent;
  border: none;
}
input[type="file"] {
  display: none;
}
label {
  background-color: #2f5299;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
}
.file {
  display: flex;
  flex-direction: row;
}
span {
  background-color: #0088ff;
  padding: 5px;
  border-radius: 30px;
  font-size: 0.7rem;
}

h2 :deep(span) {
  background-color: rgb(226, 226, 226);
}

/* toas  */
.toast {
  position: absolute;
  right: 20px;
  background-color: #ffac0a;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
svg {
  margin: 0 0.5rem;
}
p {
  margin: 0;
  font-size: 0.85rem;
  color: white;
}
.toast-btn {
  background-color: transparent;
  padding: 0;
  margin: 0;
}
/* toas end  */
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  min-height: 1em;
  max-height: 6em;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
