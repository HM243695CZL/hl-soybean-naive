import { request } from '@/service/request';
import type { Role, RoleItem } from '@/typings/role';

const baseRolePath = `/admin/role/`;
const getRolePagePath = `${baseRolePath}page`; // 获取角色分页列表
const getRoleListPath = `${baseRolePath}list`; // 获取角色列表

export function getRolePageApi(pageParams: Role.Page) {
  return request.post<Common.DataPageList<RoleItem>>(getRolePagePath, pageParams);
}

export function getRoleListApi() {
  return request.get<Array<RoleItem>>(getRoleListPath);
}
