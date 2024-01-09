<script setup lang="tsx">
import { h, reactive } from 'vue';
import { useCrud } from '@/hooks';
import { createRoleApi, deleteRoleApi, getRolePageApi, updateRoleApi, viewRoleApi } from '@/service/api/role';
import CommonTop from '@/components/common/common-top.vue';
import RoleModal from '@/views/system/component/role/roleModal.vue';
import type { RoleItem } from '@/typings/role';
import Pagination from '@/components/common/pagination.vue';

const state = reactive({
  configMap: {
    title: '角色'
  }
});
const {
  modalFormRef,
  childRef,
  pageInfo,
  dataList,
  searchParams,
  getDataList,
  clickAdd,
  clickEdit,
  clickDelete,
  clickSearch,
  changePageIndex,
  changePageSize
} = useCrud({
  pageFunc: getRolePageApi,
  deleteFunc: deleteRoleApi
});
const columns = [
  {
    title: '序号',
    key: 'index',
    render: (_, index: number) => {
      return h('span', {}, index + 1);
    }
  },
  {
    title: '角色名称',
    key: 'name'
  },
  {
    title: '角色key',
    key: 'key',
    render: row => {
      return (
        <NTag type="success" bordered={false}>
          {row.key}
        </NTag>
      );
    }
  },
  {
    title: '角色描述',
    key: 'desc'
  },
  {
    title: '添加时间',
    key: 'addTime'
  },
  {
    title: '操作',
    key: 'action',
    render: (row: RoleItem) => {
      return (
        <CommonOperate
          v-slots={{
            left: () => (
              <NButton type="info" text>
                授权
              </NButton>
            )
          }}
          onClickEdit={() => clickEdit(row.id)}
          onClickDelete={() => clickDelete(row.id)}
        />
      );
    }
  }
];
</script>

<template>
  <div class="role-container">
    <CommonTop @click-add="clickAdd" @click-search="clickSearch">
      <template #right>
        <n-input v-model:value="searchParams.name" clearable placeholder="请输入角色名称" />
      </template>
    </CommonTop>
    <n-data-table :data="dataList" :single-line="false" :columns="columns" />
    <Pagination :page-info="pageInfo" @change-page-index="changePageIndex" @change-page-size="changePageSize" />
    <CommonModal
      ref="modalFormRef"
      :create-func="createRoleApi"
      :update-func="updateRoleApi"
      :view-func="viewRoleApi"
      :title="state.configMap.title"
      @refresh-list="getDataList"
    >
      <RoleModal ref="childRef" />
    </CommonModal>
  </div>
</template>

<style scoped></style>
