# 源数据转换
Luban支持对各种格式的数据进行转换，使用命令行参数：
- convert_json 将源数据全部转换为json源数据格式
- convert_lua 将源数据全部转换为lua源数据格式，每个记录占一个文件
- convert_xlsx 将源数据全部转换为xlsx格式，每个表占一个文件

注意，luban可以在支持的数据格式之间任意进行格式转换，这是Luban的通用功能，只需要正确定义和设置参数，更加完整功能见luban_example中Projects目录下的更多实例项目。

以luban_example中Projects/ConvertDatas目录下几个项目为例。

### 转换为json
你的生成命令如下大略如下：

     %GEN_CLIENT% -h %LUBAN_SERVER_IP% -j cfg --^
     -d %CONF_ROOT%\Defines\__root__.xml ^
     --input_data_dir %CONF_ROOT%\Datas ^
     --output_data_dir convert_json ^
     --gen_types convert_json ^
     -s all
即--gen_types参数取"convert_json"，将Datas中的数据转换为json格式，输出目录为convert_json。

### 转换为lua
你的命令行为：

     %GEN_CLIENT% -h %LUBAN_SERVER_IP% -j cfg --^
     -d %CONF_ROOT%\Defines\__root__.xml ^
     --input_data_dir %CONF_ROOT%\Datas ^
     --output_data_dir convert_lua ^
     --gen_types convert_lua ^
     -s all
即--gen_types参数取"convert_lua"，将指定数据转换为lua格式，输出目录为convert_lua。

### 转换为xlsx
实例中将json格式转化为xlsx，命令行为：

     %GEN_CLIENT% -h %LUBAN_SERVER_IP% -j cfg --^
     -d %CONF_ROOT%\Defines\__root__.xml ^
     --input_data_dir %CONF_ROOT%\Datas ^
     --input:convert:data_dir convert_json ^
     --output_data_dir conver_json_to_xlsx ^
     --gen_types convert_xlsx ^
     -s all

--gen_types参数取"convert_xlsx"，数据源目录为convert_json，将指定数据转换为xlsx格式，输出目录为convert_json_to_xlsx。  
需要注意：转换后的xlsx格式可能不符合Luban配置要求，如何再需要使用Luban导出，则需要修改格式。