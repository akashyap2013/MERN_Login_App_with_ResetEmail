(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{1780:function(t,e,n){"use strict";n.r(e);n(24),n(7),n(25),n(133),n(33),n(40),n(8),n(224),n(9),n(10),n(54),n(61),n(80),n(17),n(190),n(18),n(11),n(13),n(12),n(15),n(14),n(20),n(55),n(22),n(70),n(71),n(72),n(73),n(42),n(44),n(45),n(69);var r=n(0),o=n.n(r),a=n(16),i=n.n(a),c=n(6),u=n(367),l=n(75),s=n(1),f=n(147),h=n(21),d=n(2),p=n(3),v=n(186),m=n(5);n(1502);function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t){return function(t){if(Array.isArray(t))return L(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||A(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */w=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,n){return t[e]=n}}function l(t,e,n,o){var a=e&&e.prototype instanceof h?e:h,i=Object.create(a.prototype),c=new O(o||[]);return r(i,"_invoke",{value:L(t,n,c)}),i}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var f={};function h(){}function d(){}function p(){}var v={};u(v,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(N([])));g&&g!==e&&n.call(g,a)&&(v=g);var b=p.prototype=h.prototype=Object.create(v);function E(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function A(t,e){var o;r(this,"_invoke",{value:function(r,a){function i(){return new e((function(o,i){!function r(o,a,i,c){var u=s(t[o],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==y(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}(r,a,o,i)}))}return o=o?o.then(i,i):i()}})}function L(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return j()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=S(i,n);if(c){if(c===f)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=s(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function S(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,S(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;var o=s(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function N(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return d.prototype=p,r(b,"constructor",{value:p,configurable:!0}),r(p,"constructor",{value:d,configurable:!0}),d.displayName=u(p,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,u(t,c,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},E(A.prototype),u(A.prototype,i,(function(){return this})),t.AsyncIterator=A,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new A(l(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(b),u(b,c,"Generator"),u(b,a,(function(){return this})),u(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=N,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:N(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function b(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function E(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,i,c=[],u=!0,l=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(c.push(r.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,e)||A(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(t,e){if(t){if("string"==typeof t)return L(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?L(t,e):void 0}}function L(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var S=function(t){var e=t.rightClickedAnnotation,n=t.setRightClickedAnnotation,a=E(Object(c.e)((function(t){return[p.a.isElementDisabled(t,m.a.LINK_MODAL),p.a.isElementOpen(t,m.a.LINK_MODAL),p.a.getTotalPages(t),p.a.getCurrentPage(t),p.a.getSelectedTab(t,m.a.LINK_MODAL),p.a.getPageLabels(t),p.a.isRightClickAnnotationPopupEnabled(t)]})),7),y=a[0],A=a[1],L=a[2],S=a[3],x=a[4],k=a[5],O=a[6],N=E(Object(u.a)(),1)[0],j=Object(c.d)(),P=o.a.createRef(),C=o.a.createRef(),_=E(Object(r.useState)(""),2),I=_[0],M=_[1],T=E(Object(r.useState)(""),2),D=T[0],U=T[1],G=s.a.isAnnotationSelected(e),R=s.a.getSelectedAnnotations(),B=s.a.getAnnotationManager(),Y=function(){j(d.a.closeElement(m.a.LINK_MODAL)),M(""),s.a.setToolMode(l.a),n(null)},F=function(t,e,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:S,a=new window.Core.Annotations.Link;return a.PageNumber=o,a.StrokeColor=new window.Core.Annotations.Color(0,165,228),a.StrokeStyle="underline",a.StrokeThickness=2,a.Author=s.a.getCurrentUser(),a.Subject="Link",a.X=t,a.Y=e,a.Width=n,a.Height=r,a},H=function(t){var n=[],r=s.a.getSelectedTextQuads();if(r){var o=s.a.getSelectedText(),a=function(e){var a=[];r[e].forEach((function(t){a.push(F(Math.min(t.x1,t.x3),Math.min(t.y1,t.y3),Math.abs(t.x1-t.x3),Math.abs(t.y1-t.y3),parseInt(e)))})),K(a,r[e],o,t),n.push.apply(n,a)};for(var i in r)a(i)}return(!O||G?R:[e]).forEach((function(e){if(e){var r=B.getGroupAnnotations(e);if(r.length>1){var o=r.filter((function(t){return t instanceof window.Core.Annotations.Link}));o.length>0&&(B.ungroupAnnotations(r),s.a.deleteAnnotations(o))}var a=F(e.X,e.Y,e.Width,e.Height);a.addAction("U",t),s.a.addAnnotations([a]),n.push(a),B.groupAnnotations(e,[a])}})),n},K=function(){var t,e=(t=w().mark((function t(e,n,r,o){var a,i,c;return w().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=s.a.getAnnotationManager(),i=e[0],(c=new window.Core.Annotations.TextHighlightAnnotation).PageNumber=i.PageNumber,c.X=i.X,c.Y=i.Y,c.Width=i.Width,c.Height=i.Height,c.StrokeColor=new window.Core.Annotations.Color(0,0,0,0),c.Opacity=0,c.Quads=n,c.Author=s.a.getCurrentUser(),c.setContents(r),e.forEach((function(t,e){t.addAction("U",o),0===e?s.a.addAnnotations([t,c]):s.a.addAnnotations([t])})),a.groupAnnotations(c,e);case 15:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){b(a,r,o,i,c,"next",t)}function c(t){b(a,r,o,i,c,"throw",t)}i(void 0)}))});return function(t,n,r,o){return e.apply(this,arguments)}}(),W=function(t){if(t.preventDefault(),I.length){var e;e=s.a.isValidURI(I)?I:"https://".concat(I);var n=new window.Core.Actions.URI({uri:e}),r=H(n).map((function(t){return t.PageNumber}));(r=g(new Set(r))).forEach((function(t){s.a.drawAnnotations(t,null,!0)})),Y()}},X=function(t){t.preventDefault();var e={dest:new(0,window.Core.Actions.GoTo.Dest)({page:k.indexOf(D)+1})},n=new window.Core.Actions.GoTo(e),r=H(n).map((function(t){return t.PageNumber}));(r=g(new Set(r))).forEach((function(t){s.a.drawAnnotations(t,null,!0)})),Y()};Object(r.useEffect)((function(){if(A){var t=s.a.getSelectedText();if(t){var e=t.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);e&&e.length>0&&M(e[0])}U(k.length>0?k[0]:"1")}}),[L,A]),Object(r.useEffect)((function(){"PageNumberPanelButton"===x&&A?C.current.focus():"URLPanelButton"===x&&A&&P.current.focus()}),[x,A,C,P]),Object(r.useEffect)((function(){return s.a.addEventListener("documentUnloaded",Y),function(){s.a.removeEventListener("documentUnloaded",Y)}}),[]);var z=i()({Modal:!0,LinkModal:!0,open:A,closed:!A});return y?null:o.a.createElement(v.a,{onSwipedUp:Y,onSwipedDown:Y,preventDefaultTouchmoveEvent:!0},o.a.createElement("div",{className:z,"data-element":m.a.LINK_MODAL,onMouseDown:Y},o.a.createElement("div",{className:"container",onMouseDown:function(t){return t.stopPropagation()}},o.a.createElement("div",{className:"swipe-indicator"}),o.a.createElement(f.d,{id:"linkModal"},o.a.createElement("div",{className:"tab-list"},o.a.createElement(f.a,{dataElement:"URLPanelButton"},o.a.createElement("div",{className:"tab-options-button"},N("link.url"))),o.a.createElement("div",{className:"tab-options-divider"}),o.a.createElement(f.a,{dataElement:"PageNumberPanelButton"},o.a.createElement("div",{className:"tab-options-button"},N("link.page")))),o.a.createElement(f.c,{dataElement:"URLPanel"},o.a.createElement("form",{onSubmit:W},o.a.createElement("div",null,N("link.enterurl")),o.a.createElement("div",{className:"linkInput"},o.a.createElement("input",{className:"urlInput",ref:P,value:I,onChange:function(t){return M(t.target.value)}}),o.a.createElement(h.a,{dataElement:"linkSubmitButton",label:N("action.link"),onClick:W,disabled:!I.length})))),o.a.createElement(f.c,{dataElement:"PageNumberPanel"},o.a.createElement("form",{onSubmit:X},o.a.createElement("div",null,N("link.enterpage")),o.a.createElement("div",{className:"linkInput"},o.a.createElement("input",{ref:C,value:D,onChange:function(t){return U(t.target.value)}}),o.a.createElement(h.a,{dataElement:"linkSubmitButton",label:N("action.link"),onClick:X,disabled:!(null==k?void 0:k.includes(D))}))))))))};e.default=S}}]);
//# sourceMappingURL=56.chunk.js.map