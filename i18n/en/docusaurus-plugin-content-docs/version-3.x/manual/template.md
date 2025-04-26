# custom template

Luban uses the [scriban](https://github.com/scriban/scriban) template engine to generate code, and also uses this template to generate custom text data files.

## Template location in the source project

Due to modularization, generally each sub-project has an independent template directory, rather than being placed in one directory. The location is `{proj}/Templates`, for example `Luban.Csharp/Templates`.
In order to reproduce these module files to the release directory when they are finally released, for each template file, you need to `right-click -> properties`, and set the copy option to `Copy Always` or `Copy if newer`.

## Custom template search path after publishing

After publishing, all template files will be copied to the Templates directory of the output directory. If you need to customize the template, although you can directly modify the template file in the Templates directory, it will overwrite your own implementation every time you update Luban, which is not very convenient. You can use the command line parameter "--customTemplateDir ${templatir}" to specify the preferred search path.

### Code Template Environment Variables

For languages such as cs that require enum, bean, table, and tables to generate different code files separately, a default mechanism is provided for generating templates for each type of object.

enum

| variable name               | description                                      |
| --------------------------- | ------------------------------------------------ |
| __ctx                       | Current GenerationContext variable               |
| __name                      | enum name                                        |
| __namespace                 | Namespace of the enumeration                     |
| __top_module                | The top-level namespace, namely target.TopModule |
| __namespace_with_top_module | Namespace containing topModule                   |
| __full_name_with_top_module | contains the full name of topModule              |
| __enum                      | current enumeration definition object            |
| __this                      | same as __enum                                   |
| __code_style                | current code style                               |

beans

| variable name                  | description                                      |
| ------------------------------ | ------------------------------------------------ |
| __ctx                          | Current GenerationContext variable               |
| __manager_name                 | target.manager value                             |
| __manager_name_with_top_module | target.manager containing topModule              |
| __name                         | structure name                                   |
| __namespace                    | Namespace                                        |
| __top_module                   | The top-level namespace, namely target.TopModule |
| __namespace_with_top_module    | Namespace containing topModule                   |
| __full_name_with_top_module    | contains the full name of topModule              |
| __bean                         | current bean definition object                   |
| __this                         | same as __bean                                   |
| __code_style                   | current code style                               |

table

| variable name                  | description                                      |
| ------------------------------ | ------------------------------------------------ |
| __ctx                          | Current GenerationContext variable               |
| __manager_name                 | target.manager value                             |
| __manager_name_with_top_module | target.manager containing topModule              |
| __name                         | structure name                                   |
| __namespace                    | Namespace                                        |
| __top_module                   | The top-level namespace, namely target.TopModule |
| __namespace_with_top_module    | Namespace containing topModule                   |
| __full_name_with_top_module    | contains the full name of topModule              |
| __table                        | current table definition object                  |
| __this                         | Same as __table                                  |
| __code_style                   | current code style                               |
| __key_type                     | key type of table                                |
| __value_type                   | The value type of the table                      |

tables

| variable name | description                        |
| ------------- | ---------------------------------- |
| __ctx         | Current GenerationContext variable |
| __name        | target.manager value               |
| __namespace   | target.topModule                   |
| __tables      | list of currently exported tables  |
| __this        | Same as __table                    |
| __code_style  | current code style                 |
