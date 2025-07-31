<template>
  <div class="ai-definition-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-left">
        <div class="dropdown-wrapper">
          豆包
        </div>
      </div>
      <h1 class="page-title">AI的知识卡片</h1>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-container">
        <div class="definition-text" v-if="counter == 1">
          <p>
            人工智能（AI）是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。它并非指网人类一样拥有自主意识的"生命体"，而是通过计算机程序来模拟、对人类思维和中枢的学习、推理、判断、规划等功力进行演算。
          </p>
          <p>
            比如我们日常常使用的语音助手、能听懂语音内容并结合共问回应，就是AI在模拟人类的语音理解和交流能力；还有诸如物软件的智能推荐，是AI根据人类关推荐音乐或视频内容的思维过程。
          </p>
        </div>
        <div class="definition-text" v-if="counter == 4">
          <p>
            尽管 AI 功能强大，但也存在一定的局限性。​
          </p>
          <p>
            AI 缺乏真正的情感理解和创造力，它只能根据预设的算法和数据做出反应，无法像人类一样体会情感的细腻变化。比如当孩子因为委屈而哭泣时，AI 能识别出哭泣的声音，却不能真正理解孩子内心的感受。​
          </p>
          <p>
            AI 的表现高度依赖数据质量和数量，如果输入的数据不准确或不全面，其得出的结果可能会出现偏差。在育儿场景中，如果家长输入的孩子信息有误，AI 给出的建议可能就不适合孩子。​
          </p>
          <p>
            同时，AI 在处理复杂、突发的情况时，灵活性和应变能力不如人类。遇到一些超出预设范围的育儿问题，AI 可能无法给出有效的解决方案，还需要家长结合自身经验做出判断。
          </p>
        </div>
        <div class="definition-text" v-if="counter == 2">
          <p>AI 具备多种核心功能，这些功能使其能够处理复杂任务。</p>
          <p>数据处理与分析是 AI 的重要能力，它可以快速处理海量数据，从中提取有价值的信息。在育儿场景中，AI 可以分析孩子的饮食、睡眠等数据，为家长提供健康建议。</p>
          <p>模式识别功能让 AI 能够识别图像、声音、文字等中的规律和模式。例如，AI 可以通过识别孩子的表情，判断其情绪状态。</p>
          <p>自主学习能力是 AI 的显著特点，它能通过不断接收新数据，调整自身算法，提高处理任务的准确性。就像育儿 APP 中的 AI 问答系统，会随着接收的育儿问题增多，回答得越来越精准。</p>
        </div>
        <div class="definition-text" v-if="counter == 3">
          <p>AI 的应用已经渗透到多个领域，在育儿方面也有广泛应用。</p>
          <p>在早教领域，智能早教机器人能根据孩子的年龄和学习进度，推送合适的启蒙内容，如故事、儿歌、小游戏等，助力孩子早期发展。</p>
          <p>在健康管理方面，一些 AI 育儿工具可以记录孩子的生长数据，如身高、体重，对比标准生长曲线，及时提醒家长孩子的生长是否在正常范围。</p>
          <p>此外，AI 还能为家长提供育儿知识问答服务，解答家长在育儿过程中遇到的各种问题，如孩子哭闹不止怎么办、如何培养孩子的良好习惯等。</p>

        </div>
      </div>
    </main>

    <!-- Footer with Next Button -->
    <footer class="page-footer">
      <button class="button" @click="goBefore">
        <span>上一页</span>
      </button>
      <button class="button" @click="goNext">
        {{ counter == 4 ? "开始对话": "下一页" }}
      </button>
    </footer>
  </div>
</template>

<script>
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
  padding: 48px 24px;
  display: flex;
  justify-content: center;
}

.content-container {
  max-width: 600px;
  width: 100%;
}

.definition-text {
  background: white;
  padding: 32px;
  border-radius: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  line-height: 1.8;
}

.definition-text p {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #495057;
  text-align: justify;
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

.button {
  background: #1e1e1e;
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

.button:hover {
  background: #d9dbdb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 226, 225, 0.4);
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
