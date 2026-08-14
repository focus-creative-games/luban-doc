/**
 * Luban 4.x 文档侧边栏（中文全面重写后的信息架构）
 * classic 版本文档见 versioned_sidebars，本文件只影响 current。
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '介绍',
      collapsed: false,
      items: [
        'intro',
        'mental-model',
        'how-to-read',
      ],
    },
    {
      type: 'category',
      label: '快速上手',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/guide',
        title: '快速上手',
        description: '程序最短闭环：安装 → 生成 → 加载。',
      },
      items: [
        'guide/install',
        'guide/first-generate',
        'guide/add-table',
        'guide/load-runtime',
        'guide/next-steps',
        'guide/best-practices',
      ],
    },
    {
      type: 'category',
      label: '核心概念',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/concepts',
        title: '核心概念',
        description: '统一术语与工程结构，后续章节共用同一套说法。',
      },
      items: [
        'concepts/glossary',
        'concepts/luban-conf',
        'concepts/pipeline',
        'concepts/groups-targets',
      ],
    },
    {
      type: 'category',
      label: 'Excel 与数据',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/excel',
        title: 'Excel 与数据',
        description: '数据怎么填：表头约定、嵌套结构、非 Excel 源。',
      },
      items: [
        'excel/basics',
        'excel/nested-and-collections',
        'excel/polymorphism',
        'excel/vertical-and-sep',
        'excel/compact',
        'excel/other-sources',
      ],
    },
    {
      type: 'category',
      label: 'Schema 定义',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/schema',
        title: 'Schema 定义',
        description: '结构契约：表、bean、枚举、类型与模块组织。',
      },
      items: [
        'schema/excel-schema',
        'schema/xml-schema',
        'schema/types',
        'schema/type-mapper',
        'schema/polymorphism',
        'schema/import-modules',
      ],
    },
    {
      type: 'category',
      label: '生成与运行时',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/runtime',
        title: '生成与运行时',
        description: '怎么导出、怎么加载、怎么命名。',
      },
      items: [
        'runtime/cli-common',
        'runtime/targets',
        'runtime/loading',
        'runtime/code-style',
      ],
    },
    {
      type: 'category',
      label: '质量与发布',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/quality',
        title: '质量与发布',
        description: '校验、标签过滤、变体与本地化。',
      },
      items: [
        'quality/validators',
        'quality/tags',
        'quality/variants',
        'quality/l10n',
      ],
    },
    {
      type: 'category',
      label: '扩展 Luban',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/extend',
        title: '扩展 Luban',
        description: '二次开发：扩展点、模板、插件项目。',
      },
      items: [
        'extend/overview',
        'extend/templates',
        'extend/plugins',
      ],
    },
    {
      type: 'category',
      label: '策划填表指南',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/designer',
        title: '策划填表指南',
        description: '给策划的独立短章，不必读完整本程序手册。',
      },
      items: [
        'designer/concepts',
        'designer/headers',
        'designer/groups',
        'designer/complex',
        'designer/checklist',
      ],
    },
    {
      type: 'category',
      label: '参考手册',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/reference',
        title: '参考手册',
        description: '查表用：CLI、内置名录、FAQ。',
      },
      items: [
        'reference/cli',
        'reference/builtins',
        'reference/cascading-options',
        'reference/features',
        'reference/faq',
      ],
    },
    {
      type: 'category',
      label: '其他',
      collapsed: true,
      items: [
        'other/changelog',
        'other/roadmap',
      ],
    },
  ],
};

module.exports = sidebars;
