<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { getPolicy } from '@/service/api/oss';
import type { RoleItem } from '@/typings/role';
import type { AdminItem } from '@/typings/admin';

interface Props {
  /**	角色列表 */
  roleList: RoleItem[];
}

defineProps<Props>();

const formRef = ref();
const state = reactive({
  ruleForm: {
    username: '',
    avatar: '',
    id: null,
    roleIds: []
  } as AdminItem,
  rules: {
    username: {
      required: true,
      trigger: 'blur',
      message: '请输入用户名称'
    }
  },
  policyMap: {
    policy: '',
    signature: '',
    key: '',
    ossAccessKeyId: '',
    dir: '',
    host: ''
  } as Oss.Policy,
  fileList: []
});
const handleBeforeUpload = () => {
  return new Promise(resolve => {
    getPolicy().then(res => {
      const { accessKeyId, dir, host, policy, signature } = res.data as Oss.Policy;
      state.policyMap.policy = policy;
      state.policyMap.signature = signature;
      state.policyMap.key = `${dir}/\${filename}`;
      state.policyMap.ossAccessKeyId = accessKeyId;
      state.policyMap.dir = dir;
      state.policyMap.host = host;
      resolve(true);
    });
  });
};
const handleFinish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
  state.ruleForm.avatar = `${state.policyMap.host}/${state.policyMap.dir}/${options.file.name}`;
};
const handleRemove = () => {
  state.ruleForm.avatar = '';
};
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
    <n-form-item label="用户名称" path="username">
      <n-input v-model:value="state.ruleForm.username" placeholder="请输入用户名称"></n-input>
    </n-form-item>
    <n-form-item label="关联角色" path="roleIds">
      <n-select
        v-model:value="state.ruleForm.roleIds"
        placeholder="请选择关联角色"
        multiple
        max-tag-count="responsive"
        :options="roleList"
        label-field="name"
        value-field="id"
      />
    </n-form-item>
    <n-form-item label="头像" path="avatar">
      <n-upload
        v-model:file-list="state.fileList"
        :action="state.policyMap.host"
        :data="state.policyMap"
        :on-before-upload="handleBeforeUpload"
        :on-finish="handleFinish"
        :on-remove="handleRemove"
        list-type="image"
        :max="1"
      >
        <n-button>点击上传</n-button>
      </n-upload>
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
