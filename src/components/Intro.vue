<template>
  <section id="hero">
    <main class="hero-container">
      <img
        :src="logo"
        alt="LOGO"
        class="hero-logo"
      />
      <p class="hero-tagline">智能陪伴，科学育儿，让成长更轻松</p>
      <button  class="hero-cta" @click="goToChat">开始体验</button>
    </main>
  </section>
</template>

<script>
import logo from '../assets/logo.png'
export default {
  name: "Intro",
  data(){
    return {logo};
  },
  methods: {
    goToChat() {
      this.$router.push('/ai-definition');
    }
  }
  
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: white;
}

* {
  box-sizing: border-box;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
  overflow: hidden;
}

.hero-logo {
  width: 400px;
  height: auto;
  object-fit: cover;
  margin-bottom: 40px;
}

.hero-tagline {
  color: #696969;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  margin-top: -15px;
  position: relative;
  z-index: 1;
}

.hero-cta {
  display: inline-block;
  background-color: #50cbed;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  border-radius: 45px;
  cursor: pointer;
  margin-top: 20px;
  padding: 20px 40px;
  white-space: nowrap;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.hero-cta:hover {
  transform: scale(1.05);
  background-color: #45b2d4;
}

@media (max-width: 768px) {
  .hero-logo {
    width: 80vw;
    max-width: 400px;
    height: auto;
  }

  .hero-tagline {
    font-size: 18px;
    margin-top: -10px;
    max-width: 90%;
  }

  .hero-cta {
    font-size: 28px;
    padding: 24px 50px;
    margin-top: 40px;
  }
}

@media (max-width: 480px) {
  .hero-logo {
    max-width: 280px;
  }

  .hero-tagline {
    font-size: 16px;
  }

  .hero-cta {
    font-size: 22px;
    padding: 20px 40px;
    margin-top: 30px;
  }
}
</style>
