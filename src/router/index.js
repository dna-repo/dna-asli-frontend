import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

// auth
import LoginApp from "../views/Auth/LoginApp.vue";
import RegisterApp from "../views/Auth/RegisterApp.vue";
import Verfikasi_Akun from "@/views/dashboard/Verfikasi_Akun.vue";
import Recovery_Password from "@/views/Auth/Recovery_Password.vue";
import New_Password from "@/views/Auth/New_Password.vue";

// user
import HalamanAwal from "../views/dashboard/Halaman_Awal.vue";
import Beranda from "../views/dashboard/BerandaApp.vue";
import Laporan_saya from "@/views/dashboard/Laporan_Saya.vue";
import DetailLaporan from "../views/dashboard/DetailLaporan.vue";
import EditAccount from "../views/dashboard/EditAccount.vue";

import Dashboard from "../views/admin dashboard/DashboardApp.vue";
import LaporanAktif from "../views/admin dashboard/LaporanAktif.vue";
import Detail from "../views/admin dashboard/DetailLaporan.vue";
import SemuaLaporan from "../views/admin dashboard/SemuaLaporan.vue";
import TrackingLaporan from "../views/admin dashboard/TrackingLaporan.vue";
import EditAccountDb from "../views/admin dashboard/dashboard/Edit_Account.vue";

import arsip from "@/views/admin dashboard/ArsipUi.vue";
import Surat_Keluar from "@/views/admin dashboard/Surat_Keluar.vue";
import Surat_Masuk from "@/views/admin dashboard/Surat_Masuk.vue";

import NotFound from "../views/NotFound.vue";

// untuk akun inspektur
import List_Fo_Irban from "../views/admin dashboard/inspektur/fo dan irban/List_Fo_Irban.vue";
import Tambah_Fo_Irban from "../views/admin dashboard/inspektur/fo dan irban/Tambah_Fo_Irban.vue";
import Edit_Fo_Irban from "../views/admin dashboard/inspektur/fo dan irban/Edit_Fo_Irban.vue";
import Laporan_Terbaru from "@/views/admin dashboard/inspektur/Laporan_Terbaru.vue";

// untuk fo
import Tulis_Laporan from "@/views/admin dashboard/fo/Tulis_Laporan.vue";
import Permintaan_Informasi from "@/views/admin dashboard/fo/Permintaan_Informasi.vue";
import Aspirasi from "@/views/admin dashboard/fo/Aspirasi_Ui.vue";
import Tanggapi_Laporan from "@/views/admin dashboard/fo/Tanggapi_Laporan.vue";

//untuk irban
import Laporan_Perceraian from "@/views/admin dashboard/irban/Laporan_Perceraian.vue";
import Laporan_Pengaduan from "@/views/admin dashboard/irban/Laporan_Pengaduan.vue";

//untuk ams
import AmsUiVue from "@/views/admin dashboard/ams/AmsUi.vue";

import AmsSuratMasukVue from "@/views/admin dashboard/ams/surat masuk/AmsSuratMasuk.vue";
import AmsDetailSuratMasukVue from "@/views/admin dashboard/ams/surat masuk/AmsDetailSuratMasuk .vue";
import AmsTambahSuratMasukVue from "@/views/admin dashboard/ams/surat masuk/AmsTambahSuratMasuk.vue";
import AmsEditSuratMasukVue from "@/views/admin dashboard/ams/surat masuk/AmsEditSuratMasuk.vue";

import AmsSuratKeluarVue from "@/views/admin dashboard/ams/surat keluar/AmsSuratKeluar.vue";
import AmsDetailSuratKeluarVue from "@/views/admin dashboard/ams/surat keluar/AmsDetailSuratKeluar.vue";
import AmsTambahSuratKeluarVue from "@/views/admin dashboard/ams/surat keluar/AmsTambahSuratKeluar.vue";
import AmsEditSuratKeluarVue from "@/views/admin dashboard/ams/surat keluar/AmsEditSuratKeluar.vue";

import AmsDisposisiSuratVue from "@/views/admin dashboard/ams/disposisi/AmsDisposisiSurat.vue";
import AmsTambahDisposisi from "@/views/admin dashboard/ams/disposisi/AmsTambahDisposisi.vue";
import AmsEditDisposisiVue from "@/views/admin dashboard/ams/disposisi/AmsEditDisposisi.vue";

import Confirm from "@/views/Auth/ConfirmAccount.vue";

