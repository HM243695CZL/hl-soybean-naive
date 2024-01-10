<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import type { MenuItem } from '@/typings/menu';
import { setAuthApi, viewAuthApi } from '@/service/api/role';

interface Props {
  menuList: Array<MenuItem>;
}
const props = defineProps<Props>();
const message = useMessage();
const treeRef = ref();
const state = reactive({
  isShowDialog: false,
  title: '分配权限',
  menuIds: [],
  treeFlag: false,
  roleId: null as number
});
const openDialog = (id: number) => {
  state.treeFlag = false;
  state.isShowDialog = true;
  state.roleId = id;
  nextTick(() => {
    viewAuthApi(id).then(res => {
      if (!res.error) {
        state.treeFlag = true;
        state.menuIds = res.data;
      }
    });
  });
};
const tranMenuList = list => {
  // 如果children为空，删除children属性
  list.forEach(item => {
    if (item.children && item.children.length === 0) {
      delete item.children;
    }
    if (item.children) {
      tranMenuList(item.children);
    }
  });
  return list;
};
const closeDialog = () => {
  state.isShowDialog = false;
};
const clickConfirm = () => {
  setAuthApi({
    id: state.roleId,
    menuIds: treeRef.value.getCheckedData().keys
  }).then((res: any) => {
    if (!res.error) {
      message.success(res.originData?.message as string);
      closeDialog();
    }
  });
};
defineExpose({
  openDialog
});
</script>

<template>
  <n-modal :show="state.isShowDialog" preset="dialog" :title="state.title" :show-icon="false" :on-close="closeDialog">
    <n-tree
      v-if="state.treeFlag"
      ref="treeRef"
      block-line
      checkable
      cascade
      :data="tranMenuList(props.menuList)"
      :default-checked-keys="state.menuIds"
      label-field="title"
      key-field="id"
    />
    <template #action>
      <n-button @click="closeDialog">取消</n-button>
      <n-button type="primary" @click="clickConfirm">确定</n-button>
    </template>
  </n-modal>
</template>

<style scoped></style>
