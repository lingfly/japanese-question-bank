<template>

  <div v-if="questions.length">
    <h3>问题列表：</h3>
    <ul>
      <li v-for="(question, index) in questions" :key="index">
        <div>
          <h4>问题 {{ index + 1 }}: {{ question.description }}</h4>
          <ul>
            <li v-for="(option, optIndex) in question.options" :key="optIndex">
              选项 {{ optIndex + 1 }}: {{ option }}
            </li>
          </ul>
          <p>正确答案: 选项 {{ question.answer + 1 }}</p>
          <p>解释: {{ question.explanation }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { type Question } from '@/types'
import AddQuestion from '@/components/AddQuestion.vue'

// 获取问题列表
const questions = ref<Question[]>([]);
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
  fetchQuestions();
});



</script>

<style scoped>
.question-list {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
</style>