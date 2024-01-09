import { nextTick, reactive, toRefs } from 'vue';
import { useMessage } from 'naive-ui';

interface IInitModal {
  createFunc: any; // 新增的方法
  updateFunc: any; // 修改的方法
  viewFunc: any; // 查看的方法
  title?: string; // 弹窗的标题
  refreshList: any; // 更新列表的方法
  otherInitMethod?: any; // 运行其他方法
}

interface IOpenModal {
  childRef: any;
  dataId: string | number;
}
export default function useCommonModal({
  createFunc,
  updateFunc,
  viewFunc,
  title,
  refreshList,
  otherInitMethod
}: IInitModal) {
  const message = useMessage();
  const state = reactive({
    isShowDialog: false,
    title: '',
    formModalRef: {} as any // 表单实例
  });

  const closeDialog = () => {
    state.isShowDialog = false;
  };

  /**
   * 回显表单数据
   * @param formData 表单数据
   */
  const setFormValue = (formData: { [key: string]: any }) => {
    for (const o in formData) {
      // eslint-disable-next-line no-prototype-builtins
      if (state.formModalRef.state.ruleForm.hasOwnProperty(o)) {
        state.formModalRef.state.ruleForm[o] = formData[o];
      }
    }
  };

  const openDialog = ({ childRef, dataId }: IOpenModal) => {
    state.isShowDialog = true;
    nextTick(() => {
      state.formModalRef = childRef.value;
      if (dataId) {
        state.title = `修改${title}`;
        viewFunc(dataId).then((res: any) => {
          setFormValue(res.data);
          if (otherInitMethod) {
            otherInitMethod(res.data);
          }
        });
      } else {
        state.title = `新增${title}`;
        if (otherInitMethod) {
          otherInitMethod();
        }
      }
    });
  };

  const clickConfirm = () => {
    state.formModalRef.formRef.validate((errors: Array<any>) => {
      if (!errors) {
        if (state.formModalRef.state.ruleForm.id) {
          updateFunc(state.formModalRef.state.ruleForm).then((res: any) => {
            closeDialog();
            message.success(res.originData?.message as string);
            refreshList();
          });
        } else {
          createFunc(state.formModalRef.state.ruleForm).then((res: any) => {
            closeDialog();
            message.success(res.originData?.message as string);
            refreshList();
          });
        }
      }
    });
  };

  return {
    ...toRefs(state),
    closeDialog,
    openDialog,
    clickConfirm
  };
}
