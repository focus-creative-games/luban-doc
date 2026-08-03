---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 在运行时加载

本页解决：用生成代码读出配置。推荐形态是 **一个 `Tables` 对象**。

## Unity + JSON（最常见）

1. 在 Unity Package Manager 中安装 Runtime 包 `com.code-philosophy.luban`（Add package from git URL）：
   - GitHub：`https://github.com/focus-creative-games/luban_unity.git`
   - Gitee：`https://gitee.com/focus-creative-games/luban_unity.git`
2. 用匹配的 code/data 生成（Unity 开发期常用 `cs-simple-json` + `json`）。可在配置工程旁放如下脚本（路径按你的仓库结构调整）：

<Tabs groupId="os">
  <TabItem value="windows" label="Windows (bat)" default>

```bat title="gen_client_json.bat"
set WORKSPACE=..\..
set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
    --conf %CONF_ROOT%\luban.conf ^
    -t client ^
    -c cs-simple-json ^
    -d json ^
    -x outputCodeDir=Assets/Gen ^
    -x outputDataDir=Assets/StreamingAssets/json
```

  </TabItem>
  <TabItem value="unix" label="macOS / Linux (sh)">

```bash title="gen_client_json.sh"
#!/bin/bash
WORKSPACE=../..
LUBAN_DLL=$WORKSPACE/Tools/Luban/Luban.dll
CONF_ROOT=$WORKSPACE/DataTables

dotnet $LUBAN_DLL \
    --conf $CONF_ROOT/luban.conf \
    -t client \
    -c cs-simple-json \
    -d json \
    -x outputCodeDir=Assets/Gen \
    -x outputDataDir=Assets/StreamingAssets/json
```

  </TabItem>
</Tabs>

完整可运行示例见 [luban_examples/Projects/Csharp_Unity_json/gen.bat](https://github.com/focus-creative-games/luban_examples/blob/main/Projects/Csharp_Unity_json/gen.bat)。

3. 加载：

```csharp
var tables = new cfg.Tables(file =>
    JSON.Parse(File.ReadAllText($"{jsonDir}/{file}.json")));

var reward = tables.TbReward.Get(1001);
Debug.Log(reward.Name);
```

`cfg` / `Tables` / 表名以你 `luban.conf` 的 `topModule`、`manager` 与表定义为准。

## 要点

| 点 | 说明 |
|----|------|
| 入口 | `new Tables(loader)`，不要每表一套全局静态 |
| loader | 根据文件名返回该表的 JSON（或 bin 的 `ByteBuf`） |
| 访问 | `tables.TbXxx.Get(key)` 或索引器（视生成代码而定） |
| 命名 | Excel 字段 `item_id` 在 C# 里常变成 `ItemId`（可用 codeStyle 调整） |

其他语言示例见 [luban_examples/Projects](https://github.com/focus-creative-games/luban_examples)。非 Unity 可从示例拷贝对应 Runtime。

## 开发 JSON / 发布二进制

同一套加载代码可通过 loader 返回类型区分 JSON 与 bin（生成目标需匹配，如 `cs-bin` + `bin`）。细节见 [运行时加载](../runtime/loading)。

## 常见坑

- codeTarget 与 dataTarget 不匹配（例如代码按 bin 读、数据却是 json）。
- Android 等平台上直接读 StreamingAssets 路径可能失败，需先读入内存再交给 loader。
- 默认生成代码偏同步加载；异步需改模板或自行封装。

## 相关链接

- 下一步：[下一步去哪](./next-steps)
- [生成目标一览](../runtime/targets)
