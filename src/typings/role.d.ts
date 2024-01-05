declare namespace Role {
  interface Page extends Common.PageInfo {
    /** 角色名 */
    name: string;
  }

  interface Item {
    /** 角色id */
    id: number;
    /** 角色名 */
    name: string;
    /** 角色key */
    key: string;
    /** 角色描述 */
    desc: string;
    /** 创建时间 */
    addTime: string;
  }
}

export type RolePage = Role.Page;
export type RoleItem = Role.Item;
