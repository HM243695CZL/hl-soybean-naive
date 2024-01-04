<script setup lang="ts">
import { reactive } from 'vue';

interface Props {
  totalRecords: number;
  pageSize: number;
  pageIndex: number;
}
interface PageInfo {
  pageInfo: Props;
}
const emits = defineEmits(['changePageIndex', 'changePageSize']);
withDefaults(defineProps<PageInfo>(), {
  pageInfo: {
    totalRecords: 0,
    pageSize: 10,
    pageIndex: 1
  }
});
const state = reactive({
  pageSizes: [10, 20, 30, 50]
});
const changePageIndex = (pageIndex: number) => {
  emits('changePageIndex', pageIndex);
};
const changePageSize = (pageSize: number) => {
  emits('changePageSize', pageSize);
};
</script>

<template>
  <div class="pagination-container flex justify-start items-center p4">
    共 {{ pageInfo.totalRecords }} 条
    <n-pagination
      class="ml4 mr2"
      :page="pageInfo.pageIndex"
      :item-count="pageInfo.totalRecords"
      :page-size="pageInfo.pageSize"
      :page-sizes="state.pageSizes"
      :show-size-picker="true"
      :show-quick-jumper="true"
      :on-update:page="changePageIndex"
      :on-update:page-size="changePageSize"
    />
    页
  </div>
</template>

<style scoped lang="scss"></style>
