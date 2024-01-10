import { request } from '@/service/request';
import type { Role, RoleItem } from '@/typings/role';

const baseRolePath = `/admin/role/`;
const getRolePagePath = `${baseRolePath}page`; // 获取角色分页列表
const getRoleListPath = `${baseRolePath}list`; // 获取角色列表
const createRolePath = `${baseRolePath}create`; // 创建角色
const viewRolePath = `${baseRolePath}view`; // 查看角色
const updateRolePath = `${baseRolePath}update`; // 更新角色
const deleteRolePath = `${baseRolePath}delete`; // 删除角色
const viewAuthPath = `${baseRolePath}viewAuth`; // 查看角色权限
const setAuthPath = `${baseRolePath}auth`; // 角色授权

export function getRolePageApi(pageParams: Role.Page) {
  return request.post<Common.DataPageList<RoleItem>>(getRolePagePath, pageParams);
}

export function getRoleListApi() {
  return request.get<Array<RoleItem>>(getRoleListPath);
}

export function createRoleApi(params: Role.Item) {
  return request.post<Role.Item>(createRolePath, params);
}

export function viewRoleApi(id: number) {
  return request.get<Role.Item>(`${viewRolePath}/${id}`);
}

export function updateRoleApi(params: Role.Item) {
  return request.post<Role.Item>(updateRolePath, params);
}

export function deleteRoleApi(id: number) {
  return request.get<Role.Item>(`${deleteRolePath}/${id}`);
}

export function viewAuthApi(id: number) {
  return request.get<Array<number>>(`${viewAuthPath}/${id}`);
}

export function setAuthApi(params: Role.Auth) {
  return request.post<Role.Auth>(setAuthPath, params);
}
