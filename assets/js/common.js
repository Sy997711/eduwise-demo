/* ================================================
   EduWise 智能体 - 公共脚本
   ================================================ */

// ========== 标签选择 ==========
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('tag')) {
    const group = e.target.closest('.tag-group');
    if (group && group.dataset.multi === 'false') {
      group.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
    } else {
      e.target.classList.toggle('active');
    }
  }
});

// ========== 获取选中标签 ==========
function getSelectedTags(selector) {
  return Array.from(document.querySelectorAll(selector + ' .tag.active'))
    .map(el => el.textContent.trim());
}

// ========== AI 模拟生成（智能备课） ==========
function generateLessonPrep(params) {
  const { subject, grade, topic, duration, objectives, difficulty } = params;

  const teachingPoints = {
    '高等数学': [
      `掌握${topic}的基本概念和计算公式`,
      `理解${topic}的推导过程与原理`,
      `能够灵活运用${topic}解决实际问题`,
      `培养学生的逻辑思维和建模能力`
    ],
    '程序设计': [
      `理解${topic}的语法规则与程序结构`,
      `掌握${topic}的核心算法与实现方法`,
      `能够独立编写和调试${topic}相关代码`,
      `培养计算思维和问题求解能力`
    ],
    '大学英语': [
      `掌握${topic}相关的核心词汇和短语`,
      `学习并运用重点语法结构`,
      `提高听说读写综合语言运用能力`,
      `培养跨文化交际意识`
    ],
    '线性代数': [
      `理解${topic}的基本概念和几何意义`,
      `掌握矩阵运算与${topic}的求解方法`,
      `能够运用线性代数方法分析实际问题`,
      `培养抽象思维和运算能力`
    ],
    '概率论': [
      `理解${topic}的基本概念和分布规律`,
      `掌握${topic}的计算方法与性质`,
      `能够运用概率模型分析随机现象`,
      `培养数据分析与统计推断能力`
    ],
    '数据结构': [
      `理解${topic}的定义与存储结构`,
      `掌握${topic}的核心操作与算法实现`,
      `能够根据场景选择合适的${topic}`,
      `培养算法设计与优化能力`
    ],
    '计算机网络': [
      `理解${topic}的基本概念和协议原理`,
      `掌握${topic}的体系结构与数据传输过程`,
      `能够分析和配置${topic}相关应用`,
      `培养网络工程实践能力`
    ],
    '思想政治': [
      `理解${topic}的基本内涵与时代价值`,
      `掌握${topic}的核心观点和方法论`,
      `能够运用${topic}分析社会现实问题`,
      `培养正确的世界观、人生观和价值观`
    ]
  };

  const points = teachingPoints[subject] || [
    `理解${topic}的核心内容`,
    `掌握相关知识要点`,
    `培养学生综合运用能力`,
    `提升学生学科核心素养`
  ];

  const links = [
    { name: '复习导入', content: `通过回顾上节课所学内容，引出${topic}的学习主题，激发学生学习兴趣。建议用时约${Math.round(duration * 0.15)}分钟。` },
    { name: '新知讲授', content: `系统讲解${topic}的基本概念、核心原理和典型案例。配合多媒体课件，采用启发式教学，引导学生主动思考。建议用时约${Math.round(duration * 0.35)}分钟。` },
    { name: '例题精讲', content: `精选2-3道典型例题，由浅入深分析解题思路，总结方法技巧。鼓励学生上台板演，及时反馈。建议用时约${Math.round(duration * 0.25)}分钟。` },
    { name: '课堂练习', content: `布置针对性练习题，让学生独立完成后小组交流讨论。教师巡视指导，收集共性问题。建议用时约${Math.round(duration * 0.15)}分钟。` },
    { name: '归纳总结', content: `师生共同梳理本节课知识脉络，强调重点难点，形成结构化认知。布置课后作业。建议用时约${Math.round(duration * 0.10)}分钟。` }
  ];

  let html = `
    <h3>${subject} · ${grade} · 《${topic}》备课方案</h3>

    <div class="content-block">
      <h4>📋 基本信息</h4>
      <ul>
        <li><strong>授课学科：</strong>${subject}</li>
        <li><strong>授课年级：</strong>${grade}</li>
        <li><strong>授课课题：</strong>${topic}</li>
        <li><strong>课时时长：</strong>${duration} 分钟</li>
        <li><strong>难度等级：</strong>${difficulty}</li>
      </ul>
    </div>

    <div class="content-block">
      <h4>🎯 教学目标</h4>
      <ol>
        ${objectives && objectives.length ? objectives.map(o => `<li>${o}</li>`).join('') :
          points.map((p, i) => `<li>${p}</li>`).join('')}
      </ol>
    </div>

    <div class="content-block">
      <h4>📚 教学重点与难点</h4>
      <p><strong>教学重点：</strong>${topic}的核心概念、基本原理及其应用方法。</p>
      <p><strong>教学难点：</strong>${topic}相关知识的灵活迁移与综合问题解决，${difficulty === '较难' || difficulty === '困难' ? '尤其涉及复杂场景的推理分析。' : '需要通过典型实例帮助学生理解。'}</p>
    </div>

    <div class="content-block">
      <h4>🧑‍🏫 学情分析</h4>
      <p>${grade}学生已具备一定的基础知识储备，但在抽象概念理解和知识综合运用方面仍需引导。建议采用直观教学、情境创设与合作学习相结合的方式，降低认知难度，激发主动参与。</p>
    </div>

    <div class="content-block">
      <h4>📝 教学过程设计</h4>
  `;
  links.forEach((step, i) => {
    html += `
      <p><strong>环节${i + 1}：${step.name}</strong></p>
      <p>${step.content}</p>
    `;
  });
  html += `</div>`;

  html += `
    <div class="content-block">
      <h4>🛠 教学资源与工具</h4>
      <ul>
        <li>多媒体课件（PPT/白板）</li>
        <li>配套教材及教辅资料</li>
        <li>智能题库与在线练习系统</li>
        <li>分组讨论与实验教具</li>
      </ul>
    </div>

    <div class="content-block">
      <h4>📊 板书设计</h4>
      <p>主板书：${topic} — 核心概念 | 重点公式/原理 | 典型例题 | 方法总结</p>
      <p>副板书：学生易错点记录、临时推导过程、拓展知识提示。</p>
    </div>

    <div class="content-block">
      <h4>💡 教学反思建议</h4>
      <ul>
        <li>关注学生课堂反馈，动态调整教学节奏</li>
        <li>对共性错题进行重点复盘，建立错题档案</li>
        <li>鼓励学生自评与互评，培养元认知能力</li>
        <li>课后及时整理改进建议，优化后续备课</li>
      </ul>
    </div>
  `;
  return html;
}

