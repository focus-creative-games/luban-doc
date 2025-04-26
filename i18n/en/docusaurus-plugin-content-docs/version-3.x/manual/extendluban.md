# Extended Luban implementation

After weighing flexibility and simplicity, luban does not use the plug-in mechanism, but adds some extension projects to the source code project to achieve extension.

## Create extension modules

The projects in the source code except `Luban.Core` and `Luban` are extension projects, and developers can refer to them to add extension modules to Luban.
SimpleLauncher will automatically search for modules that contain Luban in the module name, so it is best to include Luban in the extension module name, otherwise you need to use `SimpleLauncher.ScanResigerAssembly` to register a custom extension class.


Taking the creation of the Luban.Demo module as an example, the steps to create an extension module are as follows:

- Create project Luban.Demo
- Reference the Luban.Demo project in the Luban project
- Added a reference to Luban.Core in the Luban.Demo project
- Copy AssemblyInfo.cs from Luban.CSharp project to this directory


## expandable part

- Pipeline
- Schema Collector
- Data Loader
- CodeTarget
- DataTarget
- DataValidator
- CodeStyle
- PostProcessor
- OutputSaver
- TextProvider

## Embed Luban into other C# projects

Sometimes it is necessary to embed Luban in other tools instead of using the Luban command-line tool directly. The embedding operation is as follows:

- Reference the Luban.Core project, it is strongly recommended to also import those Luban.XXX.Builtin projects, because they contain the core default implementation required by Luban
- Initialize the environment using the SimpleLauncher class
- Use DefaultPipeline or custom Pipeline to run the generation pipeline