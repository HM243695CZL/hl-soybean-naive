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
    /** 角色key */
    roles?: Array<string>;
    /** 角色id */
    roleIds: Array<number>;
    /** 创建时间 */
    addTime?: string;
  }

  interface UpdatePass {
    /** 用户id */
    id: number;
    /** 密码 */
    password: string;
  }
}

export type AdminPage = Admin.Page;
export type AdminItem = Admin.Item;
export type AdminUpdatePass = Admin.UpdatePass;
