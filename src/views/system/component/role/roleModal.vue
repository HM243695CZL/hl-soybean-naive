<script setup lang="ts">
import { reactive, ref } from 'vue';

const formRef = ref();
const state = reactive({
  ruleForm: {
    name: '',
    key: '',
    desc: '',
    id: null
  },
  rules: {
    name: {
      required: true,
      trigger: 'blur',
      message: '请输入角色名称'
    },
    key: {
      required: true,
      trigger: 'blur',
      message: '请输入角色key'
    }
  }
});
defineExpose({
  formRef,
  state
});
</script>

<template>
  <n-form
    ref="formRef"
    :model="state.ruleForm"
    :rules="state.rules"
    label-placement="left"
    label-width="100px"
    require-mark-placement="left"
  >
    <n-form-item label="角色名称" path="name">
      <n-input v-model:value="state.ruleForm.name" placeholder="请输入角色名称"></n-input>
    </n-form-item>
    <n-form-item label="角色key" path="key">
      <n-input v-model:value="state.ruleForm.key" placeholder="请输入角色key"></n-input>
    </n-form-item>
    <n-form-item label="角色描述" path="desc">
      <n-input v-model:value="state.ruleForm.desc" placeholder="请输入角色描述"></n-input>
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
