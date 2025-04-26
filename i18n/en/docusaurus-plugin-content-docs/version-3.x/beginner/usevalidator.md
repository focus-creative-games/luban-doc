# Use Data Validator

In practice, we often encounter a field that needs to be verified for legality. For example, the item_id field must have a valid item table id. Luban supports comprehensive data validation.

For detailed documentation, see [Data Validator](../manual/validator).

## Common data validators

Luban supports many data validators, the most commonly used are two:

- ref reference validation

- path path validation

## ref reference

Format: `{type}#ref={target}`. target supports the following targets:

- Table with mode=map. In this case, target fills in the table name, such as `ref=item.TbItem`
- Table with mode=list. This table is required to have at least one or more primary keys. In this case, target must specify which primary key it is, such as `ref=index1@test.TbMultiKey`
- Table with mode=one. Since the singleton table has only one record, a member field of map type must be specified, such as `ref=items@test.TbTestSingleton`

type can appear in any position, but it must be a simple data type (i.e. int, string, enumeration, etc.). For example, the following are all legal:

- `int#ref=item.TbItem` requires that this int type data must be a valid item.TbItem table id

- `list,(int#ref=item.TbItem)` requires that each element of the list must be a valid item.TbItem table id

- `map,(int#ref=item.TbItem),(string#ref=test.TbString)` requires that each key of the map must be a valid item.TbItem table id, and each value must have a valid test.TbString table id

![item](/img/use_ref.jpg)

## path validation

Please refer to the [data validator](../manual/validator) document by yourself.
