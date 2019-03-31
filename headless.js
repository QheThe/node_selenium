const { Builder, By, Key, until } = require('selenium-webdriver')
const {Options} = require('selenium-webdriver/chrome')
const fs = require('fs')
const path = require('path')

const chromeOptions = new Options()

// 浏览器参数
chromeOptions.addArguments('--headless')
chromeOptions.addArguments('--disable-gpu')
chromeOptions.addArguments('blink-settings=imagesEnabled=false')

function sleep(timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, timeout)
    })
}

async function getPageSource(url, tempPath) {
    tempPath = path.resolve(tempPath)

    // 检查是否有 temp 文件夹
    if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath)

    // 实例化浏览器驱动器
    let browser = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build()

    // 等待页面源码加载完毕
    await browser.get(url)
    let pageSource = await browser.getPageSource()
    let pageTitle = await browser.getTitle()
    browser.quit()

    // 写入 html 文件到 temp
    fs.writeFileSync(
        tempPath + '\\' + pageTitle + '.html',
        pageSource)

    console.log(tempPath + '\\' + pageTitle + '.html')
}

(async function () {
    console.log(chromeOptions.options_.args.join(' '))
    let urlList = [
        'https://bilibili.com',
        'https://baidu.com',
        'https://www.npmjs.com/package/selenium-webdriver',
        'https://www.jianshu.com/u/30f796232c22'
    ]
    urlList.forEach(async url => {
        getPageSource(url, './temp/')
    })
})()