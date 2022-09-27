/*
 * @Date: 2022-09-22 18:17:55
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-22 18:22:06
 * @FilePath: \shopify-starter-theme-master\src\js\utils\index.js
 */
export const withInstall = (component, alias) => {
    const comp = component;
    comp.install = (app) => {
        console.log(app)
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component;
};