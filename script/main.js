// ==UserScript==
// @name         gxbfucker
// @namespace    https://github.com/crclz/gxbfucker
// @version      0.1
// @description  高校邦浏览器端脚本
// @author       crclz
// @match        https://*.gaoxiaobang.com/*
// @grant        none
// ==/UserScript==

class PageUtils {

    static blockEndedEvent(element) {
        element.addEventListener('ended', function (event) {
            event.stopPropagation();
        }, true);
    }

    static setTitle(text) {
        document.title = text;
    }

    static getOneVideo() {
        return document.getElementsByTagName('video')[0]
    }

}

class JsExt {
    static wait(milliseconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), milliseconds)
        })
    }

    static async waitUntil(predicate) {
        while (true) {
            if (predicate()) {
                return
            }
            await JsExt.wait(200)
        }
    }
}

// Be attention: main is an async function.
(async function () {
    'use strict';

    // Wait until video is loaded or keep waiting if there's no video.
    await JsExt.waitUntil(() => PageUtils.getOneVideo())

    let video0 = PageUtils.getOneVideo()

    if (video0) {
        PageUtils.setTitle('has-video')
    } else {
        throw new Error('Should have video')
    }


})();