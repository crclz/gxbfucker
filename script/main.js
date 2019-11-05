// ==UserScript==
// @name         gxbfucker
// @namespace    https://github.com/crclz/gxbfucker
// @version      0.2
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

const catVideo17minUrl = 'http://localhost:3000';

// Be attention: main is an async function.
(async function () {
    'use strict';

    // Wait until video is loaded or keep waiting if there's no video.
    await JsExt.waitUntil(() => PageUtils.getOneVideo())

    let video0 = PageUtils.getOneVideo()

    // Wait gxb's js code to load normal video
    await JsExt.waitUntil(() => video0.duration > 0)
    let originalDuration = video0.duration

    // Prevent the page from redirecting when video ends
    // TODO: test if can use video0 instead of window (window works)
    PageUtils.blockEndedEvent(window)

    // In order to play video from local server
    video0.removeAttribute('crossorigin')

    // Set the video source
    video0.src = catVideo17minUrl

    // Override pause function
    video0.pause = () => { }

    video0.play()
    video0.playbackRate = 2.0

    // Do some periodical tasks
    setInterval(() => {
        // Close the shit dialog
        $(".gxb-dialog-close").click()

        // // Check if 100%
        // var learnPercent = $('span.video-percent').text()
        // if (learnPercent === '100') {
        //     // Close page after 5 seconds
        //     setTimeout(() => close(), 5000)
        // }

        // Check if exceeds original requirement
        if (video0.currentTime > originalDuration) {
            // Wait 20s to gxb's code sufficient time to "flush the  buffer"
            setTimeout(() => close(), 20000)
        }

        // Display progress on title
        PageUtils.setTitle(Math.floor(100 * video0.currentTime / originalDuration))
    }, 200)

    // Register mid-click on chapter list
    $(".chapter-info").on('mousedown', function (e) {
        if ((e.which == 2)) {
            // Middle click
            let chapterId = $(this).attr('chapter_id')

            let url = location.href
            url = url.match('(.+/unit/.+/chapter/)[0-9]+')[1]

            url += String(chapterId)

            console.log(url)

            window.open(url)
        }
    })

})();