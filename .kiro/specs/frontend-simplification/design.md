# 前端设计稿简化 - 设计文档

## 概述

本设计文档描述了如何简化现有前端设计稿，使其更贴合初始需求的核心功能。简化的目标是降低开发复杂度，缩短开发周期，同时保留所有核心业务功能。

## 架构

### 页面结构

简化后的系统包含以下核心页面：

```
前端页面架构
├── dashboard.html (项目总览仪表板) - 保留并简化
├── task-center.html (任务中心) - 保留
├── hitl-workbench.html (AI 校对工作台) - 保留
├── project-detail-initiation.html (立项阶段详情) - 保留并增强
├── project-detail-bidding.html (招标阶段详情) - 保留并增强
├── project-detail.html (实施阶段详情) - 保留并增强
├── project-detail-acceptance.html (验收阶段详情) - 保留并增强
├── rule-config.html (规则配置) - 大幅简化
├── components.html (组件库) - 保留
└── design-system.html (设计规范) - 保留
```

### 删除的页面和文件

```
删除列表
├── template-edit.html (模板编辑页面) - 删除
├── DEMO-GUIDE.md (演示指南) - 删除
├── MODAL-INTERACTION-GUIDE.md (模态框交互指南) - 删除
├── IMPLEMENTATION-SUMMARY.md (实施总结) - 删除
├── INTERACTION-ENHANCEMENTS.md (交互增强) - 删除
├── MODAL-FEATURES.md (模态框功能) - 删除
└── RULE-CONFIG-DEMO.md (规则配置演示) - 删除
```

## 组件和接口

### 1. 项目总览仪表板 (dashboard.html)

**简化内容**：
- 删除"新建项目"按钮和模态框
- 删除 `newProjectModal` 相关的 HTML 和 JavaScript 代码
- 保留项目列表、筛选器、搜索功能

**保留功能**：
- 项目卡片展示（名称、阶段、状态、经理、预警灯）
- 状态筛选（全部/进行中/已完成/预警）
- 阶段筛选（立项/招标/实施/验收）
- 项目搜索
- 点击项目卡片跳转到对应阶段详情页

**修改点**：
```html
<!-- 删除这部分 -->
<button onclick="openNewProjectModal()" class="...">
  + 新建项目
</button>

<!-- 删除整个 newProjectModal 的 HTML 结构 -->
```

```javascript
// 删除 interactions.js 中的这些函数
// - openNewProjectModal()
// - closeNewProjectModal()
// - initNewProjectForm()
```

### 2. 阶段详情页面增强

**四个阶段页面**：
- `project-detail-initiation.html` (立项阶段)
- `project-detail-bidding.html` (招标阶段)
- `project-detail.html` (实施阶段)
- `project-detail-acceptance.html` (验收阶段)

**新增功能：历史阶段查看**

在每个阶段详情页中，增加一个"历史阶段"侧边栏或折叠面板：

```html
<!-- 在阶段进度条下方添加 -->
<div class="mt-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">历史阶段</h3>
  
  <!-- 已完成阶段的折叠面板 -->
  <div class="space-y-2">
    <!-- 立项阶段（示例：已完成） -->
    <div class="border border-gray-200 rounded-lg">
      <button onclick="toggleHistoryStage('initiation')" 
              class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
        <div class="flex items-center">
          <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
          <span class="font-medium text-gray-900">立项阶段</span>
        </div>
        <svg class="h-5 w-5 text-gray-400 transform transition-transform" 
             id="initiation-arrow">
          <!-- 箭头图标 -->
        </svg>
      </button>
      
      <!-- 折叠内容 -->
      <div id="initiation-content" class="hidden px-4 pb-4">
        <div class="mt-2 space-y-2">
          <div class="text-sm text-gray-600">
            <span class="font-medium">完成时间：</span>2024-01-15
          </div>
          <div class="text-sm text-gray-600">
            <span class="font-medium">文档状态：</span>
            <span class="text-green-600">✓ 全部通过</span>
          </div>
          <!-- 文档列表 -->
          <div class="mt-3">
            <div class="text-sm font-medium text-gray-700 mb-2">文档清单：</div>
            <ul class="space-y-1 text-sm text-gray-600">
              <li>✓ 立项申请书</li>
              <li>✓ 预算审批表</li>
              <li>✓ 可行性研究报告</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 其他已完成阶段... -->
  </div>
</div>
```

