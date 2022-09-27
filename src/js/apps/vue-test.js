/*
 * @Date: 2022-09-22 18:10:07
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-22 18:22:54
 * @FilePath: \shopify-starter-theme-master\src\js\apps\vue-test.js
 */

import {
    h
} from "vue";

import {withInstall} from '../utils/index'

// Vue3 中函数式组件只能用函数式声明
const Heading = (props, context) => {
    console.log(context);
    return h(`h${props.level}`, context.attrs, context.slots);
};

Heading.props = ["level"];

// export default Heading;
export default withInstall(Heading);

