export type ProcessStep = {
  title: string;
  text: string;
};

export type Outcome = {
  value: string;
  label: string;
};

export type Award = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  categories: string[];
  year: string;
  host: string;
  role: string;
  skills: string[];
  /** 封面图（public/images 下，Pexels 免费图库 · 黑白处理） */
  cover: string;
  /** 详情页双图 */
  gallery: [string, string];
  intro: string[];
  goals: string[];
  process: ProcessStep[];
  outcomes: Outcome[];
};

export const awards: Award[] = [
  {
    slug: "provincial-skills-2026",
    number: "01",
    title: "省赛二等奖",
    subtitle: "浙江省技工院校学生技能竞赛 · 电子技术项目",
    categories: ["电子技术", "省级竞赛", "二等奖"],
    year: "2026",
    host: "浙江省技工院校学生技能竞赛",
    role: "电子技术项目参赛选手",
    skills: ["整机装配", "电路调试", "故障检测"],
    cover: "images/award-01.webp",
    gallery: ["images/award-01-a.webp", "images/award-01-b.webp"],
    intro: [
      "浙江省技工院校学生技能竞赛是省内技工院校系统规格最高的学生技能赛事之一，电子技术项目全面考察选手的电路装接、焊接工艺、功能调试与故障排查能力，须在限定时间内独立完成。",
      "这是我目前参加的最高级别赛事。凭借扎实的装配调试基本功和稳定的临场发挥，最终获得电子技术项目二等奖，也是我「以赛促学」路上的最新一站。",
    ],
    goals: [
      "在限定时间内完成符合工艺规范的电路装接与调试",
      "焊接质量、布局规范与功能指标同时达标",
      "在高压赛场上保持稳定、零失误的发挥",
    ],
    process: [
      {
        title: "基础工艺强化",
        text: "围绕焊接工艺与装配规范做高强度训练，反复打磨直插与贴片元件的手工焊接质量，把每一个动作固化成肌肉记忆。",
      },
      {
        title: "整机联调训练",
        text: "按竞赛题型做整机装配与联调的完整流程演练，从元器件检测、装配焊接到通电调试、故障定位，全程计时复盘。",
      },
      {
        title: "模拟实战",
        text: "参加赛前多轮模拟赛，适应陌生设备与限时节奏，针对弱项专项补强，把失误率压到最低。",
      },
    ],
    outcomes: [
      { value: "二等奖", label: "竞赛成绩" },
      { value: "省级", label: "赛事级别" },
      { value: "2026", label: "获奖年份" },
    ],
  },
  {
    slug: "haining-skills-2024",
    number: "02",
    title: "市技能节一等奖",
    subtitle: "海宁市中等职业学校技能节 · 电子产品装配与调试赛项",
    categories: ["装配与调试", "市级竞赛", "一等奖"],
    year: "2024",
    host: "海宁市教育局",
    role: "装配与调试赛项参赛选手",
    skills: ["元器件安装", "整机焊接", "通电调试"],
    cover: "images/award-02.webp",
    gallery: ["images/award-02-a.webp", "images/award-02-b.webp"],
    intro: [
      "海宁市中等职业学校技能节是全市中职学校同台竞技的年度赛事，电子产品装配与调试赛项要求选手按工艺文件独立完成整机装配：元器件检测、安装焊接、整板检测与功能调试一气呵成。",
      "凭借平时在实训课上积累的规范操作，我以稳定的焊接质量和一次通电成功的调试结果拿下赛项一等奖——这是我在装配调试方向的第一块市级金牌。",
    ],
    goals: [
      "严格按工艺文件完成整机装配，不走捷径",
      "焊点质量与安装规范经得起逐项检验",
      "调试环节一次通电成功、功能全部达标",
    ],
    process: [
      {
        title: "读图与备料",
        text: "赛前反复练习电路原理图与装配图的对照读图，训练快速识别元器件、核对规格与预处理引脚的基本功。",
      },
      {
        title: "装配与焊接",
        text: "按先低后高、先里后外的顺序完成安装与焊接，控制烙铁温度与焊接时间，保证焊点光亮饱满、无虚焊连焊。",
      },
      {
        title: "检测与调试",
        text: "装配完成后先做外观与在路检查，再分级通电调试，用万用表逐级核对电压与信号，确保功能全部实现。",
      },
    ],
    outcomes: [
      { value: "一等奖", label: "赛项成绩" },
      { value: "市级", label: "赛事级别" },
      { value: "2024", label: "获奖年份" },
    ],
  },
  {
    slug: "jiaxing-skills-2025",
    number: "03",
    title: "市技能节三等奖",
    subtitle: "嘉兴市第十九届中等职业学校技能节 · 电子产品设计与应用竞赛（团体）",
    categories: ["产品设计", "团体项目", "三等奖"],
    year: "2025",
    host: "嘉兴市教育局 · 嘉兴市人力资源和社会保障局",
    role: "团体项目成员",
    skills: ["方案设计", "电路搭建", "协作完成"],
    cover: "images/award-03.webp",
    gallery: ["images/award-03-a.webp", "images/award-03-b.webp"],
    intro: [
      "嘉兴市中等职业学校技能节由嘉兴市教育局与市人力资源和社会保障局联合主办，电子产品设计与应用竞赛以团体形式进行，从方案设计、电路搭建到功能演示需要成员密切协作完成。",
      "作为团体项目成员，我主要负责电路部分的搭建与调试。这次比赛让我第一次完整经历「从设计图纸到可运行实物」的全过程，也让我体会到团队分工与沟通的重要性。",
    ],
    goals: [
      "在规定时间内完成作品的设计、搭建与联调",
      "电路搭建规范可靠，功能演示一次成功",
      "团队分工清晰，配合顺畅",
    ],
    process: [
      {
        title: "方案讨论",
        text: "与队友一起拆解赛题要求，确定作品的功能框架与电路方案，明确每个人的分工与时间节点。",
      },
      {
        title: "电路搭建",
        text: "负责按方案搭建电路并完成焊接与接线，边搭边测，把问题解决在联调之前。",
      },
      {
        title: "联调与演示",
        text: "与队友一起完成整机联调，针对演示环节反复排练，确保作品在评审现场稳定运行。",
      },
    ],
    outcomes: [
      { value: "三等奖", label: "团体成绩" },
      { value: "地市级", label: "赛事级别" },
      { value: "2025", label: "获奖年份" },
    ],
  },
  {
    slug: "innovation-2024",
    number: "04",
    title: "科技创新一等奖",
    subtitle: "海宁市青少年科技创新大赛 ·《一种电磁力拖把》",
    categories: ["小发明", "团体项目", "一等奖"],
    year: "2024",
    host: "海宁市教育局",
    role: "团体项目成员（三人组队）",
    skills: ["创意构思", "结构制作", "功能验证"],
    cover: "images/award-04.webp",
    gallery: ["images/award-04-a.webp", "images/award-04-b.webp"],
    intro: [
      "海宁市青少年科技创新大赛创新成果（小发明）评比鼓励学生从生活中发现问题、动手解决。我们三人小组的作品《一种电磁力拖把》尝试把课堂上学的电磁知识用到日常清洁工具上。",
      "从问题构思、方案画图到制作验证，我们分工协作完成了这件小发明，最终获得创新成果（小发明）一等奖。它让我第一次尝到「把课本知识变成手里实物」的成就感，也体会到小团队协作的力量。",
    ],
    goals: [
      "把电磁原理转化为可实际使用的生活工具",
      "结构与电路足够简单可靠，成本可控",
      "完成从草图到实物的完整制作验证",
    ],
    process: [
      {
        title: "发现问题",
        text: "从日常清洁的痛点出发提出设想：能否借助电磁力改善拖把的清洁方式，让拖地更省力、更干净。",
      },
      {
        title: "方案设计",
        text: "三人分头查阅资料、请教老师，一起讨论确定结构与电路草图，反复推敲电磁部件的布置与供电方案。",
      },
      {
        title: "制作验证",
        text: "分工完成样机制作与功能验证，边测边改，根据实测效果调整细节，直至达到设计预期。",
      },
    ],
    outcomes: [
      { value: "一等奖", label: "创新成果（小发明）" },
      { value: "三人组队", label: "完成方式" },
      { value: "2024", label: "获奖年份" },
    ],
  },
];

export function getAward(slug: string): Award | undefined {
  return awards.find((a) => a.slug === slug);
}

export function getNextAward(slug: string): Award {
  const idx = awards.findIndex((a) => a.slug === slug);
  return awards[(idx + 1) % awards.length];
}
