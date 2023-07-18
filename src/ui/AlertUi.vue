<template>
  <!-- start  alert untuk konfirmasi  -->
  <div
    class="alert"
    v-if="alert.show == true"
    :class="[
      alert.type == 'success'
        ? 'success'
        : '' || alert.type == 'error'
        ? 'error'
        : '' || alert.type == 'warning'
        ? 'warning'
        : '' || alert.type == 'info'
        ? 'info'
        : '',
    ]"
  >
    <div class="alert-box">
      <i
        :class="[
          alert.type == 'success'
            ? 'pi pi-check'
            : '' || alert.type == 'error'
            ? 'pi pi-ban'
            : '' || alert.type == 'warning'
            ? 'pi pi-exclamation-triangle'
            : '' || alert.type == 'info'
            ? 'pi pi-info-circle'
            : '',
        ]"
      ></i>
      <p>{{ alert.message }}</p>
      <i
        @click="alert.show = false"
        class="pi pi-times"
        style="margin-left: 2rem; font-size: 0.5rem; line-height: 1rem"
      ></i>
    </div>
  </div>
  <!-- end alert untuk konfirmasi  -->
</template>

<script>
export default {
  created() {
    this.alert = this.$store.state.alert;
  },
  methods: {},
};
</script>

<style scoped>
/* start alert  */
.alert {
  position: absolute;
  display: flex;
  z-index: 9999;
  align-items: center;
  margin: 1rem;
  right: 1rem;
  min-width: 150px;
  min-height: 30px;
  border-radius: 4px;
  text-align: start;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
}
.alert-box {
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
}
.alert p {
  margin-left: 1rem;
}
.alert i {
  line-height: 1rem;
}
.success {
  background-color: #9cff94;
  color: #4bb543;
  border-left: #4bb543 solid 4px;
}
.error {
  background-color: #ff92a4;
  color: #ff002b;
  border-left: #ff002b solid 4px;
}
.warning {
  background-color: #fff6d4;
  color: #ffcc00;
  border-left: #ffcc00 solid 4px;
}
.info {
  background-color: #a6e7ff;
  color: #33b5e5;
  border-left: #33b5e5 solid 4px;
}
.pi {
  background-color: transparent;
  transition: 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}
.pi:hover {
  transform: scale(1.8);
}

/* end start alert  */
</style>
