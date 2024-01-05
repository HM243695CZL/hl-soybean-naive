import { request } from '@/service/request';
import type { Admin, AdminItem } from '@/typings/admin';

const baseAdminPath = `/admin/admin/`;
export const loginPath = `${baseAdminPath}login`; // 登录
const getAdminPagePath = `${baseAdminPath}page`; // 获取用户分页列表
const createAdminPath = `${baseAdminPath}create`; // 创建用户

export function getAdminPageApi(pageParams: Admin.Page) {
  return request.post<Common.DataPageList<AdminItem>>(getAdminPagePath, pageParams);
}

export function createAdminApi(params: Admin.Item) {
  return request.post<Admin.Item>(createAdminPath, params);
}
