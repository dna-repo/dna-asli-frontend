<template>
  <div class="body">
    <div class="pelaporan">
      <Data_Pelapor
        v-if="this.$store.state.new_report.step == 'data_pelapor'"
      />
      <Data_Laporan
        v-if="this.$store.state.new_report.step == 'data_laporan'"
      />
    </div>
  </div>
</template>

<script>
import Data_Pelapor from "./tulis laporan/Data_Pelapor.vue";
import Data_Laporan from "./tulis laporan/Data_Laporan.vue";
export default {
  components: { Data_Pelapor, Data_Laporan },
  created() {
    document.title = `${this.$store.state.app_name} | Tulis laporan`;
  },
};
</script>

<style scoped>
.body {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
}

.pelaporan {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  justify-content: flex-start;
  max-width: 1000px;
  height: 90%;
  overflow: scroll;
}
</style>
