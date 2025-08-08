<template>
  <section class="summary-feedback-section">
    <div class="main-container">
      <div class="left-column">
        <!-- Summary Card -->
        <div class="card summary-card">
          <h2 class="summary-title">本次AI使用小结：</h2>
          <div class="summary-content-box">
            <div class="summary-content">
              {{report}}
            </div>
          </div>
        </div>

        <!-- Risk Warning Card -->
        <div class="card risk-card">
          <h3 class="section-subtitle">长期风险提示</h3>
          <ul class="risk-list">
            <li class="risk-item">
              <div class="risk-icon-wrapper">
                <div class="risk-icon-bg risk-icon-bg-1"></div>
                <div class="risk-icon-img">❤️</div>
              </div>
              <p class="risk-text">AI育儿不能替代家长职责和亲子关系</p>
            </li>
            <li class="risk-item">
              <div class="risk-icon-wrapper">
                <div class="risk-icon-bg"></div>
                <div class="risk-icon-img">💡</div>
              </div>
              <p class="risk-text">AI不能替代独立思考与创造，要警惕过分依赖AI对个人能力发展的危害</p>
            </li>
            <li class="risk-item">
              <div class="risk-icon-wrapper">
                <div class="risk-icon-bg risk-icon-bg-3"></div>
                <div class="risk-icon-img">🛡️</div>
              </div>
              <p class="risk-text">请负责任地传播AI生成的内容，以任何形式的传播请注明出处</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="right-column">
        <!-- AI Literacy Goals Card -->
        <div class="card literacy-goals-card">
          <h3 class="section-subtitle">AI素养目标</h3>
          <div class="goals-container">
            <div class="goal-item">
              <h4 class="goal-title">高效地使用</h4>
              <div class="goal-icon">⚡</div>
              <p class="goal-subtitle">Efficiently</p>
            </div>
            <div class="goal-item">
              <h4 class="goal-title">批判地使用</h4>
              <div class="goal-icon">🔍</div>
              <p class="goal-subtitle">Critically</p>
            </div>
            <div class="goal-item">
              <h4 class="goal-title">合乎伦理地使用</h4>
              <div class="goal-icon">⚖️</div>
              <p class="goal-subtitle">Ethically</p>
            </div>
          </div>
        </div>

        <!-- Evaluation Card -->
        <div class="card evaluation-card">
          <div style="display: flex; justify-content: center; gap: 20px;">
          <h3 class="section-subtitle">为本次AI的生成打分</h3>
          <button class="submit-rating-button" @click="sendRating" :disabled="isDisabled">提交</button>
          </div>
          <div class="evaluation-rows">
            <div class="evaluation-row">
              <div class="evaluation-label">
                <div class="eval-icon-wrapper">
                  <div class="eval-icon-bg eval-icon-bg-1"></div>
                  <div class="eval-icon">💕</div>
                </div>
                <p class="eval-text">增进亲子关系</p>
              </div>
              <div class="rating-scale">
                <div 
                  v-for="num in 5" 
                  :key="`relationship-${num}`" 
                  class="rating-item" 
                  @click="setRating('relationship', num)"
                >
                  <div 
                    class="rating-button" 
                    :class="{ selected: ratings.relationship >= num }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="evaluation-row">
              <div class="evaluation-label">
                <div class="eval-icon-wrapper">
                  <div class="eval-icon-bg eval-icon-bg-2"></div>
                  <div class="eval-icon">📋</div>
                </div>
                <p class="eval-text">内容质量</p>
              </div>
              <div class="rating-scale">
                <div 
                  v-for="num in 5" 
                  :key="`quality-${num}`" 
                  class="rating-item" 
                  @click="setRating('quality', num)"
                >
                  <div 
                    class="rating-button" 
                    :class="{ selected: ratings.quality >= num }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="evaluation-row">
              <div class="evaluation-label">
                <div class="eval-icon-wrapper">
                  <div class="eval-icon-bg eval-icon-bg-3"></div>
                  <div class="eval-icon">🛡️</div>
                </div>
                <p class="eval-text">合乎伦理</p>
              </div>
              <div class="rating-scale">
                <div 
                  v-for="num in 5" 
                  :key="`ethics-${num}`" 
                  class="rating-item" 
                  @click="setRating('ethics', num)"
                >
                  <div 
                    class="rating-button" 
                    :class="{ selected: ratings.ethics >= num }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <!-- Feedback Card -->
        <div class="card feedback-card">
          <h3 class="section-subtitle">问题反馈</h3>
          <p class="feedback-description">如在使用过程中发现事实内容错误、伦理风险等，请反馈给我们。</p>
          <form class="feedback-form" @submit.prevent="submitFeedback">
            <input 
              type="text" 
              class="feedback-input" 
              v-model="feedbackText"
              placeholder="请输入您的反馈意见..."
            />
            <button type="submit" class="send-button">
              <span class="send-button-text">发送</span>
            </button>
          </form>
        </div>
        <!-- -->
        <div>
        <button @click="backhome" class="returnhome-button">
          返回首页
        </button>
      </div>
      </div>
      
    </div>
  </section>
