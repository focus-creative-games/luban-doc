# Hierarchical parameter mechanism

Most of Luban's built-in templates use the [Cascading Option](./cascadingoption) mechanism, which reduces the module name step by step until the option is found.


## Parameter name rules

Parameter names support namespaces, similar to the namespaces of csharp code. Take the 'a.b.c.key' parameter as an example, its namespace is 'a.b.c', and the base name is 'key'.


## Hierarchical search rules

To find the parameter '{m1}.{m2}...{mk}.{n1}', the complete parameter will be searched first, if it is not found, then delete the lowest namespace in turn until it is found. Taking 'a.b.c.key' as an example,
Look up option values in the following order:

- a.b.c.key
- a.b.key
- a.key
- key


## Meaning of hierarchical search rules

Some parameters of Luban support multiple targets, such as `--codeTarget` and `--dataTarget`. In most cases, only one such target will be included in the command line, but sometimes you may want to generate multiple at a time. If there is only one common `outputCodeDir` and `outputDataDir`, the builds will overwrite each other.

The level parameter better solves this problem. Take code target as an example, if there is only one target, simply use `-x outputCodeDir=xxx`, and there is no need to modify the option key value when changing the target.
If there are multiple targets, if you need to generate cs-bin and java-bin at the same time, you only need `-x cs-bin.outputCodeDir=cs_path` and `-x java-bin.outputCodeDir=java_path` to generate them respectively Specify parameters.

## Modules using hierarchy parameters

Most configurable modules use the mechanism of hierarchical parameters, such as code target, data target, output saver and other modules.