**JavaScript 实现**：
```javascript
// 在 interactions.js 中添加
function toggleHistoryStage(stageId) {
  const content = document.getElementById(`${stageId}-content`);
  const arrow = document.getElementById(`${stageId}-arrow`);
  
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    arrow.classList.add('rotate-180');
  } else {
    content.classList.add('hidden');
    arrow.classList.remove('rotate-180');
  }
}
```

**数据结构**：
```javascript
// 每个项目应包含所有阶段的历史数据
const projectData = {
  id: 'P001',
  name: '智慧园区二期工程',
  currentStage: 'implementation', // 当前阶段
  stages: {
    initiation: {
      status: 'completed',
      completedAt: '2024-01-15',
      documents: [
        { name: '立项申请书', status: 'approved' },
        { name: '预算审批表', status: 'approved' }
      ],
      aiChecks: [
        { type: '关键词检测', result: '通过' }
      ]
    },
    bidding: {
      status: 'completed',
      completedAt: '2024-02-20',
      documents: [...]
    },
    implementation: {
      status: 'in_progress',
      documents: [...]
    },
    acceptance: {
      status: 'not_started'
    }
  }
};
```

### 3. 规则配置页面简化 (rule-config.html)

**删除的功能**：
- 删除"项目模板"标签页
- 删除"阶段配置"标签页
- 删除所有复杂的模态框（阶段模态框、文档规则模态框、AI 规则模态框）
- 删除模板编辑页面的链接
- 删除动态周期、跨文档比对等高级功能

**保留的功能**：
- 仅保留"校验规则"标签页
- 简化的规则列表（规则名称、类型、状态）
- 简化的添加/编辑规则表单

**简化后的规则类型**：
1. 关键词检测
2. 签字检测
3. 章节检测

**简化的规则表单**：
```html
<!-- 简化的添加规则模态框 -->
<div id="simpleRuleModal" class="fixed inset-0 bg-black bg-opacity-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
      <h3 class="text-xl font-semibold mb-4">添加校验规则</h3>
      
      <form id="simpleRuleForm" class="space-y-4">
        <!-- 规则名称 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            规则名称 <span class="text-red-500">*</span>
          </label>
          <input type="text" name="ruleName" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        
        <!-- 规则类型 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            规则类型 <span class="text-red-500">*</span>
          </label>
          <select name="ruleType" required onchange="updateRuleFields(this.value)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">请选择</option>
            <option value="keyword">关键词检测</option>
            <option value="signature">签字检测</option>
            <option value="section">章节检测</option>
          </select>
        </div>
        
        <!-- 目标文档 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            目标文档 <span class="text-red-500">*</span>
          </label>
          <select name="targetDoc" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">请选择</option>
            <option value="initiation_doc">立项申请书</option>
            <option value="bidding_doc">招标文件</option>
            <option value="contract">合同</option>
            <option value="acceptance_report">验收报告</option>
          </select>
        </div>
        
        <!-- 关键词检测专用字段 -->
        <div id="keywordFields" class="hidden">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            关键词列表（每行一个）
          </label>
          <textarea name="keywords" rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
        </div>
        
        <!-- 签字检测专用字段 -->
        <div id="countFields" class="hidden">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            最少数量
          </label>
          <input type="number" name="minCount" min="1"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        
        <!-- 章节检测专用字段 -->
        <div id="sectionFields" class="hidden">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            必需章节（每行一个）
          </label>
          <textarea name="sections" rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
        </div>
        
        <!-- 预警文案 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            预警文案
          </label>
          <input type="text" name="warningText"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md"
                 placeholder="例如：缺少必需的签字">
        </div>
        
        <!-- 按钮 -->
        <div class="flex justify-end space-x-3 mt-6">
          <button type="button" onclick="closeSimpleRuleModal()"
                  class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            取消
          </button>
          <button type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            保存
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
```

