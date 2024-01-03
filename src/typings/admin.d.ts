declare namespace Admin {
  interface Page {
    /** 第几页 */
    pageIndex: number;
    /** 每页显示多少条 */
    pageSize: number;
    /** 用户名 */
    username: string;
  }

  interface Item {
    /** 用户id */
    id: number;
    /** 用户名 */
    username: string;
    /** 头像 */
    avatar: string;
    /** 角色 */
    roles: Array<string>;
    /** 创建时间 */
    addTime: string;
  }

  interface DataList {
    list: Array<Item>;
    total: number;
  }
}

export type AdminPage = Admin.Page;
export type AdminItem = Admin.Item;
export type AdminDataList = Admin.DataList;
