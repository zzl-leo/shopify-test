<!--
 * @Date: 2022-09-22 18:36:37
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-27 17:41:15
 * @FilePath: \shopify-starter-theme-master\src\js\apps\test.vue
-->

<template>
    <div id="vue-test">
        vue-组件-test--333
        <h1>count: {{count}}</h1>
        <div @click="add">add</div>
        <div @click="jian">-</div>

        <h2>props-test: {{tt}}</h2>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { trapFocus, removeTrapFocus } from '@shopify/theme-a11y';
const count = ref(0)

const props = defineProps({
    /**
     * Whether to display text
     */
    text: { type: String, default: '' }
});

const tt = props.text

const add = () => {
    count.value++
}

const jian = () => {
    count.value--
    removeTrapFocus(document.getElementById('vue-test'))
}

setTimeout(() => {
    trapFocus(document.getElementById('vue-test'))
}, 2000);
</script>