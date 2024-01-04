declare namespace Common {
  interface PageInfo {
    /** 第几页 */
    pageIndex: number;
    /** 每页显示多少条 */
    pageSize: number;
    /** 总共多少条 */
    totalRecords: number;
  }
  interface DataPageList<T = any> {
    list: Array<T>;
    total: number;
  }
}
