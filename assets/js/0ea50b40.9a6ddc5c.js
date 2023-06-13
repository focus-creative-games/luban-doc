"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[68],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>k});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var m=a.createContext({}),p=function(e){var n=a.useContext(m),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=p(e.components);return a.createElement(m.Provider,{value:n},e.children)},u="mdxType",x={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},y=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,m=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(t),y=l,k=u["".concat(m,".").concat(y)]||u[y]||x[y]||r;return t?a.createElement(k,o(o({ref:n},s),{},{components:t})):a.createElement(k,o({ref:n},s))}));function k(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,o=new Array(r);o[0]=y;var i={};for(var m in n)hasOwnProperty.call(n,m)&&(i[m]=n[m]);i.originalType=e,i[u]="string"==typeof e?e:l,o[1]=i;for(var p=2;p<r;p++)o[p]=t[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},62:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>o,default:()=>x,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var a=t(7462),l=(t(7294),t(3905));const r={},o="\u6570\u636e\u5b9a\u4e49",i={unversionedId:"manual/datasource",id:"manual/datasource",title:"\u6570\u636e\u5b9a\u4e49",description:"\u5927\u591a\u6570\u6570\u636e\u683c\u5f0f\u586b\u6cd5\u7b26\u5408\u76f4\u89c9\uff0c\u800c\u4e14\u6570\u636e\u5b9a\u4e49\u662f\u5b8c\u5168\u4e00\u6837\u7684\uff0c\u4e0d\u540c\u6570\u636e\u7ed3\u6784\u5728xml\u4e2d\u683c\u5f0f\u793a\u4f8b\u5982\u4e0b\uff1a",source:"@site/docs/manual/datasource.md",sourceDirName:"manual",slug:"/manual/datasource",permalink:"/docs/manual/datasource",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"tag \u4ecb\u7ecd",permalink:"/docs/manual/tag"},next:{title:"Editor\u652f\u6301",permalink:"/docs/manual/editor"}},m={},p=[{value:"\u6570\u636e\u6e90\u6587\u4ef6",id:"\u6570\u636e\u6e90\u6587\u4ef6",level:2},{value:"\u4ee5\u76ee\u5f55\u6811\u5f62\u5f0f\u7ec4\u7ec7",id:"\u4ee5\u76ee\u5f55\u6811\u5f62\u5f0f\u7ec4\u7ec7",level:3},{value:"\u4ee5\u590d\u5408\u6587\u4ef6\u5f62\u5f0f\u7ec4\u7ec7",id:"\u4ee5\u590d\u5408\u6587\u4ef6\u5f62\u5f0f\u7ec4\u7ec7",level:3},{value:"\u6570\u636etag",id:"\u6570\u636etag",level:2}],s={toc:p},u="wrapper";function x(e){let{components:n,...t}=e;return(0,l.kt)(u,(0,a.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u6570\u636e\u5b9a\u4e49"},"\u6570\u636e\u5b9a\u4e49"),(0,l.kt)("p",null,"\u5927\u591a\u6570\u6570\u636e\u683c\u5f0f\u586b\u6cd5\u7b26\u5408\u76f4\u89c9\uff0c\u800c\u4e14\u6570\u636e\u5b9a\u4e49\u662f\u5b8c\u5168\u4e00\u6837\u7684\uff0c\u4e0d\u540c\u6570\u636e\u7ed3\u6784\u5728xml\u4e2d\u683c\u5f0f\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml"},'<bean name="DemoType2" >\n  <var name="x4" type="int" convert="DemoEnum"/>\n  <var name="x1" type="bool"/>\n  <var name="x5" type="long" convert="DemoEnum"/>\n  <var name="x6" type="float"/>\n  <var name="x7" type="double"/>\n  <var name="x10" type="string"/>\n  <var name="x12" type="DemoType1"/>\n  <var name="x13" type="DemoEnum"/>\n  <var name="x14" type="DemoDynamic" sep=","/>\u591a\u6001\u6570\u636e\u7ed3\u6784\n  <var name="v2" type="vector2"/>\n  <var name="v3" type="vector3"/>\n  <var name="v4" type="vector4"/>\n  <var name="t1" type="datetime"/>\n  <var name="k1" type="array,int"/> \u4f7f\u7528;\u6765\u5206\u9694\n  <var name="k2" type="list,int"/>\n  <var name="k8" type="map,int,int"/>\n  <var name="k9" type="list,DemoE2" sep="," index="y1"/>\n  <var name="k15" type="array,DemoDynamic" sep=","/> \n</bean>\n\n<table name="TbDataFromSingle" value="DemoType2" input="test/datas"/> \n')),(0,l.kt)("h2",{id:"\u6570\u636e\u6e90\u6587\u4ef6"},"\u6570\u636e\u6e90\u6587\u4ef6"),(0,l.kt)("h3",{id:"\u4ee5\u76ee\u5f55\u6811\u5f62\u5f0f\u7ec4\u7ec7"},"\u4ee5\u76ee\u5f55\u6811\u5f62\u5f0f\u7ec4\u7ec7"),(0,l.kt)("p",null,"\u5178\u578b\u7528\u6cd5\u662f\uff0c\u4ee5\u76ee\u5f55\u4e3a\u6570\u636e\u6e90\uff08\u4f1a\u904d\u5386\u6574\u68f5\u76ee\u5f55\u6811\uff09\uff0c\u76ee\u5f55\u6811\u4e0b\u6bcf\u4e2a\u6587\u4ef6\u4e3a\u4e00\u4e2a\u8bb0\u5f55\u8bfb\u5165\u3002\u5982\u4e0b\u793a\u4f8b\uff0c\u9012\u5f52\u904d\u5386\u6574\u4e2a\u76ee\u5f55\u6811\uff0c",(0,l.kt)("strong",{parentName:"p"},"\u6309\u6587\u4ef6\u540d\u6392\u5e8f\u540e"),"\u4f9d\u6b21\u5c06\u6bcf\u4e2a\u6587\u4ef6\u5f53\u4f5c\u4e00\u4e2a\u8bb0\u5f55\u8bfb\u5165\u3002"),(0,l.kt)("p",null,"?> \u6570\u636e\u4e3ajson lua xml\u6216\u5176\u5b83\u7684\u4efb\u610f\u6e90\u6587\u4ef6\u6df7\u5408\u5728\u4e00\u8d77\u65f6\uff0cluban\u90fd\u80fd\u6b63\u786e\u8f7d\u5165\u6570\u636e"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Json\u6570\u636e\u6e90\u7279\u70b9\uff1a")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"set\u7c7b\u578b\u3002\u586b\u6cd5\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"[v1,v2,...]")),(0,l.kt)("li",{parentName:"ul"},"map\u7c7b\u578b\u3002\u7531\u4e8ejson\u53ea\u652f\u6301string\u7c7b\u578b\u7684key\uff0c\u56e0\u6b64map\u683c\u5f0f\u586b\u6cd5\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"[[k1,v1],[k2,v2]...]")),(0,l.kt)("li",{parentName:"ul"},"\u591a\u6001bean\u7c7b\u578b\u3002\u9700\u8981 $type \u5c5e\u6027\u6765\u6307\u5b9a\u5177\u4f53\u7c7b\u578b\u540d"),(0,l.kt)("li",{parentName:"ul"},'text\u7c7b\u578b\uff0c\u586b\u6cd5\u4e3a {"key":key, "text":text}')),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"Lua\u6570\u636e\u6e90\u7279\u70b9\uff1a")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6570\u636e\u524d\u6709\u4e00\u4e2areturn\uff0c\u8fd9\u662f\u56e0\u4e3a lua \u6570\u636e\u662f\u5f53\u4f5c lua \u6587\u4ef6\u52a0\u8f7d\u7684\uff0c\u6bcf\u4e2a\u52a0\u8f7d\u540e\u7684\u7ed3\u679c\u5f53\u4f5c\u4e00\u4e2a\u8bb0\u5f55\u8bfb\u5165"),(0,l.kt)("li",{parentName:"ul"},"set \u7684\u683c\u5f0f\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"{v1, v2, ...}")),(0,l.kt)("li",{parentName:"ul"},"\u4e0ejson\u4e0d\u540c\uff0clua \u7684table\u7684key\u652f\u6301\u4efb\u610f\u683c\u5f0f\uff0c\u6240\u4ee5lua\u7684map\u53ef\u4ee5\u76f4\u63a5  ",(0,l.kt)("inlineCode",{parentName:"li"},"{[key1] = value1, [key2] = value2, ,,,}")),(0,l.kt)("li",{parentName:"ul"},"\u591a\u6001bean\u7c7b\u578b\u3002\u9700\u8981 ","_","type","_","\u5c5e\u6027\u6765\u6307\u5b9a\u5177\u4f53\u7c7b\u578b\u540d"),(0,l.kt)("li",{parentName:"ul"},"text\u7c7b\u578b\uff0c\u586b\u6cd5\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"{key = key, text = text}"))),(0,l.kt)("p",null,"\u793a\u4f8b\u914d\u7f6e\u6587\u4ef6\u5185\u5bb9\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "x1":true,\n  "x2":3,\n  "x3":128,\n  "x4":1,\n  "x5":11223344,\n  "x6":1.2,\n  "x7":1.23432,\n  "x10":"hq",\n  "t1": {"key":"/key/xx1","text":"apple"},\n  "x12": { "x1":10},\n  "x13":"B",\n  "x14":{"$type": "DemoD2", "x1":1, "x2":2},\n  "v2":{"x":1, "y":2},\n  "v3":{"x":1.1, "y":2.2, "z":3.4},\n  "v4":{"x":10.1, "y":11.2, "z":12.3, "w":13.4},\n  "t1":"1970-01-01 00:00:00",\n  "k1":[1,2],\n  "k2":[2,3],\n  "k7":[2,3],\n  "k8":[[2,2],[4,10]],\n  "k9":[{"y1":1, "y2":true},{"y1":2, "y2":false}],\n  "k15":[{"$type": "DemoD2", "x1":1, "x2":2}]\n}\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-lua"},'return \n{\n  x1 = false,\n  x2 = 2,\n  x3 = 128,\n  x4 = 1122,\n  x5 = 112233445566,\n  x6 = 1.3,\n  x7 = 1122,\n  x10 = "yf",\n  t1 = {key="/key/ab1", text="apple"},\n  x12 = {x1=1},\n  x13 = "D",\n  x14 = { _type_="DemoD2", x1 = 1, x2=3},\n  v2 = {x= 1,y = 2},\n  v3 = {x=0.1, y= 0.2,z=0.3},\n  v4 = {x=1,y=2,z=3.5,w=4},\n  t1 = "1970-01-01 00:00:00",\n  k1 = {1,2},\n  k2 = {2,3},\n  k8 = {[2]=10,[3]=12},\n  k9 = { {y1=1,y2=true}, {y1=10,y2=false} },\n  k15 = { { _type_="DemoD2", x1 = 1, x2=3} },\n}\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml"},'<data>\n  <x1>true</x1>\n  <x2>4</x2>\n  <x3>128</x3>\n  <x4>1</x4>\n  <x5>112233445566</x5>\n  <x6>1.3</x6>\n  <x7>1112232.43123</x7>\n  <x10>yf</x10>\n  <x12> <x1>1</x1> </x12>\n  <x13>C</x13>\n  <x14 __type__="DemoD2">  <x1>1</x1>  <x2>2</x2> </x14>\n  <v2>1,2</v2>\n  <v3>1.2,2.3,3.4</v3>\n  <v4>1.2,2.2,3.2,4.3</v4>\n  <t1>1970-01-01 00:00:00</t1>\n  <k1> <item>1</item> <item>2</item> </k1>\n  <k2> <item>1</item> <item>2</item> </k2>\n  <k8>\n      <item> <key>2</key><value>10</value></item>\n      <item> <key>3</key><value>30</value></item>\n  </k8>\n  <k9>\n      <item> <y1>1</y1> <y2>true</y2> </item>\n      <item> <y1>2</y1> <y2>false</y2> </item>\n  </k9>\n  <k15>\n      <item __type__="DemoD2"> <x1>1</x1> <x2>2</x2> </item>\n  </k15>\n</data>\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"x1: true\nx2: 3\nx3: 128\nx4: 40\nx5: 11223344\nx6: 1.2\nx7: 1.23432\nx10: hq\nx12:\n  x1: 10\nx13: B\nx14:\n  $type: DemoD2\n  x1: 1\n  x2: 2\ns1:\n  key: \"/key32\"\n  text: aabbcc22\nv2:\n  x: 1\n  y: 2\nv3:\n  x: 1.1\n  y: 2.2\n  z: 3.4\nv4:\n  x: 10.1\n  y: 11.2\n  z: 12.3\n  w: 13.4\nt1: '1970-01-01 00:00:00'\nk1:\n- 1\n- 2\nk2:\n- 2\n- 3\nk8:\n- - 2\n  - 2\n- - 4\n  - 10\nk9:\n- y1: 1\n  y2: true\n- y1: 2\n  y2: false\nk15:\n- $type: DemoD2\n  x1: 1\n  x2: 2\n")),(0,l.kt)("h3",{id:"\u4ee5\u590d\u5408\u6587\u4ef6\u5f62\u5f0f\u7ec4\u7ec7"},"\u4ee5\u590d\u5408\u6587\u4ef6\u5f62\u5f0f\u7ec4\u7ec7"),(0,l.kt)("p",null,"\u8fd9\u91cc\u53ea\u7ed9\u51faJSON\u6570\u636e\u6e90\u6587\u4ef6\u793a\u4f8b\uff0c\u5176\u5b83\u683c\u5f0f\u7c7b\u4f3c"),(0,l.kt)("p",null,"\u6574\u4e2a\u8868\u4ee5\u4e00\u4e2a\u6216\u8005\u591a\u4e2ajson\u6587\u4ef6\u7684\u5f62\u5f0f\u7ec4\u7ec7\u3002\u5728table\u7684input\u5c5e\u6027\u4e2d\u624b\u52a8\u6307\u5b9ajson\u6570\u636e\u6e90\uff0c\u6709\u4ee5\u4e0b\u51e0\u79cd\u683c\u5f0f\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"xxx.json"),"\uff0c\u628axxx.json\u5f53\u4f5c\u4e00\u4e2a\u8bb0\u5f55\u8bfb\u5165\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"*@xxx.json"),"\uff0c\u628axxx.json\u5f53\u4f5c\u8bb0\u5f55\u5217\u8868\u8bfb\u5165\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"field@xxx.json"),"\uff0c\u628a xxx.json\u4e2d\u7684field\u5b57\u6bb5\u5f53\u4f5c\u4e00\u4e2a\u8bb0\u5f55\u8bfb\u5165\u3002field\u53ef\u4ee5\u662f\u6df1\u5c42\u6b21\u5b57\u6bb5\uff0c\u6bd4\u5982 a.b.c\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"*field@xxx.json"),"\uff0c\u628axxx.json\u4e2d\u7684field\u5b57\u6bb5\u5f53\u4f5c\u8bb0\u5f55\u5217\u8868\u8bfb\u5165\u3002field\u53ef\u4ee5\u662f\u6df1\u5c42\u6b21\u5b57\u6bb5\u3002")),(0,l.kt)("p",null,"\u6bd4\u8f83\u6709\u8da3\u7684\u662f\uff0c\u4e0exlsx\u6570\u636e\u6e90\u76f8\u4f3c\uff0c\u652f\u6301\u5c06\u591a\u4e2a\u8868\u653e\u5230\u540c\u4e00\u4e2ajson\u4e2d\uff0c\u4e0d\u8fc7\u5b9e\u8df5\u4e2d\u6781\u5c11\u8fd9\u4e48\u505a\u3002"),(0,l.kt)("p",null,"\u5982\u4e0b\u5217\u793a\u4f8b\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"TbCompositeJsonTable1 \u4ece composite_tables.json\u7684table1\u5b57\u6bb5\u4e2d\u8bfb\u5165\u8bb0\u5f55\u5217\u8868\uff0c\u4ececomposite_tables2.json\u4e2d\u8bfb\u5165\u8bb0\u5f55\u5217\u8868\uff0c\u4eceone_record.json\u4e2d\u8bfb\u5165\u4e00\u4e2a\u8bb0\u5f55"),(0,l.kt)("li",{parentName:"ul"},"TbCompositeJsonTable2 \u4ece composite_tables.json\u7684table2\u5b57\u6bb5\u4e2d\u8bfb\u5165\u8bb0\u5f55\u5217\u8868"),(0,l.kt)("li",{parentName:"ul"},"TbCompositeJsonTable3 \u4ece composite_tables.json\u7684table3\u5b57\u6bb5\u4e2d\u8bfb\u5165\u4e00\u4e2a\u8bb0\u5f55")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml"},'<bean name="CompositeJsonTable1">\n    <var name="id" type="int"/>\n    <var name="x" type="string"/>\n</bean>\n<bean name="CompositeJsonTable2">\n    <var name="id" type="int"/>\n    <var name="y" type="int"/>\n</bean>\n<bean name="CompositeJsonTable3">\n    <var name="a" type="int"/>\n    <var name="b" type="int"/>\n</bean>\n\n<table name="TbCompositeJsonTable1" value="CompositeJsonTable1" \n        input="*table1@composite_tables.json,*@composite_tables2.json,one_record.json"/>\n<table name="TbCompositeJsonTable2" value="CompositeJsonTable2" \n        input="*table2@composite_tables.json"/>\n<table name="TbCompositeJsonTable3" value="CompositeJsonTable3" mode="one" \n        input="table3@composite_tables.json"/>\n')),(0,l.kt)("h2",{id:"\u6570\u636etag"},"\u6570\u636etag"),(0,l.kt)("p",null,"\u4e0eexcel\u683c\u5f0f\u7c7b\u4f3c\uff0cjson\u683c\u5f0f\u652f\u6301\u8bb0\u5f55tag\uff0c\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"__tag__")," \u5c5e\u6027\u6765\u6307\u660etag\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "__tag__":"dev",\n    "x":1,\n    "y":2\n}\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-lua"},'return {\n    __tag__ = "dev",\n    x = 1,\n    y = 2,\n}\n')))}x.isMDXComponent=!0}}]);