</template>
<script>
const WORKFLOW = '7530654402718269479';
export default {
    name: 'Report',
    data() {
        return {
            messages: [],
            report: '报告正在生成中，请耐心等待约5~6秒',
            loading: true,
            ratings: {
              relationship: 0,
              quality: 0,
              ethics: 0
            },
            feedbackText: '',
            isDisabled: false,
            user_id: 'default_user'
        }
    },
    methods: {
        backhome() {
            // 返回首页
            sessionStorage.removeItem('user_id');
            localStorage.removeItem('messages');
            this.$router.push('/');
        },
        async fetchReport(chatMessage) {
            const response = await fetch('https://api.coze.cn/v1/workflow/run', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer pat_5h0X5vJNTAZF8RmkIELGq2okxkHnD9Wa1xSbIzh57ppqQ9U7Odp5SSaEHpqrAhlc',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workflow_id: WORKFLOW,
                    parameters: {
                        input: chatMessage
                    }
                })
            });
            const responsejson = await response.json();
            const data = JSON.parse(responsejson.data);
            this.report = data.output;
            this.loading = false;
        },
        setRating(category, value) {
          this.ratings[category] = value;
        },
        async submitFeedback() {
          if (this.feedbackText.trim()) {
            console.log('反馈内容:', this.feedbackText);
            const text = this.feedbackText;
            this.feedbackText = '';
            const response = await fetch('https://api.coze.cn/v1/workflow/run',{
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer pat_eF32ePMTr4z4socqdFmLNyRVMfVi4db2ovENGHqjhTJbV6WVTdL1QK59C6bxXrYu',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workflow_id: '7534938986075439131',
                    parameters:{
                      userid: this.user_id,
                      suggestion: text,
                    }
                })      
            });
            const responsejson  = await response.json();
            alert('感谢您的反馈！');
          }
        },
        async sendRating() {
          console.log('当前用户ID:', this.user_id);
          if (this.ratings['relationship']!=0 && this.ratings['ethics'] !=0 && this.ratings['quality']!=0) {
            alert('感谢您的评价！');
            this.isDisabled = true;
            console.log(this.ratings);
            const response = await fetch('https://api.coze.cn/v1/workflow/run',{
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer pat_eF32ePMTr4z4socqdFmLNyRVMfVi4db2ovENGHqjhTJbV6WVTdL1QK59C6bxXrYu',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workflow_id: '7534938376186282018',
                    parameters:{
                      userid: this.user_id,
                      rate1: this.ratings.relationship,
                      rate2: this.ratings.quality,
                      rate3: this.ratings.ethics,
                    }
                })      
            });
            const responsejson  = await response.json();
            console.log('评分提交结果:', responsejson);
          }
          else{
            alert('请完整评分后提交');
          }
        }
    },
    created() {
        // 从 localStorage 读取 messages
        const saved = localStorage.getItem('messages');
        if (saved) {
            try {
                this.messages = JSON.parse(saved);
            } catch(e) {
                this.messages = [];
            }
        }
        this.fetchReport(this.messages);
        this.user_id = sessionStorage.getItem('user_id');
        console.log('当前用户ID:', this.user_id);
    },
    computed: {
      compiledMarkdown() {
        return marked(this.report);
      }
    }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 10px;
  background-color: #f0f2f5;
  font-family: 'Abel', sans-serif;
  color: #404040;
}

* {
  box-sizing: border-box;
}

