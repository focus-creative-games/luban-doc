# 最佳实践

## 命名约定

- table.name 推荐 TbXxxYyy 类风格，便于区别表与普通bean类型
- bean.var.name 推荐 xx_yy_zz风格，生成时自动会根据目标语言，生成合适的变量名，如c#下为XxYyZz；java下为xxYyZz。

## 调整生成的代码的命名约定

默认是按照每个语言的推荐风格生成名称，例如 xxxx_yyyy在c#下是XxxxYyyy。有时候你想调整这个命名风格，
比如说，使用原始形式，你可以通过参数 --naming_convention:bean_member none 来达到这一点。

更多可以参考 [命令行](../manual/commandtools) 中的文档

## 灵活选择xml与excel定义

- 审美要求高的，习惯像protobuf那样手写表定义的，可以完全在xml里完成表定义
- 实用主义，方便策划使用或编辑，可以完全在excel中完成表定义
- 可以适当混用以上两者

如果使用xml定义，建议每个模块对应一个xml文件，并且有独立的模块名，便于管理和查找。

## Luban.Server还是Luban.ClientServer

Luban.Server需要部属，对于新手可能有些麻烦，但优点在于能利用缓存极大缩短生成时间，另外，更新Luban时也不需要大家更新工具了，有条件的项目推荐部属Luban.Server（使用docker部属其实就一行命令，非常简单，参见[命令行](../manual/commandtools)。

中小项目，省事起见，也可以直接用Luban.ClientServer。

## 模块化

强烈建议按模块管理配置，每个模块一个目录，将该模块的所有配置放到该目录下。

定义表与结构时，也推荐加上合适的模块名，如 item.TbItem, item.ItemInfo，而不是空module。

## 导出格式

开发期推荐使用相应语言的json版本，这样不会因为配置格式变动而经常重新发布服务器或者客户端

## 优雅地在excel中配置复杂结构的数据

配合 多行记录 + 多级字段列名 + sep机制(字段sep，及type的sep机制)，灵活选择 列限定模式和流式模式，
简洁地配置出复杂数据。 有困难可以在群里咨询。

## 使用OOP类型继承来定义游戏中复杂的GamePlay数据

灵活使用OOP类型继承来定义技能、BUFF、AI、副本等等复杂的GamePlay数据。视情况选择excel或json数据来填写
这些复杂数据。**千万不要**再用传统的 type + param1,param2,param3这种方式来组合表达复杂数据结构，对策划和程序不友好，而且难以检查错误。

## 使用githooks，在策划提交策划配置前检查数据合法性

参考 [githooks-demo](https://github.com/focus-creative-games/luban_examples/tree/main/githooks-demo)


## 推荐使用 watch 机制，自动监测变更后 重新生成

Luban.Client和Luban.ClientServer提供了watch生成机制。使用参数 -w dir1,dir2,..  ，当相应目录变更时自动重新生成。例如一个示例脚本如下，当定义或者配置目录发生变化时，自动触发重新生成。

```shell
%GEN_CLIENT% -h %LUBAN_SERVER_IP% -j cfg -w %CONF_ROOT%\Datas,%CONF_ROOT%\Defines --^
 -d %DEFINE_FILE%^
 --input_data_dir %CONF_ROOT%\Datas ^
 --output_code_dir TsScripts/src/Gen/Cfg ^
 --output_data_dir Assets\StreamingAssets\ConfigData ^
 --gen_types code_typescript_json,data_json ^
 -s client 
```

## 策划检查配置脚本推荐加上 --generateonly 参数

注意，这个参数是Luban.Client的参数，必须加到 -- 之前。 加上此参数后Luban.Server仍然会生成数据，但Luban.Client不下载生成结果。可以进一步缩短时间。

示例脚本如下

```shell
%LUBAN_CLIENT% -j cfg --generateonly -- ^
 --input_data_dir %DATA_DIR^ ^
 -- ...
 -- ...
```

## refgroup

如果很多字段都ref了相同一批表，可以使用refgroup方便引用。

## 编辑器生成的数据使用json数据格式

编辑器生成的复杂配置数据建议以json数据保存，每个记录点一个文件，放到目录下。将table.input设置为该目录。 luban支持生成记录从json加载和保存的代码，不要自己手写这个序列化！

## 使用tag来标识测试和开发期数据

使用tag来标记那些测试和开发期数据，正式发布时使用 --output:exclude_tags tag1,tag2,... 来过滤这些数据，
不要自己去改它！

## 使用tag unchecked 来标识不校验记录

有些数据批量临时制作，很多引用值都不合法，但暂时未被程序使用，生成时因为ref失败而打印大量警告。可以为这些记录加上 unchecked 标签，luban就不会检查这些数据了。

## datetime

使用datetime来标识时间，注意配合时区参数使用。

## 本地化

- 使用text来标识你要本地化的文本类型，不要像之前那样定义一个本地化key字段！
- 如果导出时便完成本土化，则请使用静态本土化机制
- 如果运行时需要切换语言，请使用动态本土化机制。
