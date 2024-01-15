<script setup lang="tsx">
import { onMounted, reactive } from 'vue';
import { useCrud } from '@/hooks';
import { createMenuApi, deleteMenuApi, getMenuListApi, updateMenuApi, viewMenuApi } from '@/service/api/menu';
import type { MenuItem } from '@/typings/menu';
import MenuModal from '@/views/system/component/menu/menuModal.vue';

const state = reactive({
  configMap: {
    title: '菜单'
  },
  menuList: [] as Array<MenuItem>
});
const { modalFormRef, childRef, clickAdd, clickEdit, clickDelete } = useCrud({
  deleteFunc: deleteMenuApi,
  isMountedLoad: false
});
const getMenuList = () => {
  getMenuListApi().then(res => {
    if (!res.error) {
      state.menuList = res.data;
    }
  });
};
const rowKey = (row: MenuItem) => row.id;
const columns = [
  {
    title: '菜单名称',
    key: 'title'
  },
  {
    title: '路由路径',
    key: 'path'
  },
  {
    title: '组件路径',
    key: 'component'
  },
  {
    title: '权限标识',
    key: 'roles',
    render: row => {
      return (
        <NSpace>
          {(row.roles || []).map(item => {
            return (
              <NTag type="success" bordered={false}>
                {item}
              </NTag>
            );
          })}
        </NSpace>
      );
    }
  },
  {
    title: '菜单图标',
    key: 'icon',
    render: row => {
      return <SvgIcon icon={row.icon}></SvgIcon>;
    }
  },
  {
    title: '是否隐藏',
    key: 'isHide',
    render: (row: MenuItem) => {
      return (
        <NTag type={row.isHide ? 'error' : 'success'} bordered={false}>
          {row.isHide ? '是' : '否'}
        </NTag>
      );
    }
  },
  {
    title: '排序',
    key: 'sort'
  },
  {
    title: '操作',
    key: 'action',
    render: (row: MenuItem) => {
      return <CommonOperate onClickEdit={() => clickEdit(row.id)} onClickDelete={() => clickDelete(row.id)} />;
    }
  }
];
onMounted(() => {
  getMenuList();
});
</script>

<template>
  <div class="menu-container">
    <CommonTop @click-add="clickAdd" @click-search="getMenuList" />
    <n-data-table :data="state.menuList" :row-key="rowKey" :columns="columns" />
    <CommonModal
      ref="modalFormRef"
      :create-func="createMenuApi"
      :update-func="updateMenuApi"
      :view-func="viewMenuApi"
      :title="state.configMap.title"
      :style="{
        width: '800px'
      }"
      @refresh-list="getMenuList"
    >
      <MenuModal ref="childRef" :menu-list="state.menuList" />
    </CommonModal>
  </div>
</template>

<style scoped></style>
