(this.webpackJsonpfriday=this.webpackJsonpfriday||[]).push([[0],{14:function(e,t,n){e.exports={default:"SuperButton_default__18nk9",red:"SuperButton_red__4O9XB"}},15:function(e,t,n){e.exports={checkbox:"SuperCheckbox_checkbox__1hhZ8",spanClassName:"SuperCheckbox_spanClassName__3WXw7"}},24:function(e,t,n){},25:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),s=n(10),a=n.n(s),o=(n(24),n(25),n(5)),i=n(2),j=n(6),d=n(7),l=n(14),h=n.n(l),b=n(1),u=function(e){var t=e.red,n=e.className,c=Object(d.a)(e,["red","className"]),r="".concat(t?h.a.red:h.a.default," ").concat(n);return Object(b.jsx)("button",Object(j.a)({className:r},c))},p=n(15),x=n.n(p),O=function(e){e.type;var t=e.onChange,n=e.onChangeChecked,c=e.className,r=(e.spanClassName,e.children),s=(e.onChangeTest,Object(d.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children","onChangeTest"])),a=function(e){n&&n(e.currentTarget.checked),t&&t(e)},o="".concat(x.a.checkbox," ").concat(c||"");return Object(b.jsxs)("label",{children:[Object(b.jsx)("input",Object(j.a)({type:"checkbox",onChange:function(e){return a(e)},className:o},s)),r&&Object(b.jsx)("span",{className:x.a.spanClassName,children:r})]})},g=n(9),v=n.n(g),f=function(e){e.type;var t=e.onChange,n=e.onChangeText,c=e.onKeyPress,r=e.onEnter,s=e.error,a=(e.className,e.spanClassName),o=Object(d.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"]),i="".concat(v.a.error," ").concat(a||""),l="".concat(v.a.errorInput,"  ").concat(v.a.superInput?v.a.superInput:"");return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("input",Object(j.a)({type:"text",onChange:function(e){t&&t(e),n&&n(e.currentTarget.value)},onKeyPress:function(e){c&&c(e),r&&"Enter"===e.key&&r()},className:l},o)),s&&Object(b.jsx)("span",{className:i,children:s})]})},m=function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{children:Object(b.jsx)(u,{children:"Button"})}),Object(b.jsx)("div",{children:Object(b.jsx)(O,{})}),Object(b.jsx)("div",{children:Object(b.jsx)(f,{})})]})};var C=function(){return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)("div",{children:Object(b.jsx)(o.b,{to:"/login",children:" Go to login"})}),Object(b.jsx)("div",{children:Object(b.jsx)(o.b,{to:"/register",children:" Go to Register"})}),Object(b.jsx)("div",{children:Object(b.jsx)(o.b,{to:"/profile",children:" Go to Profile"})}),Object(b.jsx)("div",{children:Object(b.jsx)(o.b,{to:"/newpassword",children:" Go to create new password"})}),Object(b.jsx)("div",{children:Object(b.jsx)(o.b,{to:"/restore",children:" Go to restore password"})}),Object(b.jsx)("div",{children:Object(b.jsx)(o.b,{to:"/test",children:" Go to test"})}),Object(b.jsxs)("div",{children:[Object(b.jsx)(o.b,{to:"/404",children:" Go to 404"}),"g"]}),Object(b.jsxs)(i.c,{children:[Object(b.jsx)(i.a,{path:"/",element:Object(b.jsx)("div",{children:"default"})}),Object(b.jsx)(i.a,{path:"login",element:Object(b.jsx)("div",{children:"Login"})}),Object(b.jsx)(i.a,{path:"register",element:Object(b.jsx)("div",{children:"Register"})}),Object(b.jsx)(i.a,{path:"profile",element:Object(b.jsx)("div",{children:"Profile"})}),Object(b.jsx)(i.a,{path:"restore",element:Object(b.jsx)("div",{children:"Restore password"})}),Object(b.jsx)(i.a,{path:"newpassword",element:Object(b.jsx)("div",{children:"New Password"})}),Object(b.jsx)(i.a,{path:"test",element:Object(b.jsx)(m,{})}),Object(b.jsx)(i.a,{path:"/404",element:Object(b.jsx)("h1",{children:"404: PAGE NOT FOUND"})})]})]})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,34)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))},_=n(19),y=n(12),w={isLoggedIn:!1},k=n(18),I={},T={},P={},S={},G=Object(y.b)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;return t.type,e},register:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;return t.type,e},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;return t.type,e},restorePass:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;return t.type,e},newPass:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;return t.type,e}}),B=Object(y.c)(G,Object(y.a)(k.a));window.store=B,a.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(o.a,{children:Object(b.jsx)(_.a,{store:B,children:Object(b.jsx)(C,{})})})}),document.getElementById("root")),N()},9:function(e,t,n){e.exports={superInput:"SuperInputText_superInput__3-uvM",errorInput:"SuperInputText_errorInput__36AjH",error:"SuperInputText_error__3gt55"}}},[[33,1,2]]]);
//# sourceMappingURL=main.aa9a6b23.chunk.js.map