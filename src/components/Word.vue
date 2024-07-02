<template>

  <a-list item-layout="vertical" :data-source="words">
    <template #renderItem="{ item, index }">
      <a-list-item>
        <a-card hoverable>
          <!-- 题目 -->
          <a-card :bordered="false">
            <template #title>
              <span v-html="item.description"></span>
            </template>
          </a-card>
          <!-- 选项 -->
          <a-card>
            <a-radio-group v-model:value="selectedValues[index]" name="radioGroup">
              <a-radio :style="radioStyle" value="1">{{ item.options[0] }}</a-radio>
              <a-radio :style="radioStyle" value="2">{{ item.options[1] }}</a-radio>
              <a-radio :style="radioStyle" value="3">{{ item.options[2] }}</a-radio>
              <a-radio :style="radioStyle" value="4">{{ item.options[3] }}</a-radio>
            </a-radio-group>
          </a-card>
          <!-- 答案和解析 -->
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
import { reactive, ref, onMounted, defineProps } from 'vue'
import { type Question } from '@/types'

const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
// 获取文字题列表
const props = defineProps<{ questions: Question[] }>()
const words = ref<Question[]>(props.questions)

// 已选的选项
const selectedValues = ref<{ [key: number]: number | null }>({});

// 答案是否显示
const isShows = ref<boolean[]>([]);
words.value.forEach((_, index) => {
  selectedValues.value[index] = null;
})

// 显示答案
const explain = (index: number) => {
  isShows.value[index] = true;
}

// 组件加载
onMounted(() => {
  // 关键字加下划线
  words.value.forEach((item) => {
    item.description = item.description.replace(item.keyword, "<u>" + item.keyword + "</u>");
  })
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

.center-text {
  text-align: center;
  margin: 0;
  /* 移除默认的上下边距 */
}

.answer-text {
  /*文本中的/n自动换行 */
  white-space: pre-line;
}
</style>