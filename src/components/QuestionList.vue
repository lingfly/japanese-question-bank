<template>
  <AddQuestion />

  <div class="question-list">
    <div v-for="question in questions" :key="question.id" :question="question">
      <h2>{{ question.title }}</h2>
      <p>{{ question.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Question from '@/types'
import AddQuestion from '@/components/AddQuestion.vue'

// 获取问题列表
const questions = ref<Question[]>();
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