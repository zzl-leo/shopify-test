/*
 * @Date: 2022-09-22 18:32:37
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-23 10:09:11
 * @FilePath: \shopify-starter-theme-master\src\js\apps\vue-t2.js
 */
import TestComp from './test.vue'
import {
    defineComponent
} from 'vue'

import {
    unmountComponent,
    createComponent
} from './vue-trans'

console.log(TestComp)
console.log(TestComp.add)

// 当前场景下是可以省略这一步转换，但是，就类型而言，defineComponent 返回的值有一个合成类型的构造函数
const componentConstructor = defineComponent(TestComp)

// 创建一个变量接收创建的组件实例
let instance;

// 创建节点
const showTestComponent = (options) => {
  // 创建组件实例对象
  instance = createComponent(componentConstructor, options, null)
  // 插入到父元素
  const parentNodes = options.parentNodes ? options.parentNodes : document.body
  parentNodes.appendChild(instance.vnode.el)
}

// options为组件的props
export const testComp = function (options) {
//   const close = options.onClose
//   // 重新封装close，添加移除元素操作
//   options.onClose = () => {
//     close && close.call()
//     unmountComponent(instance)
//   }
  showTestComponent(options)
}