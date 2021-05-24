// resize
'use strict';
(function (window, document) {
  var tid
  var docEl = document.documentElement
  var isSet = false

  function setMeta () {
    var screenW = docEl.getBoundingClientRect().width
    var dpr = window.devicePixelRatio
    document.querySelector('html').style.fontSize = screenW / 10 + 'px'
    docEl.setAttribute('data-dpr', dpr)
    isSet = true
  }
  setMeta()

  tid && clearTimeout(tid)
  tid = clearTimeout(function () {
    !isSet && setMeta()
  }, 300)

  window.onresize = function () {
    clearTimeout(tid)
    tid = setTimeout(setMeta, 300)
  }
})(window, document)
