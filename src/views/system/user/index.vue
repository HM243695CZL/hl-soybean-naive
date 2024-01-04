<script setup lang="tsx">
import { onMounted, reactive, h } from 'vue';
import type { AdminItem, AdminPage } from '@/typings/admin';
import { getAdminPage } from '@/service/api/admin';
import Pagination from '@/components/common/pagination.vue';

const state = reactive({
  dataList: [] as AdminItem[],
  pageInfo: {
    username: '',
    pageIndex: 1,
    pageSize: 10,
    totalRecords: 0
  } as AdminPage
});

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
const clickEditPass = row => {
  console.log(row);
};
const clickEdit = row => {
  console.log(row);
};
const clickDelete = row => {
  console.log(row);
};
const columns = [
  {
    title: '序号',
    key: 'index',
    render: (_, index: number) => {
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
    title: '关联角色',
    key: 'roles',
    render: row => {
      return row.roles.map((item: string) => (
        <NTag type="success" bordered={false}>
          {item}
        </NTag>
      ));
    }
  },
  {
    title: '添加时间',
    key: 'addTime'
  },
  {
    title: '操作',
    key: 'action',
    render: row => {
      return (
        <NSpace>
          <NButton type="info" text onClick={() => clickEditPass(row)}>
            修改密码
          </NButton>
          <NButton type="info" text onClick={() => clickEdit(row)}>
            编辑
          </NButton>
          <NButton type="error" text onClick={() => clickDelete(row)}>
            删除
          </NButton>
        </NSpace>
      );
    }
  }
];
onMounted(() => {
  getAdminPageList();
});
</script>

<template>
  <div class="user-container">
    <div class="content bg-white p4">
      <n-space class="mb4">
        <n-input v-model="state.pageInfo.username" placeholder="请输入用户名称" />
        <n-button type="default">查询</n-button>
        <n-button type="primary">新增</n-button>
      </n-space>
      <n-data-table :data="state.dataList" :single-line="false" :columns="columns" />
      <Pagination :page-info="state.pageInfo" @change-page-index="changePageIndex" @change-page-size="changePageSize" />
    </div>
  </div>
</template>

<style scoped></style>
