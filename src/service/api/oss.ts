import { request } from '@/service/request';

const baseOssApi = '/admin/aliyun/oss/';
export const policyApi = `${baseOssApi}policy`;

export function getPolicy() {
  return request.get<Oss.Policy>(policyApi);
}
