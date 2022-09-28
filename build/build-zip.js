#!/usr/bin/env node
/*
 * @Date: 2022-09-28 17:27:52
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-28 17:38:23
 * @FilePath: \shopify-starter-theme-master\build\build-zip.js
 * @description: 生成theme主题压缩包
*/

const fs = require('fs')
const path = require('path')
// eslint-disable-next-line
var archiver = require('archiver')

const extPackageJson = require('../package.json')

const DEST_DIR = path.join(__dirname, '../theme')
const DEST_ZIP_DIR = path.join(__dirname, '../theme-zip')

const extractExtensionData = () => ({
  name: extPackageJson.name,
  version: extPackageJson.version,
})

const makeDestZipDirIfNotExists = () => {
  if (!fs.existsSync(DEST_ZIP_DIR)) {
    fs.mkdirSync(DEST_ZIP_DIR)
  }
}

const buildZip = (src, dist, zipFilename) => {
  console.info(`Building ${zipFilename}...`)

  const output = fs.createWriteStream(path.join(dist, zipFilename))
  const archive = archiver('zip')
  archive.pipe(output)
  archive.directory(src, false)
  archive.finalize()
}

const main = () => {
  const { name, version } = extractExtensionData()
  const zipFilename = `${name}-v${version}.zip`

  makeDestZipDirIfNotExists()

  buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename)
}

main()
