/*
 * @Date: 2022-09-28 14:59:36
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-28 15:09:42
 * @FilePath: \shopify-starter-theme-master\build\clearDist.js
 */
const fs = require('fs')
const path = require('path');

function emptyDir(path) {
    console.log(path)

    const files = fs.readdirSync(path);
    console.log(files)
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
            console.log(`theme：删除${file}文件成功`);
        }
    })
}

emptyDir(path.resolve(__dirname, '../tt'))