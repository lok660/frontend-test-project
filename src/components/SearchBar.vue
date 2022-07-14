<template>
  <div class="search-container">
    <div class="search-container-main">
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="Search"
        class="search-container__input"
        @keyup.enter="$emit('search', searchKeyword)"
        @keyup.esc="searchKeyword = ''"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchKeyword = ref('')
</script>

<style lang="less" scoped>
.search-container {
  height: 60px;
  .search-container-main {
    margin: 0 auto;
    position: relative;
    height: 60px;
    width: 90%;
  }
  .search-container__input {
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    background-color: #f4f4f4;
    border-radius: 5px;
    padding: 0 40px;
    border-radius: 30px;
    font-size: 20px;
    color: #666;
    outline: none;
    box-sizing: border-box;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