**简化的 JavaScript**：
```javascript
// 更新规则字段显示
function updateRuleFields(ruleType) {
  // 隐藏所有动态字段
  document.getElementById('keywordFields').classList.add('hidden');
  document.getElementById('countFields').classList.add('hidden');
  document.getElementById('sectionFields').classList.add('hidden');
  
  // 根据类型显示对应字段
  if (ruleType === 'keyword') {
    document.getElementById('keywordFields').classList.remove('hidden');
  } else if (ruleType === 'signature') {
    document.getElementById('countFields').classList.remove('hidden');
  } else if (ruleType === 'section') {
    document.getElementById('sectionFields').classList.remove('hidden');
  }
}

// 打开简化的规则模态框
function openSimpleRuleModal() {
  document.getElementById('simpleRuleModal').classList.remove('hidden');
}

// 关闭简化的规则模态框
function closeSimpleRuleModal() {
  document.getElementById('simpleRuleModal').classList.add('hidden');
  document.getElementById('simpleRuleForm').reset();
}

// 表单提交
document.getElementById('simpleRuleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // 收集表单数据
  const formData = new FormData(e.target);
  const ruleData = Object.fromEntries(formData);
  
  console.log('保存规则:', ruleData);
  showToast('规则已保存', 'success');
  closeSimpleRuleModal();
});
```

### 4. 任务中心 (task-center.html)

**保留所有功能**：
- 标签页切换（全部/处理中/需人工处理/已完成）
- 上传文档按钮
- 任务列表展示
- "去校对"按钮跳转

**无需修改**

### 5. AI 校对工作台 (hitl-workbench.html)

**保留所有功能**：
- 文档预览
- 字段列表
- 字段高亮
- 保存/驳回按钮
- 表单验证

**无需修改**

### 6. 查重报告展示（新增功能）

在项目详情页中，当文档完成查重后，显示查重报告入口：

```html
<!-- 在文档清单中添加查重报告按钮 -->
<div class="flex items-center justify-between">
  <span class="text-sm text-gray-600">立项申请书</span>
  <div class="flex items-center space-x-2">
    <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
      已通过
    </span>
    <button onclick="openDuplicateReport('doc_001')"
            class="text-sm text-blue-600 hover:text-blue-800">
      查看查重报告
    </button>
  </div>
</div>
```

