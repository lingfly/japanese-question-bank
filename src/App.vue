<template>
  <div class="app">
    <h2 class="title">demo</h2>
    <!-- 导航区 -->
    <div class="navigate">

      <RouterLink to="/home">问题列表</RouterLink>
      <RouterLink to="/import">导入问题</RouterLink>
    </div>
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">

import { RouterLink, RouterView } from 'vue-router';
</script>

<style></style>