<template>
  <div v-if="irbans.show == true">
    <div class="modal-pilih-irban">
      <div class="content">
        <div class="header">
          <h1>Pilih Irban</h1>
        </div>
        <hr />
        <div class="pilihan-irban">
          <div
            class="pilihan"
            v-for="(data, index) in irbans.irban"
            :key="index"
          >
            <p
              @click="choose(data)"
              :class="[irbans.choosen == data ? 'active' : '']"
            >
              {{ data.full_name }}
            </p>
          </div>
        </div>
        <div class="btn">
          <button class="batal" @click="batal">Batal</button>
          <button @click="pilih">Pilih</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.irbans = this.$store.state.modal_pilih;
  },
  data() {
    return {
      irbans: {},
    };
  },
  methods: {
    batal() {
      // console.log("batal");
      this.irbans.if_false();
    },
    pilih() {
      // console.log("pilih");
      this.irbans.if_true();
    },
    choose(data) {
      // console.log(data);
      this.$store.state.modal_pilih.choosen = data;
    },
  },
};
</script>

<style scoped>
.modal-pilih-irban {
  position: absolute;
  /* background-color: rgba(65, 65, 65, 0.404); */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
.content {
  position: absolute;
  z-index: 99;
  width: 350px;
  background-color: white;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  text-align: start;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
h1 {
  margin: 0;
}
p {
  border: solid rgb(174, 194, 236) 1px;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: rgb(209, 223, 255);
  border-radius: 7px;
  transition: 0.2s ease-in;
}
p:hover {
  border: solid rgb(91, 134, 228) 1px;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: rgb(111, 144, 216);
  border-radius: 7px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
button {
  margin-left: 0.5rem;
  align-self: flex-end;
  border: solid rgb(2, 82, 255) 1px;
  padding: 0.5rem 1rem;
  background-color: rgb(62, 123, 255);
  color: white;
  transition: 0.2s ease-in;
  border-radius: 4px;
}
button:hover {
  background-color: rgb(0, 81, 255);
}
.batal {
  margin-left: 0.5rem;
  align-self: flex-end;
  border: solid rgb(206, 206, 206) 1px;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: rgb(150, 150, 150);
  border-radius: 4px;
  transition: 0.2s ease-in;
}
.batal:hover {
  background-color: rgb(224, 224, 224);
}
.active {
  background-color: rgb(62, 123, 255);
}
</style>