**查重报告模态框**：
```html
<div id="duplicateReportModal" class="fixed inset-0 bg-black bg-opacity-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-6xl w-full h-[80vh] flex flex-col">
      <!-- 标题栏 -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-xl font-semibold">查重报告 - 立项申请书</h3>
        <button onclick="closeDuplicateReport()" class="text-gray-400 hover:text-gray-600">
          <svg class="h-6 w-6"><!-- X 图标 --></svg>
        </button>
      </div>
      
      <!-- 相似度概览 -->
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div class="flex items-center space-x-6">
          <div>
            <span class="text-sm text-gray-600">总体相似度：</span>
            <span class="text-2xl font-bold text-red-600">35%</span>
          </div>
          <div>
            <span class="text-sm text-gray-600">重复片段：</span>
            <span class="text-lg font-semibold">12 处</span>
          </div>
          <div>
            <span class="text-sm text-gray-600">参考文档：</span>
            <span class="text-lg font-semibold">3 个</span>
          </div>
        </div>
      </div>
      
      <!-- 双栏对比视图 -->
      <div class="flex-1 flex overflow-hidden">
        <!-- 左侧：当前文档 -->
        <div class="w-1/2 border-r border-gray-200 overflow-y-auto p-6">
          <h4 class="text-sm font-semibold text-gray-700 mb-3">当前文档</h4>
          <div class="prose prose-sm">
            <p>本项目旨在建设智慧园区管理平台...</p>
            <p class="bg-yellow-100">
              <!-- 高亮的重复内容 -->
              通过物联网技术实现园区设备的智能化管理和监控...
            </p>
            <p>预计投资金额为 500 万元...</p>
          </div>
        </div>
        
        <!-- 右侧：参考文档 -->
        <div class="w-1/2 overflow-y-auto p-6">
          <h4 class="text-sm font-semibold text-gray-700 mb-3">
            参考文档：智慧园区一期工程立项书 (相似度: 45%)
          </h4>
          <div class="prose prose-sm">
            <p>一期项目的目标是...</p>
            <p class="bg-yellow-100">
              <!-- 高亮的重复内容 -->
              通过物联网技术实现园区设备的智能化管理和监控...
            </p>
            <p>一期投资为 300 万元...</p>
          </div>
        </div>
      </div>
      
      <!-- 重复片段列表 -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">重复片段列表</h4>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div class="text-sm">
            <span class="text-gray-600">片段 1:</span>
            <span class="text-gray-900">"通过物联网技术实现..."</span>
            <span class="text-red-600 ml-2">(相似度: 98%)</span>
          </div>
          <!-- 更多片段... -->
        </div>
      </div>
    </div>
  </div>
</div>
```

## 数据模型

### 项目数据模型

```typescript
interface Project {
  id: string;
  name: string;
  currentStage: 'initiation' | 'bidding' | 'implementation' | 'acceptance';
  status: 'in_progress' | 'completed' | 'warning';
  manager: string;
  budget: number;
  startDate: string;
  
  // 所有阶段的历史数据
  stages: {
    initiation?: StageData;
    bidding?: StageData;
    implementation?: StageData;
    acceptance?: StageData;
  };
}

interface StageData {
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string;
  documents: DocumentItem[];
  aiChecks: AICheckResult[];
  warnings: Warning[];
}

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  duplicateReport?: DuplicateReport;
}

interface DuplicateReport {
  similarity: number;
  duplicateCount: number;
  referenceDocuments: ReferenceDoc[];
  duplicateSegments: DuplicateSegment[];
}

interface ReferenceDoc {
  id: string;
  name: string;
  similarity: number;
}

interface DuplicateSegment {
  text: string;
  similarity: number;
  position: { start: number; end: number };
  referencePosition: { start: number; end: number };
}
```

### 简化的规则数据模型

```typescript
interface SimpleRule {
  id: string;
  name: string;
  type: 'keyword' | 'signature' | 'section';
  targetDoc: string;
  enabled: boolean;
  warningText: string;
  
  // 类型特定字段
  keywords?: string[];        // 关键词检测
  minCount?: number;          // 签字检测
  sections?: string[];        // 章节检测
}
```

## 正确性属性

*属性是一种特征或行为，应该在系统的所有有效执行中保持为真。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1：历史阶段数据完整性

*对于任何*项目，如果某个阶段的状态为"已完成"，则该阶段必须包含完整的文档列表和 AI 校验结果

**验证：需求 2.2, 2.3**

### 属性 2：阶段顺序一致性

*对于任何*项目，当前阶段之前的所有阶段状态必须为"已完成"，当前阶段之后的所有阶段状态必须为"未开始"

**验证：需求 2.2**

### 属性 3：查重报告关联性

*对于任何*文档，如果存在查重报告，则报告中的相似度百分比必须等于所有重复片段相似度的加权平均值

**验证：需求 7.2**

### 属性 4：规则配置有效性

*对于任何*校验规则，如果规则类型为"关键词检测"，则必须包含至少一个关键词；如果类型为"签字检测"，则最少数量必须大于 0

**验证：需求 5.3, 5.5**

