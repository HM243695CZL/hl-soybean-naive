import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { localStg } from '@/utils';
import { $t } from '@/locales';
import { createPermissionGuard } from './permission';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    window.$loadingBar?.start();
    const mainEle = document.getElementById('__SCROLL_EL_ID__');
    if (mainEle !== null) {
      if (!mainEle?.children) {
        // 如果不存在，则证明页面出错，需要重新加载，并记录时间
        const time = String(new Date().getTime());
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        localStg.set(`noKeepMainTime${time}`, new Date().getTime());
        window.location.reload();
      }
    }
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });
  router.afterEach(to => {
    // 设置document title
    useTitle(to.meta.i18nTitle ? $t(to.meta.i18nTitle) : to.meta.title);
    // 结束 loadingBar
    window.$loadingBar?.finish();
  });
}
