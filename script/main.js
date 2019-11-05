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

}

(function () {
    'use strict';

    // Your code here...
    PageUtils.blockEndedEvent(window);
    PageUtils.setTitle('nmsl')

})();