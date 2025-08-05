<template>
  <div class="ai-definition-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-left">
        <div class="dropdown-wrapper">
          智素童行 Kiddo
        </div>
      </div>
      <h1 class="page-title" v-if="counter==1">AI的介绍</h1>
      <h1 class="page-title" v-if="counter==2">AI的基本原理</h1>
      <h1 class="page-title" v-if="counter==3">AI的应用场景</h1>
      <h1 class="page-title" v-if="counter==4">AI的局限性</h1>
      <div class="header-right">
        <div class="dropdown-wrapper">
          AI 知识 {{counter}}/4
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="image-container">
        <img :src="getImage(counter)" alt="AI illustration"/>
      </div>
      <div class="content-container">
        <div class="definition-text" v-if="counter == 1">
          <p>生成式 AI 就像会思考的 “超级大脑”，</p>
          <p>能根据你给它的提示创作新内容，比如陪孩子聊天、讲睡前故事。</p>
          <p>它不是简单照搬答案，而是像家长编故事那样，</p>
          <p>用自己的 “理解” 生成新鲜内容。</p>
        </div>
        <div class="definition-text" v-if="counter == 4">
          <p>生成式人工智能并不理解自身所生成的内容，它的工作过程像个 “黑箱”，</p>
          <p>依赖真实世界内容数据集进行概率统计来预测内容，</p>
          <p>所以可能说错育儿知识，比如搞错 “辅食添加时间”。​</p>
          <p>而且它不懂孩子的真实情绪，没法像爸妈那样给孩子温暖的拥抱和关心。</p>
        </div>
        <div class="definition-text" v-if="counter == 2">
          <p>它像海绵一样 “读” 过海量书籍和对话，记住语言规律后，</p>
          <p>会通过概率预测下一个词，一步步拼出回应。</p>
          <p>比如你问 “怎么哄哭闹的宝宝”，它会算着 “可能性”，</p>
          <p>把学过的育儿知识串成一句句建议。</p>
        </div>
        <div class="definition-text" v-if="counter == 3">
          <p>家长可以问它 “宝宝发烧怎么护理”“如何培养专注力”，获取育儿知识和建议。​</p>
          <p>家长也可以陪伴孩子一起问 “为什么月亮会跟着人走”等好奇问题；</p>
          <p>它还能给孩子讲故事、玩角色扮演、陪玩数学小游戏，</p>
          <p>甚至辅助孩子认字、学儿歌。</p>
        </div>
      </div>
    </main>

    <!-- Footer with Next Button -->
    <footer class="page-footer">
      <button class="button1" @click="goBefore">
        <span>上一页</span>
      </button>
      <button class="button2" @click="goNext">
        {{ counter == 4 ? "开始对话": "下一页" }}
      </button>
    </footer>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import img1 from '@/assets/img1.png'
import img2 from '@/assets/img2.png'
import img3 from '@/assets/img3.png'
import img4 from '@/assets/img4.png'
export default {
  name: 'AIDefinition',
  data(){
    return({
      counter: 1
    });
  },
  methods: {
    goNext() {
      if(this.counter == 4) {
        this.$router.push('/choosetheme');
      }
      else{
        this.counter++;
      }
    },
    goBefore() {
      if(this.counter != 1) {
          this.counter--;
      }
      else{
          this.$router.push('/');
      }
    },
    getImage(counter){
      switch(counter){
        case 1: return img1;
        case 2: return img2;
        case 3: return img3;
        case 4: return img4;
      }
    }
  }
}
</script>

<style scoped>
.ai-definition-page {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.page-header {
  background: rgb(253, 251, 251);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}




.page-title {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image-container{
  margin-bottom: 25px;
}
.image-container img{
  width: 100%;
  max-width: 600px;
  height:auto;
  border-radius: 50px;
}
.content-container {
  max-width: 850px;
  width: 100%;
}

.definition-text {
  background: white;
  padding: 32px;
  border-radius: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  line-height: 1.2;
}

.definition-text p {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #495057;
  text-align: center;
  font-weight:550;
}

.definition-text p:last-child {
  margin-bottom: 0;
}

/* Footer */
.page-footer {
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.button2 {
  background: #f7a4c0ff;
  color: white;
  border: none;
  border-radius: 40px;
  padding: 9px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(239, 240, 240, 0.3);
}
.button1 {
  background: #81d4fa;
  color: white;
  border: none;
  border-radius: 40px;
  padding: 9px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(239, 240, 240, 0.3);
}


/* Responsive Design */
@media (max-width: 768px) {
  .page-header {
    padding: 12px 16px;
  }
  
  .page-title {
    font-size: 18px;
  }
  
  .header-right {
    gap: 8px;
  }
  
  .auth-button {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .main-content {
    padding: 24px 16px;
  }
  
  .definition-text {
    padding: 24px;
  }
  
  .definition-text p {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .page-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .header-left,
  .header-right {
    flex: none;
  }
  
  .page-title {
    order: -1;
    text-align: center;
  }
  
  .header-right {
    justify-content: center;
  }
}
</style>
