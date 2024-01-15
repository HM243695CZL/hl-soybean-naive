<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { MenuItem } from '@/typings/menu';
import { icons } from '@/views/system/component/menu/icons';

interface Props {
  menuList: Array<MenuItem>;
}
const props = defineProps<Props>();

const formRef = ref();
const state = reactive({
  ruleForm: {
    id: null,
    pid: null as number,
    title: '',
    path: '',
    name: '',
    component: '',
    icon: '',
    sort: null as number,
    isHide: null as boolean,
    isKeepAlive: null as boolean,
    isAffix: null as boolean
  },
  rules: {
    title: {
      required: true,
      trigger: 'blur',
      message: '请输入菜单名称'
    },
    path: {
      required: true,
      trigger: 'blur',
      message: '请输入菜单路径'
    },
    name: {
      required: true,
      trigger: 'blur',
      message: '请输入组件名称'
    },
    component: {
      required: true,
      trigger: 'blur',
      message: '请输入组件路径'
    }
  }
});
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
    <n-grid>
      <n-gi :span="12">
        <n-form-item label="上级菜单" path="pid">
          <n-tree-select
            :value="state.ruleForm.pid"
            :options="tranMenuList(props.menuList)"
            key-field="id"
            label-field="title"
            placeholder="请选择上级菜单"
						@update-value="state.ruleForm.pid = $event"
          />
        </n-form-item>
      </n-gi>
      <n-gi :span="12">
        <n-form-item label="菜单名称" path="title">
          <n-input v-model:value="state.ruleForm.title" placeholder="请输入菜单名称"></n-input>
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-grid>
      <n-gi :span="12">
        <n-form-item label="菜单路径" path="path">
          <n-input v-model:value="state.ruleForm.path" placeholder="请输入菜单路径"></n-input>
        </n-form-item>
      </n-gi>
      <n-gi :span="12">
        <n-form-item label="组件名称" path="name">
          <n-input v-model:value="state.ruleForm.name" placeholder="请输入组件名称"></n-input>
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-grid>
      <n-gi :span="12">
        <n-form-item label="组件路径" path="component">
          <n-input v-model:value="state.ruleForm.component" placeholder="请输入组件路径"></n-input>
        </n-form-item>
      </n-gi>
      <n-gi :span="12">
        <n-form-item label="图标" path="icon">
          <icon-select v-model:value="state.ruleForm.icon" :icons="icons"></icon-select>
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-grid>
      <n-gi :span="12">
        <n-form-item label="排序" path="sort">
          <n-input-number v-model:value="state.ruleForm.sort" class="w100" placeholder="请输入排序"></n-input-number>
        </n-form-item>
      </n-gi>
      <n-gi :span="12">
        <n-form-item label="是否隐藏" path="isHide">
          <n-radio-group v-model:value="state.ruleForm.isHide">
            <n-radio :value="false">否</n-radio>
            <n-radio :value="true">是</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-grid>
      <n-gi :span="12">
        <n-form-item label="是否缓存" path="isKeepAlive">
          <n-radio-group v-model:value="state.ruleForm.isKeepAlive">
            <n-radio :value="false">否</n-radio>
            <n-radio :value="true">是</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-gi>
      <n-gi :span="12">
        <n-form-item label="是否固定" path="isAffix">
          <n-radio-group v-model:value="state.ruleForm.isAffix">
            <n-radio :value="false">否</n-radio>
            <n-radio :value="true">是</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<style scoped></style>
