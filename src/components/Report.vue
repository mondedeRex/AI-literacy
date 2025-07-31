<template>
  <div class="report-container">
    <h2 class="report-title">聊天报告</h2>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else>
      <pre class="report-content">{{ report }}</pre>
    </div>
  </div>
</template>

<script>
const WORKFLOW = '7530654402718269479';
export default {
    name: 'Report',
    data() {
        return {
            messages: [],
            report: '',
            loading: true
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
    }
}
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-family: 'Arial', sans-serif;
  background-color: #fcf9f9;
  min-height: 100vh;
}

.report-title {
  color: #333;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
}

.loading {
  color: #333;
  font-size: 18px;
  text-align: center;
}

.report-content {
  background: #ffffff;
  color: #333;
  padding: 40px;
  border-radius: 70px;
  width: 100%;
  max-width: 800px;
  font-size: 18px;
  white-space: pre-wrap;
  overflow-x: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加内容框阴影 */
  transition: box-shadow 0.3s ease; /* 阴影过渡效果 */
}

.report-content:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* 鼠标悬停时更深的阴影 */
}

.report-content p {
  margin: 0 0 15px 0;
  line-height: 1.6;
}

</style>