// ========== AI 模拟生成（教案设计） ==========
function generateLessonPlan(params) {
  const { subject, grade, topic, duration, type, objectives, standards } = params;
  const typeName = type || '新授课';

  const objList = objectives && objectives.length ? objectives : [
    `【知识与技能】理解${topic}的基本概念，掌握核心原理和方法。`,
    `【过程与方法】通过探究与合作学习，培养分析问题、解决问题的能力。`,
    `【情感态度与价值观】激发学习兴趣，树立学科信心，培养科学精神。`
  ];

  const activities = {
    '新授课': [
      { t: '情境导入', d: Math.round(duration * 0.12), a: `展示生活案例或问题情境，引出${topic}主题，激发求知欲。师生互动讨论。`, r: '教师引导、学生思考' },
      { t: '概念建构', d: Math.round(duration * 0.28), a: `系统讲解${topic}的基本概念、原理和规律，结合图形动画演示。`, r: '教师讲授、学生理解记忆' },
      { t: '例题示范', d: Math.round(duration * 0.22), a: '精选典型例题2-3道，详细分析解题思路，规范步骤书写。', r: '师生共同分析' },
      { t: '巩固练习', d: Math.round(duration * 0.20), a: '学生独立完成3-5道随堂练习，小组交流，教师个别辅导。', r: '学生自主+小组合作' },
      { t: '总结作业', d: Math.round(duration * 0.18), a: '知识脉络梳理、重点回顾，布置分层作业（基础+提升）。', r: '师生共同总结' }
    ],
    '复习课': [
      { t: '知识梳理', d: Math.round(duration * 0.25), a: `构建${topic}知识网络，回顾核心概念与方法，查漏补缺。`, r: '教师引导，学生回答' },
      { t: '典型错题分析', d: Math.round(duration * 0.30), a: '针对学生高频错题，深入剖析错因，归纳正确思路。', r: '师生互动、反思纠错' },
      { t: '综合训练', d: Math.round(duration * 0.30), a: '完成综合性练习卷，提升知识迁移与综合解题能力。', r: '学生独立完成' },
      { t: '讲评归纳', d: Math.round(duration * 0.15), a: '及时讲评，总结方法技巧，布置针对性复习任务。', r: '教师讲解+学生整理' }
    ],
    '习题课': [
      { t: '作业讲评', d: Math.round(duration * 0.20), a: '点评上次作业共性问题，规范书写与表达。', r: '教师讲评' },
      { t: '典型例题', d: Math.round(duration * 0.35), a: '精选覆盖知识点的典型例题，举一反三，拓展思路。', r: '师生共同探究' },
      { t: '课堂演练', d: Math.round(duration * 0.30), a: '限时完成变式练习，学生板演，互评互改。', r: '学生自主练习' },
      { t: '方法总结', d: Math.round(duration * 0.15), a: '归纳题型、解题策略与易错点提醒。', r: '师生共同总结' }
    ],
    '实验课': [
      { t: '实验导入', d: Math.round(duration * 0.12), a: '提出探究问题，明确实验目标与${topic}相关原理。', r: '教师引导提问' },
      { t: '方案设计', d: Math.round(duration * 0.20), a: '小组讨论实验方案，确定实验步骤与器材清单。', r: '小组合作讨论' },
      { t: '实验操作', d: Math.round(duration * 0.35), a: '分组动手实验，观察记录现象数据，教师指导安全操作。', r: '学生实验+教师巡视' },
      { t: '数据处理与分析', d: Math.round(duration * 0.20), a: '整理实验数据，分析结论，讨论误差来源。', r: '小组汇报交流' },
      { t: '总结反思', d: Math.round(duration * 0.13), a: '总结实验结论与方法，完成实验报告。', r: '师生共同总结' }
    ]
  };

  const plan = activities[typeName] || activities['新授课'];

  let activitiesHtml = plan.map((s, i) => `
    <tr>
      <td>环节${i + 1}<br>${s.t}</td>
      <td>${s.d}分钟</td>
      <td>${s.a}</td>
      <td>${s.r}</td>
    </tr>
  `).join('');

  return `
    <h3>${subject} · 《${topic}》教案</h3>

    <div class="content-block">
      <h4>📋 教案概览</h4>
      <table class="data-table">
        <tr><th style="width:20%">授课学科</th><td>${subject}</td><th style="width:20%">授课年级</th><td>${grade}</td></tr>
        <tr><th>授课课题</th><td colspan="3">${topic}</td></tr>
        <tr><th>课时时长</th><td>${duration} 分钟</td><th>课型</th><td><span class="badge badge-blue">${typeName}</span></td></tr>
        ${standards ? `<tr><th>课程标准</th><td colspan="3">${standards}</td></tr>` : ''}
      </table>
    </div>

    <div class="content-block">
      <h4>🎯 教学目标</h4>
      <ol>
        ${objList.map(o => `<li>${o}</li>`).join('')}
      </ol>
    </div>

    <div class="content-block">
      <h4>📌 教学重难点</h4>
      <p><strong>教学重点：</strong>${topic}的核心概念与主要方法原理；解题思路与规范表达。</p>
      <p><strong>教学难点：</strong>知识的灵活迁移、综合运用及创造性思维培养。</p>
    </div>

    <div class="content-block">
      <h4>⏱ 教学活动设计</h4>
      <table class="data-table">
        <thead>
          <tr>
            <th>教学环节</th>
            <th>时间</th>
            <th>教学内容与活动</th>
            <th>师生互动</th>
          </tr>
        </thead>
        <tbody>${activitiesHtml}</tbody>
      </table>
    </div>

    <div class="content-block">
      <h4>📐 板书设计</h4>
      <p style="border-left: 3px solid #cbd5e1; padding-left: 14px; font-family: 'Courier New', monospace; background: #fff; padding: 14px; border-radius: 8px;">
        <center style="font-weight:700; font-size:15px;">§ ${topic}</center><br>
        一、核心概念　　　　　三、典型例题<br>
        　1. 定义　　　　　　　例1：……<br>
        　2. 性质　　　　　　　例2：……<br>
        二、原理/公式　　　　四、方法总结<br>
        　公式：__________ 　 解题步骤：1…2…3…
      </p>
    </div>

    <div class="content-block">
      <h4>📚 作业设计（分层）</h4>
      <ul>
        <li><strong>基础层（必做）：</strong>教材课后练习 1-5 题，巩固基础知识。</li>
        <li><strong>提高层（选做）：</strong>拓展题 2 道，培养综合运用能力。</li>
        <li><strong>挑战层（兴趣）：</strong>结合${topic}的实际应用探究任务，鼓励创新思考。</li>
      </ul>
    </div>

    <div class="content-block">
      <h4>🔍 教学评价与反思</h4>
      <p><strong>课堂评价：</strong>通过课堂提问、练习反馈、小组表现等即时评估学生掌握情况。</p>
      <p><strong>课后反思：</strong>根据学生作业和测验数据分析教学效果，调整后续教学策略。对学生薄弱环节设计针对性补救措施。</p>
    </div>
  `;
}

