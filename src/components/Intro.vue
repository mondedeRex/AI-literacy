<template>
  <div class="welcome-page">
    <!-- 动态背景粒子 -->
    <div class="particles">
      <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
    </div>
    
    <!-- 浮动装饰元素 -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <div class="overlay" :class="{ 'show': isVisible }">
      <div class="logo-container" @mouseenter="logoHover = true" @mouseleave="logoHover = false">
        <img 
          class="logo" 
          :class="{ 'hover': logoHover }" 
          :src="logoSrc" 
          alt="AI育儿Logo" 
        />
        <div class="logo-glow"></div>
      </div>
      
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
      
      <button 
        @click="enterSite" 
        :disabled="isLoading"
        class="enter-btn"
        :class="{ 'loading': isLoading }"
      >
        <span v-if="!isLoading">{{ buttonText }}</span>
        <span v-else class="loading-text">
          正在进入
          <span class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </span>
      </button>

      <!-- 底部装饰线 -->
      <div class="decoration-line">
        <div class="line-segment" v-for="n in 3" :key="n"></div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../assets/logo.png'

export default {
  name: 'Intro',
  data() {
    return {
      logoSrc: logo,
      title: '欢迎来到智素童行',
      subtitle: '智能陪伴，科学育儿，让成长更轻松。',
      buttonText: '开始体验',
      isVisible: false,
      logoHover: false,
      isLoading: false
    }
  },
  methods: {
    enterSite() {
      this.isLoading = true;
      setTimeout(() => {
        this.$router.push('/ai-definition');
      }, 200);
    },
    
    getParticleStyle(index) {
      const colors = ['#a8edea', '#fed6e3', '#ffd3e6', '#c8e6e8', '#b8e6d3'];
      const size = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 3;
      const animationDuration = Math.random() * 4 + 6;
      
      return {
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colors[index % colors.length],
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`
      };
    }
  },
  
  mounted() {
    // 页面加载动画
    setTimeout(() => {
      this.isVisible = true;
    }, 200);
  }
}
</script>

<style scoped>
.welcome-page {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f0cad6ff 0%, #f6c3d3ff 50%, #f589b8ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #333;
  position: relative;
  overflow: hidden;
}

/* 动态粒子背景 */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* 浮动装饰形状 */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 60px;
  height: 60px;
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.shape-2 {
  width: 40px;
  height: 40px;
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 10%;
  animation-delay: 4s;
}

.shape-4 {
  width: 50px;
  height: 50px;
  top: 10%;
  right: 30%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

/* 主容器 */
.overlay {
  position: relative;
  backdrop-filter: blur(20px);
  padding: 50px 70px;
  border-radius: 30px;
  box-shadow: 
    0 20px 40px rgba(168, 237, 234, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  max-width: 480px;
  text-align: center;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.overlay.show {
  transform: translateY(0);
  opacity: 1;
}

.overlay:hover {
  transform: translateY(-5px);
}

/* Logo区域 */
.logo-container {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.logo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(91, 200, 175, 0.3);
  animation: gentle-pulse 3s ease-in-out infinite;
}

.logo.hover {
  transform: scale(1.1) rotateY(15deg);
  box-shadow: 0 15px 35px rgba(91, 200, 175, 0.5);
}

.logo-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, rgba(91, 200, 175, 0.3), transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.logo-container:hover .logo-glow {
  opacity: 1;
}

@keyframes gentle-pulse {
  0%, 100% {
    box-shadow: 0 8px 25px rgba(91, 200, 175, 0.3);
  }
  50% {
    box-shadow: 0 12px 30px rgba(91, 200, 175, 0.5);
  }
}

/* 文字样式 */
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: text-shimmer 3s ease-in-out infinite;
}

@keyframes text-shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.subtitle {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  color: #5a6c7d;
  opacity: 0.9;
}

/* 按钮样式 */
.enter-btn {
  background: linear-gradient(135deg, #5bc8af, #48b697);
  border: none;
  padding: 16px 50px;
  font-size: 1.3rem;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(91, 200, 175, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  user-select: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.enter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.enter-btn:hover::before {
  left: 100%;
}

.enter-btn:hover {
  background: linear-gradient(135deg, #48b697, #3ea085);
  box-shadow: 0 12px 25px rgba(72, 182, 151, 0.6);
  transform: translateY(-2px) scale(1.05);
}

.enter-btn:active {
  transform: translateY(0) scale(1.02);
}

.enter-btn.loading {
  background: linear-gradient(135deg, #bdc3c7, #95a5a6);
  cursor: not-allowed;
  transform: none;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.loading-dots span {
  animation: loading-bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 底部装饰线 */
.decoration-line {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
}

.line-segment {
  width: 30px;
  height: 3px;
  background: linear-gradient(135deg, #5bc8af, #48b697);
  border-radius: 2px;
  animation: line-glow 2s ease-in-out infinite;
}

.line-segment:nth-child(2) {
  animation-delay: 0.3s;
}

.line-segment:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes line-glow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .overlay {
    padding: 40px 30px;
    margin: 20px;
    max-width: 90%;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .enter-btn {
    padding: 14px 40px;
    font-size: 1.1rem;
  }

  .logo {
    width: 100px;
    height: 100px;
  }
}
</style>