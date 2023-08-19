# 与classic版本差异

当前版本相比于classic版本极大简化了代码实现，更方便定制。因此代码调整极大，但使用差别不大。
当前版本的数据配置格式、生成的代码格式、生成的数据格式与classic版本基本相同，在本地化方面实现差别较大。

## 移除了不必要的模块

- 移除 Proto和DB生成，除去大量不必要的抽象
- 移除云生成，极大简化了代码

## excel格式调整

excel A1单元以`##`开头则第一行会被当作注释行，而旧版本则被兼容当作是字段名定义行。

## 命令行参数调整

变化极大。为了方便定制，新版本支持自定义参数。

## 类型系统调整

- 移除了vector2、vector3、vector4类型，改由开发者配合type mapper实现
- text不再包含key和value两个字段，只包含key。旧版本中text是独立类型，新版本中text是`string#text=1`的语法糖

## 定义调整

- enum、bean支持group参数
- table的read_from_file属性调整为readSchemaFromFile
- 移除externaltype类型，改为typeMapper，并且直接在enum与bean的子元素中定义


## 支持真正意义的多代码或者数据target

允许使用 `-c target1 -c target2 ...`或`-d target1 -d target2 ...` 一次生成多个代码和数据目标。因为新版本的层级参数机制，
使得可以为每个target指定输出目录。

## 移除了少量语言

不再内置提供gdscript和erlang支持，由使用者自己实现。

## 更强大的管线及定制能力

可以在不影响Luban原始代码的情况下对管线及几乎所有模块进行单独定制和调整。

