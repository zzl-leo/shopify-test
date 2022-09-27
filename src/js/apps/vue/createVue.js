/*
 * @Date: 2022-09-23 18:06:30
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-23 18:44:34
 * @FilePath: \shopify-starter-theme-master\src\js\apps\vue\createVue.js
 */

import {
    createVNode,
    render,
    reactive,
    h,
    defineComponent
} from 'vue';
import TestComp from './test.vue'

export function createT(props, target, wait = false) {
    let vm = null
    const data = reactive({
        ...props,
        tip: '',
        loading: true
    });

    const CompWrap = defineComponent({
        render() {
            return h(TestComp, {
                ...data
            });
        }
    });

    vm = createVNode(CompWrap);


    if (wait) {
        setTimeout(() => {
            render(vm, document.createElement('div'));
        }, 0);
    } else {
        render(vm, document.createElement('div'));
    }


    function close() {
      if (vm?.el && vm.el.parentNode) {
        vm.el.parentNode.removeChild(vm.el);
      }
    }

    function open(target = document.body) {
      if (!vm || !vm.el) {
        return;
      }
      target.appendChild(vm.el);
    }

    return {
      vm,
      close,
      open,
      setTip: (tip) => {
        data.tip = tip;
      },
      setLoading: (loading) => {
        data.loading = loading;
      },
      get loading() {
        return data.loading;
      },
      get $el() {
        return vm?.el;
      },
    };
}