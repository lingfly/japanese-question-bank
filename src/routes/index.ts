import {createRouter, createWebHistory} from 'vue-router';
import QuestionList from '@/components/QuestionList.vue';
import Import from '@/components/Import.vue'

const route = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: QuestionList
        },
        {
            path: '/home',
            component: QuestionList
        },
        {
            path: '/import',
            component: Import
        }

    ]
})

export default route

