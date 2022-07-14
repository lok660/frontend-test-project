<template>
  <div class="columnlist-container">
    <VirtualScrollList
      v-if="props.isLoaded && props.columnList.length > 0"
      ref="el"
      :fixed-block-height="100"
      :page-mode="false"
      :height="700"
      :data="props.columnList"
    >
      <template #default="item">
        <div class="columnlist-item">
          <div class="columnlist-item-num">{{ item.num }}</div>
          <img v-lazy="item.imageUrl" alt="" class="columnlist-item-image" />
          <div class="columnlist-item-info">
            <div class="columnlist-item-info__title">{{ item.trackName }}</div>
            <div class="columnlist-item-info__category">
              {{ item.category }}
            </div>
            <div class="columnlist-item-info__rate">
              <van-rate
                v-model="item.averageUserRating"
                name="star"
                allow-half
                readonly
                size="10"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                class="columnlist-item-info__rate__star"
              />
              <span class="columnlist-item-info__rate__num">{{
                `(${item.userRatingCount})`
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </VirtualScrollList>
    <div v-else-if="!props.isLoaded" class="columnlist-container-empty">
      Waiting For Loading...
    </div>
    <div
      v-else-if="props.isLoaded && props.columnList.length <= 0"
      class="columnlist-container-empty"
    >
      Sorry, No Result
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, defineProps } from 'vue'

const VirtualScrollList = defineAsyncComponent(() =>
  import('./VirtualScrollList.vue')
)

const props = defineProps({
  columnList: {
    type: Array,
    default: () => [],
  },
  isLoaded: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" scoped>
.columnlist-container {
  width: 100%;
  margin-top: 10px;
  padding: 15px 35px 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  overflow-x: hidden;
  border-top: 3px solid #eee;
}

.columnlist-container-empty {
  margin: 70px;
  text-align: center;
}
.columnlist-item {
  display: flex;
  align-items: center;
  height: 100%;
  border-bottom: 3px solid #eee;
  .columnlist-item-num {
    font-size: 24px;
    width: 30px;
    color: #ccc;
  }
  .columnlist-item-image {
    width: 80px;
    height: 80px;
    margin: 0 20px;
  }
  .columnlist-item-info {
    flex: 1;
    .columnlist-item-info__title {
      font-size: 24px;
      white-space: nowrap;
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
    }
    .columnlist-item-info__category {
      margin: 5px 0;
      font-size: 20px;
      color: #c7c7c9;
    }
    .columnlist-item-info__rate {
      display: flex;
      align-items: center;
      &__num {
        color: #c7c7c9;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
</style>
