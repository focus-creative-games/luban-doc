"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1304],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>f});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(a),d=n,f=u["".concat(s,".").concat(d)]||u[d]||m[d]||i;return a?r.createElement(f,l(l({ref:t},c),{},{components:a})):r.createElement(f,l({ref:t},c))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:n,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},6975:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var r=a(7462),n=(a(7294),a(3905));const i={},l="Automatic Table Import",o={unversionedId:"beginner/importtable",id:"beginner/importtable",title:"Automatic Table Import",description:"Add an item to tables.xlsx for each new table, which is a tedious task. In most cases, each Excel file corresponds to a table, and it is possible to let the tool automatically add the table definition.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/beginner/importtable.md",sourceDirName:"beginner",slug:"/beginner/importtable",permalink:"/en/docs/beginner/importtable",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Use Polymorphic types",permalink:"/en/docs/beginner/usepolymorphismtype"},next:{title:"\u4f7f\u7528\u6307\u5357",permalink:"/en/docs/basic"}},s={},p=[{value:"Create an automatically imported table",id:"create-an-automatically-imported-table",level:2},{value:"Default import rules",id:"default-import-rules",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...a}=e;return(0,n.kt)(u,(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"automatic-table-import"},"Automatic Table Import"),(0,n.kt)("p",null,"Add an item to ",(0,n.kt)("strong",{parentName:"p"},"tables"),".xlsx for each new table, which is a tedious task. In most cases, each Excel file corresponds to a table, and it is possible to let the tool automatically add the table definition."),(0,n.kt)("p",null,"Automatic table import is supported since v3.0.0. Luban will scan the Excel file according to the specified rules and automatically add the corresponding table."),(0,n.kt)("p",null,"Automatic import supports custom import rules. For details, please refer to the document ",(0,n.kt)("a",{parentName:"p",href:"/en/docs/manual/importtable"},"Automatic table import"),"."),(0,n.kt)("h2",{id:"create-an-automatically-imported-table"},"Create an automatically imported table"),(0,n.kt)("p",null,"Copy the reward.xlsx created in ",(0,n.kt)("a",{parentName:"p",href:"./quickstart"},"Quick Start")," as ",(0,n.kt)("inlineCode",{parentName:"p"},"#Reward2.xlsx")," file. ",(0,n.kt)("strong",{parentName:"p"},"No")," modification of ","_","_","tables","_","_",".xlsx is required. Regenerate it and you will find that the TbReward2 table has been added, and the table record type is Reward2."),(0,n.kt)("p",null,"For common situations, this way of adding tables is very convenient."),(0,n.kt)("h2",{id:"default-import-rules"},"Default import rules"),(0,n.kt)("p",null,"By default, all excel (xls, xlsx, xlm, csv) files with a file name starting with # in the configuration directory (dataDir field in luban.conf) (including subdirectories) will be scanned, such as ",(0,n.kt)("inlineCode",{parentName:"p"},"#Item.xlsx"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"reward/#Reward.xlsx"),".\nThe string after removing the leading '#' character and the file suffix of the file name is used as the value_type of the table, and Tb is added to the value_type name as the full_name of the table. If the excel file is in a subdirectory, the subdirectory will be used as the namespace. For example:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"#Item.xlsx")," generates a table with full_name of TbItem, value_type of Item, and mode=map"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"reward/#Reward.xlsx")," generates a table with full_name of reward.TbReward, value_type of reward.Reward, and mode=map"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"item/equip/#Equip.csv")," generates a table with full_name of item.equip.TbEquip, value_type of item.equip.Equip, and mode=map"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"#item.Item.xlsx")," generates a table with full_name of item.TbItem, value_type of item.Item, and mode=map")))}m.isMDXComponent=!0}}]);