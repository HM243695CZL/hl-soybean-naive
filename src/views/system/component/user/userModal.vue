<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { getPolicy } from '@/service/api/oss';
import type { RoleItem } from '@/typings/role';
import { createAdminApi, updateAdminApi, viewAdminApi } from '@/service/api/admin';
import type { AdminItem } from '@/typings/admin';

interface Props {
  /**	角色列表 */
  roleList: RoleItem[];
}

defineProps<Props>();

interface Emits {
  (e: 'refresh-list'): void;
}

const emit = defineEmits<Emits>();

const formRef = ref();
const message = useMessage();
const state = reactive({
  isShowDialog: false,
  title: '',
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
const resetForm = () => {
  // eslint-disable-next-line guard-for-in
  for (const o in state.ruleForm) {
    state.ruleForm[o] = '';
  }
};
const setFormValue = (adminItem: AdminItem) => {
  // eslint-disable-next-line guard-for-in
  for (const o in state.ruleForm) {
    state.ruleForm[o] = adminItem[o];
  }
  // 获取文件名称
  const fileName = adminItem.avatar.split('/').pop();
  state.fileList = [
    {
      id: adminItem.id,
      name: fileName,
      url: adminItem.avatar,
      status: 'finished'
    }
  ];
};
const openDialog = (id: number) => {
  state.isShowDialog = true;
  nextTick(() => {
    resetForm();
    formRef.value.restoreValidation();
    state.fileList = [];
    if (id) {
      state.title = '编辑用户';
      viewAdminApi(id).then(res => {
        setFormValue(res.data as AdminItem);
      });
    } else {
      state.title = '新增用户';
    }
  });
};
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
const closeDialog = () => {
  state.isShowDialog = false;
};
const clickConfirm = () => {
  formRef.value.validate(errors => {
    if (!errors) {
      if (state.ruleForm.id) {
        updateAdminApi(state.ruleForm).then(res => {
          closeDialog();
          message.success(res.originData?.message as string);
          emit('refresh-list');
        });
      } else {
        createAdminApi(state.ruleForm).then(res => {
          closeDialog();
          message.success(res.originData?.message as string);
          emit('refresh-list');
        });
      }
    }
  });
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
