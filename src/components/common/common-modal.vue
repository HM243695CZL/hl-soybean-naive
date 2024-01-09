<script setup lang="ts">
import { useCommonModal } from '@/hooks';

interface Props {
  title: string;
  createFunc?: () => void;
  updateFunc?: () => void;
  viewFunc?: () => void;
  otherInitMethod?: () => void;
}

interface Emits {
  (e: 'refresh-list'): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const emitRefreshList = () => {
  emit('refresh-list');
};
const { openDialog, closeDialog, clickConfirm, isShowDialog, title } = useCommonModal({
  createFunc: props.createFunc,
  updateFunc: props.updateFunc,
  viewFunc: props.viewFunc,
  title: props.title,
  refreshList: emitRefreshList,
  otherInitMethod: props.otherInitMethod
});

defineExpose({
  openDialog
});
</script>

<template>
  <n-modal :title="title" :show="isShowDialog" preset="dialog" :show-icon="false" :on-close="closeDialog">
    <slot></slot>
    <template #action>
      <n-button @click="closeDialog">取消</n-button>
      <n-button type="primary" @click="clickConfirm">确定</n-button>
    </template>
  </n-modal>
</template>

<style scoped></style>
