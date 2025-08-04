<template>
  <div id="choosetheme">
    <!-- 标题部分 -->
    <div class="header">
      <h2>选择对话类型</h2>
    </div>

    <!-- 原本的内容 -->
    <section id="prompt-suggestions" class="prompt-suggestions-section">
      <div class="suggestions-container">
        <button class="suggestion-item" @click="hoptochat" id="1">
          <span class="suggestion-text">询问事实性知识</span>
        </button>
        <button class="suggestion-item" @click="hoptochat" id="2">
          <span class="suggestion-text">寻求建议或帮助</span>
        </button>
        <button class="suggestion-item" @click="hoptochat" id="3">
          <span class="suggestion-text">娱乐内容生成或角色扮演</span>
        </button>
        <button class="suggestion-item" @click="hoptochat" id="4">
          <span class="suggestion-text">学习/学术类任务</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ChooseTheme',
  methods: {
    hoptochat(){
        const id = event.currentTarget.id;
        this.$router.push({path: '/chat',query: {type: id}});
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
}

* {
  box-sizing: border-box;
}

#choosetheme {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  font-size: 25px;
  font-weight: 500;
  color: #333;
}

.prompt-suggestions-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #ffffff;
  min-height: 300px;
  width: 100%;
}

.suggestions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 501px;
}

.suggestion-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  height: 40px;
  background-color: #3a3a3a;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.suggestion-item:nth-child(1) {
  background-color: #f48fb1; /* 粉红 */
}

.suggestion-item:nth-child(2) {
  background-color: #81d4fa; /* 天蓝 */
}

.suggestion-item:nth-child(3) {
  background-color: #aed581; /* 草绿 */
}

.suggestion-item:nth-child(4) {
  background-color: #ffd54f; /* 柠檬黄 */
}
.suggestion-item:hover {
  background-color: #868585db;
}

.suggestion-text {
  position: relative;
  z-index: 2;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.21;
  text-align: center;
  color: white;
}

@media (max-width: 480px) {
  .suggestion-item {
    width: 90%;
    max-width: 280px;
  }
}
</style>
