<template>
  <div id="app">
    <div class="chat-container">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <h2> 豆包 </h2>
        <button class="report-button" @click="showReport">
          查看报告
        </button>
      </div>
      
      <!-- 消息列表区域 -->
      <div class="chat-messages" ref="messagesContainer">
        <!-- 提醒弹窗 -->
        <RiskWarningModal
          :parentshow="showReminder"
          :parentcontent="reminder"
          @close="showReminder = false" 
        />
        <!-- 空状态提示 -->
        <div v-if="messages.length === 0" class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div>嗨，我是豆包，有什么我可以帮忙的吗</div>
        </div>
        <!-- 消息列表 -->
        <div 
          v-for="message in messages" 
          :key="message.id" 
          :class="['message', message.type]"
        >
          <div class="message-bubble" v-html="message.text">
          </div>
        </div>
        <!-- 工作流状态组件 -->
        <div v-if="isWorkflowRunning" class="workflow-status">
            <div class="workflow-card">
                <div class="workflow-content">
                    <div class="workflow-spinner"></div>
                    <span class="workflow-text">实时记录中...</span>
                </div>
            </div>
        </div>
        <!-- 正在输入指示器 -->
        <div v-if="isTyping" class="typing-indicator">
          <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input">
        <div class="input-container">
          <input
            type="text"
            class="message-input"
            placeholder="输入消息..."
            v-model="newMessage"
            @keyup.enter="sendMessage"
            @input="handleInput"
            :disabled="isTyping"
            maxlength="500"
          />
          <button
            class="send-button"
            @click="sendMessage"
            :disabled="!canSend"
            :title="canSend ? '发送消息' : '请输入内容'"
          >
            <span class="send-icon"> 发送</span>
          </button>
        </div>
        <!-- 字符计数 -->
        <div v-if="newMessage.length > 400" class="char-count">
          {{ newMessage.length }}/500
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RiskWarningModal from './RiskWarningModal.vue';
export default {
  name: 'ChatInterface',
  components:{
    RiskWarningModal
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      isTyping: false,
      messageIdCounter: 1,
      conversation_id: null,
      isWorkflowRunning: false,
      reminder: "AI给出的事实性知识有可能出现错误，请谨慎识别！",
      reminerType: null,
      showReminder: false
    };
  },
  
  computed: {
    canSend() {
      return this.newMessage.trim() && !this.isTyping;
    }
  },
  created() {
    const saved = localStorage.getItem('messages');
    if (saved) {
      this.messages = JSON.parse(saved);
    }
  },
  mounted() {
    this.createConversation();
  },
  watch: {
    messages: {
      handler(newVal) {
        localStorage.setItem('messages', JSON.stringify(newVal));
      },
      deep: true
    },
    showReminder: {
      handler(newVal) {
        if(newVal) {
           setTimeout(() => {
            this.showReminder = false;
            }, 10000);
        }
      }
    },
    reminderType(val){
      if(val === '1'){
        this.reminder = "AI给出的事实性知识有可能出现错误，请谨慎识别！";
      }
      else if(val === '2'){
        this.reminder = "AI产生的内容可能含有偏见和操控";
      }
      else if(val === '3'){
        this.reminder = "警惕黄色、暴力等有害内容或对虚拟角色的情感依赖/操纵";
      }
      else if(val === '4'){
        this.reminder = "注意独立与批判性思考，不要过度依赖AI";
      }
      else if(val === '5'){
        this.reminder = "在与AI交流的时候注意保护个人隐私";
      }
    }

  },



