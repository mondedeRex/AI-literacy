<template>
  <section id="risk-warning-modal" v-if="parentshow">
    <div
      class="risk-notice-card"
      role="dialog"
      aria-labelledby="dialogTitle"
      aria-describedby="dialogDesc"
    >
      <header class="card-header">
        <h2 id="dialogTitle" class="card-title">风险提示</h2>
      </header>
      <hr class="divider" />
      <div class="card-body">
        <p id="dialogDesc" class="card-text">
          {{ parentcontent }}
        </p>
      </div>
      <footer class="card-footer">
        <button class="confirm-button" @click="closeModal">我已知晓</button>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RiskWarningModal',
  props: {
    parentshow: {
      type: Boolean,
      default: false
    },
    parentcontent: {
      type: String,
      default: "AI给出的事实性知识有可能出现错误，请谨慎识别！"
    }
  },
  methods: {
    closeModal() {
      this.visible = false;
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #E5E5E5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.risk-notice-card {
  background-color: #ffffff;
  border-radius: 22px;
  box-shadow: 0px 4.35px 21.75px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 344px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-title {
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.2;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  color: #000000;
}

.divider {
  border: none;
  height: 1px;
  background-color: #EAEAEA;
  margin: 0 0 18px 0;
}

.card-body {
  margin-bottom: 24px;
}

.card-text {
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.confirm-button {
  color: rgba(255, 255, 255, 0.8);
  background-color: #000000;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.2;
  border: none;
  border-radius: 999px;
  padding: 8px 18px;
  cursor: pointer;
}
</style>
