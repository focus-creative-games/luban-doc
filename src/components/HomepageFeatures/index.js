import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Translate, {translate} from '@docusaurus/Translate';

const texts = [
  // {id:1, title:<Translate>支持丰富的数据格式</Translate>},
  // {id:2, title:<Translate>强大的数据解析和转换能力，将excel(csv,xls,xlsx)、json、bson、xml、yaml、lua、unity ScriptableObject =&gt; binary、json、bson、xml、lua、yaml、erlang、 自定义格式。</Translate>},
  {id:3, title:<Translate>增强的excel格式</Translate>},
  {id:4, title:<Translate>可以简洁地配置出像简单列表、子结构、结构列表，以及任意复杂的深层次的嵌套结构。</Translate>},
  {id:5, title:<Translate>强大的数据校验能力</Translate>},
  {id:6, title:<Translate>支持ref引用检查、path资源路径、range范围检查等等。</Translate>},
  {id:5, title:<Translate>支持众多语言</Translate>},
  {id:6, title:<Translate>支持生成c#、java、go、c++、lua、python、javascript、typescript、erlang、rust、gdscript 代码。</Translate>},

]

const FeatureList = [
  {
    title: texts[0].title,
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
       {texts[1].title}
      </>
    ),
  },
  {
    title: texts[2].title,
    Svg: require('@site/static/img/efficient.svg').default,
    description: (
      <>
        {texts[3].title}
      </>
    ),
  },
  {
    title: texts[4].title,
    Svg: require('@site/static/img/reliable-dark.svg').default,
    description: (
      <>
        {texts[5].title}
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
