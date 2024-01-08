import { request } from '@/service/request';
import type { Admin, AdminItem } from '@/typings/admin';

const baseAdminPath = `/admin/admin/`;
export const loginPath = `${baseAdminPath}login`; // 登录
const getAdminPagePath = `${baseAdminPath}page`; // 获取用户分页列表
const createAdminPath = `${baseAdminPath}create`; // 创建用户
const viewAdminPath = `${baseAdminPath}view`; // 查看用户
const updateAdminPath = `${baseAdminPath}update`; // 更新用户
const deleteAdminPath = `${baseAdminPath}delete`; // 删除用户
const updatePassPath = `${baseAdminPath}updatePass`; // 更新用户密码

export function getAdminPageApi(pageParams: Admin.Page) {
  return request.post<Common.DataPageList<AdminItem>>(getAdminPagePath, pageParams);
}

export function createAdminApi(params: Admin.Item) {
  return request.post<Admin.Item>(createAdminPath, params);
}

export function viewAdminApi(id: number) {
  return request.get<Admin.Item>(`${viewAdminPath}/${id}`);
}

export function updateAdminApi(params: Admin.Item) {
  return request.post<Admin.Item>(updateAdminPath, params);
}

export function deleteAdminApi(id: number) {
  return request.get<Admin.Item>(`${deleteAdminPath}/${id}`);
}

export function updatePassApi(params: Admin.UpdatePass) {
  return request.post<Admin.Item>(updatePassPath, params);
}
