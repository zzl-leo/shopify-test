/*
 * @Date: 2022-09-22 18:34:19
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-22 19:05:51
 * @FilePath: \shopify-starter-theme-master\src\js\apps\vue-trans.js
 */

import {
    defineComponent,
    h,
    render
} from 'vue'

// 生成一个唯一的key
const COMPONENT_CONTAINER_SYMBOL = Symbol('component_container')

/**
 * 创建组件实例对象
 * 返回的实例和调用 getCurrentComponent() 返回的一致
 * @param {*} Component
 */
 export function createComponent(Component, props, children) {
    // 创建vnode
    const vnode = h(Component, { ...props }, children)
    // 创建组件容器
    const container = document.createElement('div')
    // @ts-ignore 将组件容器挂载到vnode上，方便后续移除
    vnode[COMPONENT_CONTAINER_SYMBOL] = container
    // 将vnode渲染到组件容器内, 在 vue2 的版本中，父级元素是可以传 null 的，但是 vue3 不支持
    render(vnode, container)
    // 返回组件实例
    return vnode.component
}

/**
 * 销毁组件实例对象
 * @param {*} ComponnetInstance 通过createComponent方法得到的组件实例对象
 */
export function unmountComponent(ComponnetInstance) {
    // 移除组件节点，render函数的第一个传null，表示为移除动作，会执行unmount方法
    render(null, ComponnetInstance.vnode[COMPONENT_CONTAINER_SYMBOL])
}