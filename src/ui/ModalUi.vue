<template>
  <!-- start  modal untuk konfirmasi  -->
  <div class="modal" v-if="modal.show == true">
    <div class="modal-box">
      <div class="modal-box-header" v-if="modal.show == true">
        <h2>{{ modal.header }}</h2>
      </div>
      <div class="modal-box-body">
        <p>{{ modal.body }}</p>
      </div>
      <div class="modal-box-footer">
        <button class="batal" v-if="modal.batal_button == true" @click="batal">
          Batal
        </button>
        <button class="oke" v-if="modal.oke_button == true" @click="oke">
          Oke
        </button>
      </div>
    </div>
  </div>
  <!-- end modal untuk konfirmasi  -->
</template>

<script>
export default {
  created() {
    this.modal = this.$store.state.modal;
  },
  methods: {
    batal() {
      this.modal.show = false;
      this.modal.value = false;
      this.modal.if_false();
    },
    oke() {
      this.modal.show = false;
      this.modal.value = true;
      this.modal.if_true();
    },
  },
};
</script>

<style scoped>
/* start modal  */
.modal {
  width: 100%;
  height: 100%;
  background-color: #0f2c334f;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
}

.modal-box {
  min-width: 200px;
  min-height: 100px;
  background-color: white;
  border-radius: 4px;
  text-align: start;
  padding: 1rem;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
}

.modal-box-header h2 {
  margin: 0.2rem 0 0.5rem 0;
  font-size: 1.5rem;
}

.modal-box-body p {
  color: #193e46;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.modal-box-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-box-footer button {
  color: #193e46;
  transition: 3s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
}

.modal-box-footer .batal {
  color: #ff3939;
  margin: 0 0.5rem;
  background-color: transparent;
  border: 1px solid transparent;
}

.modal-box-footer .oke {
  color: #00a2ff;
  margin: 0 0.5rem;
  background-color: transparent;
  border: 1px solid transparent;
}

/* end start modal  */
</style>
