/*
 * @Date: 2022-09-29 11:28:42
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 11:30:18
 * @FilePath: \shopify-starter-theme-master\build\push.js
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
console.log(`${name}店铺模板同步至shopify模板中...`)

exec(`theme deploy --dir=theme --env=${name}`)