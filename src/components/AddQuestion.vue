<template>
    <div id="app">
        <button @click="showModal = true">添加问题</button>

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2>添加问题</h2>
                <form @submit.prevent="submitForm">
                    <div>
                        <label for="description">问题描述：</label>
                        <input type="text" id="description" v-model="newQuestion.description" required />
                    </div>
                    <div>
                        <label for="option1">选项1：</label>
                        <input type="text" id="option1" v-model="newQuestion.options[0]"  />
                    </div>
                    <div>
                        <label for="option2">选项2：</label>
                        <input type="text" id="option2" v-model="newQuestion.options[1]"  />
                    </div>
                    <div>
                        <label for="option3">选项3：</label>
                        <input type="text" id="option3" v-model="newQuestion.options[2]"  />
                    </div>
                    <div>
                        <label for="option4">选项4：</label>
                        <input type="text" id="option4" v-model="newQuestion.options[3]"  />
                    </div>
                    <div>
                        <label for="answer">正确答案（选项编号）：</label>
                        <input type="number" id="answer" v-model="newQuestion.answer"  />
                    </div>
                    <div>
                        <label for="explanation">解释：</label>
                        <input type="text" id="explanation" v-model="newQuestion.explanation"  />
                    </div>
                    <button type="submit">提交</button>
                    <button type="button" @click="showModal = false">取消</button>
                </form>
            </div>
        </div>

        
    </div>
</template>

<script lang="ts" setup name="AddQuestion">
import { ref } from 'vue';
import axios from 'axios';
import { type Question } from '@/types';

const showModal = ref(false);
const newQuestion = ref < Question > ({
    description: '',
    options: ['', '', '', ''],
    answer: 0,
    explanation: ''
});
const questions = ref<Question[]>([]);

const submitForm = async () => {
    if (newQuestion.value.description.trim()) {
        try {
            const response = await axios.post('/ques/add', {
                description: newQuestion.value.description.trim(),
                options: newQuestion.value.options.map(opt => opt.trim()),
                answer: newQuestion.value.answer,
                explanation: newQuestion.value.explanation.trim()
            });

            // 假设API返回新添加的问题
            questions.value.push(response.data);
            newQuestion.value = {
                description: '',
                options: ['', '', '', ''],
                answer: 0,
                explanation: ''
            };
            showModal.value = false;
        } catch (error) {
            console.error('Failed to add question:', error);
        }
    }
};


</script>

<style scoped>
/* 添加一些基本的样式 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
}

button {
    margin: 5px;
}
</style>