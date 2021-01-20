define(["exports","metal/src/metal"],function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e){function t(){n(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.cache=null,e.cacheable=!1,e}return c(t,e),a(t,[{key:"addCache",value:function(e){return this.cacheable&&(this.cache=e),this}},{key:"clearCache",value:function(){return this.cache=null,this}},{key:"disposeInternal",value:function(){this.clearCache()}},{key:"getCache",value:function(){return this.cache}},{key:"isCacheable",value:function(){return this.cacheable}},{key:"setCacheable",value:function(e){e||this.clearCache(),this.cacheable=e}}]),t}(t.Disposable);e["default"]=o});