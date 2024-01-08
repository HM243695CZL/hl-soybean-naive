<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { updatePassApi } from '@/service/api/admin';

const formRef = ref();
const message = useMessage();
const state = reactive({
  isShowDialog: false,
  title: '修改密码',
  ruleForm: {
    id: 0,
    password: '',
    confirmPassword: ''
  },
  rules: {
    password: {
      required: true,
      trigger: 'blur',
      message: '请输入新密码'
    },
    confirmPassword: {
      required: true,
      trigger: 'blur',
      message: '请再次确认新密码'
    }
  }
});
const resetForm = () => {
  // eslint-disable-next-line guard-for-in
  for (const o in state.ruleForm) {
    state.ruleForm[o] = '';
  }
};
const openDialog = (id: number) => {
  state.isShowDialog = true;
  nextTick(() => {
    resetForm();
    formRef.value.restoreValidation();
    state.ruleForm.id = id;
  });
};
const closeDialog = () => {
  state.isShowDialog = false;
};
const clickConfirm = () => {
  formRef.value.validate(errors => {
    if (!errors) {
      const { password, confirmPassword } = state.ruleForm;
      if (password !== confirmPassword) {
        message.error('两次输入的密码不一致');
        return;
      }
      updatePassApi({
        id: state.ruleForm.id,
        password
      }).then(res => {
        if (res.data) {
          message.success(res.originData?.message as string);
          closeDialog();
        }
      });
    }
  });
};
defineExpose({
  openDialog
});
</script>

<template>
  <n-modal :show="state.isShowDialog" preset="dialog" :title="state.title" :show-icon="false" :on-close="closeDialog">
    <n-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-placement="left"
      :label-width="100"
      require-mark-placement="left"
    >
      <n-form-item label="新密码" path="password">
        <n-input v-model:value="state.ruleForm.password" placeholder="请输入新密码"></n-input>
      </n-form-item>
      <n-form-item label="确认密码" path="confirmPassword">
        <n-input v-model:value="state.ruleForm.confirmPassword" placeholder="请再次确认新密码"></n-input>
      </n-form-item>
    </n-form>
    <template #action>
      <n-button @click="closeDialog">取消</n-button>
      <n-button type="primary" @click="clickConfirm">确定</n-button>
    </template>
  </n-modal>
</template>

<style scoped></style>
