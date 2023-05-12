![icon](../img/luban/icon.png)

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/focus-creative-games/luban.svg?style=flat-square&branch=main)](https://travis-ci.com/focus-creative -games/luban) ![Docker Auto](https://img.shields.io/docker/cloud/automated/hugebug4ever/luban.svg?style=flat-square) ![Docker Build](https://img .shields.io/docker/cloud/build/hugebug4ever/luban.svg?style=flat-square) ![star](https://img.shields.io/github/stars/focus-creative-games/luban? style=flat-square)


## introduce

luban is your **best game configuration solution**. Luban efficiently processes data such as excel, json, and xml common in game development, checks data errors, generates codes in various languages such as c#, and exports them into various formats such as bytes or json.
luban unifies the game configuration development workflow, greatly improving the efficiency of planning and programming.

## Core features

- Powerful data analysis and conversion capabilities {excel(csv,xls,xlsx), json, bson, xml, yaml, lua, unity ScriptableObject} => {binary, json, bson, xml, lua, yaml, erlang, custom format }
- Enhanced excel format, which can succinctly configure simple lists, substructures, structured lists, and arbitrarily complex deep nested structures.
- Complete type system, **Support OOP type inheritance**, with data in excel, json, lua, xml and other formats **Flexible and elegant** Express complex GamePlay data such as behavior trees, skills, plots, and copies
- Supports generating c#, java, go, c++, lua, python, javascript, typescript, erlang, rust, gdscript code
- Support generating protobuf(schema + binary + json), flatbuffers(schema + json), msgpack(binary)
- Powerful data verification capability. ref reference check, path resource path, range range check, etc.
- Perfect localization support. Static text value localization, dynamic text value localization, time localization, main-patch multi-region version
- Powerful and flexible customization capabilities, support for custom code templates and data templates
- **Universal generation and caching tool**. It can also be used to generate code such as protocols, databases, and even as an object caching service
- **Good support for mainstream engines, all platforms, mainstream hot update solutions, and mainstream front-end and back-end frameworks**. Supports mainstream engines such as Unity, Unreal, Cocos2x, Godot, and WeChat games. The tool itself is cross-platform and can work well on Win, Linux, and Mac platforms.

See [feature](/basic/traits.md) for full features


## license

Luban is licensed under the [MIT](https://github.com/focus-creative-games/luban/blob/main/LICENSE) license