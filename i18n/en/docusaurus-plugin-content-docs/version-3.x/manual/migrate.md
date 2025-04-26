# Differences from the classic version

Compared with the classic version, the current version greatly simplifies the code implementation and is more convenient for customization. So the code adjustment is huge, but the usage difference is not huge.
The data configuration format, generated code format, and generated data format of the current version are basically the same as those of the classic version, but there is a big difference in localization.

## Remove unnecessary modules

- Removed Proto and DB generation, removing a lot of unnecessary abstractions
- Remove cloud generation, greatly simplify the code

## excel format adjustment

Excel A1 unit starts with `##`, the first line will be treated as a comment line, while the old version is compatible as a field name definition line.

## Command line parameter adjustment

Great changes. In order to facilitate customization, the new version supports custom parameters.

## Type system tweaks

- Removed the vector2, vector3, and vector4 types, and implemented them by the developer with the type mapper
- text no longer contains key and value fields, but only key. In the old version, text is an independent type, and in the new version, text is the syntactic sugar of `string#text=1`

## Define adjustments

- enum and bean support group parameters
- The read_from_file attribute of table is adjusted to readSchemaFromFile
- Remove the externaltype type, change it to typeMapper, and define it directly in the sub-elements of enum and bean


## Support real multi-code or data target

Allows generating multiple code and data targets at once using `-c target1 -c target2 ...` or `-d target1 -d target2 ...`. Because of the hierarchical parameter mechanism of the new version, it is possible to specify the output directory for each target.

## Removed few languages

Erlang support is no longer built-in and implemented by users themselves.

## More powerful pipeline and customization capabilities

The pipeline and almost all modules can be individually customized and tweaked without affecting the original Luban code.
