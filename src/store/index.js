import { createStore } from "vuex";

export default createStore({
  state: {
    app_name: "ASLI",
    latestId: 4,
    is_login: false,
    currentLogin: {}, // akun yang sedang login
    verifikasi: {
      default: Boolean,
      register: Boolean,
      ulang: Boolean,
    },
    open_menu: false,
    accounts: [],
    alert: {
      show: false,
      type: "info",
      message: "message text",
      icon: "",
    },
    new_report: {
      account: {
        occupation: {
          name: "-",
        },
      },
      status: "laporan baru",
      tiket: "",
      klasifikasi: "",
      judul: "",
      isi: "",
      tanggal: "",
      intansi_tujuan: "",
      file_lampiran: [],
      isAnonim: false,
      step: "data_pelapor",
    },
    modal: {
      type: "confirm",
      show: false,
      header: "header",
      body: "teks body",
      value: Boolean,
      batal_button: false,
      oke_button: false,
      if_true: function () {},
      if_false: function () {},
      close_modal: false,
    },
    modal_pilih: {
      irban: [],
      show: false,
      if_true: function () {},
      if_false: function () {},
      choosen: undefined,
      index: undefined,
    },
    dinas: [
      "SEKRETARIAT DAERAH KABUPATEN",
      "SEKRETARIAT DPRD",
      "INSPEKTORAT DAERAH KABUPATEN",
      "DINAS PENDIDIKAN",
      "DINAS KESEHATAN",
      "SATUAN POLISI PAMONG PRAJA",
      "DINAS PENGENDALIAN PENDUDUK, KB, PEMBERDAYAAN PEREMPUAN DAN ANAK",
      "DINAS KEPENDUDUKAN DAN CATATAN SIPIL",
      "DINAS PEMBERDAYAAN MASYARAKAT DAN DESA",
      "DINAS KOMUNIKASI DAN INFORMATIKA",
      "PERINDUSTRIAN",
      "DINAS KEPEMUDAAN DAN OLAHRAGA",
      "DINAS PARIWISATA",
      "DINAS PENANAMAN MODAL DAN PELAYANAN IZIN TERPADU SATU PINTU",
      "DINAS KETENAGAKERJAAN DAN KOPERASI USAHA KECIL MENENGAH",
      "DINAS PEKERJAAN UMUM DAN PENATAAN RUANG",
      "DINAS PERUMAHAN RAKYAT, KAWSAN PEMUKIMAN",
      "DINAS SOSIAL",
      "DINAS PERPUSTAKAAN DAN KEARSIPAN",
      "DINAS PERIKANAN, PETERNAKAN DNA KESEHATAN HEWAN",
      "DINAS PERTANIAN",
      "DINAS KETAHANAN PANGAN",
      "DINAS LINGKUNGAN HIDUP",
      "DINAS PERHUBUNGAN",
      "DINAS PERENCANAAN DAN PEMBANGUNAN DAERAH",
      "BADAN PENGELOLAAN KEUANGAN, PENDAPATAN DAN ASET DAERAH",
      "BADAN KEPEGAWAIAN DAERAH",
      "BADAN PENANGGULANGAN BENCANA DAERAH",
      "SEKRETARIAT DEWAN PENGURUS KORPRI",
      "BADAN KESATUAN BANGSA",
    ],
    common: {
      //      baseUrl: "http://127.0.0.1:3030",
      baseUrl: "http://103.193.177.238:3030",
      // baseUrl: "http://backend-ins.hadig.my.id:3030",
      headers: "",
      public: "123456789",
    },
  },
  getters: {},
  mutations: {
    NEW_REPORT(state, payload) {
      state.data.unshift(payload);
      // console.log("berhasil menambah laporan baru");
    },
    LOGIN(state, payload) {
      if (payload) {
        // jika halaman di refres
        state.currentLogin = payload.user;
        state.common.headers = payload.token;
        // end jika halaman di refres
        if (payload.token) {
          // jika login
          localStorage.setItem("activeUser", JSON.stringify(payload.user));
          localStorage.setItem("token", JSON.stringify(payload.token));
          // end jika login
        }
      }
    },
    LOGOUT(state, payload) {
      state.currentLogin = payload;
      state.is_login = false;
    },
    STORE_ACCOUNT(state, payload) {
      state.accounts.unshift(payload);
    },
    EDIT_ACCOUNT(state, payload) {
      state.currentLogin = payload;
      localStorage.setItem("activeUser", JSON.stringify(payload));
    },
    UPDATE_PHOTO_PROFIL(state, payload) {
      state.currentLogin = payload;
      // update poto profil di localsorage
      localStorage.setItem("activeUser", JSON.stringify(state.currentLogin));
    },
  },
  actions: {
    newReport(c, payload) {
      return c.commit("NEW_REPORT", payload);
    },
    login(c, payload) {
      return c.commit("LOGIN", payload);
    },
    logout(c, payload) {
      return c.commit("LOGOUT", payload);
    },
    store_account(c, payload) {
      return c.commit("STORE_ACCOUNT", payload);
    },
    editAccount(c, payload) {
      return c.commit("EDIT_ACCOUNT", payload);
    },
    updatePhotoProfil(c, payload) {
      return c.commit("UPDATE_PHOTO_PROFIL", payload);
    },
  },
  modules: {},
});
