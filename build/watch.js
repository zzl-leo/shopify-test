/*
 * @Date: 2022-09-29 13:35:03
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 13:36:13
 * @FilePath: \shopify-starter-theme-master\build\watch.js
 */
const shell = require("shelljs");
const exec = shell.exec;
const read = require('read-yaml');
const config = read.sync('config.yml');
let name = process.argv[2] || 'ca';

if(!config[name]) {
    shell.echo(`Error: 店铺参数${name}错误`);
    shell.exit(1);
}
console.log(`${name}店铺模板watching...`)

exec(`theme watch --dir=theme --env=${name}`)