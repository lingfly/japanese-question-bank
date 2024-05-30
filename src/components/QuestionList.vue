<template>
  <div class="create-question">

    <form @submit.prevent="createQustion">
      <div class="form-group">
        <label for="question-title">问题标题:</label>
        <input type="text" id="question-title" v-model="question.title" required />
      </div>
      <div class="form-group">
        <label for="question-description">问题描述:</label>
        <textarea id="question-description" v-model="question.description" required></textarea>
      </div>
      <button type="submit">提交</button>
    </form>
  </div>
  <div class="question-list">
    <div v-for="question in questions" :key="question.id" :question="question">
      <h2>{{ question.title }}</h2>
      <p>{{ question.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
class Question {
  id: number;
  title: string;
  description: string;

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

}
function newQuestion(src:Question ): Question {
  return new Question(src.id, src.title, src.description);
}
const questions = ref<Question[]>([]);
const question = ref<Question>({
  id: 0,
  title: '',
  description: ''
});
questions.value = [
  { id: 1, title: '题目1', description: '这是题目1的描述' },
  { id: 2, title: '题目2', description: '这是题目2的描述' },
  { id: 3, title: '题目3', description: '这是题目3的描述' },
];
let id = 4;
function createQustion() {
  question.value.id = id++;
  questions.value.push(newQuestion(question.value));
  question.value.title = '';
  question.value.description = '';
}



</script>

<style scoped>
.question-list {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

.create-question {
  text-align: left;
  margin: 0 auto;
  max-width: 600px;
}
</style>