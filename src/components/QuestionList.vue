<template>
  <a-card hoverable>

    <a-card :title="questions[0].description" :bordered="false">

    </a-card>

    <a-card>
      <a-radio-group v-model:value="selectValue" name="radioGroup">
        <a-radio :style="radioStyle" value="1">{{questions[0].options[0]}}</a-radio>
        <a-radio :style="radioStyle" value="2">{{questions[0].options[1]}}</a-radio>
        <a-radio :style="radioStyle" value="3">{{questions[0].options[2]}}</a-radio>
        <a-radio :style="radioStyle" value="4">{{questions[0].options[3]}}</a-radio>
      </a-radio-group>
    </a-card>
    <a-card v-if="selectValue !== null" hoverable>
      <p v-if="selectValue == questions[0].answer">正确</p>
      <div v-else>
        <p>错误！</p>
        <p :style="{ whiteSpace: 'pre-line' }">{{ questions[0].explanation }}</p>
      </div>
      
    </a-card>
  </a-card>
</template>




<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { type Question } from '@/types'
import AddQuestion from '@/components/AddQuestion.vue'


const selectValue = ref<number | null>(null);
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
// 获取问题列表
const questions = ref<Question[]>([
  {
    description: "プレゼントはきれいな紙で包んであった。",
    options: [
      "1. つつんで",
      "2. つづんで",
      "3. つうつんで",
      "4. つうづんで"
    ],
    answer: 1,
    explanation: "正解：1\n句意：礼物用漂亮的纸包着。\n解析：包む（つつむ）【他五】包上"
  }
]);
const fetchQuestions = async () => {
  try {
    const response = await axios.post('/ques/list', {});
    questions.value = response.data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
  }
};

// 组件加载时获取问题列表
onMounted(() => {
  // fetchQuestions();
});



</script>

<style scoped>
.question-list {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
</style>