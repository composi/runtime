function a(a){function b(a){if(j)return c(g(d,a,b))}function c(a){a?d=a:e&&(d=e()),h&&k&&("function"==typeof h&&h(l,b),k=!1),f(d,b)}var d,e=a.init,f=a.view,g=a.update,h=a.subscriptions||a.subs,i=a.done,j=!0,k=!0,l=()=>d;return a.send=b,c(d),()=>{j&&(j=!1,i&&i(d))}}var b=Object.prototype.hasOwnProperty;function c(a){for(var c=Object.create(null),d=0,e=function(){var b=a[d];c[b]=a=>({type:b,data:a}),d++};d<a.length;)e();return{variants:c,match:function(a,c){return a.type?((a,d)=>{var e=a.type,f=b.call(c,e)&&c[e];return f(a.data,d)})(a):(console.error("The message you provided was not valid. Messages have the format: {type: 'whatever', data: 'something'}"),console.error("The tag you provided was:"),void console.dir(a))}}}function d(){for(var a=arguments.length,b=Array(a),d=0;d<a;d++)b[d]=arguments[d];var{variants:e,match:f}=c(b);return e.match=f,e}var e=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return(a,c)=>b.map(b=>b&&b(a,c))};export{a as run,d as union,e as batchEffects};
//# sourceMappingURL=runtime.mjs.map
