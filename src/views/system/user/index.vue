<script setup lang="tsx">
import { onMounted, reactive, h, ref } from 'vue';
import { useCrud } from '@/hooks';
import type { AdminItem } from '@/typings/admin';
import { createAdminApi, deleteAdminApi, getAdminPageApi, updateAdminApi, viewAdminApi } from '@/service/api/admin';
import Pagination from '@/components/common/pagination.vue';
import UserModal from '@/views/system/component/user/userModal.vue';
import PasswordConfirm from '@/views/system/component/user/passwordConfirm.vue';
import CommonModal from '@/components/common/common-modal.vue';
import CommonOperate from '@/components/common/common-operate.vue';
import CommonTop from '@/components/common/common-top.vue';
import type { RoleItem } from '@/typings/role';
import { getRoleListApi } from '@/service/api/role';

const passwordConfirmRef = ref();
const state = reactive({
  roleList: [] as RoleItem[],
  configMap: {
    title: '用户'
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
  pageFunc: getAdminPageApi,
  deleteFunc: deleteAdminApi
});

const clickEditPass = (row: AdminItem) => {
  passwordConfirmRef.value.openDialog(row.id);
};
const getRoleList = () => {
  getRoleListApi().then(res => {
    state.roleList = res.data as RoleItem[];
  });
};

const initAvatar = (row: AdminItem) => {
  childRef.value.state.fileList = [];
  if (row) {
    const fileName = row.avatar.split('/').pop();
    childRef.value.state.fileList = [
      {
        id: row.id,
        name: fileName,
        url: row.avatar,
        status: 'finished'
      }
    ];
  }
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
      return (row.roles || []).map((item: string) => (
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
    render: (row: AdminItem) => {
      return (
        <CommonOperate
          v-slots={{
            left: () => (
              <NButton type="info" text onClick={() => clickEditPass(row)}>
                修改密码
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
onMounted(() => {
  getRoleList();
});
</script>

<template>
  <div class="user-container">
    <CommonTop @click-add="clickAdd" @click-search="clickSearch">
      <template #right>
        <n-input v-model:value="searchParams.username" clearable placeholder="请输入用户名称" />
      </template>
    </CommonTop>
    <n-data-table :data="dataList" :single-line="false" :columns="columns" />
    <Pagination :page-info="pageInfo" @change-page-index="changePageIndex" @change-page-size="changePageSize" />
    <PasswordConfirm ref="passwordConfirmRef" />
    <CommonModal
      ref="modalFormRef"
      :create-func="createAdminApi"
      :update-func="updateAdminApi"
      :view-func="viewAdminApi"
      :title="state.configMap.title"
      :other-init-method="initAvatar"
      @refresh-list="getDataList"
    >
      <UserModal ref="childRef" :role-list="state.roleList" />
    </CommonModal>
  </div>
</template>

<style scoped></style>
