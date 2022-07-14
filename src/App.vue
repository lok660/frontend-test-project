<template>
  <SearchBar @search="handleSearch" />
  <RowList v-if="listData.rowList.length > 0" :rowList="listData.rowList" />
  <ColumnList :columnList="listData.columnList" :isLoaded="isLoaded" />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import { SearchBar, RowList, ColumnList } from '@/components'
import { getTopFreeAppsAPI, getAppAPI, getTopGrossingAppsAPI } from '@/api'
import { ROW_LIST_LIMIT, COLUMN_LIST_LIMIT } from '@/config'

const isLoaded = ref(false)
const listData = reactive({
  rowList: [],
  columnList: [],
  originRowList: [],
  originColumnList: [],
})

async function fetchRowList() {
  const response = await getTopGrossingAppsAPI({
    limit: ROW_LIST_LIMIT,
  })
  listData.originRowList = listData.rowList = response.feed.entry
}
async function fetchColumnList() {
  isLoaded.value = false
  const response = await getTopFreeAppsAPI({
    limit: COLUMN_LIST_LIMIT,
  })

  const list = response.feed.entry || []
  const ids = list.map((item) => item.id.attributes['im:id']).join(',')
  const detailsResponse = await getAppAPI({ ids })

  listData.originColumnList = listData.columnList = (
    detailsResponse.results || []
  ).map((item, index) => {
    return {
      ...item,
      id: list[index].id.attributes['im:id'],
      category: list[index].category.attributes.label,
      developer: list[index]['im:artist'].label,
      imageUrl: list[index]['im:image'][0].label,
      num: index + 1,
    }
  })
  isLoaded.value = true
}

function handleSearch(searchKeywords) {
  const searchRowResult = []
  const searchColumnResult = []
  listData.originRowList.forEach((item) => {
    if (item['im:name'].label.includes(searchKeywords)) {
      searchRowResult.push(item)
    }
  })
  listData.originColumnList.forEach((item) => {
    if (
      item.category.indexOf(searchKeywords) > -1 ||
      item.trackName.indexOf(searchKeywords) > -1 ||
      item.developer.indexOf(searchKeywords) > -1
    ) {
      searchColumnResult.push(item)
    }
  })
  listData.rowList = searchRowResult
  listData.columnList = searchColumnResult
}

onMounted(async () => {
  fetchRowList()
  fetchColumnList()
})
</script>
