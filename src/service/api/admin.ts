import { request } from '@/service/request';
import type { Admin, AdminItem } from '@/typings/admin';

const baseAdminApi = `/admin/admin/`;
export const loginApi = `${baseAdminApi}login`; // 登录
const getAdminPageApi = `${baseAdminApi}page`; // 获取用户分页列表

export function getAdminPage(pageParams: Admin.Page) {
  return request.post<Common.DataPageList<AdminItem>>(getAdminPageApi, pageParams);
}
