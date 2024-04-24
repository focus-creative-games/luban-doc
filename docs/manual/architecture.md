# 设计哲学

在大多数人的印象中，配置工具的实现应该是非常简单的。事实上，你确实可以用几百行代码就实现一个简单的配置工具，但它仅仅是能用，远远不足以满足实际游戏项目中配置工作流的各种要求。
Luban设计之初的基础目标是满足至少像开放世界MMORPG这样的重度项目的需求，因此它必须要解决大型项目中常见的痛点问题：

- 有一些数据表虽然也在excel中埴写，但它有较复杂的数据格式，需要在excel中优雅配置出这些复杂数据
- 像技能、AI、副本这样的复杂逻辑，并不适合在excel中填写，必须能处理这类非excel族的格式
- 必须能统一对待传统的规范表（excel这种行列表）和非规范表（技能、AI这类），而不是引入多套配置方案
- 配置中有大量类似道具id、资源路径之类的字段，工具需要能够提前检查出数据错误，而不是等到程序运行起来后才发现
- 应该能够直接生成配置结构相关的代码，而是不是让前后端程序员各写一遍解析，这样的工作费时费力又易错
- 应该支持高效的导出格式，同时也应该支持开发期使用json之类易读的导出文件类型
- 生成要快，尽量在秒级完成，而不是要花30秒甚至更久
- 能够跨平台运行，即在windows、linux、macOS上都能工作

概括地说，一个成熟并且能够广泛用于各种类型游戏的配置工具，必须支持丰富的数据源格式，有强大的数据表达能力（这是解析与生成代码、数据的基础），包含丰富的数据校验机制，
能够支持多种常见的游戏语言，能够导出多种数据格式，而且生成要快如闪电。另外，由于不可能完全满足所有项目要求，还要求它设计清晰，方便二次开发，定制出项目独有的配置工具。

## 完备的类型系统

一个非常难以被认知的事实是，**类型系统（数据结构）才是配置工具的核心**。

类型系统对配置工具的重要性，类似于CPU在电脑中的地位。大多数的配置工具只有朴素的类型系统和数据结构（比如只支持表结构）的概念，表头是他们唯一的数据结构，
因而缺乏强大灵活的数据表达能力。这导致它们处理复杂配置格式时力不从心，迫使开发者使用各种奇技淫巧去表达和配置数据。

一个孱弱的配置工具，缺陷的根源在于过早地于xlsx之类的格式耦合。试想一下，如果没有强大的数据表达能力，即使能配置出复杂的数据，
又如何去解析它们呢，意味着配置中出现的复杂数据都将是不可知数据，此时工具能做的，只有将这些数据当作
通用的string或者二进制流数据。没法对他们进行后续处理，无法数据校验（你都不知道它是什么数据类型，校验从何谈起），更无法生成代码，也无法生成高效的数据。

脱离了excel行列约束的规范表限制，有完备的类型系统后，很自然地会发现，支持各种类型源数据格式是顺理成章的事情。因为你要做的不过是根据表定义把数据从这种类型的文件
中解析出来罢了！因此数据源从excel扩展到json、xml、yaml、lua是非常简单的，扩展新的数据源也极其容易。

有强大的类型系统及支持丰富的源数据格式后，大型游戏项目遇到的复杂配置问题也迎刃而解了。再复杂的游戏配置，有了强大的类型系统后也能轻易表达了，进而可以处理这些配置，无论它们
以何种形式保存（复杂配置往往是非excel格式），因为最多不过是新增一种源数据格式罢了。

在完美解决副本、技能、AI之类的复杂数据后，统一游戏中绝大多数模块的配置便是水到渠成的事情。程序员再也不用使用多种方式去管理游戏配置了，代码也变得更加规范、统一和优雅。

在未统一配置前，如果excel表中引用了一个编辑器生成的技能表id，这往往是难以校验的。在统一游戏配置后，游戏类各种配置的数据校验之类工作也可以被统一处理了。

有了统一的数据表达和处理方式后，所有数据都可以共享高效的输出格式了。在此之前，像技能这样以json格式保存的游戏配置，如果想适当地实现数据前后端分组，然后再转成高效的二进制格式是不太可能的，
因为这会消耗大量的程序员开发时间。绝大多数项目无法精细处理这类事情，导致运行时加载json格式数据，这是一个相当大的空间和时间的浪费！

