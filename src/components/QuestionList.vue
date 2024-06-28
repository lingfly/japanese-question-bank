<template>
  <a-list item-layout="vertical" :data-source="questions">
    <template #renderItem="{ item, index }">
      <a-list-item>
        <a-card hoverable >
          <a-card :title="item.description" :bordered="false">
          </a-card>
          <a-card>
            <a-radio-group v-model:value="selectedValues[index]" name="radioGroup">
              <a-radio :style="radioStyle" value="1">{{ item.options[0] }}</a-radio>
              <a-radio :style="radioStyle" value="2">{{ item.options[1] }}</a-radio>
              <a-radio :style="radioStyle" value="3">{{ item.options[2] }}</a-radio>
              <a-radio :style="radioStyle" value="4">{{ item.options[3] }}</a-radio>
            </a-radio-group>
          </a-card>
          <a-card v-if="selectedValues[index] !== null" hoverable>
            <div v-if="selectedValues[index] == item.answer" class="correct-answer">
              <p v-if="!isShows[index]" class="center-text">正确</p>
              <a-button v-if="!isShows[index]" type="primary" @click="explain(index)">解析</a-button>
              <p v-if="isShows[index]" class="answer-text">{{ item.explanation }}</p>
            </div>
            <div v-else>
              <p>错误！</p>
              <p class="answer-text">{{ item.explanation }}</p>
            </div>
          </a-card>
        </a-card>
      </a-list-item>
    </template>
  </a-list>

</template>




<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { type Question } from '@/types'
import AddQuestion from '@/components/AddQuestion.vue'



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
  },
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
  },
]);
const selectedValues = ref<{ [key: number]: number | null }>({});
const isShows = ref<boolean[]>([]); 
questions.value.forEach((_, index) => {
  selectedValues.value[index] = null;
})

const fetchQuestions = async () => {
  try {
    const response = await axios.post('/ques/list', {});
    questions.value = response.data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
  }
};
 const explain = (index : number) => {
  isShows.value[index] = true;
 }

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

.correct-answer {
  display: flex;
  align-items: center;
}

.correct-answer p {
  margin-right: 8px;
}
.center-text{
  text-align: center;
  margin: 0; /* 移除默认的上下边距 */
}
.answer-text{
  white-space: pre-line;
}
</style>