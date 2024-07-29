# 自动导入table

每新增一个表都在__tables__.xlsx中添加一项，这个工作比较烦琐。大多数情况下，每个excel对应一个表，让工具自动添加表定义是可能的。

自v3.0.0版本起，支持自动table导入。luban会按照指定的规则扫描excel文件，自动添加对应的table。

自动导入支持自定义导入规则，具体请查阅文档[自动导入table](../manual/importtable.md)。

## 创建自动导入的table

将[快速上手](./quickstart)中创建的reward.xlsx复制为`#Reward2.xlsx`文件，**不需要**修改\_\_tables\_\_.xlsx。重新生成，你会发现新增了TbReward2表，表记录类型的Reward2。

对于常见情况，这种加表方式非常方便。

## 默认导入规则

默认将扫描配置目录（luban.conf中dataDir字段）下（包含子目录）所有文件名以#开头的excel族（xls、xlsx、xlm、csv）文件，如 `#Item.xlsx`、`reward/#Reward.xlsx`。
以文件名除去开头的'#'字符及文件后缀后的字符串作为表的value_type，在value_type名上新增Tb作为表的full_name，如果excel文件在子目录下，则会将子目录作为命名空间。举例如下：

- `#Item.xlsx` 生成 full_name为TbItem，value_type为Item，mode=map的表
- `reward/#Reward.xlsx`生成full_name为reward.TbReward，value_type为reward.Reward，mode=map的表
- `item/equip/#Equip.csv`生成full_name为item.equip.TbEquip，value_type为item.equip.Equip，mode=map的表
- `#item.Item.xlsx`生成 full_name为 item.TbItem，value_type为item.Item，mode=map的表

