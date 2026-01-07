(function () {
  const header = document.querySelector('.home-header');
  const nav = document.querySelector('.home-nav');
  const toggle = document.querySelector('.nav-toggle');

  const body = document.body;

  if (!header || !nav || !toggle || !body) {
    return;
  }

  body.classList.add('nav-enhanced');

  const setExpandedState = (isOpen) => {
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    nav.classList.toggle('is-open', isOpen);
    nav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  };

  const closeNav = () => setExpandedState(false);

  setExpandedState(false);

  if (window.innerWidth > 640) {
    setExpandedState(true);
  }

  toggle.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('is-open');
    setExpandedState(willOpen);
  });

  nav.addEventListener('click', (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.tagName === 'A' &&
      window.innerWidth <= 640
    ) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      setExpandedState(true);
    } else {
      closeNav();
    }
  });
})();

(function () {
  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.projects': 'Works',
      'nav.github': 'GitHub',
      'nav.contact': 'Contact',
      'nav.toggle': 'Toggle navigation',
      'language.label': 'Select language',
      'language.english': 'EN',
      'language.chinese': '中文',
      'hero.tagline': 'Exploring ideas in code, design, and data',
      'hero.title': 'Digital & Intelligent Panorama Solutions',
      'hero.lead':
        'Navigate a digital-and-intelligent panorama to explore the architectures, AI applications, and products that empower business growth.',
      'hero.cta': 'Discover more',
      'hero.scroll': 'Scroll to about section',
      'about.title': 'About Hao',
      'about.paragraph1':
        'I’m a builder who loves transforming complex ideas into delightful digital experiences. From backend services to interactive data visualizations, I enjoy navigating the entire stack and delivering work that feels both meaningful and elegant.',
      'about.paragraph2':
        'When I’m not experimenting with new technologies, you can find me capturing the night sky through astrophotography or exploring the latest trends in human–computer interaction.',
      'info.focus.title': 'Current Focus',
      'info.focus.item1': 'Enterprise architecture design',
      'info.focus.item2': 'High-availability, high-concurrency application delivery',
      'info.focus.item3': 'Technology architecture governance',
      'info.focus.item4': 'Big data & AI industry enablement',
      'info.focus.item5': 'AI-assisted programming',
      'info.focus.item6': 'Content creation systems',
      'info.focus.item7': 'SMB management & governance',
      'info.work.title': 'Selected Work',
      'info.work.item1': 'Enterprise platforms for booking, finance, and asset workflows',
      'info.work.item2': 'Data-driven decision dashboards and policy monitoring',
      'info.work.item3': 'Productized tools for documentation, evaluation, and knowledge management',
      'info.connect.title': 'Let’s Connect',
      'info.connect.item1': 'hao.jin@live.cn',
      'info.connect.item2': '@haojinhj on Twitter',
      'info.connect.item3': 'www.haoj.in',
      'projects.eyebrow': 'Projects',
      'projects.title': 'Explore My Recent Work',
      'projects.description':
        'A snapshot of experiments, tools, and platforms I’m building to make product thinking, automation, and storytelling more tangible.',
      'projects.pmUniverse.description':
        'A constellation of product management resources that visualizes frameworks, case studies, and tactics for easier exploration.',
      'projects.pmUniverse.demo': 'Demo',
      'projects.signx.description':
        'A minimalist e-signature workflow focused on privacy, speed, and clarity for teams that need agreements without the friction.',
      'projects.localBookshelf.description':
        'A personal knowledge library that syncs local reading notes with the cloud while keeping discovery fast and delightful.',
      'projects.policyMonitor.description':
        'Automated policy tracking that watches regulatory updates and surfaces alerts tailored to the teams who need to react.',
      'projects.evaluationSystem.description':
        'A scoring and reporting engine that simplifies performance reviews with transparent rubrics and actionable insights.',
      'projects.mermaidEditor.description':
        'An interactive editor for crafting Mermaid diagrams with instant previews and sharing-friendly exports.',
      'playground.eyebrow': 'Playground',
      'playground.title': 'Interactive Experiences',
      'playground.description': 'Two purely front-end micro universes—click to feel their rhythm and moods.',
      'playground.cosmic.subtitle': 'Casual Ping Pong Arcade',
      'playground.cosmic.title': 'Cosmic Pong',
      'playground.cosmic.description':
        'Classic pong mechanics meet cosmic visuals in a steadily accelerating duel against an AI challenger.',
      'playground.cosmic.link': 'Play now',
      'playground.tree.subtitle': 'Emotion Journal',
      'playground.tree.title': 'Tree of Whispers',
      'playground.tree.description':
        'Choose a hollow in the tree, pour out your thoughts, and let a reflective interface guard your private space.',
      'playground.tree.link': 'Enter the grove',
      'playground.hotel.subtitle': 'Hotel Management',
      'playground.hotel.title': 'Hotel Manager',
      'playground.hotel.description':
        'A streamlined hotel console covering booking, check-in, and billing with quick visibility into room status.',
      'playground.hotel.link': 'Open console',
      'playground.health.subtitle': 'Mind & Health Survey Collection',
      'playground.health.title': 'Mind & Health Survey Hub',
      'playground.health.description':
        'Combined mental and physical health questionnaires that generate quick assessments and guidance summaries.',
      'playground.health.link1': 'Try version 1',
      'playground.health.link2': 'Try version 2',
      'playground.library.subtitle': 'School Library',
      'playground.library.title': 'Library Hub',
      'playground.library.description':
        'Simulated campus library circulation with search, borrowing, and inventory (demo: test/test123).',
      'playground.library.link': 'Access system',
      'playground.finance.subtitle': 'EPC Finance',
      'playground.finance.title': 'Project Finance',
      'playground.finance.description':
        'Track cash flow and contract finances for EPC projects with clarity on efficiency and transparency.',
      'playground.finance.link': 'View flows',
      'footer.note': '© {{year}} Hao Jin. Crafted with curiosity and stardust.'
    },
    zh: {
      'nav.home': '首页',
      'nav.about': '关于',
      'nav.projects': '作品',
      'nav.github': 'GitHub',
      'nav.contact': '联系',
      'nav.toggle': '切换导航',
      'language.label': '选择语言',
      'language.english': 'EN',
      'language.chinese': '中文',
      'hero.tagline': '在代码、设计与数据中探索创意',
      'hero.title': '数字与智能化全景解决方案',
      'hero.lead': '沿着数字与智能化全景路径前行，探索企业业务赋能所需的架构实践、AI 应用与产品落地。',
      'hero.cta': '了解更多',
      'hero.scroll': '滚动至关于部分',
      'about.title': '关于 Hao',
      'about.paragraph1':
        '我是一名热衷于把复杂想法化为迷人数字体验的创造者。从后端服务到交互式数据可视化，我享受掌控全栈，将作品打磨得有温度也有质感。',
      'about.paragraph2': '当我不在尝试新技术时，我会沉醉于天文摄影捕捉夜空，或探索人机交互领域的最新趋势。',
      'info.focus.title': '当前聚焦',
      'info.focus.item1': '企业级架构设计',
      'info.focus.item2': '高可用高并发应用搭建',
      'info.focus.item3': '技术架构治理',
      'info.focus.item4': '大数据与人工智能赋能行业落地',
      'info.focus.item5': 'AI 编程',
      'info.focus.item6': '内容创作',
      'info.focus.item7': '中小企业管理治理',
      'info.work.title': '精选作品',
      'info.work.item1': '面向预订、财务与资产流转的企业级平台实践',
      'info.work.item2': '数据驱动的决策看板与政策监测解决方案',
      'info.work.item3': '文档、评估与知识管理的产品化工具集合',
      'info.connect.title': '保持联系',
      'info.connect.item1': 'hao.jin@live.cn',
      'info.connect.item2': 'Twitter 上的 @haojinhj',
      'info.connect.item3': 'www.haoj.in',
      'projects.eyebrow': '项目',
      'projects.title': '探索我的近期作品',
      'projects.description': '这些作品凝聚了我对产品思考、自动化与叙事表达的探索。',
      'projects.pmUniverse.description':
        '一个汇聚产品管理框架、案例与策略的资源星图，帮助你更轻松地检索知识。',
      'projects.pmUniverse.demo': '在线体验',
      'projects.signx.description':
        '一款注重隐私、速度与清晰度的极简电子签约流程，让团队签署文档不再繁琐。',
      'projects.localBookshelf.description': '个人知识书架，同步本地阅读笔记到云端，同时保持探索的速度与愉悦。',
      'projects.policyMonitor.description': '自动化的政策追踪工具，实时关注监管更新，并推送给需要迅速响应的团队。',
      'projects.evaluationSystem.description': '一套透明的评分与报告引擎，用清晰的量表和洞察简化绩效评估。',
      'projects.mermaidEditor.description': '交互式 Mermaid 绘图编辑器，支持即时预览与友好的导出分享体验。',
      'playground.eyebrow': '互动场',
      'playground.title': '互动体验',
      'playground.description': '两个纯前端的小宇宙，欢迎点击进入体验它们的节奏与情绪。',
      'playground.cosmic.subtitle': '休闲乒乓桌球',
      'playground.cosmic.title': 'Cosmic Pong',
      'playground.cosmic.description': '复古的乒乓球玩法结合宇宙视觉，节奏逐步升级，与 AI 对手比拼反应力。',
      'playground.cosmic.link': '前往体验',
      'playground.tree.subtitle': '情绪手帐',
      'playground.tree.title': '树洞之树',
      'playground.tree.description': '挑选一处树洞写下心声，与对话式的界面一起沉淀专属于你的私密空间。',
      'playground.tree.link': '走进树洞',
      'playground.hotel.subtitle': '酒店管理系统',
      'playground.hotel.title': 'Hotel Manager',
      'playground.hotel.description': '覆盖预订、入住、账单的酒店管理体验，快速浏览房态与订单。',
      'playground.hotel.link': '前往管理',
      'playground.health.subtitle': '多维心理与健康问卷集合',
      'playground.health.title': '心理与健康问卷中心',
      'playground.health.description': '整合心理与健康维度的问卷，帮助快速生成评估与建议摘要。',
      'playground.health.link1': '体验版本一',
      'playground.health.link2': '体验版本二',
      'playground.library.subtitle': '学校图书管理',
      'playground.library.title': 'Library Hub',
      'playground.library.description': '模拟校园图书流转，支持查询、借阅与库存管理（demo 账号：test/test123）。',
      'playground.library.link': '进入系统',
      'playground.finance.subtitle': '工程总包财务',
      'playground.finance.title': 'Project Finance',
      'playground.finance.description': '面向工程总包的收支流转与合同财务跟踪，聚焦资金效率与透明度。',
      'playground.finance.link': '查看流转',
      'footer.note': '© {{year}} Hao Jin。以好奇与星尘打造。'
    }
  };

  const supportedLanguages = Object.keys(translations);
  const fallbackLanguage = 'en';
  const storageKey = 'preferred-language';
  const htmlLangMap = {
    en: 'en',
    zh: 'zh-Hans'
  };

  const translatableElements = document.querySelectorAll('[data-i18n]');
  const attributeElements = document.querySelectorAll('[data-i18n-attr]');
  const languageButtons = document.querySelectorAll('[data-set-language]');
  const htmlElement = document.documentElement;

  const formatTranslation = (value) =>
    value.replace(/{{(\w+)}}/g, (match, token) => {
      if (token === 'year') {
        return '<span id="current-year"></span>';
      }
      return match;
    });

  const refreshYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  const updateActiveButtons = (language) => {
    languageButtons.forEach((button) => {
      const isActive = button.dataset.setLanguage === language;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  const applyLanguage = (language, { persist = true } = {}) => {
    const targetLanguage = supportedLanguages.includes(language) ? language : fallbackLanguage;
    const htmlLanguageCode = htmlLangMap[targetLanguage] || targetLanguage;
    htmlElement.setAttribute('lang', htmlLanguageCode);

    translatableElements.forEach((element) => {
      const key = element.dataset.i18n;
      if (!key) {
        return;
      }

      const translation = translations[targetLanguage][key];
      if (typeof translation === 'undefined') {
        return;
      }

      if (element.dataset.i18nHtml === 'true') {
        element.innerHTML = formatTranslation(translation);
      } else {
        element.textContent = translation;
      }
    });

    attributeElements.forEach((element) => {
      const mapping = element.dataset.i18nAttr;
      if (!mapping) {
        return;
      }

      mapping.split(',').forEach((entry) => {
        const [attributeName, translationKey] = entry.split(':').map((part) => part && part.trim());
        if (!attributeName || !translationKey) {
          return;
        }

        const value = translations[targetLanguage][translationKey];
        if (typeof value === 'undefined') {
          return;
        }

        element.setAttribute(attributeName, value);
      });
    });

    updateActiveButtons(targetLanguage);
    refreshYear();

    if (persist) {
      try {
        window.localStorage.setItem(storageKey, targetLanguage);
      } catch (error) {
        /* ignore persistence errors */
      }
    }
  };

  const resolveInitialLanguage = () => {
    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (storedValue && supportedLanguages.includes(storedValue)) {
        return storedValue;
      }
    } catch (error) {
      /* ignore retrieval errors */
    }

    const userLanguage = navigator.language || (Array.isArray(navigator.languages) ? navigator.languages[0] : '');
    if (typeof userLanguage === 'string' && userLanguage.toLowerCase().startsWith('zh')) {
      return 'zh';
    }

    return fallbackLanguage;
  };

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedLanguage = button.dataset.setLanguage;
      applyLanguage(selectedLanguage);
    });
  });

  applyLanguage(resolveInitialLanguage(), { persist: false });
})();
