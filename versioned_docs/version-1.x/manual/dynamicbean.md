# 多态类型

## 定义及配置

参见 [配置定义](../manual/define) 中关于多态类型的介绍

## 最佳实践

- 推荐用于 类型多变的场合，尤其是 GamePlay数据，比如技能、AI、任务、副本等等
- 简单的可以在excel配置，更复杂，尤其是技能这种需要独立编译的，推荐以json格式保存数据

## 代码使用

假设是如下多态类型

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

假设配置中 有个字段  Shape shape。 实际逻辑代码中，肯定是要根据它的实际类型来不同处理的，
有三种写法。 当类型数量很少时，这三种方法都可以，按个人喜好选择。当类型数量较多时，推荐按照方法3的办法，更为高效。

### 方法1

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

### 方法2

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

### 方法3

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
