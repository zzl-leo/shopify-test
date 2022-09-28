/*
 * @Date: 2022-09-15 18:51:29
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-28 15:27:24
 * @FilePath: \shopify-starter-theme-master\src\js\theme.js
 */
/**
 * Scripts and styles used globally
 */
import '../css/theme.css';
import './utility/public-path';
import './utility/newsletter-subscribe';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes';
import openCart from './utility/open-cart';

import vueTest from './apps/vue-test';
import {testComp} from './apps/vue-t2'

// JS is enabled
document.querySelector('html').classList.add('js');

// Handle cart sidebar component
const cartLinks = document.querySelectorAll('.open-cart');
if (cartLinks) {
  cartLinks.forEach((cartLink) => {
    cartLink.addEventListener('click', (e) => {
      e.preventDefault();
      const cartHref = e.currentTarget.getAttribute('href');
      openCart().then((res) => {
        if (res === false) {
          window.location.href = cartHref;
        }
      });
    });
  });
}

console.log("zzl66688877777777")
console.log(vueTest)

setTimeout(() => {
  testComp({
    parentNodes: document.querySelector(".site-header"),
    text: "zzl-vue-test"
  })

}, 200);