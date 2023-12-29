declare namespace PageRoute {
  /**
   * the root route key
   * @translate 根路由
   */
  type RootRouteKey = 'root';

  /**
   * the not found route, which catch the invalid route path
   * @translate 未找到路由(捕获无效路径的路由)
   */
  type NotFoundRouteKey = 'not-found';

  /**
   * the route key
   * @translate 页面路由
   */
  type RouteKey =
    | '403'
    | '404'
    | '500'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'exam'
    | 'exam_buildQuestion'
    | 'exam_paper'
    | 'exam_question'
    | 'exam_review'
    | 'multi-menu'
    | 'multi-menu_first'
    | 'multi-menu_first_second-new'
    | 'multi-menu_first_second-new_third'
    | 'multi-menu_first_second'
    | 'myExam'
    | 'myExam_examList'
    | 'myExam_wrongBook'
    | 'system'
    | 'system_class-mng'
    | 'system_dept'
    | 'system_form-designer'
    | 'system_meun'
    | 'system_role'
    | 'system_user';

  /**
   * last degree route key, which has the page file
   * @translate 最后一级路由(该级路有对应的页面文件)
   */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | '403'
    | '404'
    | '500'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'exam_buildQuestion'
    | 'exam_paper'
    | 'exam_question'
    | 'exam_review'
    | 'multi-menu_first_second-new_third'
    | 'multi-menu_first_second'
    | 'myExam_examList'
    | 'myExam_wrongBook'
    | 'system_class-mng'
    | 'system_dept'
    | 'system_form-designer'
    | 'system_meun'
    | 'system_role'
    | 'system_user'
  >;
}
