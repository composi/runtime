function a(a){function b(a,d){var e=a;return j&&"function"==typeof a&&(e=a(d)),j&&m(f(c,e,b))}var c,{init:d,view:e,update:f,subs:g,done:h}=a,i=g||a.subscriptions,j=!0,k=!0,l=()=>c;a.send=b;var m=a=>{a&&(c=a)||d&&(c=d())||(c=void 0),k&&i&&"function"==typeof i&&i(b,l),k=!1,e(c,b)};return m(c),()=>{j&&h&&h(c),j=!1}}var{hasOwnProperty:b}=Object;function c(a,c,d){var{type:e,data:f}=a;return e?(a=>{var e=b.call(c,a)&&c[a];return e?e(f):d?d():console.error("The message you sent has no matching action method. Check the spelling for the message or the action method. The message type was \"".concat(a,"\"."))})(e):(()=>{console.error("The message you provided was not valid. Messages have the format: {type: 'whatever', data?: 'something'}"),console.error("The tag you provided was:"),console.dir(a)})()}function d(a){for(var b=Object.create(null),d=0,e=function(){var c=a[d];"match"===c&&console.error("The message type you provided was \"match\". This cannot be used since it would override the message union's own match method. Please change it to something else, such as \"matchName\", etc."),b[c]=a=>({type:c,data:a}),d++};d<a.length;)e();return{variants:b,match:c}}function e(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var{variants:e,match:f}=d(b);return e.match=f,e}var f=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return(a,c)=>b.map(b=>b&&b(a,c))},g=f;export{a as run,e as union,f as batchEffects,g as batch};
//# sourceMappingURL=runtime.mjs.map
