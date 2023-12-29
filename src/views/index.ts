import type { RouteComponent } from 'vue-router';

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  'constant-page': () => import('./_builtin/constant-page/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  exam_buildQuestion: () => import('./exam/buildQuestion/index.vue'),
  exam_paper: () => import('./exam/paper/index.vue'),
  exam_question: () => import('./exam/question/index.vue'),
  exam_review: () => import('./exam/review/index.vue'),
  'multi-menu_first_second-new_third': () => import('./multi-menu/first/second-new/third/index.vue'),
  'multi-menu_first_second': () => import('./multi-menu/first/second/index.vue'),
  myExam_examList: () => import('./myExam/examList/index.vue'),
  myExam_wrongBook: () => import('./myExam/wrongBook/index.vue'),
  'system_class-mng': () => import('./system/class-mng/index.vue'),
  system_dept: () => import('./system/dept/index.vue'),
  'system_form-designer': () => import('./system/form-designer/index.vue'),
  system_meun: () => import('./system/meun/index.vue'),
  system_role: () => import('./system/role/index.vue'),
  system_user: () => import('./system/user/index.vue')
};
