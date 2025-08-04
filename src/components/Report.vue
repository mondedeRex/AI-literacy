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
          <h3 class="section-subtitle">为本次AI的生成内容打分（1-5）</h3>
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
                  <span :class="num === 1 ? 'rating-number-dark' : 'rating-number-red'">
                    {{ num }}.
                  </span>
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
                  <span :class="num === 1 ? 'rating-number-dark' : 'rating-number-red'">
                    {{ num }}.
                  </span>
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
                  <span :class="num === 1 ? 'rating-number-dark' : 'rating-number-red'">
                    {{ num }}.
                  </span>
                  <div 
                    class="rating-button" 
                    :class="{ selected: ratings.ethics >= num }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
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
            report: '报告正在生成中，请耐心等待',
            loading: true,
            ratings: {
              relationship: 0,
              quality: 0,
              ethics: 0
            }
        }
    },
    methods: {
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
  margin-top: 15px;
  margin-bottom: 2px;
}

.section-subtitle {
  font-family: 'Abhaya Libre', serif;
  font-weight: 500;
  font-size: 25px;
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
  padding: 28px;
}

.risk-list {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.risk-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #ececec;
}

.risk-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.risk-icon-wrapper {
  position: relative;
  width: 27px;
  height: 27px;
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

.literacy-goals-card, .evaluation-card, .feedback-card {
  border-radius: 19px;
  padding: 20px;
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
  font-size: 18px;
  color: #696969;
  margin-bottom: 12px;
}

.goal-icon {
  width: auto;
  height: 42px;
  font-size: 42px;
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
  gap: 25px;
}

.evaluation-row {
  display: flex;
  align-items: center;
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
  width: 43px;
  height: 43px;
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
  gap: 15px;
  flex-grow: 1;
  justify-content: space-between;
}

.rating-item {
  position: relative;
  width: 29px;
  height: 52px;
  cursor: pointer;
}

.rating-item span {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 17px;
  letter-spacing: 0.34px;
}

.rating-number-dark { 
  color: #121e3f; 
}

.rating-number-red { 
  color: #ff6666; 
}

.rating-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 28.5px;
  height: 28.2px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background-color: #f8f8f8;
  transition: all 0.2s ease;
}

.rating-button:hover {
  border-color: #197bbd;
  background-color: #e6f3ff;
}

.rating-button.selected {
  background-color: #197bbd;
  border-color: #197bbd;
}

.feedback-card {
  padding: 13px 21px 23px;
}

.feedback-description {
  font-family: 'Abhaya Libre', serif;
  font-weight: 500;
  font-size: 10px;
  color: #404040;
  margin-top: 13px;
}

.feedback-form {
  margin-top: 5px;
  position: relative;
  height: 51px;
}

.feedback-input {
  width: 100%;
  height: 100%;
  border: 1px solid #197bbd;
  border-radius: 8px;
  padding: 10px 70px 10px 15px;
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