### 属性 5：文档状态一致性

*对于任何*文档，如果 AI 校验结果包含错误或警告，则文档状态不能为"已通过"

**验证：需求 8.2**

### 属性 6：预警触发准确性

*对于任何*项目，如果存在节点逾期或关键文档缺失，则项目状态必须包含预警标识，且预警详情必须描述具体的风险

**验证：需求 9.1, 9.2**

## 错误处理

### 1. 历史阶段数据缺失

**场景**：用户点击历史阶段，但数据未加载或不完整

**处理**：
- 显示加载状态指示器
- 如果加载失败，显示友好的错误提示："暂时无法加载历史数据，请稍后重试"
- 提供"重新加载"按钮

### 2. 查重报告加载失败

**场景**：用户点击"查看查重报告"，但报告数据不可用

**处理**：
- 显示 Toast 提示："查重报告加载失败，请稍后重试"
- 记录错误日志供后端排查

### 3. 规则保存失败

**场景**：用户提交规则表单，但保存失败

**处理**：
- 保留用户填写的表单数据，不关闭模态框
- 显示错误提示："保存失败，请检查网络连接后重试"
- 提供"重新保存"按钮

### 4. 文档上传失败

**场景**：用户上传文档，但上传过程中断或失败

**处理**：
- 显示上传进度条
- 如果失败，显示具体错误原因（文件过大、格式不支持等）
- 提供"重新上传"按钮

## 测试策略

### 单元测试

**测试目标**：
- 历史阶段折叠/展开功能
- 规则表单字段动态显示逻辑
- 查重报告数据解析和渲染
- Toast 通知显示和自动关闭

**测试工具**：Jest + Testing Library

### 集成测试

**测试目标**：
- 从仪表板点击项目卡片到阶段详情页的导航
- 从任务中心点击"去校对"到校对工作台的跳转
- 规则配置表单提交后的数据保存和列表更新
- 查重报告模态框的打开和关闭

**测试工具**：Cypress 或 Playwright

### 用户验收测试

**测试场景**：
1. 查看项目详情时，能够展开历史阶段并查看完整信息
2. 在规则配置页面，能够添加不同类型的规则并保存
3. 在项目详情页，能够查看文档的查重报告和重复片段
4. 在任务中心，能够上传文档并跟踪处理状态
5. 在校对工作台，能够修改字段并保存或驳回

### 性能测试

**测试指标**：
- 页面首次加载时间 < 2 秒
- 历史阶段展开响应时间 < 500ms
- 查重报告模态框打开时间 < 1 秒
- 规则列表渲染时间（100 条规则）< 1 秒

## 实施计划

### 阶段 1：删除不必要的文件和代码（1 天）

1. 删除 `template-edit.html`
2. 删除所有演示文档（DEMO-GUIDE.md 等）
3. 从 `dashboard.html` 删除新建项目功能
4. 从 `rule-config.html` 删除项目模板和阶段配置标签页
5. 从 `interactions.js` 删除相关的 JavaScript 代码

### 阶段 2：实现历史阶段查看功能（2 天）

1. 在四个阶段详情页中添加历史阶段折叠面板 HTML
2. 实现 `toggleHistoryStage()` 函数
3. 准备示例历史数据
4. 测试折叠/展开交互

### 阶段 3：简化规则配置页面（2 天）

1. 创建简化的规则模态框 HTML
2. 实现 `updateRuleFields()` 动态字段切换
3. 实现规则表单提交和验证
4. 更新规则列表展示

### 阶段 4：实现查重报告展示（2 天）

1. 创建查重报告模态框 HTML
2. 实现双栏对比视图
3. 实现重复片段高亮
4. 实现同步滚动功能

### 阶段 5：测试和优化（1 天）

1. 执行单元测试和集成测试
2. 修复发现的 bug
3. 优化性能和用户体验
4. 更新 README.md 文档

**总计：8 个工作日**