//   Message:
//   text,type,id
  methods: {
    showReport() {
      this.$router.push('/report');
    },

    showWelcomeMessage() {
      setTimeout(() => {
        this.addMessage({
          text: '你好！我是豆包，有什么我可以帮忙的吗？',
          type: 'received'
        });
      }, 500);
    },
    /**
     * 添加消息到列表
     */
    addMessage(messageData) {
      this.messageIdCounter++;
      const message = {
        id: Date.now() + Math.random(),
        ...messageData
      };
      this.messages.push(message);
      this.scrollToBottom();
      return message;
    },

    async sendMessage() {
      if (!this.canSend || !this.conversation_id) return;

      const messageText = this.newMessage.trim();
      
      // 添加用户消息
      this.addMessage({
        text: messageText,
        type: 'sent'
      });

      // 清空输入框
      this.newMessage = '';
      const response = await fetch(` https://api.coze.cn/v3/chat?conversation_id=${this.conversation_id}`,{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer pat_5h0X5vJNTAZF8RmkIELGq2okxkHnD9Wa1xSbIzh57ppqQ9U7Odp5SSaEHpqrAhlc',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: '000',
                bot_id: '7529741715528974370',
                role: 'user',
                stream: true,
                additional_messages: [{
                    role: 'user',
                    content: messageText,
                    content_type: 'text'
                }],
            }),
        });
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      while (true) { 
        const { done, value } = await reader.read(); // value 是当前读取到的 chunk（二进制数据）
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop(); // 留下不完整的块
        for(const event of events) {
            const lines = event.trim().split('\n');
            const eventLine = lines.find(line => line.startsWith('event:'));
            const dataLine = lines.find(line => line.startsWith('data:'));
            if (!eventLine || !dataLine) continue;
            const eventType = eventLine.replace('event:','').trim();
            const data = JSON.parse(dataLine.replace('data:','').trim());
            
            switch (eventType) {
                case 'conversation.message.completed':
                    if(data.type === 'answer') { 
                        console.log('Message From AI:', data.content);
                    }
                    break;
                case 'conversation.chat.created':
                    this.addMessage({
                        text: '',
                        type: 'received'
                    });
                    break;
                case 'conversation.message.delta':
                    this.messages[this.messages.length - 1].text += data.content;
                    break;
                default:
                    break;
            }
        }
      }
      // // FOR TEST
      // const chatMessage = JSON.stringify(this.messages.slice(-10));
      // this.getLiteracy(chatMessage);
      // THIS IS THE REAL ONE
      console.log(this.messageIdCounter);
      if(this.messageIdCounter % 10 == 1) {
        const chatMessage = JSON.stringify(this.messages.slice(-10));
        console.log(chatMessage);
        this.getLiteracy(chatMessage);
      }
    },
    // 工作流
    async getLiteracy(chatMessage) {
        this.isWorkflowRunning = true;
        const response = await fetch('https://api.coze.cn/v1/workflow/run',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer pat_5h0X5vJNTAZF8RmkIELGq2okxkHnD9Wa1xSbIzh57ppqQ9U7Odp5SSaEHpqrAhlc',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workflow_id: '7529517578143498294',
                parameters: {
                    input: chatMessage
                }
            })
        });
        const responsejson = await response.json();
        const data = JSON.parse(responsejson.data);
        console.log(data);
        this.lack_literacy = data.lack_literacy;
        console.log(data.lack_literacy);
        if(data.lack_literacy == 1) {
            this.reminderType = data.reminder;
            this.showReminder = true;
        }
        console.log(this.reminder);
        console.log(this.showReminder);
        this.isWorkflowRunning = false;
        
    },


    /**
     * 滚动到底部
     */
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    /**
     * 处理输入事件
     */
    handleInput(event) {
      // 可以在这里添加输入处理逻辑，比如表情符号转换等
      this.newMessage = event.target.value;
    },

    async createConversation() {
        const response = await fetch('https://api.coze.cn/v1/conversation/create',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer pat_5h0X5vJNTAZF8RmkIELGq2okxkHnD9Wa1xSbIzh57ppqQ9U7Odp5SSaEHpqrAhlc',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bot_id: '7529741715528974370' // 测试的机器人
            })
        });
        const responsejson = await response.json();
        this.conversation_id = responsejson.data.id;
        console.log(this.conversation_id);
    },
    
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f7fbff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.chat-container {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 聊天头部样式 */
.chat-header {
  color: #cbd5e1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.chat-header h2 {
  position: relative;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 0;
}





@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 消息区域样式 */
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f8fafc;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  color: #64748b;
  margin-top: 50px;
}

.empty-state-icon {
  font-size: 48px;
  margin-bottom: 10px;
  opacity: 0.3;
}

/* 消息样式 */
.message {
  margin-bottom: 15px;
  animation: messageSlide 0.3s ease-out;
}

@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.sent {
  text-align: right;
}
.message.received {
  text-align: left;
}

.message-bubble {
  display: inline-block;
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  word-break: break-word;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.4;
}

.message.received .message-bubble {
  background: white;
  color: #333;
  border-bottom-left-radius: 5px;
  border: 1px solid #e2e8f0;
}

.message.sent .message-bubble {
  background:  #eff0f1;
  color: black;
  border-bottom-right-radius: 5px;
}

.message-time {
  font-size: 11px;
  opacity: 0.6;
  margin-top: 5px;
}

/* 正在输入指示器 */
.typing-indicator {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: white;
  border-radius: 18px;
  border-bottom-left-radius: 5px;
  max-width: 70%;
  margin-bottom: 15px;
  animation: messageSlide 0.3s ease-out;
  border: 1px solid #e2e8f0;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: #94a3b8;
  border-radius: 50%;
  animation: typingBounce 1.4s infinite ease-in-out both;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typingBounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 输入区域样式 */
.chat-input {
  padding: 20px;
  background: white;
  border-top: 1px solid #e2e8f0;
}

.input-container {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e6e8;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
  transition: all 0.3s ease;
  resize: none;
  min-height: 45px;
  max-height: 100px;
}

.message-input:focus {
  border-color: #c7c5c5;
}

.message-input:disabled {
  background-color: #f1f5f9;
  cursor: not-allowed;
}

.send-button {
  width: 76px;
  height: 45px;
  background: linear-gradient(45deg, #202020 0%, #141414 100%);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.send-button:active:not(:disabled) {
  transform: translateY(0);
}

.send-button:disabled {
  background: #d2d3d3;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.send-icon {
  font-size: 16px;
}

.char-count {
  font-size: 12px;
  color: #64748b;
  text-align: right;
  margin-top: 5px;
}

/* 响应式设计 */
@media (max-width: 480px) {
  #app {
    padding: 10px;
  }
  
  .chat-container {
    height: calc(100vh - 20px);
    border-radius: 15px;
  }
  
  .chat-messages {
    padding: 15px;
  }
  
  .chat-input {
    padding: 15px;
  }
  
  .message-bubble {
    max-width: 85%;
  }
}

/* 工作流 */
.workflow-status {
    margin: 16px 0;
    display: flex;
    justify-content: center;
}

.workflow-card {
    background: white;
    border: 2px solid #e8eaed;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    background: white
}

.workflow-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.workflow-text {
    font-size: 14px;
    color: black;
    font-weight: 500;
}

/* 加载动画 */
.workflow-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid black;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.report-button {
  background: black;
  color: white;
  border: 1px solid rgba(201, 200, 204, 0.3);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  position: absolute;
  right: 16px;   /* 让按钮靠右 */
}

.report-button:hover {
  background: rgba(57, 57, 59, 0.3);
}


.reminder-popup {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 999;
  font-size: 18px;
}
#risk-warning-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

</style>