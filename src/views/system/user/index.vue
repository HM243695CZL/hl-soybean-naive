<script setup lang="ts">
import { onMounted, reactive, h } from 'vue';
import type { AdminItem } from '@/typings/admin';
import { getAdminPage } from '@/service/api/admin';
import Pagination from '@/components/common/pagination.vue';

const state = reactive({
  dataList: [] as AdminItem[],
  pageInfo: {
    username: '',
    pageIndex: 1,
    pageSize: 10,
    totalRecords: 0
  }
});
const columns = [
  {
    title: '序号',
    key: 'index',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (rowData: object, index: number) => {
      return h('span', {}, index + 1);
    }
  },
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '头像',
    key: 'avatar',
    render: (rowData: object) => {
      return h('img', {
        src: rowData.avatar,
        style: {
          width: '50px',
          height: '50px'
        }
      });
    }
  },
  {
    title: '添加时间',
    key: 'addTime'
  }
];
const getAdminPageList = () => {
  getAdminPage(state.pageInfo).then(res => {
    state.dataList = res.data?.list as AdminItem[];
    state.pageInfo.totalRecords = res.data?.total as number;
  });
};
const changePageIndex = (pageIndex: number) => {
  state.pageInfo.pageIndex = pageIndex;
  getAdminPageList();
};
const changePageSize = (pageSize: number) => {
  state.pageInfo.pageIndex = 1;
  state.pageInfo.pageSize = pageSize;
  getAdminPageList();
};
onMounted(() => {
  getAdminPageList();
});
</script>

<template>
  <div class="user-container">
    <n-data-table :data="state.dataList" :single-line="false" :columns="columns" />
    <Pagination :page-info="state.pageInfo" @change-page-index="changePageIndex" @change-page-size="changePageSize" />
  </div>
</template>

<style scoped></style>
