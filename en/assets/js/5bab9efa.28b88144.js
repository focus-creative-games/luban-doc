"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2961],{3905:(t,e,a)=>{a.d(e,{Zo:()=>s,kt:()=>d});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function p(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var u=n.createContext({}),o=function(t){var e=n.useContext(u),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},s=function(t){var e=o(t.components);return n.createElement(u.Provider,{value:e},t.children)},m="mdxType",c={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},k=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,u=t.parentName,s=p(t,["components","mdxType","originalType","parentName"]),m=o(a),k=r,d=m["".concat(u,".").concat(k)]||m[k]||c[k]||l;return a?n.createElement(d,i(i({ref:e},s),{},{components:a})):n.createElement(d,i({ref:e},s))}));function d(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=k;var p={};for(var u in e)hasOwnProperty.call(e,u)&&(p[u]=e[u]);p.originalType=t,p[m]="string"==typeof t?t:r,i[1]=p;for(var o=2;o<l;o++)i[o]=a[o];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},5910:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>u,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var n=a(7462),r=(a(7294),a(3905));const l={},i="\u4ee3\u7801\u4e0e\u6570\u636e\u751f\u6210",p={unversionedId:"manual/generatecodedata",id:"version-classic/manual/generatecodedata",title:"\u4ee3\u7801\u4e0e\u6570\u636e\u751f\u6210",description:"\u652f\u6301\u7684\u5e73\u53f0\u3001\u5f15\u64ce\u548c\u8bed\u8a00",source:"@site/versioned_docs/version-classic/manual/generatecodedata.md",sourceDirName:"manual",slug:"/manual/generatecodedata",permalink:"/en/docs/classic/manual/generatecodedata",draft:!1,tags:[],version:"classic",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u670d\u52a1\u7aef\u5e03\u7f72",permalink:"/en/docs/classic/manual/deploy"},next:{title:"\u914d\u7f6e\u5b9a\u4e49",permalink:"/en/docs/classic/manual/define"}},u={},o=[{value:"\u652f\u6301\u7684\u5e73\u53f0\u3001\u5f15\u64ce\u548c\u8bed\u8a00",id:"\u652f\u6301\u7684\u5e73\u53f0\u5f15\u64ce\u548c\u8bed\u8a00",level:2},{value:"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f",id:"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f",level:2},{value:"\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e",id:"\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e",level:2},{value:"\u4e3aunity\u9879\u76ee\u751f\u6210c#\u4ee3\u7801\u5e76\u5bfc\u51fajson\u6570\u636e",id:"\u4e3aunity\u9879\u76ee\u751f\u6210c\u4ee3\u7801\u5e76\u5bfc\u51fajson\u6570\u636e",level:2},{value:"\u4e3a unity + puerts \u9879\u76ee\u751f\u6210 ts\u4ee3\u7801\uff0c\u5e76\u751f\u6210json\u6570\u636e",id:"\u4e3a-unity--puerts-\u9879\u76ee\u751f\u6210-ts\u4ee3\u7801\u5e76\u751f\u6210json\u6570\u636e",level:2},{value:"\u4e3a UE4\u9879\u76ee\uff0c\u751f\u6210c++\u4ee3\u7801\uff08\u975e\u84dd\u56fe\uff09\u548cbinary\u6570\u636e",id:"\u4e3a-ue4\u9879\u76ee\u751f\u6210c\u4ee3\u7801\u975e\u84dd\u56fe\u548cbinary\u6570\u636e",level:2},{value:"\u5176\u4ed6\u7c7b\u578b\u9879\u76ee\u7c7b\u578b\uff0c\u5982\u4f55\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e",id:"\u5176\u4ed6\u7c7b\u578b\u9879\u76ee\u7c7b\u578b\u5982\u4f55\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e",level:2},{value:"\u751f\u6210protobuf\u7684\u5b9a\u4e49\u6587\u4ef6\u53caprotobuf\u6570\u636e\u683c\u5f0f",id:"\u751f\u6210protobuf\u7684\u5b9a\u4e49\u6587\u4ef6\u53caprotobuf\u6570\u636e\u683c\u5f0f",level:2},{value:"protobuf2",id:"protobuf2",level:3},{value:"protobuf3",id:"protobuf3",level:3},{value:"\u751f\u6210msgpack\u7684\u6570\u636e",id:"\u751f\u6210msgpack\u7684\u6570\u636e",level:2},{value:"\u751f\u6210flatbuffers\u7684\u5b9a\u4e49\u6587\u4ef6\u53caflatbuffers\u6570\u636e\u683c\u5f0f",id:"\u751f\u6210flatbuffers\u7684\u5b9a\u4e49\u6587\u4ef6\u53caflatbuffers\u6570\u636e\u683c\u5f0f",level:2},{value:"\u53ea\u751f\u6210\u4ee3\u7801\u6216\u8005\u6570\u636e",id:"\u53ea\u751f\u6210\u4ee3\u7801\u6216\u8005\u6570\u636e",level:2},{value:"\u914d\u7f6e\u4e2d\u6709\u4e9bstring\u5b57\u6bb5\u662f\u8d44\u6e90\u5730\u5740\uff0c\u7edf\u4e00\u5bfc\u51fa\u8fd9\u4e9b\u8d44\u6e90\u5730\u5740",id:"\u914d\u7f6e\u4e2d\u6709\u4e9bstring\u5b57\u6bb5\u662f\u8d44\u6e90\u5730\u5740\u7edf\u4e00\u5bfc\u51fa\u8fd9\u4e9b\u8d44\u6e90\u5730\u5740",level:2},{value:"\u751f\u6210\u7684c#\u4ee3\u7801\u4e2d,vector\u7684\u7c7b\u578b\u7531System.Numerics.Vector{2,3,4}\uff0c\u6539\u6210 UnityEngine.Vector{2,3,4}",id:"\u751f\u6210\u7684c\u4ee3\u7801\u4e2dvector\u7684\u7c7b\u578b\u7531systemnumericsvector234\u6539\u6210-unityenginevector234",level:2},{value:"\u81ea\u5b9a\u4e49\u4ee3\u7801\u547d\u540d\u98ce\u683c",id:"\u81ea\u5b9a\u4e49\u4ee3\u7801\u547d\u540d\u98ce\u683c",level:2},{value:"gen_types\u4e2d code_cs_json\u548ccode_cs_unity_json\u7684\u533a\u522b",id:"gen_types\u4e2d-code_cs_json\u548ccode_cs_unity_json\u7684\u533a\u522b",level:2},{value:"\u8c03\u751f\u6210\u7684\u6570\u636e\u6587\u4ef6\u7684\u540e\u7f00",id:"\u8c03\u751f\u6210\u7684\u6570\u636e\u6587\u4ef6\u7684\u540e\u7f00",level:2},{value:"\u4e0d\u540c\u5bfc\u51fa\u683c\u5f0f\u7684\u6027\u80fd\u6d4b\u8bd5\u7ed3\u679c",id:"\u4e0d\u540c\u5bfc\u51fa\u683c\u5f0f\u7684\u6027\u80fd\u6d4b\u8bd5\u7ed3\u679c",level:2},{value:"binary\u4e0ejson\u683c\u5f0f\u52a0\u8f7d\u6027\u80fd\u5bf9\u6bd4",id:"binary\u4e0ejson\u683c\u5f0f\u52a0\u8f7d\u6027\u80fd\u5bf9\u6bd4",level:2}],s={toc:o},m="wrapper";function c(t){let{components:e,...a}=t;return(0,r.kt)(m,(0,n.Z)({},s,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u4ee3\u7801\u4e0e\u6570\u636e\u751f\u6210"},"\u4ee3\u7801\u4e0e\u6570\u636e\u751f\u6210"),(0,r.kt)("h2",{id:"\u652f\u6301\u7684\u5e73\u53f0\u5f15\u64ce\u548c\u8bed\u8a00"},"\u652f\u6301\u7684\u5e73\u53f0\u3001\u5f15\u64ce\u548c\u8bed\u8a00"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u8de8\u5e73\u53f0",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Win"),(0,r.kt)("li",{parentName:"ul"},"Mac"),(0,r.kt)("li",{parentName:"ul"},"Linux (\u5305\u62ecWSL)"))),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u4e3b\u6d41\u7684\u6e38\u620f\u5f00\u53d1\u8bed\u8a00",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"c++ (11+)"),(0,r.kt)("li",{parentName:"ul"},"c# (.net framework 4+. dotnet core 3+)"),(0,r.kt)("li",{parentName:"ul"},"java (1.6+)"),(0,r.kt)("li",{parentName:"ul"},"go (1.10+)"),(0,r.kt)("li",{parentName:"ul"},"lua (5.1+)"),(0,r.kt)("li",{parentName:"ul"},"js \u548c typescript (3.0+)"),(0,r.kt)("li",{parentName:"ul"},"python (3.0+)"),(0,r.kt)("li",{parentName:"ul"},"erlang (18+)"),(0,r.kt)("li",{parentName:"ul"},"rust (1.5+)"),(0,r.kt)("li",{parentName:"ul"},"\u5176\u4ed6",(0,r.kt)("strong",{parentName:"li"},"protobuf"),"\u652f\u6301\u8bed\u8a00"))),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u4e3b\u6d41\u7684\u5f15\u64ce",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"unity"),(0,r.kt)("li",{parentName:"ul"},"unreal"),(0,r.kt)("li",{parentName:"ul"},"cocos2d-x"),(0,r.kt)("li",{parentName:"ul"},"\u5fae\u4fe1\u5c0f\u6e38\u620f\u5e73\u53f0"),(0,r.kt)("li",{parentName:"ul"},"\u5176\u4ed6\u5bb6\u652f\u6301js\u7684\u5c0f\u6e38\u620f\u5e73\u53f0"))),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u4e3b\u6d41\u7684\u70ed\u66f4\u65b0\u65b9\u6848",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"xlua"),(0,r.kt)("li",{parentName:"ul"},"tolua"),(0,r.kt)("li",{parentName:"ul"},"slua"),(0,r.kt)("li",{parentName:"ul"},"ILRuntime"),(0,r.kt)("li",{parentName:"ul"},"sluaunreal"),(0,r.kt)("li",{parentName:"ul"},"puerts"),(0,r.kt)("li",{parentName:"ul"},"XIL"))),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u4e3b\u6d41\u7684\u5f00\u6e90\u6846\u67b6",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"skynet"),(0,r.kt)("li",{parentName:"ul"},"ET"),(0,r.kt)("li",{parentName:"ul"},"GameFramework"),(0,r.kt)("li",{parentName:"ul"},"xlua-framework")))),(0,r.kt)("h2",{id:"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f"},"\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"binary \u683c\u5f0f\u3002 \u683c\u5f0f\u7d27\u51d1\uff0c\u52a0\u8f7d\u9ad8\u6548\uff0c\u4f46\u57fa\u672c\u4e0d\u5177\u4f53\u53ef\u8bfb\u6027\u3002\u63a8\u8350\u53ea\u7528\u4e8e\u6b63\u5f0f\u53d1\u5e03\u3002"),(0,r.kt)("li",{parentName:"ul"},"json \u683c\u5f0f\u3002 \u53ef\u8bfb\u6027\u4f73\u3002\u652f\u6301\u4f18\u96c5\u5bf9\u9f50\u683c\u5f0f\uff0c\u4e5f\u652f\u6301\u7d27\u51d1\u683c\u5f0f\u3002 \u63a8\u8350\u7528\u4e8e\u670d\u52a1\u5668\u7aef\uff0c\u4ee5\u53ca\u7528\u4e8e\u5ba2\u6237\u7aef\u5f00\u53d1\u671f\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"protobuf")," \u683c\u5f0f\u3002\u9002\u7528\u4e8e\u719f\u6089pb\u7684\u5f00\u53d1\u8005\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"msgpack")," \u683c\u5f0f\u3002"),(0,r.kt)("li",{parentName:"ul"},"lua \u683c\u5f0f\u3002 \u53ef\u8bfb\u6027\u4f73\u3002 \u63a8\u8350\u4ec5\u7528\u4e8e\u5ba2\u6237\u7aef\u811a\u672c\u8bed\u8a00\u4e3alua\u7684\u60c5\u5f62\u3002"),(0,r.kt)("li",{parentName:"ul"},"xml \u683c\u5f0f\u3002"),(0,r.kt)("li",{parentName:"ul"},"erlang\u683c\u5f0f\u3002 \u4ec5\u7528\u4e8e erlang\u8bed\u8a00\u3002"),(0,r.kt)("li",{parentName:"ul"},"yaml\u683c\u5f0f\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5176\u4ed6\u683c\u5f0f\u3002\u5f88\u5bb9\u6613\u6269\u5c55\u652f\u6301\u3002")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"\u540c\u4e00\u79cd\u683c\u5f0f\uff0c\u4e3a\u4e0d\u540c\u8bed\u8a00\u751f\u6210\u7684\u6570\u636e\u662f\u5b8c\u5168\u76f8\u540c\u7684")),(0,r.kt)("p",null,"\u4e0d\u540c\u8bed\u8a00\u652f\u6301\u7684\u683c\u5f0f\u5982\u4e0b\uff1a"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"language"),(0,r.kt)("th",{parentName:"tr",align:"center"},"binary"),(0,r.kt)("th",{parentName:"tr",align:"center"},"json"),(0,r.kt)("th",{parentName:"tr",align:"center"},"lua"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"c#"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"java"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"go"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"c++"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u274c"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"go"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"python"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"typescript"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"rust"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u274c"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"lua"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u274c"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"erlang"),(0,r.kt)("td",{parentName:"tr",align:"center"},"erlang"),(0,r.kt)("td",{parentName:"tr",align:"center"}),(0,r.kt)("td",{parentName:"tr",align:"center"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"protobuf"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"})))),(0,r.kt)("h2",{id:"\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e"},"\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e"),(0,r.kt)("p",null,"\u4ee3\u7801\u751f\u6210\u76f8\u5173\u7684\u5de5\u5177\u6709\u4e09\u4e2a,\u90fd\u5728luban_examples/Tools\u76ee\u5f55\u4e0b\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Luban.Client\u3002 Luban\u5de5\u5177\u5ba2\u6237\u7aef"),(0,r.kt)("li",{parentName:"ul"},"Luban.Server\u3002 Luban\u5de5\u5177\u670d\u52a1\u5668\u7aef"),(0,r.kt)("li",{parentName:"ul"},"Luban.ClientServer\u3002 Luban\u5de5\u5177\u524d\u540e\u7aef\u4e00\u4f53\u3002")),(0,r.kt)("p",null,"\u5bf9\u4e8e\u65b0\u624b\u7b80\u5355\u8d77\u89c1\uff0c\u6211\u4eec\u4ecb\u7ecdLuban.ClientServer\u7684\u7528\u6cd5\uff0c\u547d\u4ee4\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"dotnet %LUBAN_CLIENT_SERVER_DLL% -j cfg -- ^\n -d %ROOT_FILE% ^\n --input_data_dir %INPUT_DATA_DIR% ^\n --output_code_dir %OUTPUT_CODE_DIR%\n --output_data_dir %OUTPUT_DIR% ^\n --gen_types %GEN_TYPE% ^\n -s %GROUP%\n")),(0,r.kt)("p",null,"\u5176\u4e2d\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"LUBAN_CLIENT_SERVER_DLL\u4e3a Luban.ClientServer.dll\u7684\u8def\u5f84\uff0c \u53ef\u4ee5\u6307\u5411 luban_examples/Tools/Luban.ClientServer/Luban.ClientServer.dll"),(0,r.kt)("li",{parentName:"ul"},"ROOT_FILE \u4e3a\u6839\u5b9a\u4e49\u6587\u4ef6\uff0c\u6307\u5411 MyConfigs/Define/","_","_","root","_","_",".xml"),(0,r.kt)("li",{parentName:"ul"},"INPUT_DATA_DIR \u4e3a\u914d\u7f6e\u6570\u636e\u7684\u6839\u76ee\u5f55\uff0c\u6307\u5411 MyConfigs/Datas"),(0,r.kt)("li",{parentName:"ul"},"OUTPUT_CODE_DIR \u4e3a\u751f\u6210\u4ee3\u7801\u7684\u76ee\u5f55"),(0,r.kt)("li",{parentName:"ul"},'GEN_TYPE \u4e3a\u751f\u6210\u7c7b\u578b\u3002 \u5982\u679c\u4f60\u4f7f\u7528unity,\u60f3\u751f\u6210c#\u4ee3\u7801\uff0c\u5bfc\u51fajson\u6570\u636e\uff0c\u5219\u4f7f\u7528 "code_cs_unity_json,data_json"'),(0,r.kt)("li",{parentName:"ul"},"GROUP \u4e3a\u5bfc\u51fa\u5206\u7ec4\u3002\u5ba2\u6237\u7aef\u5219\u53d6client\uff0c\u670d\u52a1\u5668\u53d6server\uff0c\u6240\u6709\u5219\u53d6all")),(0,r.kt)("p",null,"\u66f4\u591a\u9879\u76ee\u7c7b\u578b\uff0c\u53c2\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects"},"\u793a\u4f8b\u9879\u76ee")),(0,r.kt)("h2",{id:"\u4e3aunity\u9879\u76ee\u751f\u6210c\u4ee3\u7801\u5e76\u5bfc\u51fajson\u6570\u636e"},"\u4e3aunity\u9879\u76ee\u751f\u6210c#\u4ee3\u7801\u5e76\u5bfc\u51fajson\u6570\u636e"),(0,r.kt)("p",null,"\u5bf9\u4e8e\u547d\u4ee4\u884c\u7684\u4ecb\u7ecd\u53c2\u89c1 \u4e0a\u9762\u3002 \u4f60\u7684\u751f\u6210\u547d\u4ee4\u5927\u7565\u5982\u4e0b"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'dotnet %LUBAN_CLIENT_SERVER_DLL% -j cfg -- ^\n -d %ROOT_FILE% ^\n --input_data_dir %INPUT_DATA_DIR% ^\n --output_code_dir %OUTPUT_CODE_DIR%\n --output_data_dir %OUTPUT_DIR% ^\n --gen_types "code_cs_unity_json,data_json" ^\n -s client\n')),(0,r.kt)("p",null,'\u4e5f\u5373 --gen_types\u53c2\u6570\u53d6 "code_cs_unity_json,data_json", -s \u53c2\u6570\u53d6 client'),(0,r.kt)("p",null,"\u5177\u4f53\u9879\u76ee\uff0c\u53ef\u53c2\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json"},"Csharp_Unity_Json")),(0,r.kt)("p",null,"\u66f4\u591a\u9879\u76ee\u7c7b\u578b\uff0c\u53c2\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects"},"\u793a\u4f8b\u9879\u76ee")),(0,r.kt)("h2",{id:"\u4e3a-unity--puerts-\u9879\u76ee\u751f\u6210-ts\u4ee3\u7801\u5e76\u751f\u6210json\u6570\u636e"},"\u4e3a unity + puerts \u9879\u76ee\u751f\u6210 ts\u4ee3\u7801\uff0c\u5e76\u751f\u6210json\u6570\u636e"),(0,r.kt)("p",null,'--gen_types \u53c2\u6570\u53d6 "code_typescript_json,data_json"\uff0c-s \u53c2\u6570\u53d6 client'),(0,r.kt)("p",null,"\u5177\u4f53\u9879\u76ee\uff0c\u53ef\u53c2\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/TypeScript_Unity_Puerts_Json"},"Typescript_Unity_Puerts_Json")),(0,r.kt)("h2",{id:"\u4e3a-ue4\u9879\u76ee\u751f\u6210c\u4ee3\u7801\u975e\u84dd\u56fe\u548cbinary\u6570\u636e"},"\u4e3a UE4\u9879\u76ee\uff0c\u751f\u6210c++\u4ee3\u7801\uff08\u975e\u84dd\u56fe\uff09\u548cbinary\u6570\u636e"),(0,r.kt)("p",null,"\u57fa\u51c6\u7684\u53c2\u8003\u9879\u76ee\u4e3a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Cpp_Unreal_bin"},"Cpp_Unreal_bin"),"\u3002"),(0,r.kt)("p",null,'\u7531\u4e8e\u751f\u6210\u7684\u4ee3\u7801\u4f9d\u8d56\u4e8e\u4e00\u4e9b\u5934\u6587\u4ef6\uff0c\u4f60\u9700\u8981\u5148\u4ece\u8be5\u9879\u76ee \u62f7\u5907Source\\Cpp_Unreal\\Private\\bright \u5230\u4f60\u4eec\u9879\u76ee\u5408\u9002\u7684\u4f4d\u7f6e\u3002\u5fc5\u987b\u4fdd\u8bc1bright\u76ee\u5f55\u5728include\u76ee\u5f55\u8def\u5f84\u5185\uff0c\u5982\u751f\u6210\u7684\u4ee3\u7801\u4e2d #include "bright/serialization/ByteBuf.h" \u53ef\u4ee5\u627e\u5230\u8fd9\u4e2a\u6587\u4ef6\u3002'),(0,r.kt)("p",null,'\u63a5\u7740\u547d\u4ee4\u884c\u53c2\u6570\u53d6 --gen_types "code_cpp_bin,data_bin"'),(0,r.kt)("h2",{id:"\u5176\u4ed6\u7c7b\u578b\u9879\u76ee\u7c7b\u578b\u5982\u4f55\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e"},"\u5176\u4ed6\u7c7b\u578b\u9879\u76ee\u7c7b\u578b\uff0c\u5982\u4f55\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e"),(0,r.kt)("p",null,"\u4e0d\u540c\u9879\u76ee\u4e4b\u95f4\uff0c\u4ec5\u4ec5\u662f --gen_types \u4e0d\u4e00\u6837\uff0c \u8bf7\u4ece",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects"},"\u793a\u4f8b\u9879\u76ee"),"\u4e2d\u627e\u5230\u4e0e\u4f60\u9879\u76ee\u5339\u914d\u7684\u9879\u76ee\uff0c\u53c2\u8003\u76f8\u5e94\u76ee\u5f55\u4e0b\u7684 gen_code.bat \u5373\u53ef\u3002"),(0,r.kt)("h2",{id:"\u751f\u6210protobuf\u7684\u5b9a\u4e49\u6587\u4ef6\u53caprotobuf\u6570\u636e\u683c\u5f0f"},"\u751f\u6210protobuf\u7684\u5b9a\u4e49\u6587\u4ef6\u53caprotobuf\u6570\u636e\u683c\u5f0f"),(0,r.kt)("p",null,"\u76ee\u524d\u652f\u6301proto2\u548cproto3\u8bed\u6cd5"),(0,r.kt)("h3",{id:"protobuf2"},"protobuf2"),(0,r.kt)("p",null,"\u53ea\u652f\u6301bin\u683c\u5f0f\u5bfc\u51fa\u3002"),(0,r.kt)("p",null,"\u53d6 --gen_types code_protobuf2,data_protobuf_bin \u5373\u53ef\uff0c\u53c2\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Protobuf2_bin"},"Protobuf2_bin"),"\u3002 \u6bcf\u4e2a\u5bfc\u51fa\u7684\u6570\u636e\u6587\u4ef6\u5bf9\u5e94Table\u7c7b\u5e8f\u5217\u5316\u540e\u7684\u5185\u5bb9\uff0c\u52a0\u8f7d\u5373\u53ef\uff0c\u4ee5item.TbItem\u8868\u4e3a\u4f8b\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var tbItem = ItemTbItem.Parser.ParseFrom(File.OpenRead("pb_datas/item_tbitem.bytes"));\n\n')),(0,r.kt)("h3",{id:"protobuf3"},"protobuf3"),(0,r.kt)("p",null,"\u65e2\u652f\u6301bin\u683c\u5f0f\uff0c\u4e5f\u652f\u6301json\u683c\u5f0f\u5bfc\u51fa\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"binary\u683c\u5f0f\u5bfc\u51fa\u3002 --gen_types code_protobuf3,data_protobuf_bin"),(0,r.kt)("li",{parentName:"ul"},"json\u683c\u5f0f\u5bfc\u51fa\u3002 --gen_types code_protobuf3,data_protobuf_json")),(0,r.kt)("h2",{id:"\u751f\u6210msgpack\u7684\u6570\u636e"},"\u751f\u6210msgpack\u7684\u6570\u636e"),(0,r.kt)("p",null,"\u53d6 --gen_types data_msgpack \u5373\u53ef\u3002 \u53c2\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/MsgPack_bin"},"MsgPack_bin")),(0,r.kt)("h2",{id:"\u751f\u6210flatbuffers\u7684\u5b9a\u4e49\u6587\u4ef6\u53caflatbuffers\u6570\u636e\u683c\u5f0f"},"\u751f\u6210flatbuffers\u7684\u5b9a\u4e49\u6587\u4ef6\u53caflatbuffers\u6570\u636e\u683c\u5f0f"),(0,r.kt)("p",null,"\u53d6 --gen_types code_flatbuffers,data_flatbuffers_json \u5373\u53ef\uff0c\u53c2\u89c1 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Flatbuffers_json"},"Flatbuffers_json"),"\u3002"),(0,r.kt)("p",null,"\u7531\u4e8ebinary\u683c\u5f0f\u8fc7\u4e8e\u590d\u6742\uff0c\u73b0\u5728\u53ea\u652f\u6301\u5bfc\u51fajson\u683c\u5f0f\uff0c\u4f46\u662f\u4f7f\u7528\u8005\u53ef\u4ee5\u4f7f\u7528flatc\u5de5\u5177\u5c06\u6570\u636e\u8f6c\u6210binary\uff01\u7279\u5730\u751f\u6210\u4e86 convert_json_2_binary.bat\n\u548cconvert_json_2_binary.sh\u8fd9\u4e24\u4e2a\u6279\u5904\u7406\u6587\u4ef6\uff0c\u65b9\u4fbf\u81ea\u52a8\u4e00\u952e\u8f6c\u6362\u3002"),(0,r.kt)("p",null,"\u76ee\u524d\u7531\u4e8eflat_buffers\u4e0d\u652f\u6301\u5bb9\u5668\u7684\u5143\u7d20\u7c7b\u578b\u4e3aunion\uff0c\u56e0\u6b64\u7565\u5fae\u6709\u4e00\u4e9b\u517c\u5bb9\u6027\u95ee\u9898\uff0c\u4f46\u5728\u9879\u76ee\u4e2d\u53ef\u4ee5\u901a\u8fc7\u4f7f\u7528\u4e00\u4e2abean\u6765\u5305\u542b\u8fd9\u4e2aunion\u5b57\u6bb5\u6765\u8fc2\u56de\u89e3\u51b3\u3002"),(0,r.kt)("p",null,"data_flatbuffers_json \u548c data_json\u7684\u8f93\u51fa\u683c\u5f0f\u6709\u4e00\u4e9b\u533a\u522b"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"data_flatbuffers_json \u9876\u5c42\u4e3a \u5305\u542bdata_list\u5b57\u6bb5\u7684 table,\u800c data_json\u9876\u5c42\u76f4\u63a5\u5bf9\u5e94 data_list\u7684\u5185\u5bb9"),(0,r.kt)("li",{parentName:"ul"},'flatbuffers\u4e0d\u652f\u6301\u672c\u5730\u5316\u3002 \u6240\u4ee5\u5b83\u7684text\u7c7b\u578b\u5bfc\u51fa\u683c\u5f0f\u4e3astring\uff0c\u800cdata_json\u4e3a {"key":"xxx", "text":"text}'),(0,r.kt)("li",{parentName:"ul"},"data_flatbuffers_json\u5e8f\u5217\u5316bean\u7c7b\u578b\u5b57\u6bb5\u65f6\uff0c\u5982\u679c\u9047\u5230\u591a\u6001\u7c7b\u578b\uff0c\u4f1a\u591a\u5e8f\u5217\u5316\u4e00\u4e2astring\u7c7b\u578b\u7684xxx_type\u5b57\u6bb5\uff0c\u7528\u4e8e\u6307\u793aunion\u7684\u7c7b\u578b\u3002\u4e5f\u6b63\u662f\u5982\u6b64 data_flatbuffers_json\u4e0d\u652f\u6301\u5bb9\u5668\u4e2d\u51fa\u73b0union"),(0,r.kt)("li",{parentName:"ul"},"data_flatbuffers_json \u8f93\u51fa\u7684\u6570\u636e\u4e2d\uff0c\u5982\u679c\u5305\u542b\u5bb9\u5668\u7c7b\u578b\u6570\u636e\uff0c\u5e76\u4e14\u5143\u7d20\u7c7b\u578b\u4e3aunion\uff0c\u5219\u65e0\u6cd5\u88ab\u6b63\u786e\u89e3\u6790\u3002")),(0,r.kt)("h2",{id:"\u53ea\u751f\u6210\u4ee3\u7801\u6216\u8005\u6570\u636e"},"\u53ea\u751f\u6210\u4ee3\u7801\u6216\u8005\u6570\u636e"),(0,r.kt)("p",null,"\u4ee5 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json"},"Csharp_Unity_Json")," \u4e3a\u4f8b\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"--gen_types code_cs_unity_json \u5219\u53ea\u751f\u6210\u4ee3\u7801"),(0,r.kt)("li",{parentName:"ul"},"--gen_types data_json \u5219\u53ea\u751f\u6210\u6570\u636e")),(0,r.kt)("h2",{id:"\u914d\u7f6e\u4e2d\u6709\u4e9bstring\u5b57\u6bb5\u662f\u8d44\u6e90\u5730\u5740\u7edf\u4e00\u5bfc\u51fa\u8fd9\u4e9b\u8d44\u6e90\u5730\u5740"},"\u914d\u7f6e\u4e2d\u6709\u4e9bstring\u5b57\u6bb5\u662f\u8d44\u6e90\u5730\u5740\uff0c\u7edf\u4e00\u5bfc\u51fa\u8fd9\u4e9b\u8d44\u6e90\u5730\u5740"),(0,r.kt)("p",null,"\u9996\u5148\u5b9a\u4e49\u7c7b\u578b\u65f6\uff0c\u6dfb\u52a0\u4e0a'#res=xxx' \u8fd9\u79cd\u6807\u7b7e\uff0cxxx\u53ef\u4ee5\u53d6\u4efb\u610f\u503c\u3002\u5982\u4e0b\u6240\u793a\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'  <bean name="TestRes">\n    <var name="icon" type="string#res=item"/>\n  </bean>\n')),(0,r.kt)("p",null,"\u53d6 '--gen_types data_resources'\uff0c\u5e76\u4e14\u65b0\u589e\u53c2\u6570'--output:data:resource_list_file resources.txt'\u3002 \u8fd0\u884c\u5373\u53ef\u5c06\u6240\u6709\u5e26res\u6807\u7b7e\u7684\u6570\u636e\u5bfc\u51fa\u5230resources.text\u6587\u4ef6\u4e2d\u3002"),(0,r.kt)("p",null,'\u5047\u8bbe\u914d\u7f6e\u8868\u4e2d\u5305\u542bicon="/ui/icon1.jpg" \u548c icon="/ui/icon1/jpg" \u8fd9\u4e24\u4e2a\u6570\u636e\uff0c\u5219\u5bfc\u51fa\u7684\u8d44\u6e90\u5217\u8868\u5185\u5bb9\u4e3a'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-txt"},"item,/ui/icon1.jpg\nitem,/ui/icon2.jpg\n")),(0,r.kt)("p",null,"\u53c2\u89c1\u793a\u4f8b ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/GenerateDatas"},"GenerateDatas"),"/gen_resource_list.bat \u6587\u4ef6\u3002"),(0,r.kt)("h2",{id:"\u751f\u6210\u7684c\u4ee3\u7801\u4e2dvector\u7684\u7c7b\u578b\u7531systemnumericsvector234\u6539\u6210-unityenginevector234"},"\u751f\u6210\u7684c#\u4ee3\u7801\u4e2d,vector\u7684\u7c7b\u578b\u7531System.Numerics.Vector{2,3,4}\uff0c\u6539\u6210 UnityEngine.Vector{2,3,4}"),(0,r.kt)("p",null,"\u547d\u4ee4\u884c\u53c2\u6570\u4e2d\u6dfb\u52a0  --cs:use_unity_vector \u9009\u9879\u5373\u53ef\u3002 \u53c2\u89c1\u793a\u4f8b ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_bin"},"Csharp_Unity_bin")),(0,r.kt)("h2",{id:"\u81ea\u5b9a\u4e49\u4ee3\u7801\u547d\u540d\u98ce\u683c"},"\u81ea\u5b9a\u4e49\u4ee3\u7801\u547d\u540d\u98ce\u683c"),(0,r.kt)("p",null,"\u53ef\u4ee5\u3002 \u6dfb\u52a0\u9009\u9879 --naming_convention_bean_member none \u5373\u53ef\u3002\u4f7f\u751f\u6210\u7684\u4ee3\u7801\u4e2d\u7684\u5b57\u6bb5\u540d\u4e0e\u5b9a\u4e49\u540d\u76f8\u540c\u3002"),(0,r.kt)("p",null,"\u652f\u6301\u4ee5\u4e0b\u4ee3\u7801\u547d\u540d\u98ce\u683c\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"none\u3002 \u65e0\u547d\u540d\u98ce\u683c\uff0c\u751f\u6210\u7684\u5b57\u6bb5\u540d\u548c\u5b9a\u4e49\u7684\u540d\u79f0\u4e00\u6837"),(0,r.kt)("li",{parentName:"ul"},"language_recommend\u3002\u5373\u6839\u636e\u751f\u6210\u7684\u8bed\u8a00\u4e0d\u540c\uff0c\u81ea\u52a8\u8bbe\u7f6e\u8be5\u8bed\u8a00\u63a8\u8350\u7684\u98ce\u683c\u3002\u6bd4\u5982c#\u4e3aPascalCase,java\u4e3a camelCase,python\u4e3aunder_scores\u3002"),(0,r.kt)("li",{parentName:"ul"},"camelCalse\u3002 \u5373\u9a7c\u5cf0\u5f62\u5f0f\uff0c\u751f\u6210 xxxYyyy\u8fd9\u79cd\u98ce\u683c\u7684\u5b57\u6bb5\u540d\u3002"),(0,r.kt)("li",{parentName:"ul"},"PascalCase\u3002 \u5373Pascal\u5f62\u5f0f\u3002\u751f\u6210XxxYyy\u8fd9\u79cd\u98ce\u683c\u7684\u5b57\u6bb5\u540d\u3002"),(0,r.kt)("li",{parentName:"ul"},"under_scores\u3002 \u4e0b\u5212\u7ebf\u5f62\u5f0f\u3002\u5373\u751f\u6210xxx_yyy\u8fd9\u79cd\u98ce\u683c\u7684\u5b57\u6bb5\u540d\u3002")),(0,r.kt)("p",null,"\u9ed8\u8ba4\u4f7f\u7528 language_recommend\u3002"),(0,r.kt)("h2",{id:"gen_types\u4e2d-code_cs_json\u548ccode_cs_unity_json\u7684\u533a\u522b"},"gen_types\u4e2d code_cs_json\u548ccode_cs_unity_json\u7684\u533a\u522b"),(0,r.kt)("p",null,"code_cs_json\u751f\u6210\u4ee3\u7801\u4e2d\u4f7f\u7528\u4e86 System.Text.Json\u5e93\uff0c\u8fd9\u4e2a\u53ea\u6709.net core 3\u4ee5\u540e\u7684\u7248\u672c\u624d\u6709\uff0cunity\u76ee\u524d\u7684.net\u7248\u672c\u4e0d\u652f\u6301\uff0c\u6240\u4ee5\u8fd9\u662f\u7ed9\u57fa\u4e8e.net coer\u7684\u670d\u52a1\u5668\u9879\u76ee\u4f7f\u7528\u7684\u3002\ncode_cs_unity_json\u4f7f\u7528\u4e86\u7b2c\u4e09\u65b9\u7684SimpleJson\u5e93\uff0c\u517c\u5bb9unity\u7684.net\u7248\u672c\uff0c\u7ed9unity\u751f\u6210\u52a0\u8f7djson\u6570\u636e\u7684c#\u4ee3\u7801\u65f6\uff0c\u53ef\u4ee5\uff08\u5f53\u524d\u4e5f\u53ea\u6709\u8fd9\u4e2a\u9009\u62e9\uff09\u9009\u62e9\u8fd9\u4e2a\u3002"),(0,r.kt)("h2",{id:"\u8c03\u751f\u6210\u7684\u6570\u636e\u6587\u4ef6\u7684\u540e\u7f00"},"\u8c03\u751f\u6210\u7684\u6570\u636e\u6587\u4ef6\u7684\u540e\u7f00"),(0,r.kt)("p",null,"\u6570\u636e\u683c\u5f0f\u7684\u9ed8\u8ba4\u6587\u4ef6\u540e\u7f00\u5982\u4e0b"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"data"),(0,r.kt)("th",{parentName:"tr",align:null},"extension"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data_bin"),(0,r.kt)("td",{parentName:"tr",align:null},"bin")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data_json"),(0,r.kt)("td",{parentName:"tr",align:null},"json")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data_json2"),(0,r.kt)("td",{parentName:"tr",align:null},"json")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data_lua"),(0,r.kt)("td",{parentName:"tr",align:null},"lua")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data_xml"),(0,r.kt)("td",{parentName:"tr",align:null},"xml")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data_yaml"),(0,r.kt)("td",{parentName:"tr",align:null},"yml")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"data_protobuf"),(0,r.kt)("td",{parentName:"tr",align:null},"bp")))),(0,r.kt)("p",null,' \u53ef\u4ee5\u901a\u8fc7\u547d\u4ee4\u884c\u9009\u9879"--data_file_extension xxx"\u624b\u52a8\u6307\u5b9a\u8f93\u51fa\u6587\u4ef6\u7684\u540e\u7f00\u3002'),(0,r.kt)("h2",{id:"\u4e0d\u540c\u5bfc\u51fa\u683c\u5f0f\u7684\u6027\u80fd\u6d4b\u8bd5\u7ed3\u679c"},"\u4e0d\u540c\u5bfc\u51fa\u683c\u5f0f\u7684\u6027\u80fd\u6d4b\u8bd5\u7ed3\u679c"),(0,r.kt)("p",null,"\u786c\u4ef6\uff1a"),(0,r.kt)("p",null," Intel(R) Core i7-10700 @ 2.9G 16\u6838"),(0,r.kt)("p",null," 32G \u5185\u5b58"),(0,r.kt)("p",null,"\u6570\u636e\u96c6"),(0,r.kt)("p",null,"  500\u4e2aexcel\u8868\n\u6bcf\u4e2a\u8868\u67091000\u884c\u6bd4\u8f83\u5927\u7684\u8bb0\u5f55\n\u6bcf\u4e2a\u8868\u6587\u4ef6\u5927\u5c0f 132k"),(0,r.kt)("p",null,"\u6d4b\u8bd5\u7ed3\u679c\uff1a"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u683c\u5f0f"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9996\u6b21\u8017\u65f6"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7d2f\u79ef\u8017\u65f6"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5355\u4e2a\u8f93\u51fa\u6587\u4ef6\u5927\u5c0f"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8f93\u51fa\u6587\u4ef6\u603b\u5927\u5c0f"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"bin"),(0,r.kt)("td",{parentName:"tr",align:null},"15.652 s"),(0,r.kt)("td",{parentName:"tr",align:null},"797 ms"),(0,r.kt)("td",{parentName:"tr",align:null},"164 K"),(0,r.kt)("td",{parentName:"tr",align:null},"59.5 M")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"json"),(0,r.kt)("td",{parentName:"tr",align:null},"17.746 s"),(0,r.kt)("td",{parentName:"tr",align:null},"796 ms"),(0,r.kt)("td",{parentName:"tr",align:null},"1.11 M"),(0,r.kt)("td",{parentName:"tr",align:null},"555 M")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"lua"),(0,r.kt)("td",{parentName:"tr",align:null},"17.323 s"),(0,r.kt)("td",{parentName:"tr",align:null},"739 ms"),(0,r.kt)("td",{parentName:"tr",align:null},"433 K"),(0,r.kt)("td",{parentName:"tr",align:null},"212 M")))),(0,r.kt)("h2",{id:"binary\u4e0ejson\u683c\u5f0f\u52a0\u8f7d\u6027\u80fd\u5bf9\u6bd4"},"binary\u4e0ejson\u683c\u5f0f\u52a0\u8f7d\u6027\u80fd\u5bf9\u6bd4"),(0,r.kt)("p",null,"\u4ee5luban_examples\u7684DesignerConfigs\u914d\u7f6e\u4e3a\u6d4b\u8bd5\u6570\u636e\uff0c\u4ee5Projects\u4e0b\u7684csharp_Unity_bin\u548ccsharp_Unity_json\u9879\u76ee\u4e3a\u6d4b\u8bd5\u5bf9\u6bd4\uff0c\n\u52a0\u8f7d100\u904dcfg.Table\u3002"),(0,r.kt)("p",null,"binary\u683c\u5f0f\u8017\u65f628ms\uff0cjson\u683c\u5f0f\u8017\u65f6112ms\u3002"),(0,r.kt)("p",null,"\u52a0\u8f7d\u6027\u80fd\u5927\u7ea6\u4e3a 4:1\u3002"))}c.isMDXComponent=!0}}]);