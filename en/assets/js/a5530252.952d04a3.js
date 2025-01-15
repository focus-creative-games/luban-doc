"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5667],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(n),f=i,d=p["".concat(s,".").concat(f)]||p[f]||m[f]||r;return n?a.createElement(d,l(l({ref:t},c),{},{components:n})):a.createElement(d,l({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=f;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[p]="string"==typeof e?e:i,l[1]=o;for(var u=2;u<r;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8533:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>u});var a=n(7462),i=(n(7294),n(3905));const r={},l="Use Custom Types",o={unversionedId:"beginner/usecustomtype",id:"beginner/usecustomtype",title:"Use Custom Types",description:"In practice, we often encounter situations where enumerations and custom structures need to be defined. Luban perfectly supports this feature.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/beginner/usecustomtype.md",sourceDirName:"beginner",slug:"/beginner/usecustomtype",permalink:"/en/docs/beginner/usecustomtype",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Runtime loading configuration",permalink:"/en/docs/beginner/loadinruntime"},next:{title:"Use Container Types",permalink:"/en/docs/beginner/usecollection"}},s={},u=[{value:"Define common enumerations",id:"define-common-enumerations",level:2},{value:"Define flag type enumeration",id:"define-flag-type-enumeration",level:2},{value:"Fill in enumeration data",id:"fill-in-enumeration-data",level:2},{value:"Define common structure type",id:"define-common-structure-type",level:2},{value:"Fill in the structure type data",id:"fill-in-the-structure-type-data",level:2},{value:"Compact structure type",id:"compact-structure-type",level:2},{value:"Fill in compact type data",id:"fill-in-compact-type-data",level:2}],c={toc:u},p="wrapper";function m(e){let{components:t,...r}=e;return(0,i.kt)(p,(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"use-custom-types"},"Use Custom Types"),(0,i.kt)("p",null,"In practice, we often encounter situations where enumerations and custom structures need to be defined. Luban perfectly supports this feature."),(0,i.kt)("p",null,"For detailed definition documents, see ",(0,i.kt)("a",{parentName:"p",href:"../manual/schema"},"schema logical structure"),", and for detailed data documents, see ",(0,i.kt)("a",{parentName:"p",href:"../manual/excel"},"Excel format (beginner)")," and ",(0,i.kt)("a",{parentName:"p",href:"../manual/exceladvanced"},"Excel format (advanced)"),"."),(0,i.kt)("h2",{id:"define-common-enumerations"},"Define common enumerations"),(0,i.kt)("p",null,"Let's take the definition of Color enumeration as an example."),(0,i.kt)("p",null,"Open ",(0,i.kt)("inlineCode",{parentName:"p"},"__enums__.xlsx")," (usually in the Datas directory) and add the following data:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"color",src:n(3176).Z,width:"1219",height:"322"})),(0,i.kt)("p",null,"For detailed explanation of the fields, see ",(0,i.kt)("a",{parentName:"p",href:"../manual/schema#enum"},"enum logical structure"),"."),(0,i.kt)("p",null,"It is recommended that flags=false and unique=true, that is, non-flag enumeration, enumeration items are unique."),(0,i.kt)("p",null,"When configuring enumeration type data, you can fill in the enumeration item name, enumeration item alias, and enumeration item value, that is, RED, red, and 1 all correspond to the RED enumeration."),(0,i.kt)("h2",{id:"define-flag-type-enumeration"},"Define flag type enumeration"),(0,i.kt)("p",null,"Some enumeration type enumeration items are flag bits, which can be combined in multiples when used. Let's take AccessFlag as an example."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"color",src:n(6659).Z,width:"1172",height:"145"})),(0,i.kt)("p",null,"flags=true means that this is a flag type enumeration."),(0,i.kt)("p",null,"When configuring flag type enumeration, even if you can use only one enumeration item like a normal enumeration type, such as ",(0,i.kt)("inlineCode",{parentName:"p"},"READ"),"; you can also use '|' to combine multiple enumeration items, such as ",(0,i.kt)("inlineCode",{parentName:"p"},"READ|EXECUTE"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"write|execute"),"."),(0,i.kt)("h2",{id:"fill-in-enumeration-data"},"Fill in enumeration data"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"enum data",src:n(6638).Z,width:"660",height:"324"})),(0,i.kt)("h2",{id:"define-common-structure-type"},"Define common structure type"),(0,i.kt)("p",null,"Let's take the common prop structure as an example. Open ",(0,i.kt)("inlineCode",{parentName:"p"},"__beans__.xlsx")," and add the following data:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"item",src:n(1370).Z,width:"1344",height:"195"})),(0,i.kt)("h2",{id:"fill-in-the-structure-type-data"},"Fill in the structure type data"),(0,i.kt)("p",null,"By default, each field in the structure takes up one cell, and the field name needs to take up multiple cells to indicate that the data in these cells corresponds to each field of the structure. In this case, cells need to be merged."),(0,i.kt)("p",null,"If you are using a file format such as csv that does not support merged cells, you can use ",(0,i.kt)("inlineCode",{parentName:"p"},"[{field name}")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"{field name}]")," to put them in the start and end columns to indicate that this field occupies multiple columns."),(0,i.kt)("p",null,"You can also use sep to fill in the entire structure in one field. ",(0,i.kt)("inlineCode",{parentName:"p"},"sep=,")," means using ',' to split the cell data, and the split data is used as the field of the structure."),(0,i.kt)("p",null,"When there are many fields in the structure, it is easy to make mistakes to fill in the fields continuously. In this case, you can use the multi-level header format to specify the column where each member field is located. For details, see ","[Multi-level header]","(../manual/exceladvanced#Multi-level header)."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"item",src:n(5718).Z,width:"982",height:"208"})),(0,i.kt)("h2",{id:"compact-structure-type"},"Compact structure type"),(0,i.kt)("p",null,"If a structure always fills data in a cell in a compact way, you can define the sep attribute directly when defining the structure. Let's take MyVec3 as an example:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"item",src:n(7186).Z,width:"1330",height:"128"})),(0,i.kt)("h2",{id:"fill-in-compact-type-data"},"Fill in compact type data"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"item",src:n(7185).Z,width:"301",height:"187"})),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Common types such as vec2, vec3, and vec4 are already defined by default in ",(0,i.kt)("inlineCode",{parentName:"p"},"Defines/builtin.xml"),", so there is no need to redefine them.")))}m.isMDXComponent=!0},6638:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/enum-dee044226803effc6032313e7c4981e7.jpg"},6659:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/define_accessflag-d3d17a9c9b6042223d0fa32a63d8f238.jpg"},3176:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/define_color-9d8229fee2ca0814f9ddeee5188b8477.jpg"},1370:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/define_item-9f9e72ceb8af6dcbc0480a796fab3bd8.jpg"},7186:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/define_vec3-84c96a05193d45f68ef63cc0cc8fe5cb.jpg"},5718:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/use_item-513b175faefd91435357a469108d961c.jpg"},7185:(e,t,n)=>{n.d(t,{Z:()=>a});const a="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAAC7CAYAAAAwq8gEAAAAAXNSR0IArs4c6QAAHZZJREFUeF7tXVtrHNeWXvUXJhky49wTt3NQlHvnJpGHmAyx5bERBPzUoMPMsZoMDN2cQSYPgkGgh0FmDt0MHJA9AyPoJ8EBIceSAyF5CO3cr1Y0J24lzrUhkOQfJDXsqupWVXddVnXttatW9zIcDrFXrb3X96391d67d61tdbtdG+SPICAICAJMELBEtJgwJd0UBAQBBwERLUkEQUAQYIWAiBYruqSzgoAgIKIlOSAICAKsEBhJtH766Se49dZbWQVqsrOCTzzan332GRw5csQkJdIWAoFutwsPP/wwwjJfk5FE68cff4Tbbrst354XuHXBJ56cTz/9FG6//fYCMziZXfvhhx/gkUceKXzwI4mWUmR5U0ZzK/jE5/0nn3wCd9xxR+EHx6R18Pvvv4dHH3208GGPJFrfffcd3HnnnYUPLq8OCj4iWnnlXpZ2x0q0fv75Z7jlllv6eNy8eRPuvffeLPiM9bOCTzy9H3/8sbz0CjgC1Mv2scceK2DPgl1KnGkpwfrmm2/g8ccf7z95cHAAR48eLUhwb8D5IxX460obts8VQ0iLgs8b549ApXVIU7myAs21c5A3Sh999BHcddddBcmfEbvxy6fwl2uX4b//7zvXwd/eCf8w+wf4Y+nvRnSY/2PffvttYJzn0aPBnAUoQ7lSh+ba8X7exopWT7BU5/2i9cUXX8ADDzyQR0zDbb5xHo5cBWdwnuiuwfEC9Koo+KgEuHqiC2sOKDfhjUs1qFw+De3tfIXrww8/hLvvvrsATI3ahU/hTxf+DDef+xd45ZlHwPlJ4ZdP4U//82eA+XX4Y2lUv/k+pyYnTzzxRK6dCOasl7fna1Bp/Q5a3viOFC2/YA2K1v7+PkxNTeUaXK/xXpAnrvoHaL5dKwo+wwmgZqVXcxd37qL17qtVaN26Av/1zMCs6per8K/X/h5e+UdPyPJNw9StF1O03DBuXjoDs506dNeOh3/GMyhYg6J1/fp1eOihh1KDov8B3yB0ZlwnnKDy/lMUfIoqWh988AHcc889edM0YvtqlvUhzC79Ezw9ooeiPvb1119DuVzOtXvDOdufnvRfuEMzrTDBGhQttZFahA07v/oCFGMWobAqCj5Dy8PzNWiUmrnv/b3//vt8f8hRs6ltgFd+f8JdFo7RH/UD0pNPPplrRNGidRMunakBNLeDM60owRoULfWmzFuR1R7NpTOz0Kn39mwAogM2y0Mx8HHxCG7EtwIbmmZROWztvffeg/vuuy+v5rO1O8ai9dVXX8FTTz2VDZ+MT6cSrTjBGhStd999F55+OufJ8c1L4Aqvb1O5IEvEQuADwyJ+841LUGt0oL6d7w8WIloZRzbR46xEK0mwBkXr2rVrMDMzQwQdzq2zNPz3D0KMy7DS3oY8Tz8UAR8FTNhbS+FWg3yXiErU77//fhzRhbNSe1qX4e5/XoaX/qZwncvUoS+//DL3yUjkTEtNUmY7UO+ugXX9+nVb/WqQ9Md/5OGtt96C5557LukRwn8fXhr2GlNBN0r5ntnKHx8XjaKK1jvvvFOgc37p03Rcfz1U5wufeeaZ9IBofCJKtPzj2nr11VdR5Zb9ovXmm2/C888/r7GrKV2pZWCjFH7eKO7fUjYzqnnu+HgdH0wAZ3lYuQync56Jvv3221AqMT3M5GA7nue0Op0OPPvss6OmvZbnIs9p/fV30PK2NRJPxIf15PXXX4cXXnhBSydHcRI/mzr8lSGvJWLe+Phnnf6NeChXYKX+Mpw7nu+ZeP6i5R4mDZ6Ifxr+MDsHLzE+EV8U0QrkbNoT8VGC8tprr8GLL744it5MxDOCTzzNas/v2LFjE5ELnIK8ceNG7nvVGLxGmmnt7OzA3Nwcxv9E2gg+8bTP/ufvJzIvOATd/rf/LXw3rStXrti//fYb/Prrr6D+f/B/UX9f+Mikg4VF4D9u/KWwfZv0jr1y7KXCQzDSTOvy5cuwuLhY+ODy6uDnn38ODz74YF7NF75dwaeYFHHhRUSLIH+4kE8QOsql4IOCybgRF15EtAhSgwv5BKGjXAo+KJiMG3HhRUSLIDW4kE8QOsql4IOCybgRF15EtAhSgwv5BKGjXAo+KJiMG3HhRato7VarAOvrcFLBfdCE6pVTsF4LlmXG2BhnS3ODQfJ3oWptwbzt4RLW1kETZhcANto1KEoRa82QBNxxGRyUGBTRNxdeNIrWLria5UgWHDSrcOXUOgQ1C2NTRDrT9Sk1+SJa6QAWaxIEUuctSS+SneoTrYGZVWBG1esHxia5z4W3SE2+iFbhOZ2EDqbO25xAyS5aSogu7APs7cHe9DRMe4Hs7e3B9PQ0TM0vQa10JcFmHmB1Va2PgjMz/2A+2IXqwhxcvOY2MLPYgI313nLqAJrO+moZ9pUNNKCT41Irfnl4ALvVBZg7DAQay1Ow6YQ/ictDj7vls7C/Wo/g1+Vczd4X6hfBSwGYWdyBjfWT3pI6iGvw33IaXcyanRzR8ogJLgeDy8DDiZZ/yThgs1sFa2sebG95qZ7ZrVqwNW/D+kmVkCXYmu/A+km163MAu80FmNtf9uzdxN+cnoblpXVwTHL8EydaKqY52IFOb7ApYS7V4dpMvkJrEq7BweFgcnEGGjsbUOvxq4QdevwqwZqF0uZZ2Nmoefy6OaGwdHJG5c/qlPeycgVsa74NvnQyGSLLtiZOtIY22Du1oYSJtxncsE7YwA4sqZRolWDzbAfaAxv/eWRPtGiFx9QbkHnODk3iFCZaq1OD3PmxisoF9ferMNVpQ60z/NIzGdM4tDVhonUAzWoHar3X2m4VmqXBTfhkm8OZlTPNgtmteWj3fDrLw1W4eK23OFBrxN7spLc8HFhe5pRJkaIVtXc14XtaAd59nO1WZ+HGUtuptBr166p/Nq5eXHVYhMWz87BU6y0bc0oChs1OjGipZeGF/T3Y25uGaW9DS+1nqf+YhilYWleF3JNtnBWdb4kYTGT1Rp0DaHRgqXbU3cMYmmk5ZwYGfq3MJ3NEtOJxD5tpudsAwefSiVZ/EwJ2mxdgdXMPppdleZhmBEyMaDmg7FahCute0qkZ1RU41d8k92DD2EBvGTAPW/6zTWEzkYE9DHcjvuCi1Y8veGZLlocWZF4eDu5jhuyRphnAk2g7UaKVeRM+sCSwYAsWYW9q6XB/ytms3ofljrfJ3vslsf8rIZPloffjgn8j/mC3CQtzshE/vBHv22R3JtbxG/FqVrY1teEdZnY36YeFcBKlCB8zG9ECABugAq0u/lqpwdI0mFPuGJverM2a24OG2lz1vT0DP3fPLMLO8pR3SkIdE+AjWs4vn3LkIVC6x9kKmGoAbPqPPPiPM7gDL3jkYQZmGsuw0d+72oXqbNSRGPzAnWRLNqLV7XZRF1v4yZR6Wun2bCZ5IITFjt3TEtzMIiCiZRbvQrXGhfy8QBPRygv58XjZjlxueXZ2tpjIS68EAUFgrBHI/hnPWMMzWnAy0xqPN/po7PN9ikveimgR5BgX8glCR7kUfFAwGTfiwouIFkFqcCGfIHSUS8EHBZNxIy68iGgRpAYX8glCR7kUfFAwGTfiwouIFkFqcCGfIHSUS8EHBZNxIy68WOXKit1cOwf3poAo6pwW5gApxiZFVwppGleappAdNtyp8NI0i7ATWZLareJRn/bK0MT0Vx1UjTwJr+3DdPWp2gLUvZpowdpuhsHU2Bwb0WqtlO3K5dPQ3sYLV7hoYUopJ9ioyg43fJ/vaCTEpKtM5I8JBnF4h5am2ZuJ/sC5V3NsMVm0gnW1gr1QnwItwEbG8kXu1xf7yxuHtd38db1MJprmtjLlrea+xLmzut2Wff7IVTiR4TMepwFMKeUEGz1JZRC9iKaykD8uGKQVLfUZz95mePVWp9rD1DTU94NFIsPb8NXYCnxErelTr7DZmrYZXL65myVvTfY8u2hpKbe8BMe2SjB38TD0xR0b5rd6lUt9kKgEuXAM2uslt8RyYpne4W/9djZoq5tGLw/VwLkAx9rzsNX7Tm5mERobbu0xt4JnEINxrLwZfiK+A1OrYZU61DeFN2BpeR9KXmXb0Ppb/bw46XxcPTSjGhKWpLxIsQQU0TKpWWB1WxX7zNUTsL12HN1w2PJQR6WHoWQbLAToVEmY7ZfRxZTpVfarU4cf1jpVFVb3Ybkdc6UXGolwwyTR2p8GmPfKQg+WpZnYmda8DUs3QsSmt1w+duGwHHdCXgRrrbkcDeKalBfu3tiO90F2XNWI3nKRf+0uNjOtcnnFbqbYz1IJECZa2cstDyeWqojgzkx6AhMsuxu+6TpQple9pQcujIiqlJlRq/qPx4tWCfaXfQXvemV3vE3oSRat9ZODZZV9S7pAOeX4vHDzxj9rG/xvb/YWmRfIuypVbX+YgcVGrySOrgzKxw8b0Wp3u3aaXw7DRSu5lLKTSAklmcMGrP/vht+WIctHbzbWL9PrJNbwn5kGXT35eNEaXAIFB8hki5b/MhOvOq2zFeBdXOG7+CQuL4ZmVoPLt97GflRenLqS4vJc95KV1f3lw9Lg+WhO5lbZiFbW0jQ6yy2HD9jeW/EUXBmoTpqltnhmhmMciGjFoxtb5cFXcVTlw4Vj3rJrqBJpdF5468G+8MDgHlfSHlTSvw+Fp2mTnzIpEb4nRrQcLDCllBE2UbMM99ejs7C57711PQJQy8OkK+kRZKY1EdHKIFr9pZ26w3IL5ntbA6FXzIXnhbeL5S0RNwAW/FsMTsJCNTYvYv49tIyziFbaMZLFXsuJeB2b8L0pfal/l6EvLLXxOrcH0zvBzc7wjfhgmd7hewbVrT6+wZAFvYhns4pWKAYE/czLZexMq7dprn6t8JfcDhOLiLzoxeW8BJUf8N3q5HvhBe+fDOZF9EZ8x71kZad3B6e3F7t5lv1lu2xmWm655TKstLfhHHJzi6zcsm+vIbDnFDFdx5XpDSlv7B0xoBq0WUTL+eXL24ej3Hejih3jN0m0XAw24ay/5HaYaCUt4zwsp3eGb/oJLXsdyIvB8s2+8s+xt51jECimDRvRyrqnRQ9/9E/K1L8CjhobF/JHjS/rc3rwGZ+jBlnx1PW8Hl509Sbaj5blIVU3nTNM9WsQNeMQ0aJCntZv1sGRlBe0vR9f71l5MYWMlFs2hbS0IwgIAloQKPRMS0uEOTjh8sbKARqnScEnL+Tj2+XCi4gWQf5wIZ8gdJRLwQcFk3EjLryIaBGkBhfyCUJHuRR8UDAZN+LCi4gWQWpwIZ8gdJRLwQcFk3EjLryIaBGkBhfyCUJHuRR8UDAZN+LCi5RbJkgNLuQThI5yKfigYDJuxIUXq1UBuwIt6Gasp+V8z1UFWPeq1gU/7enhj7ExzpX2BrmQrz1wpEPBBwmUYTMuvFjd9op9pgaQpqZWaI14DeWWDXNE1hwX8skASHAs+OSFfHy7XHjJLlqayi3XTqqC3iHfCS5PweZqr3Z472t6VQFgDi5CAzpeITc1s1uoX+zXzppZ9H0rFvZVf+C7Nc9vYulmXLJxIR8XjX4rwUc/pjo8cuHFWimX7U59G1KsDkMrl+qo9BBakaE0BxdneuLkisvm9DQse+WKFVm9ksU7GzVwtM8RP3+1h5BSIwMf22JKN2MTgwv52Hh02wk+uhHV448LL1ZlpW2vYcs7eNjQlFuOqGGkvu5fnfJmVO79d5tn/VVHo2of+W9lwYnW8H15SXWXwpOFC/l6Uj29F8EnPWYmnuDCi6XuPWx06hkvtkgupZxYbjmqzEjYMm6j7dxe4/yJKU9y+EE1TrS25odLmDgFCJd87SGyhwv5iFBITAQfElgzO+XCi9Xttu1L7k78SPW0tJVbFtHKnHRcHHAZHFzw1NVPLrxkFi0HMEQp5WQb7PIw/mKIQwL9y8OQcriBZad7oYIsD3Wlf7wfLoPDDBrFaYULL1Z7pWzXLp/OdORBxya8q30WBEvgNqF6YR/29qa8UrbhtbiTN+I9UQLvF8WDXWhe2YL9zan+9WKY0s3Y9OJCPjYe3XaCj25E9fjjwouWE/FDdx5eOQXr/U0nF1CMjbvvtQD1i+6lX86xhaUbsOBMrmpwdOg+u0OygkceZmCmcXhBq7v3pWqAz4HjemYRdpxbng/vRMSVbsYlBxfycdHotxJ89GOqwyMXXor97aGaES3MBS831cFOiA+dVVC5kE8EZaJbwScRolwMuPBSKNE62K3CwupFuNa/XdXc7b0iWubGCZfBYQ6RYrTEhRcpt1yMfJFeCAKCABKBQs20kH0uvBmXN1ZeQAo+eSEf3y4XXkS0CPKHC/kEoaNcCj4omIwbceFFRIsgNbiQTxA6yqXgg4LJuBEXXkS0CFKDC/kEoaNcCj4omIwbceFFRIsgNbiQTxA6yqXgg4LJuBEXXiyAit3qrsHxFBCFFgFEHiDFHTJN0ZkCmnIhPy/oBJ+8kB+TjfgyVOy6FtHClFLG2BST0DS9kkE5HoMjDefjYMslb60KVOwTOkRLyi3385YL+XkNNMEnL+TH42WSXbS0llsuJplpeyWDcjwGR1reudtzydvsouUxpavSA3fiVf+5kJ8X1oJPXsiPx8tEm2gNbbB3auDdJtZHCmNTTDrT9UoG5XgMjnSs87fmkreaREtDuWX+nMueFpJDLoMDGc7YmHHhJbNoaSu3PDbUy/IwiUougyMpjnH7dy68WABgK/ArrS76GrGhc1payi2PTwpwIT8vxAWfvJAfj2V75pmWgkE24YPJIINyPAZHMaWFrldc8laLaGFOuWNs6Ogw65kL+WZROWxN8MkL+fF4mci3hwT5I4NyPAYHQWoU2iWXvBXRIkgjLuQThI5yKfigYDJuxIUXKbdsPDWkQUFAEMiCgMy0sqAX8SyXNxZB6CiXgg8KJuNGXHgR0SJIDS7kE4SOcin4oGAybsSFFxEtgtTgQj5B6CiXgg8KJuNGXHgR0SJIDS7kE4SOcin4oGAybsSFFxEtgtTgQj5B6CiXgg8KJuNGXHhxP+OptKC7hi+4HFVu2TjKBW2QC/l08B3AbnUB5mAZ7MFSH5Gle+KfOeyrZ3fRvYZ8ZrEBG+s1OBoajPqQfwHqKFs6NLh45pK3MtMiyCgu5BOEDnCwC9WFVZg6Ow31/XmcaCGe6fV1t2rBKuzAxvpJOAoHsNtcgLnNs9BpDwrXATRnF2B/eQPWTypJU2JXgjnYCe0TCRbMnHLJWxEtgsTiQj5B6HCw24ROqQYnO1WwtnCihXnG7esuVK0tmLfX4WS/82F/53wQC7MLABt+MQv7OwoQmPrkkrciWgQJxoV8gtAPXe7iRetQf6Kfie5rhGiFPSCiFUs5l7y1oFyxW9t6rhAjHQSMnHMhnxRSU6K1W4XZrXloh+ydBePrLRfbQxV1SXFg5JxL3lrtlbI9e/k0tLfPwb1IgGUjPh4oLuQj6R7NzIRoYWZOyqZUh2swA4uNDVivhW/ZjxbkeD3FJW+tbrdtXzpTA2huwzmkaoloiWglDldq0cIIVqCT7qb96v4yYlaWGN1YGjASra79xvkz8OXLIlq6MpEL+briDfVDKVqpBavXQ3eJCBttkAnXMGtc8lZmWgQjlwv5BKHTb8RjBStUNEW04jjnkrdWa6VsVzp1OVyqcQRzIV9jyMOuSGZaaURH/ao4B7DT8c5pqVMQs7CweTZ4DIIUBF7OueStVa6s2M01/Ca8okH2tGRPKxwBJSolqLuH1X1/FmHHd7YqODiSnvEdaehvqg/6n4FGRy35Bo4/OIdW58A7EJ9wep6XwFD0lo1odbtd5zaeNH9EtES00uTLoG3awRG4XyCh4TS2WWIYx2fT8pIXBnK4lAB5LuQThI5ymQ4f9f3gFTgV+X2hv8k0tqiuTpRROl7yg0bKLeeHvbQsCAgCIyAgM60RQEt6hMsbKykOqn8XfKiQzeaXCy8iWtl4Dn2aC/kEoaNcCj4omIwbceFFRIsgNbiQTxA6yqXgg4LJuBEXXkS0CFKDC/kEoaNcCj4omIwbceFFRIsgNbiQTxA6yqXgg4LJuBEXXpzSNCvNNfTH0gpJOacVn09cyKcZFcnlkIfxSX7msK9UtjRocPLKJW+tdqti1xolaEppGm35xYV8bQH7HGHKIQ/ig3mm1wSVLQUW3HxyyVtZHhJkFhfy9YeOK4ccxAf3jNtXKlv9SHD0yCVvRbQIsosL+QShh7gcFppkfFKUUA4VsqjI0vg1g06RWknmpRi9dcstN9fgOLIAoOxpJRPHhfzkSDRYhJRDTsQHXUJZTb6w5ZZT2moInZuLRF4KEpCUWyYgggv5BKEHXUbUvorFB1svS7VEZUsOTDEb4JK3UgSQIH+4kE8Q+qHLGEGJxIdKhNL4JQWl2M655K2zpyXllvUmExfy9Ubt85YgEqH4pBEWKlsyQHg45pK3MtMiyCcu5BOEjlqyDeFDJUJp/JKAwcspl7x197Sk3LLW7OJCvtagHWe4cshBfHDPuH2lstWPBEePXPJWyi0TZBcX8rWHnlgO2W0xgE/iMyOWW070qz169g655K2c0yJINS7kE4SOcpkWnzQllNPYojo7QUZpeckLGhEtAuS5kE8QOsplOnzSlFBOY4vq6kQZpeMlP2ik3HJ+2EvLgoAgMAICMtMaAbSkR7i8sZLioPp3wYcK2Wx+ufAiopWN59CnuZBPEDrKpeCDgsm4ERdeRLQIUoML+QSho1wKPiiYjBtx4UVEiyA1uJBPEDrKpeCDgsm4ERdeRLQIUoML+QSho1wKPiiYjBtx4cUCABugDCvtbXTJZSm3HJ9PXMg3Piq8BgWfvJAfj7y1ut2Wff7Ml/CylFvWlkkyKMdjcGhLCCaOuOSt1aqU7asntmHtOB5ZmWnJoMRny7All8GRJUaOz3LhxSpXWvZ2GsWS23gS85EL+YmBEBkIPkTAZnTLhRer0uraKTVLrhBLSA4u5GfM8ZEfF3xGho70QS68WO1u105RHt4BTZaHsjzMMnq4DI4sMXJ8lgsvcuSBILu4kE8QOsql4IOCybgRF15EtAhSgwv5BKGjXAo+KJiMG3HhRUSLIDW4kE8QOsql4IOCybgRF15EtAhSgwv5BKGjXAo+KJiMG3HhRUSLIDW4kE8QOsql4IOCybgRF15EtAhSgwv5BKGjXAo+KJiMG3HhRUSLIDW4kE8QOsql4IOCybgRF16k3LLx1JAGBQFBIAsCMtPKgl7Es1zeWASho1wKPiiYjBtx4UVEiyA1uJBPEDrKpeCDgsm4ERdeRLQIUoML+QSho1wKPiiYjBtx4UVEiyA1uJBPEDrKpeCDgsm4ERdeRLQIUoML+QSho1wKPiiYjBtx4cUqV1bs5to5SFPpQao8xOcTF/KNjwqvQcEnL+THI2+t1krZbnTqkKYQoIjWeJCf19AR0coL+fHIW7dG/JGrcKK7BtiKyyJa40F+XkNHRCsv5Mcjb+ViC4L8kUE5HoODIDUK7ZJL3rrLQ2jC9jn8rpbMtGRQZhl9XAZHlhg5PsuFF+dii+bacdmI15hlXMjXGHIqV4JPKriMGXPhxWq3KnatUYKm3HuoLTm4kK8t4JSOBJ+UgBky58KL1e227UtnagBNuWFaV25wIV9XvGn9CD5pETNjz4UXES2CfOBCPkHoKJeCDwom40ZceHGWh7ONErRleagtSbiQry3glI4En5SAGTLnwosF5Yrdaq7BcfyPh3LvYUIScSHf0FgYakbwyQv5+Ha58CLfHhLkDxfyCUJHuRR8UDAZN+LCi4gWQWpwIZ8gdJRLwQcFk3EjLrxIuWXjqSENCgKCQBYEZKaVBb2IZ7m8sQhCR7kUfFAwGTfiwouIFkFqcCGfIHSUS8EHBZNxIy68iGgRpAYX8glCR7kUfFAwGTfiwouIFkFqcCGfIHSUS8EHBZNxIy68iGgRpAYX8glCR7kUfFAwGTfiwotVWWnbaynK0igkpTRNfD5xId/4qPAaFHzyQn488tZaKYN9+XRb6mlpzCMZlOMxODSmBAtXXPLW6rZXbLfIA/5yC5lpyaDMMgq5DI4sMXJ8lgsvUiOeILu4kE8QOsql4IOCybgRF1480WpAqS31tHRlCRfydcWb1o/gkxYxM/ZceLFaFbArrTKsiGhpywwu5GsLOKUjwSclYIbMufDy//IWVjpWEtD8AAAAAElFTkSuQmCC"}}]);