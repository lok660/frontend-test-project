<template>
  <div class="rowlist-container">
    <div class="rowlist-container-title">Recommend</div>
    <div class="rowlist-container-content">
      <div
        v-for="item in rowList"
        :key="item.id.attributes['img:id']"
        class="rowlist-content-item"
      >
        <img
          v-lazy="item['im:image'][0].label"
          class="rowlist-content-item__image"
        />
        <div class="rowlist-content-item__title">
          {{ item['im:name'].label }}
        </div>
        <div class="rowlist-content-item__category">
          {{ item.category.attributes.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  rowList: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="less" scoped>
.rowlist-container {
  margin-top: 30px;
  padding: 0 35px;
}

.rowlist-container-title {
  font-size: 40px;
}

.rowlist-container-content {
  margin-top: 20px;
  overflow-x: scroll;
  width: 100%;
  display: flex;
  .rowlist-content-item {
    flex-basis: 180px;
    flex-shrink: 0;
    margin-right: 20px;
    text-align: center;
    width: 160px;
    &__image {
      width: 160px;
      height: 160px;
      border-radius: 20%;
    }
    &__title {
      padding: 5px 10px;
      max-width: 100%;
      font-size: 16px;
      color: #000;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &__category {
      padding-bottom: 5px;
      max-width: 100%;
      font-size: 12px;
      color: #c7c7c9;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
