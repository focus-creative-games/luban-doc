"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2238],{3905:(t,e,a)=>{a.d(e,{Zo:()=>d,kt:()=>g});var n=a(7294);function l(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){l(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,l=function(t,e){if(null==t)return{};var a,n,l={},r=Object.keys(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||(l[a]=t[a]);return l}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(l[a]=t[a])}return l}var m=n.createContext({}),p=function(t){var e=n.useContext(m),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},d=function(t){var e=p(t.components);return n.createElement(m.Provider,{value:e},t.children)},u="mdxType",c={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},s=n.forwardRef((function(t,e){var a=t.components,l=t.mdxType,r=t.originalType,m=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),u=p(a),s=l,g=u["".concat(m,".").concat(s)]||u[s]||c[s]||r;return a?n.createElement(g,i(i({ref:e},d),{},{components:a})):n.createElement(g,i({ref:e},d))}));function g(t,e){var a=arguments,l=e&&e.mdxType;if("string"==typeof t||l){var r=a.length,i=new Array(r);i[0]=s;var o={};for(var m in e)hasOwnProperty.call(e,m)&&(o[m]=e[m]);o.originalType=t,o[u]="string"==typeof t?t:l,i[1]=o;for(var p=2;p<r;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}s.displayName="MDXCreateElement"},7210:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>m,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var n=a(7462),l=(a(7294),a(3905));const r={},i="Code Style",o={unversionedId:"manual/codestyle",id:"manual/codestyle",title:"Code Style",description:"Luban generates code for a language that conforms to the recommended style of the language by default, but sometimes developers want to control the generated code style. Luban",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/manual/codestyle.md",sourceDirName:"manual",slug:"/manual/codestyle",permalink:"/en/docs/manual/codestyle",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Code and Data Generation",permalink:"/en/docs/manual/generatecodedata"},next:{title:"Load configuration",permalink:"/en/docs/manual/loadconfigatruntime"}},m={},p=[{value:"Naming style",id:"naming-style",level:2},{value:"Nameing location",id:"nameing-location",level:2},{value:"Code style",id:"code-style-1",level:2},{value:"Related command line parameters",id:"related-command-line-parameters",level:2}],d={toc:p},u="wrapper";function c(t){let{components:e,...a}=t;return(0,l.kt)(u,(0,n.Z)({},d,a,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"code-style"},"Code Style"),(0,l.kt)("p",null,"Luban generates code for a language that conforms to the recommended style of the language by default, but sometimes developers want to control the generated code style. Luban\nThere is relatively complete support for this."),(0,l.kt)("h2",{id:"naming-style"},"Naming style"),(0,l.kt)("p",null,"Luban has the following built-in naming styles:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Style Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"),(0,l.kt)("th",{parentName:"tr",align:null},"Example"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"none"),(0,l.kt)("td",{parentName:"tr",align:null},"Leave it as is"),(0,l.kt)("td",{parentName:"tr",align:null},"aa_bb_cc => aa_bb_cc")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"First split the original name by '_' to get the list of atomic names, and then use Camel style to spell the final name"),(0,l.kt)("td",{parentName:"tr",align:null},"aa_bb_cc => aaBbCc")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"First split the original name by '_' to get the list of atomic names, and then use Pascal style to spell the final name"),(0,l.kt)("td",{parentName:"tr",align:null},"aa_bb_cc => AaBbCc")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"upper"),(0,l.kt)("td",{parentName:"tr",align:null},"Just capitalize the original name"),(0,l.kt)("td",{parentName:"tr",align:null},"aa_bb_cc => AA_BB_CC")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"Underline style, equivalent to none style"),(0,l.kt)("td",{parentName:"tr",align:null},"aa_bb_cc => aa_bb_cc")))),(0,l.kt)("h2",{id:"nameing-location"},"Nameing location"),(0,l.kt)("p",null,"Luban can control the naming style of the following locations:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Location"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"namespace"),(0,l.kt)("td",{parentName:"tr",align:null},"namespace")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"type"),(0,l.kt)("td",{parentName:"tr",align:null},"Type, including type names of enum, bean, table and manager")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"method"),(0,l.kt)("td",{parentName:"tr",align:null},"Function, function name appearing in bean, table and manager")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"property"),(0,l.kt)("td",{parentName:"tr",align:null},"Attributes mainly refer to the attribute names that appear in beans and tables. Not all languages support the concept of attributes, such as c++")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"field"),(0,l.kt)("td",{parentName:"tr",align:null},"Field, field name in bean")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"enumItem"),(0,l.kt)("td",{parentName:"tr",align:null},"Enumeration item name, such as WRITE, READ")))),(0,l.kt)("h2",{id:"code-style-1"},"Code style"),(0,l.kt)("p",null,"Code style provides a set of naming style configurations that indicate the naming style used for each naming location. For common languages, Luban provides default coding styles."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"language"),(0,l.kt)("th",{parentName:"tr",align:null},"namespace"),(0,l.kt)("th",{parentName:"tr",align:null},"type"),(0,l.kt)("th",{parentName:"tr",align:null},"method"),(0,l.kt)("th",{parentName:"tr",align:null},"property"),(0,l.kt)("th",{parentName:"tr",align:null},"field"),(0,l.kt)("th",{parentName:"tr",align:null},"enumItem"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"none"),(0,l.kt)("td",{parentName:"tr",align:null},"none"),(0,l.kt)("td",{parentName:"tr",align:null},"none"),(0,l.kt)("td",{parentName:"tr",align:null},"none"),(0,l.kt)("td",{parentName:"tr",align:null},"none"),(0,l.kt)("td",{parentName:"tr",align:null},"none"),(0,l.kt)("td",{parentName:"tr",align:null},"none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"c#"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"java"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"go"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"lua"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"typescript"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"c++"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"camel"),(0,l.kt)("td",{parentName:"tr",align:null},"none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"python"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"pascal"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"snake"),(0,l.kt)("td",{parentName:"tr",align:null},"none")))),(0,l.kt)("p",null,"If it is not in these language lists, the none code style is used, that is, the original name is used."),(0,l.kt)("h2",{id:"related-command-line-parameters"},"Related command line parameters"),(0,l.kt)("p",null,"For detailed parameter introduction, please see ",(0,l.kt)("a",{parentName:"p",href:"./commandtools"},"Command Line Tools"),"."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"codeStyle"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"namingConvention.{codeTarget}.{location}"),(0,l.kt)("td",{parentName:"tr",align:null},"This parameter is a hierarchical option. If {codeTarget} is not specified, it will take effect on all code targets")))))}c.isMDXComponent=!0}}]);