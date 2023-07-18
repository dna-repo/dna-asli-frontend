<template>
  <div class="toast" v-if="isEnabled">
    <p>Periksa kembali masukan anda!</p>
    <svg
      width="10"
      height="10"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="#fff"
      />
    </svg>
  </div>
</template>

<script>
export default {
  created() {
    // setInterval(() => console.log("time over", 3000));
  },
  data() {
    return {
      isEnabled: true,
    };
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  right: 20px;
  background-color: rgb(255, 0, 0);
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
  font-size: 0.9rem;
  color: white;
}
</style>
