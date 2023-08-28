# type system

Luban has a complete type system, especially **bean supports type inheritance and polymorphism**, so that Luban can easily express any complex data structure.

## basic type

| Type     | Description                                                  |
| -------- | ------------------------------------------------------------ |
| bool     | Bool type, `true, false, 0, 1` can all be recognized, case insensitive, such as `True, TRUE` are also valid values |
| byte     | corresponding to the byte of c# (uint8_t)                    |
| short    | corresponding to c# short (int16_t)                          |
| int      | corresponding to c# int (int32_t)                            |
| long     | corresponding to c#'s long (int64_t)                         |
| float    | corresponds to the float of c#                               |
| double   | corresponds to the double of c#                              |
| string   | string corresponding to c#                                   |
| text     | text is a syntactic sugar type, not an independent type. Equivalent to `string#text=1`, that is, the string type containing tag `text=1`. Luban will verify the validity of the localization key for this type of data |
| datetime | The type is long in c#, and the value is the number of seconds since UTC 1970-01-01 00:00:00 |

## Custom Type

See [schema logical structure](./schema) for detailed design of custom structures.

| Type | Description                                                  |
| ---- | ------------------------------------------------------------ |
| enum | Enumeration class, corresponding to enum of c#               |
| bean | Composite type, corresponding to class or struct of c#. beans support **type inheritance and polymorphism** |

## container type

| Type  | Description                                                  |
| ----- | ------------------------------------------------------------ |
| array | Corresponding to the array of c#, the definition method is `array,<eleType>`, and eleType cannot be a nullable type |
| list  | Corresponding to the List of c#, the definition method is `list,<eleType>`, and eleType cannot be a nullable type |
| set   | Corresponding to the HashSet of c#, the definition method is `set,<eleType>`, and eleType cannot be a nullable type |
| map   | Corresponds to the Dictionary of c#, defined as `map,<keyType>,<valueType>`. keyType can only be basic type or enum type, neither keyType nor valueType can be nullable |

## Nullable types

Both basic types and custom types support nullable types, container types do not support nullable types, and container key or value types do not support nullable types. The definition method is `<type>?` (such as `int?`, `Color?`, which is the same syntax as c#.

## type mapping

Supports mapping custom types to external ready-made types, such as mapping MyAccessMode enumeration class to System.IO.AccessMode type; mapping MyVec3 type to UnityEngine.Vector3 type.
All custom types in the generated code will be mapped to external types, which is more convenient to use.

## special type table

When generating code for most languages, a class will be generated for each table to manage all the data in this table.

## special type tables

When generating code for most languages, a management class for all tables is included, and the class name is defined in the target.TopModule field of the global schema. Generally named Tables.
