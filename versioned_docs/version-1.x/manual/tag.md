# tag 介绍

## 关于Tag

luban支持记录级别的tag标记，每个数据可以有0到多个tag。 tag可用标识记录为注释，或者过滤导出，或者指示检验器不检查此记录。

## tag格式介绍

不同文件格式下，记录tag的填写方式如下，也可以参考 [luban_examples](https://gitee.com/focus-creative-games/luban_examples)/DataTables/Data/tag_datas目录下的示例。

- excel格式。 在记录第一列填写tag。

|##var|id|name|
|-|-|-|
|##type|int|string|
||1|xxx|
|dev|2|xxx|
|debug|3|yyy|
|unchecked|4|zzz|
|dev,main|5|aaa|
|dev,unchecked|6|bbb|

- 其它格式，在字段 \_\_tag__中填写tag。

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"
::: tab JSON 
```json
{
  "__tag__": "dev",
  "id":1,
  "name":"xxx"
}
```
:::
::: tab lua格式
```lua
return {
  __tag__ = "dev",
  id = 1,
  name = "xxx",
}
```
:::
::: tab xml格式
```xml
<data>
  <__tag__>dev</__tag__>
  <id>1</id>
  <name>xxx</name>
</data>
```
:::
::: tab yaml格式
```yaml
__tag__ : dev
id : 1
name : xxx
```
:::

::::

## 特殊的tag名

有一些特殊的tag名被用于特殊意义。

- ##。 表示此记录被注释，永远不会导出
- unchecked。 表示校验器不检查此记录

## 记录过滤导出

有几种场合会用到过滤导出

- 有些记录仅用于内部测试，不希望对外正式发布时导出
- 有些记录希望测试和发布有不同版本
- 一些简单多版本管理，比如某个记录只在某个版本或者分支才导出

通过luban.client的命令行选项 -—output:exclude_tags tag1,tag2,... ，包含参数中指定的任意一个tag的记录都不会导出，以下为使用示例。

|##var| id | name |  |
| - | - | - | - |
| ##type | int | string |  |
| ## | id | desc1| 注释 |
| | 1 | item1 | 永远导出 |
|##| 2 | item2 | 永远不导出 |
|test| 4 | item4 | -—output:exclude_tags test 时不导出 |
|TEST| 5 | item5 | -—output:exclude_tags test 时不导出 |
|dev |6 | item6 | -—output:exclude_tags dev 时不导出 |
| | 7|item7| 永远导出 |
