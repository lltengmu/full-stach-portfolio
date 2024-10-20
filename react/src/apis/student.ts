import { Http } from '@/plugins/axios';

/**
 * 查询多条数据
 * @returns 
 */
export const findAll = () => {
  return Http.request<Student[]>({
    url: '/student',
  }).then((r) => r.data);
};

/**
 * 删除数据
 * @param uuid 
 * @returns 
 */
export const del = (uuid: string) => {
  return Http.request<any>({
    method: 'delete',
    url: `/student/${uuid}`,
  });
};

/**
 * 新增/更新 数据
 * @param data 
 * @returns 
 */
export const upsert = (data: Partial<Student>) => {
  return Http.request<Student>({
    method: 'post',
    url: '/student',
    data,
  });
};

/**
 * 查询单条数据
 * @param uuid 
 * @returns 
 */
export const findOne = (uuid: string) => {
  return Http.request<Student>({
    url: `/student/${uuid}`,
  });
};