const routes = [
  {
    path: "/",
    redirect: "/lapor",
  },
  // start auth route
  {
    path: "/login",
    name: "login",
    component: LoginApp,
  },
  {
    path: "/confirm",
    name: "confirm",
    component: Confirm,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterApp,
  },
  {
    path: "/verifikasi_akun",
    name: "verifikasi_akun",
    component: Verfikasi_Akun,
  },
  {
    path: "/recovery_password",
    name: "recovery_password",
    component: Recovery_Password,
  },
  {
    path: "/new_password",
    name: "new_password",
    component: New_Password,
  },
  // end auth route

  // start ui pengguna
  {
    path: "/lapor",
    name: "lapor",
    component: HalamanAwal,
  },
  {
    path: "/beranda/detail/:id",
    name: "detail",
    component: DetailLaporan,
  },
  {
    path: "/beranda",
    name: "beranda",
    component: Beranda,
  },
  {
    path: "/laporan_saya",
    name: "laporan_saya",
    component: Laporan_saya,
  },
  {
    path: "/edit_account",
    name: "edit_account",
    component: EditAccount,
  },
  // end ui pengguna

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "edit_account_db",
        name: "edit_account_db",
        component: EditAccountDb,
      },

      // start path untuk sekretaris
      {
        path: "list_fo_irban",
        name: "list_fo_irban",
        component: List_Fo_Irban,
      },
      {
        path: "tambah_fo_irban",
        name: "tambah_fo_irban",
        component: Tambah_Fo_Irban,
      },
      {
        path: "edit_fo_irban/:id",
        name: "edit_fo_irban",
        component: Edit_Fo_Irban,
      },
      {
        path: "laporan_terbaru",
        name: "laporan_terbaru",
        component: Laporan_Terbaru,
      },
      // end path untuk sekretaris

      // start path untuk irban
      {
        path: "pengaduan",
        name: "pengaduan",
        component: Laporan_Pengaduan,
      },
      {
        path: "perceraian",
        name: "perceraian",
        component: Laporan_Perceraian,
      },
      // end path untuk irban

      // start path untuk fo
      {
        path: "tulis_laporan",
        name: "tulis_laporan",
        component: Tulis_Laporan,
      },
      {
        path: "permintaan_informasi",
        name: "permintaan_informasi",
        component: Permintaan_Informasi,
      },
      {
        path: "aspirasi",
        name: "aspirasi",
        component: Aspirasi,
      },
      {
        path: "tanggapi_laporan/:id",
        name: "tanggapi_laporan",
        component: Tanggapi_Laporan,
      },
      // start path untuk fo

      // start path untuk arsip
      {
        path: "arsip",
        name: "arsip",
        component: arsip,
      },
      {
        path: "surat_keluar",
        name: "surat_keluar",
        component: Surat_Keluar,
      },
      {
        path: "surat_masuk",
        name: "surat_masuk",
        component: Surat_Masuk,
      },
      // end path untuk arsip

      // start path untuk ams
      {
        path: "ams",
        name: "ams",
        component: AmsUiVue,
      },
      {
        path: "ams_surat_keluar",
        name: "ams_surat_keluar",
        component: AmsSuratKeluarVue,
      },
      {
        path: "ams_surat_masuk",
        name: "ams_surat_masuk",
        component: AmsSuratMasukVue,
      },
      {
        path: "ams_tambah_surat_masuk",
        name: "ams_tambah_surat_masuk",
        component: AmsTambahSuratMasukVue,
      },
      {
        path: "ams_tambah_surat_keluar",
        name: "ams_tambah_surat_keluar",
        component: AmsTambahSuratKeluarVue,
      },
      {
        path: "ams_edit_surat_masuk/:id",
        name: "ams_edit_surat_masuk",
        component: AmsEditSuratMasukVue,
      },
      {
        path: "ams_edit_surat_keluar/:id",
        name: "ams_edit_surat_keluar",
        component: AmsEditSuratKeluarVue,
      },
      {
        path: "ams_detail_surat_masuk/:id",
        name: "ams_detail_surat_masuk",
        component: AmsDetailSuratMasukVue,
      },
      {
        path: "ams_detail_surat_keluar/:id",
        name: "ams_detail_surat_keluar",
        component: AmsDetailSuratKeluarVue,
      },
      {
        path: "ams_disposisi/:id",
        name: "ams_disposisi",
        component: AmsDisposisiSuratVue,
      },
      {
        path: "ams_tambah_disposisi/:id",
        name: "ams_tambah_disposisi",
        component: AmsTambahDisposisi,
      },
      {
        path: "ams_edit_disposisi/:id",
        name: "ams_edit_disposisi",
        component: AmsEditDisposisiVue,
      },
      // end path untuk ams

      {
        path: "tracking_laporan",
        name: "tracking_laporan",
        component: TrackingLaporan,
      },
      {
        path: "laporan_aktif",
        component: LaporanAktif,
      },
      {
        path: "semua_laporan",
        component: SemuaLaporan,
      },
      {
        path: "detail_laporan/:id",
        name: "detail_laporan",
        component: Detail,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
