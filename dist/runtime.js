(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.composi={})})(this,function(a){'use strict';function b(a,b,c){return a.type?(a=>{var e=a.type,f=d.call(b,e)&&b[e];return f?f(a.data):c?c():console.error("The message you sent has no matching action method. Check the spelling for the message or the action method. The message type was \"".concat(a.type,"\"."))})(a):(console.error("The message you provided was not valid. Messages have the format: {type: 'whatever', data?: 'something'}"),console.error("The tag you provided was:"),void console.dir(a))}function c(a){for(var c=Object.create(null),d=0,e=function(){var b=a[d];c[b]=a=>({type:b,data:a}),d++};d<a.length;)e();return{variants:c,match:b}}var d=Object.prototype.hasOwnProperty,e=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return(a,c)=>b.map(b=>b&&b(a,c))};a.run=function(a){function b(a){if(j)return c(g(d,a,b))}function c(a){a?d=a:e&&(d=e()),h&&k&&("function"==typeof h&&h(b,l),k=!1),f(d,b)}var d,e=a.init,f=a.view,g=a.update,h=a.subscriptions||a.subs,i=a.done,j=!0,k=!0,l=()=>d;return a.send=b,c(d),()=>{j&&(j=!1,i&&i(d))}},a.union=function(){for(var a=arguments.length,b=Array(a),d=0;d<a;d++)b[d]=arguments[d];var{variants:e,match:f}=c(b);return e.match=f,e},a.batchEffects=e,a.batch=e,Object.defineProperty(a,"__esModule",{value:!0})});
//# sourceMappingURL=runtime.js.map