有了统一的数据表达方式后，就能自动生成加载和表达所有配置的代码。程序员也能彻底地从手动配置加载代码这种机械的工作中脱离出来。这种事情太易错、太浪费时间了！

回顾这整个推导过程，你可能会更深入理解这一点：**luban强大能力的核心和源头来自完备的类型系统**。


## DDP管线

我们从多年的大型项目的开发实践中不断总结了配置工具的开发经验，最终抽象出 Data Process Pipeline (DPP)的设计，如下图。


![pipeline](/img/pipeline.jpg)

DPP管线是Luban强大的特性和扩展能力的基础，流程中每部分都可以灵活扩展或者修改，满足项目的各种复杂需求。

- schema处理模块，可以适应各种特殊约定的配置项目，开发者能够按照自身喜好去定制配置工程的使用约定
- 数据加载模块，可以处理各种各样的源数据文件，解析成统一的格式，方便后续阶段处理
- 数据检验模块，支持丰富的数据校验方式，尽可能在配置提交前发现问题
- 代码生成模块，可以支持丰富的代码语言，新增语言支持不影响其他的实现
- 数据生成模块，可以支持丰富输出格式，完美面对各种特殊和高性能场合
- 代码后处理模块，方便实现代码格式化
- 数据后处理模块，方便实现json compact之类的功能
- 输出文件模块，既可以支持传统的文件输出，也可以自定义输出成zip或者输出到数据库


Luban.Core项目包含了Luban的所有核心机制，提供了极其灵活的扩展机制。在此基础上实现的Luban.XXX.Buitin及各种语言或格式的扩展项目，构成了Luban当前丰富的特性。基于Luban.Core，你可以
自定义出与标准Luban完全不同的特性。可以非常自信地说，Luban是当前功能最丰富、扩展能力最强的配置解决方案。即使有完全不同于标准Luban的特性，**Luban也是你实现自定义配置工具最好的起点**。
它提供一个非常通用强大的核心，实现了大量琐碎的功能，你只需要在此基础上不用做太复杂修改，就能做出完美满足你需求的配置解决方案。


## 强化的excel格式支持

尽管Luban支持极其丰富的源数据类型，但实践项目中绝大多数（80%以上）配置是在excel中编辑的。这件事情的根源在于，驱动大多数游戏逻辑的数据是依然规范一致的，进而这些游戏配置以表格形式阅读、编辑和保存是
最合理的。这是数据特性所决定的，非策划喜好所能左右。

大多数的excel表配置确实是非常规范和简单的，但也经常会遇到数据复杂度介于简单表和GamePlay表（如技能）之间的表。例如枚举、列表、结构列表、多态（如Shape这样的结构）及更复杂的嵌套结构。这些表还没复杂
到需要用专用编辑器和json来表达，但确实也给配表设计带来很大困扰。

得益于完备的类型系统，Luban天然可以在Excel配置中任意复杂的数据，所要做的，无非是如何让配置复杂数据的工作变得更直观和简单易用。经过我们的精心设计，基本实现了可以优雅简洁地在excel中配置
中度复杂的数据结构。带来的一个显然的进步是程序员和策划再也不用头疼用各种奇技淫巧和冗余机制去配置数据，他们只要按照游戏逻辑先制定出数据结构，再选择合适的方式去把它配置即可。在实际的项目，绝大多数
时候数据结构与最终的配置方式，都让程序和策划都非常满意。这很大减轻了开发者的心智负担，尤其是带有代码洁癖的开发者！

另一个隐晦的但在实践中能明显发现的进步是由于Luban强大的配置表达能力，策划和程序会逐渐养成先设计优雅的结构，再落地填表的习惯，无形中促使整个项目的配置更加规范和统一。例如像奖励之类结构是公用结构，
Luban支持自定义结构后，各个表中的奖励结构就统一了。而没有这种支持前，经常出现每个表的奖励定义都是任性和随意的，非常丑陋，对程序的开发工作有不小的影响。


## 性能与跨平台

python虽然适合开发这类工具，但自身的低效以及无法很好支持并发，处理大型项目的海量配置数据力不从心。Luban选择使用C#语言开发，基于.net core的跨平台能力和强大的性能，从根源就解决了跨平台和性能的问题。

Luban由于特性众多，本身也是一个中等规模的项目，基于C#这样的强类型语言，代码重构也变得容易很多。