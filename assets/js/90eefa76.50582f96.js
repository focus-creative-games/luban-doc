"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7656],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var u=a.createContext({}),s=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=s(e.components);return a.createElement(u.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},_=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(t),_=l,m=d["".concat(u,".").concat(_)]||d[_]||p[_]||r;return t?a.createElement(m,o(o({ref:n},c),{},{components:t})):a.createElement(m,o({ref:n},c))}));function m(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,o=new Array(r);o[0]=_;var i={};for(var u in n)hasOwnProperty.call(n,u)&&(i[u]=n[u]);i.originalType=e,i[d]="string"==typeof e?e:l,o[1]=i;for(var s=2;s<r;s++)o[s]=t[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}_.displayName="MDXCreateElement"},6602:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var a=t(7462),l=(t(7294),t(3905));const r={},o="\u547d\u4ee4\u884c\u5de5\u5177",i={unversionedId:"manual/commandtools",id:"version-classic/manual/commandtools",title:"\u547d\u4ee4\u884c\u5de5\u5177",description:"Luban.Client \u3001Luban.Server\u548c Luban.ClientServer\u7684\u529f\u80fd\u548c\u533a\u522b",source:"@site/versioned_docs/version-classic/manual/commandtools.md",sourceDirName:"manual",slug:"/manual/commandtools",permalink:"/docs/classic/manual/commandtools",draft:!1,tags:[],version:"classic",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u7279\u6027",permalink:"/docs/classic/manual/traits"},next:{title:"\u670d\u52a1\u7aef\u5e03\u7f72",permalink:"/docs/classic/manual/deploy"}},u={},s=[{value:"Luban.Client \u3001Luban.Server\u548c Luban.ClientServer\u7684\u529f\u80fd\u548c\u533a\u522b",id:"lubanclient-lubanserver\u548c-lubanclientserver\u7684\u529f\u80fd\u548c\u533a\u522b",level:2},{value:"\u4e91\u751f\u6210\u7684\u4f18\u70b9",id:"\u4e91\u751f\u6210\u7684\u4f18\u70b9",level:2},{value:"\u90e8\u5c5e",id:"\u90e8\u5c5e",level:2},{value:"\u65b9\u6cd51\uff1a Luban.Client\u4e0eLuban.Server\u72ec\u7acb\u90e8\u5c5e\uff0c\u4e91\u751f\u6210\u6a21\u5f0f",id:"\u65b9\u6cd51-lubanclient\u4e0elubanserver\u72ec\u7acb\u90e8\u5c5e\u4e91\u751f\u6210\u6a21\u5f0f",level:2},{value:"\u90e8\u5c5e luban-server",id:"\u90e8\u5c5e-luban-server",level:3},{value:"\u5b89\u88c5 luban-client",id:"\u5b89\u88c5-luban-client",level:3},{value:"\u65b9\u6cd52\uff1a Client\u4e0eServer\u4e00\u4f53\u6a21\u5f0f",id:"\u65b9\u6cd52-client\u4e0eserver\u4e00\u4f53\u6a21\u5f0f",level:2},{value:"luban-server \u4f7f\u7528\u4ecb\u7ecd",id:"luban-server-\u4f7f\u7528\u4ecb\u7ecd",level:2},{value:"luban-client \u4f7f\u7528\u4ecb\u7ecd",id:"luban-client-\u4f7f\u7528\u4ecb\u7ecd",level:2},{value:"gen_types \u53c2\u6570\u4ecb\u7ecd",id:"gen_types-\u53c2\u6570\u4ecb\u7ecd",level:2},{value:".cache.meta \u6587\u4ef6\u7684\u7528\u9014",id:"cachemeta-\u6587\u4ef6\u7684\u7528\u9014",level:2},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",level:2},{value:"\u6848\u4f8b1",id:"\u6848\u4f8b1",level:3},{value:"\u6848\u4f8b2",id:"\u6848\u4f8b2",level:3},{value:"\u6848\u4f8b3",id:"\u6848\u4f8b3",level:3},{value:"\u6848\u4f8b4",id:"\u6848\u4f8b4",level:3},{value:"\u6848\u4f8b5",id:"\u6848\u4f8b5",level:3}],c={toc:s},d="wrapper";function p(e){let{components:n,...t}=e;return(0,l.kt)(d,(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u547d\u4ee4\u884c\u5de5\u5177"},"\u547d\u4ee4\u884c\u5de5\u5177"),(0,l.kt)("h2",{id:"lubanclient-lubanserver\u548c-lubanclientserver\u7684\u529f\u80fd\u548c\u533a\u522b"},"Luban.Client \u3001Luban.Server\u548c Luban.ClientServer\u7684\u529f\u80fd\u548c\u533a\u522b"),(0,l.kt)("p",null,"Luban \u9ed8\u8ba4\u7684\u5de5\u4f5c\u6a21\u578b\u4e3a \u4e91\u751f\u6210\u6a21\u578b\uff0c\u4e5f\u5c31\u662f Luban.Client \u5c06\u751f\u6210\u8bf7\u6c42\u63d0\u4ea4\u5230\u8fdc\u7a0b\u7684 Luban.Server\uff0cLuban.Server\u5c06\u751f\u6210\u7ed3\u679c\u8fd4\u56de\u7ed9Luban.Client\u3002\n\u5bf9\u4e8e\u4f7f\u7528Luban\u4e91\u751f\u6210\u5de5\u4f5c\u6a21\u578b\u7684\u9879\u76ee\uff0c\u9700\u8981\u5728\u4e00\u4e2a\u670d\u52a1\u5668\u4e0a\u90e8\u5c5e Luban.Server \uff08\u5f53\u7136\u4e5f\u53ef\u4ee5\u76f4\u63a5\u5728\u672c\u5730\u5316\u8fd0\u884c\uff09\uff0c\u7136\u540e\u5c06 Luban.Client\u7684 -h \u53c2\u6570\u6539\u4e3a \u8be5\u670d\u52a1\u5668\u7684IP\u3002"),(0,l.kt)("p",null,"Luban.ClientServer\u4e3aLuban.Client+Luban.Server\u4e00\u4f53\u7684\u7a0b\u5e8f\uff0c\u5185\u5d4c\u4e86Luban.Client\u548cLuban.Server\uff0c\u5176\u5de5\u4f5c\u539f\u7406\u4e0e\u4e91\u751f\u6210\u7684\u6a21\u5f0f\u4e00\u81f4\u3002"),(0,l.kt)("p",null,"\u6709\u4e9b\u9879\u76ee\u89c4\u6a21\u8f83\u5c0f\uff0c\u6216\u8005\u4e3a\u4e2a\u4eba\u5f00\u53d1\u8005\uff0c\u4e0d\u60f3\u90e8\u5c5eLuban.Server\uff0c\u5219\u53ef\u4ee5\u91c7\u7528Luban.ClientServer\u5de5\u5177\u3002"),(0,l.kt)("h2",{id:"\u4e91\u751f\u6210\u7684\u4f18\u70b9"},"\u4e91\u751f\u6210\u7684\u4f18\u70b9"),(0,l.kt)("p",null,"\u4e91\u751f\u6210\u6a21\u5f0f\u4e0b\uff0cLuban.Server\u4f1a\u7f13\u5b58\u751f\u6210\u7ed3\u679c\uff0c\u5bf9\u4e8e\u5b9a\u4e49\u548c\u6570\u636e\u6ca1\u6709\u53d8\u5316\u7684\u914d\u7f6e\u8868\uff0c\u76f4\u63a5\u8fd4\u56de\u751f\u6210\u7ed3\u679c\u3002\u65e5\u5e38\u5f00\u53d1\u4e2d\uff0c\u7ecf\u5e38\u53ea\u6539\u52a8\u4e86\u4e2a\u522b\u8868\uff0c\u4f7f\u7528\u4e86\u4e91\u751f\u6210\u540e\uff0c\u53ea\u4f1a\u751f\u6210\u6539\u53d8\u7684\u8868\u7684\u6570\u636e\uff0c\n\u6781\u5927\u7f29\u77ed\u4e86\u751f\u6210\u65f6\u95f4\uff0c\u65e5\u5e38\u751f\u6210\u65f6\u95f4\u57fa\u672c\u5728300ms\u91cf\u7ea7\u3002 \u5bf9\u4e8eMMORPG\u8fd9\u6837\u7684\u5927\u9879\u76ee\uff0c\u65e5\u5e38\u751f\u6210\u57fa\u672c\u4e861s\u4ee5\u5185\uff0c\u8282\u7701\u975e\u5e38\u53ef\u89c2\u7684\u65f6\u95f4\u3002"),(0,l.kt)("h2",{id:"\u90e8\u5c5e"},"\u90e8\u5c5e"),(0,l.kt)("p",null,"Luban\u5de5\u5177\u6709\u4e24\u79cd\u90e8\u5c5e\u65b9\u5f0f\u3002"),(0,l.kt)("h2",{id:"\u65b9\u6cd51-lubanclient\u4e0elubanserver\u72ec\u7acb\u90e8\u5c5e\u4e91\u751f\u6210\u6a21\u5f0f"},"\u65b9\u6cd51\uff1a Luban.Client\u4e0eLuban.Server\u72ec\u7acb\u90e8\u5c5e\uff0c\u4e91\u751f\u6210\u6a21\u5f0f"),(0,l.kt)("h3",{id:"\u90e8\u5c5e-luban-server"},"\u90e8\u5c5e luban-server"),(0,l.kt)("p",null,"\u57fa\u4e8e .net 6 runtime \uff08\u53ef\u8de8\u5e73\u53f0\uff0c\u4e0d\u9700\u8981\u91cd\u65b0\u7f16\u8bd1\uff09\u3002"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u81ea\u884c\u5b89\u88c5 .net 6 runtime \u6216 sdk."),(0,l.kt)("li",{parentName:"ul"},"\u4ece",(0,l.kt)("a",{parentName:"li",href:"https://gitee.com/focus-creative-games/luban_examples/tree/main/Tools/Luban.ClientServer"},"\u793a\u4f8b\u9879\u76ee"),"\u62f7\u8d1d\u6574\u4e2aLuban.ClientServer\u76ee\u5f55\uff08",(0,l.kt)("strong",{parentName:"li"},"\u53ef\u8de8\u5e73\u53f0\uff0c\u5373\u4f7f\u5728linux\u3001mac\u5e73\u53f0\u4e5f\u4e0d\u9700\u8981\u91cd\u65b0\u7f16\u8bd1"),"\uff09"),(0,l.kt)("li",{parentName:"ul"},"\u5728Luban.ClientServer\u76ee\u5f55\u4e0b\u8fd0\u884c dotnet Luban.Server.dll (\u63d0\u793a\uff1aWin\u5e73\u53f0\u53ef\u4ee5\u76f4\u63a5\u8fd0\u884c Luban.Server.exe)")),(0,l.kt)("h3",{id:"\u5b89\u88c5-luban-client"},"\u5b89\u88c5 luban-client"),(0,l.kt)("p",null,"\u57fa\u4e8e .net 6 runtime \uff08\u63a8\u8350win\u5e73\u53f0\u4f7f\u7528\uff0c\u53ef\u8de8\u5e73\u53f0\uff0c\u4e0d\u9700\u8981\u91cd\u65b0\u7f16\u8bd1\uff09\u3002"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u81ea\u884c\u5b89\u88c5 .net 6 runtime \u6216 sdk."),(0,l.kt)("li",{parentName:"ul"},"\u4ece",(0,l.kt)("a",{parentName:"li",href:"https://gitee.com/focus-creative-games/luban_examples/tree/main/Tools/Luban.Client"},"\u793a\u4f8b\u9879\u76ee"),"\u62f7\u8d1d Luban.Client\uff08",(0,l.kt)("strong",{parentName:"li"},"\u53ef\u8de8\u5e73\u53f0\uff0c\u5373\u4f7f\u5728linux\u3001mac\u5e73\u53f0\u4e5f\u4e0d\u9700\u8981\u91cd\u65b0\u7f16\u8bd1"),"\uff09")),(0,l.kt)("h2",{id:"\u65b9\u6cd52-client\u4e0eserver\u4e00\u4f53\u6a21\u5f0f"},"\u65b9\u6cd52\uff1a Client\u4e0eServer\u4e00\u4f53\u6a21\u5f0f"),(0,l.kt)("p",null,"  Client\u4e0eServer\u5728\u540c\u4e2a\u8fdb\u7a0b\u5185\u8fd0\u884c\uff0c\u4e0d\u9700\u8981\u5355\u72ec\u90e8\u5c5eLuban.Server\u3002"),(0,l.kt)("p",null,"  \u5c06\u8fd0\u884c\u811a\u672c\u4e2d%LUBAN_CLIENT%\u53d8\u91cf\u7531 Luban.Client/Luban.Client \u6539\u4e3a Luban.ClientServer/Luban.ClientServer\uff0c\u540c\u65f6",(0,l.kt)("strong",{parentName:"p"},"\u5220\u9664 -h (--host ) \u9009\u9879\u53ca\u5176\u53c2\u6570"),"\u3002"),(0,l.kt)("p",null,"  Luban.ClientServer\u662fLuban.Client\u7684\u529f\u80fd\u8d85\u96c6\uff0c\u53ef\u4ee5\u5b8c\u5168\u66ff\u4ee3Luban.Client\u3002"),(0,l.kt)("hr",null),(0,l.kt)("h2",{id:"luban-server-\u4f7f\u7528\u4ecb\u7ecd"},"luban-server \u4f7f\u7528\u4ecb\u7ecd"),(0,l.kt)("p",null,"\u547d\u4ee4\u884c\u4f7f\u7528"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'dotnet Luban.Server.dll [-p <port>] [-l <log level>]\n\n\u53c2\u6570\u4ecb\u7ecd\uff1a\n-p, --port <port>                   \u53ef\u9009\u53c2\u6570\u3002\u76d1\u542c\u7aef\u53e3 <port>\uff0c\u9ed8\u8ba4\u4e3a8899\u3002\n-l, --loglevel <log level>          \u53ef\u9009\u53c2\u6570\u3002\u65e5\u5fd7\u7ea7\u522b\u3002\u9ed8\u8ba4\u4e3aINFO\u3002 \u6709\u6548\u503c\u6709: TRACE,DEBUG,INFO,WARN,ERROR,FATAL,OFF  \n-t, --template_search_path          \u53ef\u9009\u53c2\u6570\u3002\u6a21\u677f\u7684\u989d\u5916\u641c\u7d22\u8def\u5f84\u3002\u4f18\u5148\u4ece\u6b64\u8def\u5f84\uff0c\u518d\u4eceTemplates\u76ee\u5f55\u641c\u7d22\u6a21\u677f\u6587\u4ef6\u3002  \n--disable_cache                     \u53ef\u9009\u53c2\u6570\u3002\u7981\u7528\u751f\u6210\u4e2d\u95f4\u8fc7\u7a0b\u7684\u7f13\u5b58\uff0c\u4f46\u4fdd\u7559\u4e86\u6e90\u6587\u4ef6\u7f13\u5b58\u3002\u5728\u6a21\u677f\u8c03\u8bd5\u65f6\u6bd4\u8f83\u6709\u7528\u3002\n--i10n:default_timezone  <timezone> \u53ef\u9009\u53c2\u6570\u3002datetime\u65f6\u95f4\u6240\u5728\u7684\u65f6\u533a\u3002\u5982\u679c\u672a\u8bbe\u7f6e\u5219\u4f1a\u5c1d\u8bd5\u7528"Asia/Shanghai"\u548c"China Standard Time"\u3002\n')),(0,l.kt)("p",null,' \u5173\u4e8e\u65f6\u533a\uff0cwin\u4e0b\u53ef\u4f7f\u7528\u547d\u4ee4"tzutil /l" \u67e5\u770b\u672c\u673a\u65f6\u533a\u5217\u8868\u3002 \u4e5f\u53ef\u67e5\u9605MS\u6587\u6863',(0,l.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones?view=windows-11"},"default-time-zones\u5217\u8868")),(0,l.kt)("h2",{id:"luban-client-\u4f7f\u7528\u4ecb\u7ecd"},"luban-client \u4f7f\u7528\u4ecb\u7ecd"),(0,l.kt)("p",null," \u547d\u4ee4\u884c\u4f7f\u7528"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"dotnet Luban.Client.dll [-h <host>] [-p <port>] [-l <log level>] [-c <cache meta file>] [-w <watch dirs>] [-h ] -j cfg -- <job options>\n\n\u53c2\u6570\u4ecb\u7ecd\uff1a\n-h,--host <host>                \u53ef\u9009\u53c2\u6570\u3002 luban-server\u7684\u5730\u5740\u3002\u9ed8\u8ba4\u4e3a 127.0.0.1\n-p,--port <port>                \u53ef\u9009\u53c2\u6570\u3002 luban-server\u7684\u7aef\u53e3\u3002\u9ed8\u8ba4\u4e3a 8899\n-j,--job <job>                  \u5fc5\u9009\u53c2\u6570\u3002 \u751f\u6210\u7c7b\u578b\u3002\u76ee\u524d\u652f\u6301\u7684\u751f\u6210\u7c7b\u578b\u6709: cfg,proto,db\u3002 \u751f\u6210\u914d\u7f6e\u8bf7\u53d6cfg\u3002\n-l,--loglevel <log level>       \u53ef\u9009\u53c2\u6570\u3002 \u65e5\u5fd7\u7ea7\u522b\u3002\u9ed8\u8ba4\u4e3aINFO\u3002\u6709\u6548\u503c\u6709: TRACE,DEBUG,INFO,WARN,ERROR,FATAL,OFF\n-c,--cachemetafile <meta file>  \u53ef\u9009\u53c2\u6570\u3002 meta\u7f13\u5b58\u6587\u4ef6\u540d\u3002 \u9ed8\u8ba4\u4e3a .cache.meta\n-w,--watch <dir1;dir2...>       \u53ef\u9009\u53c2\u6570\u3002 \u76d1\u6d4b\u76ee\u5f55\u6216\u8005\u76ee\u5f55\u5217\u8868\uff0c\u4ee5\u9017\u53f7';'\u5206\u9694\u3002\u5f53\u5f00\u542f\u6b64\u9009\u9879\u540e\uff0c\u751f\u6210\u7ed3\u675f\u540e\u4e0d\u4f1a\u9000\u51fa\u7a0b\u5e8f\uff0c\u800c\u662f\u8fdb\u5165\u81ea\u52a8\u751f\u6210\u6a21\u5f0f\u3002\n                                          \u76d1\u542c\u5230\u76ee\u6807\u76ee\u5f55\u53d1\u751f\u53d8\u5316\u540e\uff0c\u81ea\u52a8\u91cd\u65b0\u8fd0\u884c\u751f\u6210\u3002\u7701\u53bb\u6539\u52a8\u540e\u624b\u52a8\u8fd0\u884c\u751f\u6210\u811a\u672c\u7684\u9ebb\u70e6\u3002\n--generateonly                  \u53ef\u9009\u53c2\u6570\u3002 \u4ec5\u751f\u6210\u3002\u4e0d\u4ece\u670d\u52a1\u5668\u4e0b\u8f7d\u751f\u6210\u7ed3\u679c\u3002\u53ef\u4ee5\u7528\u4e8e\u68c0\u67e5\u670d\u52a1\u5668\u662f\u5426\u80fd\u6210\u529f\u751f\u6210\u3002\n-h,--help                       \u53ef\u9009\u53c2\u6570\u3002 \u663e\u793a\u5e2e\u52a9\u4fe1\u606f\n--  <job options>               \u5fc5\u9009\u53c2\u6570\u3002 \u4ece\u6b64\u53c2\u6570\u8d77\uff0c\u4fbf\u662f \u4e0d\u540cjob\u7684\u7279\u6709\u9009\u9879\n")),(0,l.kt)("hr",null),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"cfg\u7684<job options>\u4ecb\u7ecd\uff1a\n\n-d,--define_file <root file>            \u5fc5\u9009\u53c2\u6570\u3002 \u6839\u5b9a\u4e49\u6587\u4ef6\u540d\u3002\n--input_data_dir  <input data dir>      \u5fc5\u9009\u53c2\u6570\u3002 \u914d\u7f6e\u6570\u636e\u6587\u4ef6\u6839\u76ee\u5f55\u3002\n--input:convert:dir <dir>               \u53ef\u9009\u53c2\u6570\u3002 \u6267\u884cjson\u3001lua\u3001xlsx\u4e4b\u7c7b\u6570\u636e\u683c\u5f0f\u8f6c\u6362\u65f6\uff0c\u63d0\u4f9b\u7684\u6570\u636e\u6e90\uff0c\u8986\u76d6table\u4e2d\u9ed8\u8ba4\u7684input\u53c2\u6570\u3002\n-c,--output_code_dir <output code dir>  \u53ef\u9009\u53c2\u6570\u3002 \u751f\u6210\u4ee3\u7801\u6587\u4ef6\u7684\u76ee\u5f55\u3002\n-s,--service                            \u5fc5\u9009\u53c2\u6570\u3002\u751f\u6210\u5206\u7ec4\u76ee\u6807\u3002\u4e00\u822c\u6765\u8bf4\uff0c\u4f1a\u5b9a\u4e49client,server,editor\u7b49\u597d\u51e0\u4e2a\u76ee\u6807\uff0c\u4e0d\u540c\u76ee\u6807\u7684\u751f\u6210\u5185\u5bb9\u4e0d\u540c\u3002\n\n--gen_types <type1,type2,,,>  \u5fc5\u9009\u53c2\u6570\u3002\u751f\u6210\u4efb\u52a1\u7c7b\u578b\u3002\u65e2\u53ef\u4ee5\u662f\u751f\u6210\u4ee3\u7801\u4e5f\u53ef\u4ee5\u662f\u751f\u6210\u6570\u636e\u6216\u8005\u5176\u4ed6\u3002\n                              \u76ee\u524d\u652f\u6301\u7684\u6709 code_cs_bin,code_cs_unity_bin,code_cs_dotnet_json,code_cs_unity_json,\n                                  code_cs_unity_editor_json,code_lua_bin,code_java_bin,code_go_bin,\n                                  code_go_json,code_cpp_bin,code_cpp_ue_editor_json,code_python27_json,\n                                  code_python3_json, code_gdscript_json, code_typescript_bin,code_typescript_json,code_rust_json,\n                                  code_protobuf2,code_protobuf3,code_template,code_flatbuffers,\n                                  data_bin,data_bidx,data_lua,data_json,data_json_monolithic,data_bson,data_yaml,\n                                  data_template,data_protobuf_bin,data_protobuf_json,data_flatbuffers_json,\n                                  convert_json,convert_lua,convert_xlsx,convert_template\n\n--validate_root_dir <path validate root dir>. \u53ef\u9009\u53c2\u6570\u3002 \u914d\u7f6epath\u68c0\u67e5\u7684\u6839\u76ee\u5f55\u3002\n\n--output_data_dir <output data dir>     \u53ef\u9009\u53c2\u6570\u3002 \u5bfc\u51fa\u7684\u6570\u636e\u6587\u4ef6\u7684\u76ee\u5f55\u3002\u53ea\u751f\u6210\u4ee3\u7801\u65f6\u53ef\u4e0d\u6307\u5b9a\u3002\n\n--output:data:compact_json                   \u53ef\u9009\u53c2\u6570\u3002\u9ed8\u8ba4\u5bfc\u51fa\u7684json\u683c\u5f0f\u4e3a\u5bf9\u9f50\u540e\u7684\u4f18\u96c5\u683c\u5f0f\uff0c\u4f7f\u7528\u6b64\u53c2\u6570\u540e\u5bfc\u51fa\u7d27\u51d1\u7684\u4e0d\u5e26\u7a7a\u683c\u548c\u6362\u884c\u7684\u683c\u5f0f\u3002\n--output:data:file_extension  <output data file extension>     \u53ef\u9009\u53c2\u6570\u3002 \u5bfc\u51fa\u6570\u636e\u6587\u4ef6\u7684\u540e\u7f00\u3002\u9ed8\u8ba4\u6309\u7167\u751f\u6210\u7c7b\u578b\u81ea\u52a8\u9009\u62e9\u3002\n--output:exclude_tags <tag1,tag2>           \u53ef\u9009\u53c2\u6570\u3002\u5bfc\u51fa\u65f6\u6392\u9664\u5305\u542b\u8fd9\u4e9btag\u7684\u6570\u636e\n--output:tables <table1,table2...>          \u53ef\u9009\u53c2\u6570\u3002\u624b\u52a8\u6307\u5b9a\u5bfc\u51fa\u54ea\u4e9b\u8868\u3002\u8986\u76d6group\u4e2d\u8bbe\u7f6e\n--output:include_tables <table1,table2...>  \u53ef\u9009\u53c2\u6570\u3002\u9664\u4e86group\u4e2d\u8bbe\u7f6e\u5916\uff0c\u989d\u5916\u65b0\u589e\u8868\u3002\n--output:exclude_tables <table1,table2...>  \u53ef\u9009\u53c2\u6570\u3002\u6392\u9664group\u4e2d\u6307\u5b9a\u7684\u8868\u3002\n\n--output:convert:file_extension <extension> \u53ef\u9009\u53c2\u6570\u3002 convert\u6570\u636e\u6587\u4ef6\u7684\u540e\u7f00\u3002\u9ed8\u8ba4\u6309\u7167\u6a21\u677f\u540d\u731c\u6d4b\u3002\n\n--template:code:dir <dir name>              \u53ef\u9009\u53c2\u6570\u3002\u81ea\u5b9a\u4e49\u989d\u5916\u4ee3\u7801\u6a21\u677f\u7684\u76ee\u5f55\u540d\n--template:data:file  <template name>       \u53ef\u9009\u53c2\u6570\u3002\u6570\u636e\u6a21\u677f\u7684\u540d\u79f0\uff08\u4e0d\u5305\u542b\u540e\u7f00\uff09\uff0c\u5f53gen_types\u5305\u542b data_template\u65f6\u5fc5\u987b\u6307\u5b9a\u3002\n--template:convert:file <template name>     \u53ef\u9009\u53c2\u6570\u3002convert\u6a21\u677f\u7684\u540d\u79f0\uff08\u4e0d\u5305\u542b\u540e\u7f00\uff09\uff0c\u5f53gen_types\u5305\u542bconvert_template\u65f6\u5fc5\u987b\u6307\u5b9a\u3002\n\n\n--naming_convention:module <convention>     \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210\u4ee3\u7801\u4e2d\u6a21\u677f\u540d\u7684\u547d\u540d\u7ea6\u5b9a\uff0c\u53ef\u7528\u503c\u4e3a language_recommend,none,camelCase,PascalCase,under_scores\u3002 \u9ed8\u8ba4\u4e3alanguage_recommend\uff0c\u5373\u9009\u62e9\u4e0e\u76f8\u5e94\u8bed\u8a00\u63a8\u8350\u7684\u547d\u540d\u7ea6\u5b9a\u98ce\u683c\u3002 \u6b64\u9009\u9879\u76ee\u524d\u672a\u751f\u6548\u3002\n--naming_convention:bean_member <convention> \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210\u4ee3\u7801\u4e2dbean\u7c7b\u578b\u5b57\u6bb5\u540d\u7684\u547d\u540d\u7ea6\u5b9a\uff0c\u53ef\u7528\u503c\u4e3a language_recommend,none,camelCase,PascalCase,under_scores\u3002 \u9ed8\u8ba4\u4e3alanguage_recommend\u3002\n--naming_convention:enum_member <convention> \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210\u4ee3\u7801\u4e2denum\u7c7b\u578b\u540d\u7684\u547d\u540d\u7ea6\u5b9a\uff0c\u53ef\u7528\u503c\u4e3a language_recommend,none,camelCase,PascalCase,under_scores\u3002 \u9ed8\u8ba4\u4e3alanguage_recommend\u3002\u6b64\u9009\u9879\u76ee\u524d\u672a\u751f\u6548\u3002\n--access_bean_member <access mode>  \u53ef\u9009\u53c2\u6570\u3002 bean\u5c5e\u6027\u7684\u8bbf\u95ee\u65b9\u5f0f\u3002\u53ef\u7528\u503c\u4e3alanguage_recommend,variable,getter_setter,property\u3002\u9ed8\u8ba4\u4e3a language_recommend\u3002\u6b64\u5b57\u6bb5\u76ee\u524d\u672a\u751f\u6548\u3002\n\n--l10n:timezone <timezone>           \u53ef\u9009\u53c2\u6570\u3002 \u6307\u5b9a\u6240\u5728\u65f6\u533a\u3002\u5f71\u54cddatetime\u7c7b\u578b\u8f6c\u6362\u4e3autc\u65f6\u95f4\u3002 \u9ed8\u8ba4\u4e3a\u4e2d\u56fd\u5317\u4eac\u65f6\u95f4\u3002\n--l10n:input_text_files <file1,file2..> \u53ef\u9009\u53c2\u6570\u3002 \u672c\u5730\u5316\u7684\u6587\u672c\u6620\u5c04\u8868\u3002\u53ef\u4ee5\u6709\u591a\u4e2a\u3002\n--l10n:text_field_name <field name>     \u53ef\u9009\u53c2\u6570\u3002 \u6587\u672c\u6620\u5c04\u8868\u4e2d\uff0c\u76ee\u6807\u6620\u5c04\u5217\u7684\u5217\u540d\uff0c\u9ed8\u8ba4\u4e3atext\n--l10n:output_not_translated_text_file <file> \u53ef\u9009\u53c2\u6570\u3002 \u672a\u88ab\u672c\u5730\u5316\u6620\u5c04\u7684text key\u548cvalue\u7684\u8f93\u51fa\u6587\u4ef6\u3002\u4e0d\u63d0\u4f9b\u8be5\u53c2\u6570\u5219\u4e0d\u751f\u6210\n--l10n:patch <patch name>                  \u53ef\u9009\u53c2\u6570\u3002\u5f53\u524d\u9700\u8981\u751f\u6210\u7684\u5206\u652f\u540d\u79f0\u3002\n--l10n:patch_input_data_dir <patch data root dir> \u53ef\u9009\u53c2\u6570\u3002\u5206\u652f\u6570\u636e\u7684\u6839\u76ee\u5f55\u3002\n\n--typescript:bright_require_path <path>    \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210typescript\u4ee3\u7801\u5f15\u7528\u7684bright\u6a21\u5757\u7684\u8def\u5f84\n--typescript:bright_package_name <packet>  \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210typescript\u4ee3\u7801\u4ee5\u5305\u5f62\u5f0f\u5f15\u7528bright\u5e93\u7684\u8def\u5f84\n--typescript:use_puerts_bytebuf            \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210typescript\u4ee3\u7801\u4e2d\u4f7f\u7528puerts\u4e2d\u5bfc\u5165\u7684c# Bytebuf\u7c7b\u3002\n--cs:use_unity_vector                      \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210c#\u4ee3\u7801\u4e2d\uff0c\u4f7f\u7528UnityEngine.Vector{2,3,4}\u4f5c\u4e3aVector\u6570\u636e\u7c7b\u578b\u3002\n--go:bright_module_name <module path>      \u53ef\u9009\u53c2\u6570\u3002\u751f\u6210go\u4ee3\u7801\u65f6\uff0cbright module\u7684import\u76ee\u5f55\u3002\n\n--external:selectors  <selector1,selector2 ...>       \u53ef\u9009\u53c2\u6570\u3002 \u5916\u90e8\u7c7b\u9009\u62e9\u5668\uff0c\u53ef\u4ee5\u591a\u4e2a\u3002selector\u5fc5\u987b\u662froot.xml\u4e2dexternalselector\u4e2d\u5b9a\u4e49\u7684\u9009\u62e9\u5668\u4e4b\u4e00\u3002\n")),(0,l.kt)("h2",{id:"gen_types-\u53c2\u6570\u4ecb\u7ecd"},"gen_types \u53c2\u6570\u4ecb\u7ecd"),(0,l.kt)("p",null,"\u76ee\u524d\u652f\u6301\u7684 gen_types \u6709"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u4ee3\u7801\u751f\u6210\u76f8\u5173",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code_cs_bin               \u751f\u6210dotnet\u5e73\u53f0\u7684\u8bfb\u53d6bin\u683c\u5f0f\u6570\u636e\u7684\u4ee3\u7801\u3002\u4e0ecode_cs_unity_bin\u533a\u522b\u5728\u4e8e\u5b83\u751f\u6210\u7684vector{2,3,4}\u7c7b\u578b\u4e3aSystem.Numerics.Vector{2,3,4}"),(0,l.kt)("li",{parentName:"ul"},"code_cs_unity_bin         \u751f\u6210\u9002\u5408unity\u7684\u8bfb\u53d6bin\u683c\u5f0f\u6570\u636e\u7684\u4ee3\u7801\u3002\u4e0ecode_cs_bin\u533a\u522b\u5728\u4e8e\u5b83\u751f\u6210\u7684vector{2,3,4}\u7c7b\u578b\u4e3aUnityEngine.Vector{2,3,4}"),(0,l.kt)("li",{parentName:"ul"},"code_cs_dotnet_json       \u751f\u6210dotnet\u5e73\u53f0\u7684\u8bfb\u53d6json\u683c\u5f0f\u6570\u636e\u7684\u4ee3\u7801\u3002\u4e0ecode_cs_unity_json\u533a\u522b\u5728\u4e8e\u5b83\u751f\u6210\u7684vector{2,3,4}\u7c7b\u578b\u4e3aSystem.Numerics.Vector{2,3,4}"),(0,l.kt)("li",{parentName:"ul"},"code_cs_unity_json        \u751f\u6210\u9002\u5408unity\u7684\u8bfb\u53d6json\u683c\u5f0f\u6570\u636e\u7684\u4ee3\u7801\u3002\u4e0ecode_cs_dotnet_json\u533a\u522b\u5728\u4e8e\u5b83\u751f\u6210\u7684vector{2,3,4}\u7c7b\u578b\u4e3aUnityEngine.Vector{2,3,4}"),(0,l.kt)("li",{parentName:"ul"},"code_cs_unity_editor_json \u751f\u6210\u9002\u7528\u4e8eunity\u7f16\u8f91\u5668\u5f00\u53d1\u7684\u4ee3\u7801\u3002\u53ef\u4ee5\u5355\u72ec\u5c06\u4e00\u4e2a\u8bb0\u5f55\u52a0\u8f7d\u6216\u8005\u4fdd\u5b58\u5230json\u6587\u4ef6\u3002"),(0,l.kt)("li",{parentName:"ul"},"code_lua_bin              \u751f\u6210lua\u8bed\u8a00\u8bfb\u53d6bin\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_java_bin             \u751f\u6210java\u8bfb\u53d6bin\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_java_json            \u751f\u6210java\u8bfb\u53d6json\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_go_bin               \u751f\u6210go\u8bfb\u53d6bin\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_go_json              \u751f\u6210go\u8bfb\u53d6json\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_cpp_bin              \u751f\u6210cpp\u8bfb\u53d6bin\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_cpp_ue_editor_json   \u751f\u6210\u9002\u7528\u4e8eUE4\u7f16\u8f91\u5668\u5f00\u53d1\u7684\u4ee3\u7801\u3002\u53ef\u4ee5\u5355\u72ec\u5c06\u4e00\u4e2a\u8bb0\u5f55\u52a0\u8f7d\u6216\u8005\u4fdd\u5b58\u5230json\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"code_python27_json        \u751f\u6210python2\u7cfb\u5217\u8bfb\u53d6json\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_python3_json         \u751f\u6210python3\u7cfb\u5217\u8bfb\u53d6json\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_gdscript_json        \u751f\u6210gdscript\u7cfb\u5217\u8bfb\u53d6json\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_typescript_bin       \u751f\u6210ts\u8bfb\u53d6bin\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_typescript_json      \u751f\u6210ts\u8bfb\u53d6json\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_rust_json            \u751f\u6210rust\u8bfb\u53d6json\u683c\u5f0f\u7684\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ul"},"code_protobuf2            \u751f\u6210protobuf2 schema\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"code_protobuf3            \u751f\u6210protobuf3 schema\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"code_template             \u6307\u793a\u4f7f\u7528\u81ea\u5b9a\u4e49\u4ee3\u7801\u6a21\u677f"),(0,l.kt)("li",{parentName:"ul"},"code_flatbuffers          \u751f\u6210flatbuffers schema\u6587\u4ef6"))),(0,l.kt)("li",{parentName:"ul"},"\u6570\u636e\u751f\u6210\u76f8\u5173",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"data_bin \u5bfc\u51fabin\u683c\u5f0f\u6570\u636e"),(0,l.kt)("li",{parentName:"ul"},"data_bidx bin\u683c\u5f0f\u7684\u7d22\u5f15\u6570\u636e\u3002\u65b9\u4fbf\u5b9e\u73b0\u8bb0\u5f55\u7ea7\u522b\u7684\u5ef6\u8fdf\u52a0\u8f7d\u3002"),(0,l.kt)("li",{parentName:"ul"},"data_lua  \u5bfc\u51falua\u683c\u5f0f\u6570\u636e"),(0,l.kt)("li",{parentName:"ul"},"data_json \u5bfc\u51fajson\u683c\u5f0f\u6570\u636e"),(0,l.kt)("li",{parentName:"ul"},"data_json_monolithic\u3002 \u4e0edata_json\u533a\u522b\u5728\u4e8e\u5b83\u628a\u6240\u6709\u8868\u7684json\u6570\u636e\u6587\u4ef6\u751f\u6210\u5230\u4e00\u4e2ajson\u6587\u4ef6\u4e2d"),(0,l.kt)("li",{parentName:"ul"},"data_bson \u5bfc\u51fabson\u683c\u5f0f\u6570\u636e"),(0,l.kt)("li",{parentName:"ul"},"data_yaml \u5bfc\u51fayaml\u683c\u5f0f\u6570\u636e"),(0,l.kt)("li",{parentName:"ul"},"data_xml \u5bfc\u51faxml\u683c\u5f0f\u6570\u636e"),(0,l.kt)("li",{parentName:"ul"},"data_template \u81ea\u5b9a\u4e49\u6570\u636e\u6a21\u677f"),(0,l.kt)("li",{parentName:"ul"},"data_protobuf_bin \u5bfc\u51faprotobuf\u7684binary\u683c\u5f0f\u6570\u636e"),(0,l.kt)("li",{parentName:"ul"},"data_protobuf_json \u5bfc\u51faprotobuf3\u7684json\u6570\u636e\u683c\u5f0f"),(0,l.kt)("li",{parentName:"ul"},"data_flatbuffers_json \u5bfc\u51faflatbuffers\u7684json\u6570\u636e\u683c\u5f0f"),(0,l.kt)("li",{parentName:"ul"},"data_resources \u5bfc\u51fa\u6240\u6709\u5e26res\u6807\u7b7e\u7684\u6570\u636e"))),(0,l.kt)("li",{parentName:"ul"},"\u6e90\u6570\u636e\u8f6c\u6362\u76f8\u5173",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"convert_json \u5c06\u6e90\u6570\u636e\u5168\u90e8\u8f6c\u6362\u4e3ajson\u6e90\u6570\u636e\u683c\u5f0f\u3002\u6ce8\u610f\u8ddf\u5bfc\u51fa\u683c\u5f0f\u4e0d\u4e00\u6837\u3002\u6bcf\u4e2a\u8bb0\u5f55\u5360\u4e00\u4e2a\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"convert_lua \u5c06\u6e90\u6570\u636e\u5168\u90e8\u8f6c\u6362\u4e3alua\u6e90\u6570\u636e\u683c\u5f0f\u3002\u6bcf\u4e2a\u8bb0\u5f55\u5360\u4e00\u4e2a\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"convert_xlsx \u5c06\u6e90\u6570\u636e\u5168\u90e8\u8f6c\u6362\u4e3axlsx\u683c\u5f0f\u3002\u6bcf\u4e2a\u8868\u5360\u4e00\u4e2a\u6587\u4ef6\u7684"),(0,l.kt)("li",{parentName:"ul"},"convert_template \u81ea\u5b9a\u4e49\u8f6c\u6362\u6a21\u677f\u3002\u4f46\u6bcf\u4e2a\u8bb0\u5f55\u5360\u4e00\u4e2a\u6587\u4ef6")))),(0,l.kt)("h2",{id:"cachemeta-\u6587\u4ef6\u7684\u7528\u9014"},".cache.meta \u6587\u4ef6\u7684\u7528\u9014"),(0,l.kt)("p",null,"\u7b2c\u4e00\u6b21\u5b8c\u6210\u751f\u6210\u65f6\uff0c\u672c\u5730\u76ee\u5f55\u4f1a\u4ea7\u751f\u4e00\u4e2a .cache.meta\u3002"),(0,l.kt)("p",null,".cache.meta \u91cc\u5305\u542b\u4e86\u4e0eLuban.Server\u4ea4\u4e92\u8fc7\u7a0b\u4e2d\u6d89\u53ca\u5230\u7684\u6240\u6709\u6587\u4ef6\u7684 (\u8def\u5f84\uff0c md5\u7801\uff0c \u957f\u5ea6\uff0c\u4fee\u6539\u65f6\u95f4\u6233)\u4fe1\u606f\u3002\u7528\u4e8e\u4f18\u5316\u751f\u6210\u6027\u80fd\u3002"),(0,l.kt)("p",null,"\u7531\u4e8eLuban.Client\u4e0eLuban.Server\u7684\u5de5\u4f5c\u6a21\u578b\u4e3a\u4e91\u751f\u6210\u6a21\u578b\uff0cLuban.Client\u5411\u670d\u52a1\u5668\u53d1\u8d77\u751f\u6210\u8bf7\u6c42\u540e\uff0c\u670d\u52a1\u5668\u5e76\u4e0d\u76f4\u63a5\u8bfb\u53d6\u751f\u6210\u9700\u8981\u7684\u914d\u7f6e\u6587\u4ef6\uff0c\u800c\u662f\u5148\u83b7\u5f97\n\u8fd9\u4e9b\u6587\u4ef6\u7684\u5143\u4fe1\u606f\uff08\u8def\u5f84,md5\uff09,\u5982\u679c\u5185\u5b58\u7f13\u5b58\u4e2d\u6709\u76f8\u540cmd5\u7684\u6587\u4ef6\uff0c\u5219\u76f4\u63a5\u8bfb\u53d6\uff0c\u4e0d\u518d\u5411\u5ba2\u6237\u7aef\u8bfb\u53d6\u6587\u4ef6\u6570\u636e\uff0c\u8fd9\u6837\u6781\u5927\u63d0\u5347\u4e86\u589e\u91cf\u751f\u6210\u7684\u6027\u80fd\u3002"),(0,l.kt)("p",null,"\u670d\u52a1\u5668\u751f\u6210\u5b8c\u6210\u540e\uff0c\u4e5f\u4f1a\u5411\u5ba2\u6237\u7aef\u53d1\u9001\u751f\u6210\u6587\u4ef6\u5143\u6570\u636e\u5217\u8868\uff0c\u5305\u542b\uff08\u8def\u5f84\u3001md5\uff09\u8fd9\u4e9b\u5143\u6570\u636e\u4fe1\u606f\u3002\u5982\u679c\u672c\u5730\u4e0d\u5b58\u5728\u8fd9\u4e9b\u6587\u4ef6\uff0c\u5219\u4e0b\u8f7d\u4e0b\u8f7d\uff0c\u5982\u679c\u5df2\u7ecf\u5b58\u5728\uff0c\u5219\u68c0\u67e5\n\u662f\u5426\u6709\u53d8\u5316\uff0c\u6b64\u65f6Luban.Client\u5e76\u4e0d\u4f1a\u76f4\u63a5\u8bfb\u53d6\u672c\u5730\u6587\u4ef6\u5e76\u4e14\u8ba1\u7b97md5,\u800c\u662f\u5148\u67e5\u8be2.cache.meta\u91cc\u662f\u5426\u6709\u5bf9\u5e94\u7684\u6587\u4ef6md5\u4fe1\u606f\uff0c\u5982\u679c\u672c\u5730\u6587\u4ef6\u7684\u957f\u5ea6\u548c\u4fee\u6539\u65f6\u95f4\u6233\n\u4e0e.cache.meta\u91cc\u7684\u76f8\u540c\uff0c\u5219\u8ba4\u4e3a.cache.meta\u91cc\u5305\u542b\u4e86\u6b63\u786e\u7684md5\u503c\uff0c\u7136\u540e\u62ff\u8fd9\u4e2a\u503c\u5230\u670d\u52a1\u5668\u751f\u6210\u7684\u7ed3\u679c\u7684md5\u5bf9\u6bd4\uff0c\u53ea\u6709\u4e0d\u76f8\u540c\uff0c\u624d\u4f1a\u91cd\u65b0\u4e0b\u8f7d\u3002"),(0,l.kt)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),(0,l.kt)("p",null,"\u5047\u8bbe"),(0,l.kt)("p",null,"  luban.server \u8fd0\u884c\u5728\u672c\u673a\uff0c\u7aef\u53e3\u4e3a8899\nluban.client\u7684\u4f4d\u7f6e\u5728 d:\\tools\\Luban.Client\n\u914d\u7f6e\u5b9a\u4e49\u5728 d:\\raw_config\\defines\n\u914d\u7f6e\u5b9a\u4e49\u7684\u6839\u5b9a\u4e49\u6587\u4ef6\u4e3a d:\\raw_config\\defines","_","_root__.xml\n\u914d\u7f6e\u6570\u636e\u5728 d:\\raw_configs\\datas"),(0,l.kt)("p",null,"  client\u9879\u76ee\u4e3aunity\u9879\u76ee\uff0c\u4f4d\u7f6e\u5728 d:\\client\n\u4f60\u671f\u671bclient\u751f\u6210\u7684\u4ee3\u7801\u5728 d:\\client\\Assets\\Gen \u76ee\u5f55\n\u4f60\u671f\u671bclient\u751f\u6210\u7684\u6570\u636e\u5728 d:\\client\\Assets\\StreamingAssets\\GameData \u76ee\u5f55"),(0,l.kt)("p",null,"  \u4f60\u4eec\u670d\u52a1\u5668\u9879\u76ee\u4e3a dotnet c#\u9879\u76ee\uff0c\u4f4d\u7f6e\u5728d:\\server\n\u4f60\u671f\u671bserver\u751f\u6210\u7684\u4ee3\u7801\u5728 d:\\server\\src\\Gen\n\u4f60\u671f\u671bserver\u751f\u6210\u7684\u6570\u636e\u5728 d:\\server\\GameData"),(0,l.kt)("h3",{id:"\u6848\u4f8b1"},"\u6848\u4f8b1"),(0,l.kt)("p",null,"\u4f60\u8981\u4e3a\u5ba2\u6237\u7aef\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e\u3002\n\u4f60\u671f\u671b\u4f7f\u7528bin\u683c\u5f0f\u7684\u5bfc\u51fa\u6570\u636e\u7c7b\u578b\n\u4f60\u4e3a\u5ba2\u6237\u7aef\u9009\u62e9\u7684service\u5206\u7ec4\u4e3a client\n\u5f53\u524d\u5728\u5f00\u53d1\u671f\uff0c\u4f60\u671f\u671b\u5bfc\u51fa\u6570\u636e\u4e2d\u5305\u542b\u6d4b\u8bd5\u6570\u636e"),(0,l.kt)("p",null,"\u5219win\u4e0b\u547d\u4ee4\u4e3a\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"dotnet d:\\tools\\Luban.Client\\Luban.Client.dll ^\n    -h 127.0.0.1 ^\n    -p 8899 ^\n    -j cfg ^\n    -- ^\n    --define_file d:\\raw_config\\defines\\__root__.xml ^\n    --input_data_dir d:\\raw_configs\\datas ^\n    --output_code_dir d:\\client\\Assets\\Gen ^\n    --output_data_dir d:\\client\\Assets\\StreamingAssets\\GameData ^\n    --gen_types code_cs_unity_bin,data_bin ^\n    --service client\n")),(0,l.kt)("p",null,"linux bash\u547d\u4ee4\u540c\u7406\u3002"),(0,l.kt)("h3",{id:"\u6848\u4f8b2"},"\u6848\u4f8b2"),(0,l.kt)("p",null,"\u4f60\u8981\u4e3a\u5ba2\u6237\u7aef\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e\u3002\n\u4f60\u671f\u671b\u4f7f\u7528json\u683c\u5f0f\u5bfc\u51fa\u6570\u636e\u7c7b\u578b\u3002\n\u4f60\u4e0d\u671f\u671b\u5bfc\u51fa\u6570\u636e\u4e2d\u5305\u542bdev\u548ctest\u6807\u7b7e\u7684\u6570\u636e"),(0,l.kt)("p",null,"\u5219win\u4e0b\u547d\u4ee4\u4e3a:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"dotnet d:\\tools\\Luban.Client\\Luban.Client.dll ^\n    -h 127.0.0.1 ^\n    -p 8899 ^\n    -j cfg ^\n    -- ^\n    --define_file d:\\raw_config\\defines\\__root__.xml ^\n    --input_data_dir d:\\raw_configs\\datas ^\n    --output_code_dir d:\\client\\Assets\\Gen ^\n    --output_data_dir d:\\client\\Assets\\StreamingAssets\\GameData ^\n    --gen_types code_cs_unity_json,data_json ^\n    --service client ^\n    --export_exclude_tags dev,test\n")),(0,l.kt)("h3",{id:"\u6848\u4f8b3"},"\u6848\u4f8b3"),(0,l.kt)("p",null,"\u4f60\u8981\u4e3a\u670d\u52a1\u5668\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e\u3002"),(0,l.kt)("p",null,"\u4f60\u671f\u671b\u4f7f\u7528json\u5bfc\u51fa\u6570\u636e\u683c\u5f0f\u3002\n\u4f60\u671f\u671b\u5305\u542b\u6d4b\u8bd5\u6570\u636e\u3002\n\u4f60\u4e3a\u670d\u52a1\u5668\u9009\u62e9\u7684service\u4e3aserver"),(0,l.kt)("p",null,"\u5219 win\u4e0b\u547d\u4ee4\u4e3a\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"dotnet d:\\tools\\Luban.Client\\Luban.Client.dll ^\n    -h 127.0.0.1 ^\n    -p 8899 ^\n    -j cfg ^\n    -- ^\n    --define_file d:\\raw_config\\defines\\__root__.xml ^\n    --input_data_dir d:\\raw_configs\\datas ^\n    --output_code_dir d:\\server\\src\\Gen ^\n    --output_data_dir d:\\server\\GameData ^\n    --gen_types code_cs_json,data_json ^\n    --service server\n")),(0,l.kt)("h3",{id:"\u6848\u4f8b4"},"\u6848\u4f8b4"),(0,l.kt)("p",null,"luban-server \u88ab\u4f60\u90e8\u5c5e\u5728 192.168.1.10\u8fd9\u53f0\u673a\u5668\u4e0a\uff0c\u7aef\u53e3\u4e3a1111\u3002\u5176\u4ed6\u7684\u5982\u6848\u4f8b3\u3002"),(0,l.kt)("p",null,"\u5219 win\u4e0b\u7684\u751f\u6210\u547d\u4ee4\u4e3a\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"dotnet d:\\tools\\Luban.Client\\Luban.Client.dll ^\n    -h 192.168.1.10 ^\n    -p 1111 ^\n    -j cfg ^\n    -- ^\n    --define_file d:\\raw_config\\defines\\__root__.xml ^\n    --input_data_dir d:\\raw_configs\\datas ^\n    --output_code_dir d:\\server\\src\\Gen ^\n    --output_data_dir d:\\server\\GameData ^\n    --gen_types code_cs_dotnet_json,data_json ^\n    --service server\n")),(0,l.kt)("h3",{id:"\u6848\u4f8b5"},"\u6848\u4f8b5"),(0,l.kt)("p",null,"\u4f60\u8981\u4e3a\u670d\u52a1\u5668\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e\u3002\u540c\u65f6\u8ba9luban.client\u6267\u884c\u751f\u6210\u540e\u4e0d\u9000\u51fa\uff0c\u8fdb\u5165\u76d1\u63a7\u72b6\u6001\uff0c\u53ea\u8981\u914d\u7f6e\u5b9a\u4e49\u6216\u8005\u6570\u636e\u6709\u53d8\u5316\uff0c\u5c31\u81ea\u52a8\u751f\u6210\u4ee3\u7801\u548c\u6570\u636e\u3002"),(0,l.kt)("p",null,"\u4f60\u671f\u671b\u4f7f\u7528json\u5bfc\u51fa\u6570\u636e\u683c\u5f0f\u3002\n\u4f60\u671f\u671b\u5305\u542b\u6d4b\u8bd5\u6570\u636e\u3002\n\u4f60\u4e3a\u670d\u52a1\u5668\u9009\u62e9\u7684service\u4e3aserver"),(0,l.kt)("p",null,"\u5219 win\u4e0b\u547d\u4ee4\u4e3a\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"dotnet d:\\tools\\Luban.Client\\Luban.Client.dll ^\n    -h 127.0.0.1 ^\n    -p 8899 ^\n    -j cfg ^\n    -w d:\\raw_config\\defines;d:\\raw_configs\\datas\n    -- ^\n    --define_file d:\\raw_config\\defines\\__root__.xml ^\n    --input_data_dir d:\\raw_configs\\datas ^\n    --output_code_dir d:\\server\\src\\Gen ^\n    --output_data_dir d:\\server\\GameData ^\n    --gen_types code_cs_dotnet_json,data_json ^\n    --service server   \n")))}p.isMDXComponent=!0}}]);