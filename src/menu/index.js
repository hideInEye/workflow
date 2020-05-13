import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  // { path: '/index', title: '首页', icon: 'home' },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' }
  //   ]
  // }
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '系统管理',
    icon: 'flask',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/biz', title: '业务系统管理' }
    ]
  },
  {
    title: '业务系统管理',
    icon: 'asterisk',
    children: [
      { path: '/biz/system', title: '业务系统', icon: 'window-maximize' },
      { path: '/biz/form', title: '业务表单', icon: 'table' }
    ]
  },
  {
    title: '工作流引擎管理',
    icon: 'code-fork',
    children: [
      { path: '/work-flow/flow', title: '流程管理', icon: 'random' }
    ]
  }
])
