<template>
  <div>
    <div class="identitas">
      <div class="identitas-header">
        <h1>Masukkan identitas pelapor <span>langkah 1/2</span></h1>
        <div class="divider"></div>
      </div>
      <div class="identitas-data-klasifikasi">
        <select name="" id="" v-model="account.occupation.name">
          <option value="" selected disabled>Klasifikasi Pelapor</option>
          <option value="pns">Pegawai Negeri Sipil</option>
          <option value="aph">Aparat Penegak Hukum</option>
          <option value="lsm">Lembaga Swadaya Masyarakat</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>
      <div class="identitas-data">
        <div class="identitas-data-isian-field">
          <div class="identitas-data-isian-field-form">
            <label>NIK</label>
            <input type="number" v-model="account.nik" />
          </div>
          <div class="identitas-data-isian-field-form">
            <label>Nama Lengkap</label>
            <input type="text" v-model="account.full_name" />
          </div>
          <div class="identitas-data-isian-field-form">
            <label>Tempat tinggal saat ini</label>
            <input type="text" v-model="account.address" />
          </div>
          <div class="identitas-data-isian-field-form">
            <label>Tanggal lahir</label>
            <input
              type="date"
              v-model="account.birthDate"
              required
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <div class="identitas-data-isian-field-form">
            <label>Jenis kelamin</label>
            <select v-model="account.gender">
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div class="identitas-data-isian-field-form">
            <label>No. Telp aktif</label>
            <input type="number" v-model="account.phone" />
          </div>
          <!-- start detail pekerjaan -->
          <div class="identitas-data-isian-field-form">
            <label>Email</label>
            <input type="text" v-model="account.email" />
          </div>
          <!-- end detail pekerjaan -->
          <div class="identitas-data-isian-field-form">
            <label>{{ occ_id }}</label>
            <input
              style="text-transform: lowercase"
              type="email"
              v-model="account.occupation.id"
            />
          </div>
        </div>
        <button @click="selanjutnya">Selanjutnya</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$store.state.new_report);
  },
  data() {
    return {
      account: {
        nik: "",
        full_name: "",
        email: "",
        gender: "",
        address: "",
        occupation: {
          name: "",
          id: "",
        },
        birthDate: "",
        phone: "",
      },
    };
  },
  computed: {
    occ_id() {
      let occ = "Detail Pekerjaan";
      if (this.account.occupation.name == "aph") {
        occ = "ARP";
      } else if (this.account.occupation.name == "lsm") {
        occ = "ID Press";
      } else if (this.account.occupation.name == "pns") {
        occ = "NIP";
      }
      return occ;
    },
  },
  methods: {
    selanjutnya() {
      // filter data pelapor
      let nik = this.account.nik.toString();
      // console.log(nik.length);
      if (
        nik.length == 16 &&
        this.account.full_name.length != 0 &&
        this.account.email.length != 0 &&
        this.account.gender.length != 0 &&
        this.account.address.length != 0 &&
        this.account.occupation.name.length != 0 &&
        this.account.occupation.id.length != 0 &&
        this.account.birthDate.length != 0 &&
        this.account.phone.length != 0
      ) {
        this.$store.state.new_report.account = this.account;
        this.$store.state.new_report.step = "data_laporan";
        // console.log(this.$store.state.new_report);
      } else {
        let modal = this.$store.state.modal;
        modal.show = true;
        modal.oke_button = true;
        modal.header = "Kesalahan";
        modal.body = "Maaf, masukan anda tidak lengkap";
      }
    },
  },
};
</script>

<style scoped>
.identitas-header {
  padding: 0 3rem;
  text-align: start;
}

.identitas-header h1 {
  margin: 0;
  padding: 0.5rem 0;
  font-size: 1.5rem;
}

.identitas-header span {
  background-color: #e2e2e2;
  padding: 5px;
  border-radius: 30px;
  font-size: 0.7rem;
}

.identitas-header .divider {
  width: 100%;
  height: 1px;
  background-color: #63707c;
}

.identitas-data {
  padding: 0 3rem;
}

.identitas-data button {
  margin-top: 20px;
  padding: 0.5rem 1rem;
  min-width: 100%;
  border: none;
  background-color: #5584ac;
  border-radius: 4px;
  color: white;
  font-size: 1.1rem;
}

.identitas-data-isian-field {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.identitas-data-isian-field-form {
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0;
  text-align: start;
}

.identitas-data-isian-field-form label {
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0;
  text-align: start;
  font-size: 0.9rem;
}

.identitas-data-klasifikasi {
  padding: 0 3rem;
  margin: 1rem 0;
}

.identitas-data-klasifikasi select {
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}

.identitas-data-isian-field-form input {
  width: 300px;
  max-width: 480px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}

.identitas-data-isian-field-form select {
  width: 300px;
  max-width: 480px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(233, 239, 248);
  border: solid rgb(197, 197, 197) 0.5px;
  border-radius: 4px;
}
</style>
