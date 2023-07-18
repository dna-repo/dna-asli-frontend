<template>
  <div class="main" style="position: relative; z-index: 99">
    <section class="logo">
      <div class="pl">
        <img class="paluta" :src="asli_motion.logo" alt="" />
      </div>
      <img class="an" :src="asli_motion.a" alt="" />
      <img class="s" :src="asli_motion.s" alt="" />
      <img class="l" :src="asli_motion.l" alt="" />
      <div class="api">
        <img class="fire" :src="asli_motion.fire" alt="" />
        <img class="fire-i" :src="asli_motion.i" alt="" />
      </div>
    </section>
    <div
      class="line"
      style="
        width: 500px;
        height: 1px;
        color: white;
        position: relative;
        z-index: 999;
        background-color: aliceblue;
      "
    ></div>
  </div>
</template>

<script>
import a from "@/assets/asli/A.png";
import s from "@/assets/asli/S.png";
import l from "@/assets/asli/L.png";
import i from "@/assets/asli/I.png";
import logo from "@/assets/asli/paluta.png";
import fire from "@/assets/asli/fire.png";
export default {
  data() {
    return {
      asli_motion: {
        a: a,
        s: s,
        l: l,
        i: i,
        fire: fire,
        logo: logo,
      },
    };
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  min-height: 120px;
}

section {
  /* margin-top: 2rem;
  margin-bottom: -2rem; */
  display: flex;
  /* background-color: aliceblue; */
  transform: scale(0.9);
  padding-left: 10rem;
  height: 120px;
  width: 600px;
  width: 100vw;
  overflow: hidden;
  /* width: 500px; */
  justify-content: center;
  /* margin-left: 10rem; */
  /* background-color: rgb(0, 107, 107); */
}

section .an {
  /* background-color: rgb(0, 143, 143); */
  transform: translateY(-2px);
  animation: an-animation 1s ease-in;
}

section .s {
  /* background-color: rgb(32, 114, 114); */
  transform: translateX(-101px);
  animation: sn-animation 1.5s;
}

section .l {
  /* background-color: rgb(0, 107, 107); */
  transform: translateX(-145px);
  animation: ln-animation 2s;
}

.api {
  position: relative;
  width: 100px;
  height: 108px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: translateX(-00px);
  width: 130px;
  transform: translate(-187px, 0);
  align-self: flex-end;
  object-fit: contain;
}

.fire {
  display: flex;
  /* border: solid 1px grey; */
  object-fit: contain;
  height: 38px;
  width: 100%;
  padding-bottom: 0.5rem;
  padding-left: 0.7rem;
  align-self: center;
  animation: fire-animation 4s;
}

.fire-i {
  width: 100px;
  /* border: solid 1px rgb(255, 0, 0); */
  animation: in-animation 2.5s;
  height: 70px;
  /* scale: 0.4; */
  object-fit: contain;
}
.pl {
  width: 222px;
  /* background-color: aqua; */
  position: absolute;
  transform: translate(-190px, 50px);
  display: flex;
  justify-content: center;
}
.paluta {
  width: 30px;
  animation: paluta-animation 2.5s;
}

@keyframes an-animation {
  0% {
    transform: translateX(-100vw);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes sn-animation {
  0% {
    opacity: 0;
  }

  50% {
    transform: translateX(100vw);
    opacity: 0;
  }

  100% {
    transform: translateX(-101px);
  }
}

@keyframes ln-animation {
  0% {
    opacity: 0;
  }

  70% {
    transform: translateX(100vw);
    opacity: 0;
  }

  100% {
    transform: translateX(-145px);
  }
}

@keyframes in-animation {
  0% {
    opacity: 0;
  }

  80% {
    transform: translateX(100vw);
    opacity: 0;
  }

  100% {
    transform: translateX(-187);
  }
}

@keyframes fire-animation {
  0% {
    opacity: 0;
  }

  60% {
    transform: rotateY(360deg);
    opacity: 0;
  }

  100% {
    transform: translateX(-187);
    opacity: 1;
  }
}

@keyframes paluta-animation {
  0% {
    scale: 0;
    opacity: 0;
  }

  70% {
    scale: 0;
  }

  100% {
    opacity: 1;
    scale: 1;
  }
}

@media screen and (max-width: 600px) {
  .main {
    scale: 0.5;
    padding-top: 2rem;
    /* margin: 2rem; */
  }
  .pl {
    width: 200px;
    padding-left: 40px;
    /* background-color: aqua; */
    position: absolute;
    transform: translate(-190px, 50px);
    display: flex;
    justify-content: center;
  }
}
</style>
