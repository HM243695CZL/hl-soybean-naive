import { onMounted, reactive, ref, toRefs } from 'vue';
import { useMessage } from 'naive-ui';

interface ICrud {
  pageFunc?: any; // 分页查询的方法
  deleteFunc?: any; // 删除的方法
  isMountedLoad?: boolean; // 是否加载完成请求数据
}
export default function useCrud({ pageFunc, deleteFunc, isMountedLoad = true }: ICrud) {
  const modalFormRef = ref();
  const childRef = ref();
  const message = useMessage();

  const state = reactive({
    pageInfo: {
      pageIndex: 1,
      pageSize: 10,
      totalRecords: 0
    },
    dataList: [],
    searchParams: {} as any
  });

  const getDataList = () => {
    if (!pageFunc) {
      message.error('请设置pageFunc属性');
      return;
    }
    pageFunc({
      ...state.pageInfo,
      ...state.searchParams
    }).then((res: any) => {
      if (!res.error) {
        state.dataList = res.data.list;
        state.pageInfo.totalRecords = res.data.total;
      }
    });
  };

  /**
   * 点击新增按钮
   */
  const clickAdd = () => {
    modalFormRef.value.openDialog({
      childRef
    });
  };

  /**
   * 点击修改按钮
   * @param dataId 当前行的数据id
   */
  const clickEdit = (dataId: string | number) => {
    modalFormRef.value.openDialog({
      dataId,
      childRef
    });
  };

  /**
   * 点击查询
   */
  const clickSearch = () => {
    state.pageInfo.pageIndex = 1;
    getDataList();
  };

  /**
   * 点击重置
   */
  const clickReset = () => {
    state.searchParams = {};
    state.pageInfo = {
      pageIndex: 1,
      pageSize: 10,
      totalRecords: 0
    };
    getDataList();
  };

  /**
   * 点击删除按钮
   * @param id 当前行的数据id
   */
  const clickDelete = (id: string | number) => {
    if (!deleteFunc) {
      message.error('请设置deleteFunc属性');
      return;
    }
    deleteFunc(id).then((res: any) => {
      if (!res.error) {
        message.success(res.originData?.message as string);
        getDataList();
      }
    });
  };

  /**
   * 切换第几页
   * @param pageIndex 第几页
   */
  const changePageIndex = (pageIndex: number) => {
    state.pageInfo.pageIndex = pageIndex;
    getDataList();
  };

  /**
   * 切换每页显示多少条
   * @param pageSize 每页显示多少条
   */
  const changePageSize = (pageSize: number) => {
    state.pageInfo.pageIndex = 1;
    state.pageInfo.pageSize = pageSize;
    getDataList();
  };

  onMounted(() => {
    if (isMountedLoad) {
      getDataList();
    }
  });

  return {
    ...toRefs(state),
    modalFormRef,
    childRef,
    getDataList,
    clickAdd,
    clickEdit,
    clickDelete,
    clickSearch,
    clickReset,
    changePageIndex,
    changePageSize
  };
}
