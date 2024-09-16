/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('\n\n/* eslint-env browser */\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\n\n/** @typedef {any} TODO */\n\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === "undefined";\nvar forEach = Array.prototype.forEach;\n\n/**\n * @param {function} fn\n * @param {number} time\n * @returns {(function(): void)|*}\n */\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    // @ts-ignore\n    var self = this;\n    // eslint-disable-next-line prefer-rest-params\n    var args = arguments;\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n    clearTimeout(timeout);\n\n    // @ts-ignore\n    timeout = setTimeout(functionCall, time);\n  };\n}\nfunction noop() {}\n\n/**\n * @param {TODO} moduleId\n * @returns {TODO}\n */\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n  if (!src) {\n    if (document.currentScript) {\n      src = ( /** @type {HTMLScriptElement} */document.currentScript).src;\n    } else {\n      var scripts = document.getElementsByTagName("script");\n      var lastScriptTag = scripts[scripts.length - 1];\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n    srcByModuleId[moduleId] = src;\n  }\n\n  /**\n   * @param {string} fileMap\n   * @returns {null | string[]}\n   */\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n    if (!filename) {\n      return [src.replace(".js", ".css")];\n    }\n    if (!fileMap) {\n      return [src.replace(".js", ".css")];\n    }\n    return fileMap.split(",").map(function (mapRule) {\n      var reg = new RegExp("".concat(filename, "\\\\.js$"), "g");\n      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));\n    });\n  };\n}\n\n/**\n * @param {TODO} el\n * @param {string} [url]\n */\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    }\n\n    // eslint-disable-next-line\n    url = el.href.split("?")[0];\n  }\n  if (!isUrlRequest( /** @type {string} */url)) {\n    return;\n  }\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn\'t loaded yet.\n    // We\'re probably changing the same file more than once.\n    return;\n  }\n  if (!url || !(url.indexOf(".css") > -1)) {\n    return;\n  }\n\n  // eslint-disable-next-line no-param-reassign\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener("load", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener("error", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = "".concat(url, "?").concat(Date.now());\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n\n/**\n * @param {string} href\n * @param {TODO} src\n * @returns {TODO}\n */\nfunction getReloadUrl(href, src) {\n  var ret;\n\n  // eslint-disable-next-line no-param-reassign\n  href = normalizeUrl(href);\n  src.some(\n  /**\n   * @param {string} url\n   */\n  // eslint-disable-next-line array-callback-return\n  function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\n/**\n * @param {string} [src]\n * @returns {boolean}\n */\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n  var elements = document.querySelectorAll("link");\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n    var url = getReloadUrl(el.href, src);\n    if (!isUrlRequest(url)) {\n      return;\n    }\n    if (el.visited === true) {\n      return;\n    }\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\nfunction reloadAll() {\n  var elements = document.querySelectorAll("link");\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n    updateCss(el);\n  });\n}\n\n/**\n * @param {string} url\n * @returns {boolean}\n */\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n\n  // It is not http or https\n  if (!/^[a-zA-Z][a-zA-Z\\d+\\-.]*:/.test(url)) {\n    return false;\n  }\n  return true;\n}\n\n/**\n * @param {TODO} moduleId\n * @param {TODO} options\n * @returns {TODO}\n */\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log("no window.document found, will not HMR CSS");\n    return noop;\n  }\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n    if (options.locals) {\n      console.log("[HMR] Detected local css modules. Reload all css");\n      reloadAll();\n      return;\n    }\n    if (reloaded) {\n      console.log("[HMR] css reload %s", src.join(" "));\n    } else {\n      console.log("[HMR] Reload all css");\n      reloadAll();\n    }\n  }\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack://learn/./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?')},"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":module=>{eval('\n\n/* eslint-disable */\n\n/**\n * @param {string[]} pathComponents\n * @returns {string}\n */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case "..":\n        accumulator.pop();\n        break;\n      case ".":\n        break;\n      default:\n        accumulator.push(item);\n    }\n    return accumulator;\n  }, /** @type {string[]} */[]).join("/");\n}\n\n/**\n * @param {string} urlString\n * @returns {string}\n */\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";\n  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");\n  var host = components[0].toLowerCase().replace(/\\.$/, "");\n  components[0] = "";\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack://learn/./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?')},"./styles.css":(module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      (function() {\n        var localsJsonString = undefined;\n        // 1726478800767\n        var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {});\n        // only invalidate when locals change\n        if (\n          module.hot.data &&\n          module.hot.data.value &&\n          module.hot.data.value !== localsJsonString\n        ) {\n          module.hot.invalidate();\n        } else {\n          module.hot.accept();\n        }\n        module.hot.dispose(function(data) {\n          data.value = localsJsonString;\n          cssReload();\n        });\n      })();\n    }\n  \n\n//# sourceURL=webpack://learn/./styles.css?')},"./index.ts":(module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./styles.css\");\n // Путь к CSS файлу должен быть правильным\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const title = document.querySelector('.test');\n    function enlargeTitle() {\n        if (title) {\n            title.style.fontSize = '3em';\n            title.style.transition = 'font-size 1s ease-in-out';\n        }\n    }\n    function shrinkTitle() {\n        if (title) {\n            title.style.fontSize = '2em';\n            title.style.transition = 'font-size 1s ease-in-out';\n        }\n    }\n    setInterval(() => {\n        enlargeTitle();\n        setTimeout(shrinkTitle, 1000);\n    }, 2000);\n});\nif (true) {\n    module.hot.accept();\n}\n\n\n//# sourceURL=webpack://learn/./index.ts?")}},__webpack_module_cache__={},inProgress,dataWebpackPrefix;function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n){if(void 0!==n.error)throw n.error;return n.exports}var r=__webpack_module_cache__[e]={id:e,exports:{}};try{var t={id:e,module:r,factory:__webpack_modules__[e],require:__webpack_require__};__webpack_require__.i.forEach((function(e){e(t)})),r=t.module,t.factory.call(r.exports,r,r.exports,t.require)}catch(e){throw r.error=e,e}return r.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.c=__webpack_module_cache__,__webpack_require__.i=[],__webpack_require__.hu=e=>e+"."+__webpack_require__.h()+".hot-update.js",__webpack_require__.miniCssF=e=>{},__webpack_require__.hmrF=()=>"main."+__webpack_require__.h()+".hot-update.json",__webpack_require__.h=()=>"0a7380c5965cfa77719a",__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),inProgress={},dataWebpackPrefix="learn:",__webpack_require__.l=(e,n,r,t)=>{if(inProgress[e])inProgress[e].push(n);else{var o,i;if(void 0!==r)for(var a=document.getElementsByTagName("script"),c=0;c<a.length;c++){var l=a[c];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")==dataWebpackPrefix+r){o=l;break}}o||(i=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,__webpack_require__.nc&&o.setAttribute("nonce",__webpack_require__.nc),o.setAttribute("data-webpack",dataWebpackPrefix+r),o.src=e),inProgress[e]=[n];var u=(n,r)=>{o.onerror=o.onload=null,clearTimeout(s);var t=inProgress[e];if(delete inProgress[e],o.parentNode&&o.parentNode.removeChild(o),t&&t.forEach((e=>e(r))),n)return n(r)},s=setTimeout(u.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=u.bind(null,o.onerror),o.onload=u.bind(null,o.onload),i&&document.head.appendChild(o)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e,n,r,t={},o=__webpack_require__.c,i=[],a=[],c="idle",l=0,u=[];function s(e){c=e;for(var n=[],r=0;r<a.length;r++)n[r]=a[r].call(null,e);return Promise.all(n).then((function(){}))}function _(){0==--l&&s("ready").then((function(){if(0===l){var e=u;u=[];for(var n=0;n<e.length;n++)e[n]()}}))}function d(e){if("idle"!==c)throw new Error("check() is only allowed in idle status");return s("check").then(__webpack_require__.hmrM).then((function(r){return r?s("prepare").then((function(){var t=[];return n=[],Promise.all(Object.keys(__webpack_require__.hmrC).reduce((function(e,o){return __webpack_require__.hmrC[o](r.c,r.r,r.m,e,n,t),e}),[])).then((function(){return n=function(){return e?f(e):s("ready").then((function(){return t}))},0===l?n():new Promise((function(e){u.push((function(){e(n())}))}));var n}))})):s(h()?"ready":"idle").then((function(){return null}))}))}function p(e){return"ready"!==c?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status (state: "+c+")")})):f(e)}function f(e){e=e||{},h();var t=n.map((function(n){return n(e)}));n=void 0;var o=t.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return s("abort").then((function(){throw o[0]}));var i=s("dispose");t.forEach((function(e){e.dispose&&e.dispose()}));var a,c=s("apply"),l=function(e){a||(a=e)},u=[];return t.forEach((function(e){if(e.apply){var n=e.apply(l);if(n)for(var r=0;r<n.length;r++)u.push(n[r])}})),Promise.all([i,c]).then((function(){return a?s("fail").then((function(){throw a})):r?f(e).then((function(e){return u.forEach((function(n){e.indexOf(n)<0&&e.push(n)})),e})):s("idle").then((function(){return u}))}))}function h(){if(r)return n||(n=[]),Object.keys(__webpack_require__.hmrI).forEach((function(e){r.forEach((function(r){__webpack_require__.hmrI[e](r,n)}))})),r=void 0,!0}__webpack_require__.hmrD=t,__webpack_require__.i.push((function(u){var f,h,m,b,w=u.module,v=function(n,r){var t=o[r];if(!t)return n;var a=function(a){if(t.hot.active){if(o[a]){var c=o[a].parents;-1===c.indexOf(r)&&c.push(r)}else i=[r],e=a;-1===t.children.indexOf(a)&&t.children.push(a)}else console.warn("[HMR] unexpected require("+a+") from disposed module "+r),i=[];return n(a)},u=function(e){return{configurable:!0,enumerable:!0,get:function(){return n[e]},set:function(r){n[e]=r}}};for(var d in n)Object.prototype.hasOwnProperty.call(n,d)&&"e"!==d&&Object.defineProperty(a,d,u(d));return a.e=function(e,r){return function(e){switch(c){case"ready":s("prepare");case"prepare":return l++,e.then(_,_),e;default:return e}}(n.e(e,r))},a}(u.require,u.id);w.hot=(f=u.id,h=w,b={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:m=e!==f,_requireSelf:function(){i=h.parents.slice(),e=m?void 0:f,__webpack_require__(f)},active:!0,accept:function(e,n,r){if(void 0===e)b._selfAccepted=!0;else if("function"==typeof e)b._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)b._acceptedDependencies[e[t]]=n||function(){},b._acceptedErrorHandlers[e[t]]=r;else b._acceptedDependencies[e]=n||function(){},b._acceptedErrorHandlers[e]=r},decline:function(e){if(void 0===e)b._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var n=0;n<e.length;n++)b._declinedDependencies[e[n]]=!0;else b._declinedDependencies[e]=!0},dispose:function(e){b._disposeHandlers.push(e)},addDisposeHandler:function(e){b._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=b._disposeHandlers.indexOf(e);n>=0&&b._disposeHandlers.splice(n,1)},invalidate:function(){switch(this._selfInvalidated=!0,c){case"idle":n=[],Object.keys(__webpack_require__.hmrI).forEach((function(e){__webpack_require__.hmrI[e](f,n)})),s("ready");break;case"ready":Object.keys(__webpack_require__.hmrI).forEach((function(e){__webpack_require__.hmrI[e](f,n)}));break;case"prepare":case"check":case"dispose":case"apply":(r=r||[]).push(f)}},check:d,apply:p,status:function(e){if(!e)return c;a.push(e)},addStatusHandler:function(e){a.push(e)},removeStatusHandler:function(e){var n=a.indexOf(e);n>=0&&a.splice(n,1)},data:t[f]},e=void 0,b),w.parents=i,w.children=[],i=[],u.require=v})),__webpack_require__.hmrC={},__webpack_require__.hmrI={}})(),(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var n=__webpack_require__.g.document;if(!e&&n&&(n.currentScript&&"SCRIPT"===n.currentScript.tagName.toUpperCase()&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var t=r.length-1;t>-1&&(!e||!/^http(s?):/.test(e));)e=r[t--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{if("undefined"!=typeof document){var e=(e,n,r,t,o)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",__webpack_require__.nc&&(i.nonce=__webpack_require__.nc);return i.onerror=i.onload=r=>{if(i.onerror=i.onload=null,"load"===r.type)t();else{var a=r&&r.type,c=r&&r.target&&r.target.href||n,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+": "+c+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=c,i.parentNode&&i.parentNode.removeChild(i),o(l)}},i.href=n,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},n=(e,n)=>{for(var r=document.getElementsByTagName("link"),t=0;t<r.length;t++){var o=(a=r[t]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===n))return a}var i=document.getElementsByTagName("style");for(t=0;t<i.length;t++){var a;if((o=(a=i[t]).getAttribute("data-href"))===e||o===n)return a}},r=[],t=[],o=e=>({dispose:()=>{for(var e=0;e<r.length;e++){var n=r[e];n.parentNode&&n.parentNode.removeChild(n)}r.length=0},apply:()=>{for(var e=0;e<t.length;e++)t[e].rel="stylesheet";t.length=0}});__webpack_require__.hmrC.miniCss=(i,a,c,l,u,s)=>{u.push(o),i.forEach((o=>{var i=__webpack_require__.miniCssF(o),a=__webpack_require__.p+i,c=n(i,a);c&&l.push(new Promise(((n,i)=>{var l=e(o,a,c,(()=>{l.as="style",l.rel="preload",n()}),i);r.push(c),t.push(l)})))}))}}})(),(()=>{var e,n,r,t,o,i=__webpack_require__.hmrS_jsonp=__webpack_require__.hmrS_jsonp||{main:0},a={};function c(n,r){return e=r,new Promise(((e,r)=>{a[n]=e;var t=__webpack_require__.p+__webpack_require__.hu(n),o=new Error;__webpack_require__.l(t,(e=>{if(a[n]){a[n]=void 0;var t=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;o.message="Loading hot update chunk "+n+" failed.\n("+t+": "+i+")",o.name="ChunkLoadError",o.type=t,o.request=i,r(o)}}))}))}function l(e){function a(e){for(var n=[e],r={},t=n.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),i=o.id,a=o.chain,l=__webpack_require__.c[i];if(l&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var u=0;u<l.parents.length;u++){var s=l.parents[u],_=__webpack_require__.c[s];if(_){if(_.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([s]),moduleId:i,parentId:s};-1===n.indexOf(s)&&(_.hot._acceptedDependencies[i]?(r[s]||(r[s]=[]),c(r[s],[i])):(delete r[s],n.push(s),t.push({chain:a.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:r}}function c(e,n){for(var r=0;r<n.length;r++){var t=n[r];-1===e.indexOf(t)&&e.push(t)}}__webpack_require__.f&&delete __webpack_require__.f.jsonpHmr,n=void 0;var l={},u=[],s={},_=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var d in r)if(__webpack_require__.o(r,d)){var p=r[d],f=p?a(d):{type:"disposed",moduleId:d},h=!1,m=!1,b=!1,w="";switch(f.chain&&(w="\nUpdate propagation: "+f.chain.join(" -> ")),f.type){case"self-declined":e.onDeclined&&e.onDeclined(f),e.ignoreDeclined||(h=new Error("Aborted because of self decline: "+f.moduleId+w));break;case"declined":e.onDeclined&&e.onDeclined(f),e.ignoreDeclined||(h=new Error("Aborted because of declined dependency: "+f.moduleId+" in "+f.parentId+w));break;case"unaccepted":e.onUnaccepted&&e.onUnaccepted(f),e.ignoreUnaccepted||(h=new Error("Aborted because "+d+" is not accepted"+w));break;case"accepted":e.onAccepted&&e.onAccepted(f),m=!0;break;case"disposed":e.onDisposed&&e.onDisposed(f),b=!0;break;default:throw new Error("Unexception type "+f.type)}if(h)return{error:h};if(m)for(d in s[d]=p,c(u,f.outdatedModules),f.outdatedDependencies)__webpack_require__.o(f.outdatedDependencies,d)&&(l[d]||(l[d]=[]),c(l[d],f.outdatedDependencies[d]));b&&(c(u,[f.moduleId]),s[d]=_)}r=void 0;for(var v,g=[],k=0;k<u.length;k++){var y=u[k],q=__webpack_require__.c[y];q&&(q.hot._selfAccepted||q.hot._main)&&s[y]!==_&&!q.hot._selfInvalidated&&g.push({module:y,require:q.hot._requireSelf,errorHandler:q.hot._selfAccepted})}return{dispose:function(){var e;t.forEach((function(e){delete i[e]})),t=void 0;for(var n,r=u.slice();r.length>0;){var o=r.pop(),a=__webpack_require__.c[o];if(a){var c={},s=a.hot._disposeHandlers;for(k=0;k<s.length;k++)s[k].call(null,c);for(__webpack_require__.hmrD[o]=c,a.hot.active=!1,delete __webpack_require__.c[o],delete l[o],k=0;k<a.children.length;k++){var _=__webpack_require__.c[a.children[k]];_&&((e=_.parents.indexOf(o))>=0&&_.parents.splice(e,1))}}}for(var d in l)if(__webpack_require__.o(l,d)&&(a=__webpack_require__.c[d]))for(v=l[d],k=0;k<v.length;k++)n=v[k],(e=a.children.indexOf(n))>=0&&a.children.splice(e,1)},apply:function(n){for(var r in s)__webpack_require__.o(s,r)&&(__webpack_require__.m[r]=s[r]);for(var t=0;t<o.length;t++)o[t](__webpack_require__);for(var i in l)if(__webpack_require__.o(l,i)){var a=__webpack_require__.c[i];if(a){v=l[i];for(var c=[],_=[],d=[],p=0;p<v.length;p++){var f=v[p],h=a.hot._acceptedDependencies[f],m=a.hot._acceptedErrorHandlers[f];if(h){if(-1!==c.indexOf(h))continue;c.push(h),_.push(m),d.push(f)}}for(var b=0;b<c.length;b++)try{c[b].call(null,v)}catch(r){if("function"==typeof _[b])try{_[b](r,{moduleId:i,dependencyId:d[b]})}catch(t){e.onErrored&&e.onErrored({type:"accept-error-handler-errored",moduleId:i,dependencyId:d[b],error:t,originalError:r}),e.ignoreErrored||(n(t),n(r))}else e.onErrored&&e.onErrored({type:"accept-errored",moduleId:i,dependencyId:d[b],error:r}),e.ignoreErrored||n(r)}}}for(var w=0;w<g.length;w++){var k=g[w],y=k.module;try{k.require(y)}catch(r){if("function"==typeof k.errorHandler)try{k.errorHandler(r,{moduleId:y,module:__webpack_require__.c[y]})}catch(t){e.onErrored&&e.onErrored({type:"self-accept-error-handler-errored",moduleId:y,error:t,originalError:r}),e.ignoreErrored||(n(t),n(r))}else e.onErrored&&e.onErrored({type:"self-accept-errored",moduleId:y,error:r}),e.ignoreErrored||n(r)}}return u}}}self.webpackHotUpdatelearn=(n,t,i)=>{for(var c in t)__webpack_require__.o(t,c)&&(r[c]=t[c],e&&e.push(c));i&&o.push(i),a[n]&&(a[n](),a[n]=void 0)},__webpack_require__.hmrI.jsonp=function(e,n){r||(r={},o=[],t=[],n.push(l)),__webpack_require__.o(r,e)||(r[e]=__webpack_require__.m[e])},__webpack_require__.hmrC.jsonp=function(e,a,u,s,_,d){_.push(l),n={},t=a,r=u.reduce((function(e,n){return e[n]=!1,e}),{}),o=[],e.forEach((function(e){__webpack_require__.o(i,e)&&void 0!==i[e]?(s.push(c(e,d)),n[e]=!0):n[e]=!1})),__webpack_require__.f&&(__webpack_require__.f.jsonpHmr=function(e,r){n&&__webpack_require__.o(n,e)&&!n[e]&&(r.push(c(e)),n[e]=!0)})},__webpack_require__.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(__webpack_require__.p+__webpack_require__.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})();var __webpack_exports__=__webpack_require__("./index.ts")})();