// ========== 生成结果到目标区 ==========
function renderResult(targetSelector, html) {
  const loading = document.querySelector(targetSelector + ' .loading');
  const empty = document.querySelector(targetSelector + ' .empty-state');
  const body = document.querySelector(targetSelector + ' .output-body-inner');
  if (loading) loading.classList.remove('active');
  if (empty) empty.style.display = 'none';
  if (body) body.innerHTML = html;
}

function showLoading(targetSelector) {
  const loading = document.querySelector(targetSelector + ' .loading');
  const empty = document.querySelector(targetSelector + ' .empty-state');
  const body = document.querySelector(targetSelector + ' .output-body-inner');
  if (empty) empty.style.display = 'none';
  if (body) body.innerHTML = '';
  if (loading) loading.classList.add('active');
}

// ========== 复制结果 ==========
function copyResult(targetSelector) {
  const body = document.querySelector(targetSelector + ' .output-body-inner');
  if (!body || !body.innerText.trim()) {
    alert('暂无可复制的内容，请先生成方案');
    return;
  }
  const text = body.innerText;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('已复制到剪贴板');
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta);
  ta.select(); document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('已复制到剪贴板');
}

// ========== 下载为 Markdown ==========
function downloadResult(targetSelector, filename) {
  const body = document.querySelector(targetSelector + ' .output-body-inner');
  if (!body || !body.innerText.trim()) {
    alert('暂无可下载的内容，请先生成方案');
    return;
  }
  const html = body.innerHTML;
  const md = html2md(html);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename + '.md';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('已下载 ' + filename + '.md');
}
function html2md(html) {
  return html
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '# $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '## $1\n\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>|<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>|<\/ol>/gi, '\n')
    .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ========== Toast 提示 ==========
function showToast(msg) {
  let t = document.getElementById('global-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'global-toast';
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;padding:10px 20px;border-radius:8px;z-index:9999;opacity:0;transition:opacity .3s;font-size:14px;box-shadow:0 10px 20px rgba(0,0,0,.2);';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  setTimeout(() => t.style.opacity = '0', 2200);
}

// ========== 登录系统 ==========
const TEST_ACCOUNTS = {
  'teacher01': { password: 'eduwise@2026', role: 'teacher', name: '李老师' },
  'student01': { password: 'eduwise@2026', role: 'student', name: '同学' }
};

function doLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pwd = document.getElementById('loginPwd').value.trim();
  const errEl = document.getElementById('loginError');

  if (TEST_ACCOUNTS[user] && TEST_ACCOUNTS[user].password === pwd) {
    const account = TEST_ACCOUNTS[user];
    sessionStorage.setItem('eduwise_user', user);
    sessionStorage.setItem('eduwise_role', account.role);
    sessionStorage.setItem('eduwise_name', account.name);
    hideLogin(account);
    return false;
  } else {
    errEl.textContent = '账号或密码错误，请重新输入';
    return false;
  }
}

function hideLogin(account) {
  const overlay = document.getElementById('loginOverlay');
  if (overlay) {
    overlay.classList.add('hidden');
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
  }
  // 更新导航栏用户信息
  const nameEl = document.getElementById('userName');
  const avatarEl = document.getElementById('userAvatar');
  if (nameEl && avatarEl) {
    nameEl.textContent = account.name;
    avatarEl.textContent = account.name.charAt(0);
  }
  showToast('登录成功，欢迎使用 EduWise');
}

function logout() {
  sessionStorage.removeItem('eduwise_user');
  sessionStorage.removeItem('eduwise_role');
  sessionStorage.removeItem('eduwise_name');
  location.reload();
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
  const loggedUser = sessionStorage.getItem('eduwise_user');
  if (loggedUser && TEST_ACCOUNTS[loggedUser]) {
    hideLogin(TEST_ACCOUNTS[loggedUser]);
  }
});
