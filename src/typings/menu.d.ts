declare namespace Menu {
  interface Item {
    /** 菜单id */
    id: number;
    /** pid */
    pid: number;
    /** 菜单名 */
    title: string;
    /** 菜单地址 */
    path: string;
    /** 路由名称 */
    name: string;
    /** 组件地址 */
    component: string;
    /** 菜单图标 */
    icon: string;
    /** 权限标识 */
    roles: Array<string>;
    /** 菜单排序 */
    sort: number;
    /** 是否隐藏 */
    isHide: boolean;
    /** 是否缓存 */
    isKeepAlive: boolean;
    /** 是否固定在tab上 */
    isAffix: boolean;
  }
}

export type MenuItem = Menu.Item;
