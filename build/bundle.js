var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t){t.parentNode.removeChild(t)}let a;function f(t){a=t}const s=[],l=[],i=[],d=[],p=Promise.resolve();let h=!1;function m(t){i.push(t)}let g=!1;const $=new Set;function y(){if(!g){g=!0;do{for(let t=0;t<s.length;t+=1){const n=s[t];f(n),b(n.$$)}for(s.length=0;l.length;)l.pop()();for(let t=0;t<i.length;t+=1){const n=i[t];$.has(n)||($.add(n),n())}i.length=0}while(s.length);for(;d.length;)d.pop()();h=!1,g=!1,$.clear()}}function b(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(m)}}const _=new Set;function x(t,n){-1===t.$$.dirty[0]&&(s.push(t),h||(h=!0,p.then(y)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function v(c,s,l,i,d,p,h=[-1]){const g=a;f(c);const $=s.props||{},b=c.$$={fragment:null,ctx:null,props:p,update:t,not_equal:d,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(g?g.$$.context:[]),callbacks:e(),dirty:h};let v=!1;if(b.ctx=l?l(c,$,(t,n,...e)=>{const o=e.length?e[0]:n;return b.ctx&&d(b.ctx[t],b.ctx[t]=o)&&(b.bound[t]&&b.bound[t](o),v&&x(c,t)),n}):[],b.update(),v=!0,o(b.before_update),b.fragment=!!i&&i(b.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);b.fragment&&b.fragment.l(t),t.forEach(u)}else b.fragment&&b.fragment.c();s.intro&&((w=c.$$.fragment)&&w.i&&(_.delete(w),w.i(E))),function(t,e,c){const{fragment:u,on_mount:a,on_destroy:f,after_update:s}=t.$$;u&&u.m(e,c),m(()=>{const e=a.map(n).filter(r);f?f.push(...e):o(e),t.$$.on_mount=[]}),s.forEach(m)}(c,s.target,s.anchor),y()}var w,E;f(g)}function w(n){let e;return{c(){var t,n,o,r;t="main",e=document.createElement(t),e.innerHTML='<h1 class="svelte-1e9puaw">See you soon!</h1>',n=e,o="class",null==(r="svelte-1e9puaw")?n.removeAttribute(o):n.getAttribute(o)!==r&&n.setAttribute(o,r)},m(t,n){!function(t,n,e){t.insertBefore(n,e||null)}(t,e,n)},p:t,i:t,o:t,d(t){t&&u(e)}}}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}{constructor(t){super(),v(this,t,null,w,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
