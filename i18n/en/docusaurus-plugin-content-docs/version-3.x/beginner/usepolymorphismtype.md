# Use Polymorphic types

Not all data structures are standardized and consistent. In complex Gameplay, there are often many types of buff effects, and the fields of each type are different.
If you simply take their union, that is, take a large structure containing all types of fields, the configuration will be very bloated and complicated. Polymorphic types perfectly solve this problem.

## Definition

Let's take Shape as an example. Shape has many subclasses, such as circle, triangle, and rectangle. The definition is as follows:

![item](/img/define_shape.jpg)

When a type has one or more subclasses, it is called a polymorphic type. Each subtype needs to specify the parent attribute, such as the parent of Circle is Shape.

## Fill in polymorphic data

Polymorphic structures support streaming and sep like ordinary structures. When filling in polymorphic data, the first data must be a polymorphic type, such as Circle. Aliases are also supported when filling in polymorphic types, such as `Rectangle`.

![item](/img/use_shape1.jpg)

Supports column-limited format. In this case, you need to use the $type column to specify the polymorphic type:

![item](/img/use_shape2.jpg)

Supports multi-line data:

![item](/img/use_shape3.jpg)
