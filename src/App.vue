<template>
  <div class="app">
    <h2 class="title">demo</h2>
    <!-- 导航区 -->
    <div class="navigate">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handClick" />
    </div>
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>


</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { type MenuProps } from 'ant-design-vue';
import {useRouter} from 'vue-router';
const router = useRouter();
const current = ref<string[]>(['home']);
const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(MailOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: 'import',
    icon: () => h(AppstoreOutlined),
    label: '导入',
    title: '导入',
  },
 
]);

const handClick: MenuProps['onClick'] = e => {
  console.log("click", e)
  router.push(String(e.key));
}

</script>
