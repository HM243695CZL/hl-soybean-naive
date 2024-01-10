import { request } from '@/service/request';
import type { MenuItem } from '@/typings/menu';

const baseMenuPath = `/admin/menu/`;
const getMenuListPath = `${baseMenuPath}list`; // 获取菜单列表
const createMenuPath = `${baseMenuPath}create`; // 创建菜单
const viewMenuPath = `${baseMenuPath}view`; // 查看菜单
const updateMenuPath = `${baseMenuPath}update`; // 更新菜单
const deleteMenuPath = `${baseMenuPath}delete`; // 删除菜单

export function getMenuListApi() {
  return request.get<Array<MenuItem>>(getMenuListPath);
}

export function createMenuApi(params: MenuItem) {
  return request.post<MenuItem>(createMenuPath, params);
}

export function viewMenuApi(id: number) {
  return request.get<MenuItem>(`${viewMenuPath}/${id}`);
}

export function updateMenuApi(params: MenuItem) {
  return request.post<MenuItem>(updateMenuPath, params);
}

export function deleteMenuApi(id: number) {
  return request.get<MenuItem>(`${deleteMenuPath}/${id}`);
}