h2, h3, h4, p, ul {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.summary-feedback-section {
  max-width: 1326px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 45px;
  padding: 15px 30px;
  overflow: hidden;
}

.main-container {
  display: flex;
  gap: 45px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.left-column {
  gap: 26px;
  max-width: 603px;
}

.right-column {
  gap: 30px;
  max-width: 521px;
}

.card {
  background-color: #ffffff;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
}

.summary-title {
  font-family: 'Abhaya Libre', serif;
  font-weight: 500;
  font-size: 25px;
  color: #404040;
  margin-top: 8px;
  margin-bottom: 2px;
}

.section-subtitle {
  font-family: 'Abhaya Libre', serif;
  font-weight: 500;
  font-size: 20px;
  color: #404040;
}

.summary-card .summary-content-box {
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  border-radius: 28px;
  padding: 23px 21px;
  min-height: 312px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
}

.summary-content {
  margin-top: 0;
  color: #666;
  line-height: 1.6;
  font-size: 16px;
}

.risk-card {
  border-radius: 19px;
  padding: 20px;
}

.risk-list {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.risk-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #ececec;
}

.risk-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.risk-icon-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.risk-icon-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #efefef;
}

.risk-icon-bg-1 {
  background-color: #ffeada;
}

.risk-icon-bg-3 {
  background-color: #e4f0ff;
}

.risk-icon-img {
  position: relative;
  z-index: 1;
  font-size: 18px;
}

.risk-text {
  font-family: 'Abel', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #404040;
  line-height: 1.3;
}

.literacy-goals-card, .feedback-card {
  border-radius: 19px;
  padding: 20px;
}
.evaluation-card{
  border-radius: 19px;
}

.goals-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 17px;
}

.goal-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 28px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
  padding: 17px 10px 13px;
}

.goal-title {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #696969;
}

.goal-icon {
  width: auto;
  height: 35px;
  font-size: 35px;
  margin-bottom: 12px;
}

.goal-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  color: #404040;
}

.evaluation-card {
  padding: 33px 21px;
}

.evaluation-rows {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  gap: 10px;
}

.evaluation-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.evaluation-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 85px;
  flex-shrink: 0;
}

.eval-icon-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eval-icon-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
}

.eval-icon-bg-1 { 
  background-color: #ffeada; 
}

.eval-icon-bg-2 { 
  background-color: #ddf9e4; 
}

.eval-icon-bg-3 { 
  background-color: #e4f0ff; 
}

.eval-icon {
  position: relative;
  z-index: 1;
  font-size: 24px;
}

.eval-text {
  font-family: 'Abel', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #696969;
}

.rating-scale {
  display: flex;
  gap: 20px;
  flex-grow: 1;
}

.rating-item {
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  overflow: visible;
  aspect-ratio: 1 / 1;
}

.rating-button {
  width: 100%;
  height: 100%;
  border: 2px solid #ddd;
  background-color: #f8f8f8;
  transition: all 0.2s ease;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}



.rating-button.selected {
  background-color: gold;
  border-color: gold;
}
.submit-rating-button {
  padding: 3px 16px;
  border: 2px solid #f7a4c0ff;
  background-color: #f7a4c0ff;
  border-color: #f7a4c0ff;
  border-radius: 20px;
  color: white;
}
.returnhome-button {
  padding: 7px 20px;
  border: 2px solid #f7a4c0ff;
  background-color: #f7a4c0ff;
  border-color: #f7a4c0ff;
  border-radius: 20px;
  color: white;
}

.feedback-card {
  padding: 13px 21px 23px;
}

.feedback-description {
  font-family: 'Abhaya Libre', serif;
  font-weight: 500;
  font-size: 12px;
  color: #404040;
  margin-top: 6px;
}

.feedback-form {
  margin-top: 5px;
  position: relative;
  height: 35px;
}

.feedback-input {
  width: 100%;
  height: 100%;
  border: 1px solid #197bbd;
  border-radius: 8px;
  padding: 10px 40px 10px 15px;
  font-size: 16px;
}

.send-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 59px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #197bbd;
  color: white;
  border-radius: 0 8px 8px 0;
  transition: background-color 0.2s ease;
}

.send-button:hover {
  background-color: #145a94;
}

.send-button-text {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 11px;
  color: #ffffff;
}

@media (max-width: 1200px) {
  .main-container {
    flex-direction: column;
    gap: 30px;
  }
  .left-column, .right-column {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .summary-feedback-section {
    padding: 20px;
  }
  .goals-container {
    flex-direction: column;
  }
  .evaluation-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .rating-scale {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start;
  }
  .rating-item {
    width: calc(20% - 7px);
  }
}
</style>

