function a(a){function b(a,e){var f=a;if(j)return"function"==typeof a&&(f=a(e)),c(g(d,f,b))}function c(a){a?d=a:e&&(d=e()),h&&k&&("function"==typeof h&&h(b,l),k=!1),f(d,b)}var d,e=a.init,f=a.view,g=a.update,h=a.subscriptions||a.subs,i=a.done,j=!0,k=!0,l=()=>d;return a.send=b,c(d),()=>{j&&(j=!1,i&&i(d))}}var b=Object.prototype.hasOwnProperty;function c(a,c,d){return a.type?(a=>{var{type:e,data:f}=a,g=b.call(c,e)&&c[e];return g?g(f):d?d():console.error("The message you sent has no matching action method. Check the spelling for the message or the action method. The message type was \"".concat(e,"\"."))})(a):(console.error("The message you provided was not valid. Messages have the format: {type: 'whatever', data?: 'something'}"),console.error("The tag you provided was:"),void console.dir(a))}function d(a){for(var b=Object.create(null),d=0,e=function(){var c=a[d];"match"===c&&console.error("The message type you provided was \"match\". This cannot be used since it would override the message union's own match method. Please change it to something else, such as \"matchName\", etc."),b[c]=a=>({type:c,data:a}),d++};d<a.length;)e();return{variants:b,match:c}}function e(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var{variants:e,match:f}=d(b);return e.match=f,e}var f=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return(a,c)=>b.map(b=>b&&b(a,c))},g=f;export{a as run,e as union,f as batchEffects,g as batch};
//# sourceMappingURL=runtime.mjs.map
