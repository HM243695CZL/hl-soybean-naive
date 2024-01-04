declare namespace Admin {
  interface Page extends Common.PageInfo {
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
}

export type AdminPage = Admin.Page;
export type AdminItem = Admin.Item;
