<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';

const formRef = ref();
const state = reactive({
  isShowDialog: false,
  ruleForm: {
    username: '',
    avatar: '',
    id: null,
    roleIds: []
  },
  rules: {
    username: {
      required: true,
      trigger: 'blur',
      message: '请输入用户名称'
    }
  }
});
const resetForm = () => {
  // eslint-disable-next-line guard-for-in
  for (const o in state.ruleForm) {
    state.ruleForm[o] = '';
  }
};
const openDialog = () => {
  state.isShowDialog = true;
  nextTick(() => {
    resetForm();
    formRef.value.restoreValidation();
  });
};
const closeDialog = () => {
  state.isShowDialog = false;
};
const clickConfirm = () => {
  formRef.value.validate(errors => {
    if (!errors) {
      console.log(state.ruleForm);
    }
  });
};
defineExpose({
  formRef,
  openDialog
});
</script>

<template>
  <n-modal :show="state.isShowDialog" preset="dialog" title="新增用户" :show-icon="false" :on-close="closeDialog">
    <n-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-placement="left"
      require-mark-placement="left"
    >
      <n-form-item label="用户名称" path="username">
        <n-input v-model:value="state.ruleForm.username" placeholder="请输入用户名称"></n-input>
      </n-form-item>
    </n-form>
    <template #action>
      <n-button type="primary" @click="clickConfirm">确定</n-button>
      <n-button @click="closeDialog">取消</n-button>
    </template>
  </n-modal>
</template>

<style scoped></style>
