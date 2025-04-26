# polymorphic type

## Definition and configuration

See the introduction of polymorphic types in [schema logical structure](../manual/schema).

## Best Practices

- Recommended for occasions with variable types, especially GamePlay data, such as skills, AI, tasks, copies, etc.
- Simple ones can be configured in excel, and more complicated ones, especially for skills that require independent compilation, it is recommended to save data in json format

## code usage

Suppose it is the following polymorphic type

```csharp
public abstract class Shape : BeanBase
{
    // xxxx
}

public class Triangle : Shape
{
    float a;
    float b;
    float c;
}

public class Circle : Shape
{
    float radius;
}

public class Rectangle : Shape
{
    float width;
    float height;
}
```

Suppose there is a field Shape shape in the configuration. In the actual logic code, it must be handled differently according to its actual type. There are three ways of writing. When the number of types is small, all three methods can be selected according to personal preference. When the number of types is large, it is recommended to follow method 3, which is more efficient.

### method 1

```csharp
    if (shape is Circle c)
    {
        // xxx
    }
    else if(shape is Triangle t)
    {
        // xxx
    }
    else if(shape is Rectangle r)
    {
        // xxx
    }

```

### method 2

```csharp
switch(shape)
{
    case Circle c:
    {
        // xxx;
        break;
    }
    case Triangle t:
    {
        // xxx
        break;
    }
    case Rectangle r:
    {
        // xxx;
        break;
    }
}
```

### method 3

```csharp
switch(shape.GetTypeId())
{
    case Circle::__ID__:
    {
        Circle c = (Circle)shape;
        // xxx;
        break;
    }
    case Triangle::__ID__:
    {
        Triangle t = (Triangle)shape;
        // xxx
        break;
    }
    case Rectangle::__ID__:
    {
        Rectangle r = (Rectangle)shape;
        // xxx;
        break;
    }
}
```
