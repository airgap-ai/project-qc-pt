# 设计文档 - 项目质控助手流程优化前端

## 概述

本文档描述了基于 0126 版流程图的项目质控助手前端优化设计方案。系统在现有前端基础上,新增文档上传与同步、四大结构化内容模块、合规性检查、数据比对和预警管理等功能,实现完整的项目质控闭环。

## 架构设计

### 技术栈

**前端框架:** 原生 HTML + Tailwind CSS
- 理由:与现有前端保持一致,无需引入新的构建工具

**交互脚本:** JavaScript (ES6+)
- 理由:轻量级,直接在浏览器运行

**样式框架:** Tailwind CSS (CDN)
- 理由:与现有设计系统保持一致

**图标库:** Heroicons (内联 SVG)
- 理由:与现有设计系统保持一致

### 页面结构

```
frontend/
├── document-upload.html          # 文档上传与同步页面
├── structured-content.html       # 结构化内容展示页面
├── compliance-check.html         # 合规性检查页面
├── data-comparison.html          # 数据比对结果页面
├── alert-management.html         # 预警管理页面
└── interactions-workflow.js      # 新增交互脚本
```

## 组件设计与接口

### 1. 文档上传与同步组件

#### 页面布局

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- 页面标题 -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">文档管理</h1>
    <p class="mt-2 text-sm text-gray-600">上传或同步项目文档</p>
  </div>

  <!-- 操作按钮区 -->
  <div class="flex space-x-4 mb-6">
    <button class="px-6 py-3 bg-blue-600 text-white rounded-lg">
      📤 上传文档
    </button>
    <button class="px-6 py-3 bg-green-600 text-white rounded-lg">
      🔄 从生产管理系统同步
    </button>
  </div>

  <!-- 文档列表 -->
  <div class="bg-white rounded-lg shadow">
    <!-- 文档项 -->
  </div>
</div>
```


#### 数据结构

```javascript
// 文档对象
interface Document {
  id: string;
  name: string;
  type: 'initiation' | 'bidding' | 'contract';
  format: 'excel' | 'word' | 'pdf';
  size: number;
  source: 'manual' | 'sync';
  uploadTime: string;
  status: 'uploading' | 'extracting' | 'completed' | 'failed';
  extractionProgress: number;
}
```

#### 交互逻辑

1. **上传文档**
   - 用户点击"上传文档"按钮
   - 打开文件选择对话框
   - 验证文件格式和大小
   - 显示上传进度条
   - 上传完成后触发提取任务

2. **同步文档**
   - 用户点击"从生产管理系统同步"按钮
   - 调用 API 拉取文档列表
   - 显示同步进度
   - 同步完成后触发提取任务

3. **文档类型选择**
   - 用户为文档选择类型标签
   - 系统根据类型应用提取规则

### 2. 结构化内容展示组件

#### 页面布局

采用标签页(Tabs)设计,分为四个模块:

```html
<div class="bg-white rounded-lg shadow">
  <!-- 标签页导航 -->
  <div class="border-b border-gray-200">
    <nav class="flex space-x-8 px-6">
      <button class="tab-active">💰 项目金额与付款</button>
      <button>📅 项目进度</button>
      <button>📦 交付成果</button>
      <button>👥 人员要求</button>
    </nav>
  </div>

  <!-- 标签页内容 -->
  <div class="p-6">
    <!-- 动态内容区域 -->
  </div>
</div>
```


#### 模块 1: 项目金额与付款

```html
<div class="space-y-6">
  <!-- 基本金额信息 -->
  <div class="grid grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        含税价格
        <span class="text-xs text-gray-500 ml-2">(来源: 合同)</span>
      </label>
      <input type="text" value="¥ 1,200,000.00" 
             class="w-full px-3 py-2 border border-gray-300 rounded-md">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        税率
        <span class="text-xs text-gray-500 ml-2">(来源: 合同)</span>
      </label>
      <input type="text" value="13%" 
             class="w-full px-3 py-2 border border-gray-300 rounded-md">
    </div>
  </div>

  <!-- 付款条件列表 -->
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-4">付款条件</h3>
    <div class="space-y-3">
      <!-- 付款条件项 -->
      <div class="border border-gray-200 rounded-lg p-4">
        <div class="flex justify-between items-start">
          <div>
            <span class="font-medium">第 1 次付款</span>
            <p class="text-sm text-gray-600 mt-1">条件: 合同签订后</p>
            <p class="text-sm text-gray-600">金额: ¥ 360,000.00 (30%)</p>
            <p class="text-sm text-gray-600">期限: 合同签订后 7 个工作日内</p>
          </div>
          <span class="text-xs text-gray-500">(来源: 合同)</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 模块 2: 项目进度

```html
<div class="space-y-6">
  <!-- 时间轴可视化 -->
  <div class="relative">
    <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
    
    <!-- 时间节点 -->
    <div class="relative pl-12 pb-8">
      <div class="absolute left-0 w-8 h-8 bg-blue-600 rounded-full 
                  flex items-center justify-center text-white">
        1
      </div>
      <div>
        <h4 class="font-semibold text-gray-900">项目开始</h4>
        <p class="text-sm text-gray-600">2026-01-15</p>
        <span class="text-xs text-gray-500">(来源: 合同)</span>
      </div>
    </div>

    <!-- 更多时间节点... -->
  </div>
</div>
```


#### 模块 3: 交付成果

```html
<div class="space-y-6">
  <!-- 按阶段分组 -->
  <div class="border border-gray-200 rounded-lg">
    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
      <h4 class="font-semibold text-gray-900">需求调研与方案设计阶段</h4>
    </div>
    <div class="p-4 space-y-3">
      <!-- 交付物项 -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          <span class="text-sm text-gray-900">需求调研报告</span>
          <span class="text-xs text-gray-500">(来源: 合同)</span>
        </div>
        <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
          已验收
        </span>
      </div>
    </div>
  </div>
</div>
```

#### 模块 4: 人员要求

```html
<div class="space-y-6">
  <!-- 项目经理要求 -->
  <div class="border border-gray-200 rounded-lg p-4">
    <h4 class="font-semibold text-gray-900 mb-3">项目经理要求</h4>
    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span class="text-gray-600">资质要求:</span>
        <span class="text-gray-900">PMP 认证</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">业绩要求:</span>
        <span class="text-gray-900">3 年以上项目管理经验</span>
      </div>
      <span class="text-xs text-gray-500">(来源: 招标文件)</span>
    </div>
  </div>

  <!-- 实际配置对比 -->
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h4 class="font-semibold text-blue-900 mb-3">实际人员配置</h4>
    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span class="text-blue-700">项目经理:</span>
        <span class="text-blue-900">张三 (PMP, 5年经验)</span>
      </div>
      <div class="flex items-center text-green-600">
        <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        符合要求
      </div>
    </div>
  </div>
</div>
```


### 3. 合规性检查组件

#### 页面布局

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- 统计卡片 -->
  <div class="grid grid-cols-3 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">检查项总数</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div class="p-3 bg-blue-100 rounded-full">
          <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">通过项</p>
          <p class="text-3xl font-bold text-green-600 mt-2">8</p>
        </div>
        <div class="p-3 bg-green-100 rounded-full">
          <svg class="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">问题项</p>
          <p class="text-3xl font-bold text-red-600 mt-2">4</p>
        </div>
        <div class="p-3 bg-red-100 rounded-full">
          <svg class="h-8 w-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- 问题列表 -->
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">合规性检查结果</h3>
    </div>
    <div class="divide-y divide-gray-200">
      <!-- 问题项 -->
      <div class="px-6 py-4 bg-red-50">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <h4 class="font-semibold text-red-900">合同与招标文件的项目进度要求不一致</h4>
            </div>
            <div class="mt-2 text-sm text-red-800">
              <p><strong>招标文件:</strong> 项目周期 6 个月</p>
              <p><strong>合同文件:</strong> 项目周期 8 个月</p>
              <p class="mt-1 text-red-600">差异: 延长 2 个月</p>
            </div>
          </div>
          <div class="flex space-x-2 ml-4">
            <button class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
              标记为已知
            </button>
            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              去校验
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```


### 4. 数据比对结果组件

#### 页面布局

采用四个独立卡片展示比对结果:

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="grid grid-cols-2 gap-6">
    <!-- 卡片 1: 项目金额与付款比对 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 bg-blue-50">
        <h3 class="text-lg font-semibold text-blue-900">💰 项目金额与付款比对</h3>
      </div>
      <div class="p-6 space-y-4">
        <!-- 比对项 -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">项目价格税率一致性</span>
          <span class="flex items-center text-green-600">
            <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            一致
          </span>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-sm font-medium text-gray-700">付款进度状态</span>
              <p class="text-xs text-gray-500 mt-1">第 1 次付款</p>
            </div>
            <span class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
              项目质控审核付款材料不齐
            </span>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            <p>应付金额: ¥ 360,000.00</p>
            <p>付款期限: 2026-01-22</p>
            <p class="text-yellow-600 mt-1">⚠️ 距离期限还有 3 天</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 卡片 2: 项目进度对比 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 bg-green-50">
        <h3 class="text-lg font-semibold text-green-900">📅 项目进度对比</h3>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">需求调研与方案设计阶段</span>
          <span class="flex items-center text-green-600">
            <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            正常
          </span>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-sm font-medium text-gray-700">开发上线阶段</span>
              <p class="text-xs text-gray-500 mt-1">当前阶段</p>
            </div>
            <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
              超过约定期限
            </span>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            <p>计划完成: 2026-03-15</p>
            <p>实际进度: 延期 5 天</p>
            <p class="text-red-600 mt-1">🚨 已超期,需要关注</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 卡片 3: 交付成果比对 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 bg-purple-50">
        <h3 class="text-lg font-semibold text-purple-900">📦 交付成果比对</h3>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-sm font-medium text-gray-700">需求调研阶段交付物</span>
            <p class="text-xs text-gray-500 mt-1">应交付 3 项</p>
          </div>
          <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            交付物不齐全
          </span>
        </div>
        <div class="mt-2 space-y-2">
          <div class="flex items-center text-sm">
            <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-700">需求调研报告</span>
          </div>
          <div class="flex items-center text-sm">
            <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-700">方案设计文档</span>
          </div>
          <div class="flex items-center text-sm">
            <svg class="h-4 w-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="text-red-700">技术方案评审报告 (缺失)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 卡片 4: 人员要求比对 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 bg-orange-50">
        <h3 class="text-lg font-semibold text-orange-900">👥 人员要求比对</h3>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">建设期驻场人员数量</span>
          <span class="flex items-center text-green-600">
            <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            达标 (3/3)
          </span>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-sm font-medium text-gray-700">项目人员一致性</span>
              <p class="text-xs text-gray-500 mt-1">与投标材料对比</p>
            </div>
            <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
              不一致
            </span>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            <p class="text-red-600">⚠️ 实际项目经理与投标材料不符</p>
            <p class="mt-1">投标: 李四</p>
            <p>实际: 张三</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```


### 5. 预警管理组件

#### 页面布局

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- 页面标题 -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">预警管理</h1>
    <p class="mt-2 text-sm text-gray-600">查看和处理项目预警信息</p>
  </div>

  <!-- 筛选栏 -->
  <div class="bg-white rounded-lg shadow p-4 mb-6">
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <span class="text-sm font-medium text-gray-700">预警级别:</span>
        <button class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">全部</button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">提醒</button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">即将延期</button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">已延期</button>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-sm font-medium text-gray-700">状态:</span>
        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">未处理</button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">已处理</button>
        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">已忽略</button>
      </div>
    </div>
  </div>

  <!-- 预警列表 -->
  <div class="space-y-4">
    <!-- 预警项 - 已延期 -->
    <div class="bg-white rounded-lg shadow border-l-4 border-red-500">
      <div class="p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center">
              <span class="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full mr-3">
                已延期
              </span>
              <h3 class="text-lg font-semibold text-gray-900">项目进度延期</h3>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <p><strong>项目:</strong> 智慧园区二期工程</p>
              <p><strong>阶段:</strong> 开发上线阶段</p>
              <p><strong>预警内容:</strong> 当前阶段已延期 5 天,计划完成时间为 2026-03-15</p>
              <p class="text-red-600 mt-1">🚨 已发送平台消息和雅办公通知</p>
            </div>
            <div class="mt-3 flex items-center text-xs text-gray-500">
              <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              2026-01-20 14:30
            </div>
          </div>
          <div class="flex space-x-2 ml-4">
            <button class="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              忽略
            </button>
            <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              标记已处理
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 预警项 - 即将延期 -->
    <div class="bg-white rounded-lg shadow border-l-4 border-yellow-500">
      <div class="p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center">
              <span class="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full mr-3">
                即将延期
              </span>
              <h3 class="text-lg font-semibold text-gray-900">付款期限临近</h3>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <p><strong>项目:</strong> 智慧园区二期工程</p>
              <p><strong>付款:</strong> 第 1 次付款</p>
              <p><strong>预警内容:</strong> 距离付款期限还有 3 天,应付金额 ¥ 360,000.00</p>
              <p class="text-yellow-600 mt-1">⚠️ 已发送平台消息和雅办公通知</p>
            </div>
            <div class="mt-3 flex items-center text-xs text-gray-500">
              <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              2026-01-19 09:00
            </div>
          </div>
          <div class="flex space-x-2 ml-4">
            <button class="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              忽略
            </button>
            <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              标记已处理
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 预警项 - 提醒 -->
    <div class="bg-white rounded-lg shadow border-l-4 border-blue-500">
      <div class="p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center">
              <span class="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mr-3">
                提醒
              </span>
              <h3 class="text-lg font-semibold text-gray-900">交付物归档提醒</h3>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <p><strong>项目:</strong> 数据中心升级改造</p>
              <p><strong>阶段:</strong> 需求调研阶段</p>
              <p><strong>预警内容:</strong> 距离交付物归档期限还有 7 天,请及时上传交付物</p>
              <p class="text-blue-600 mt-1">ℹ️ 已发送平台消息</p>
            </div>
            <div class="mt-3 flex items-center text-xs text-gray-500">
              <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              2026-01-18 16:00
            </div>
          </div>
          <div class="flex space-x-2 ml-4">
            <button class="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              忽略
            </button>
            <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              标记已处理
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```


## 数据模型

### 文档对象

```javascript
interface Document {
  id: string;
  name: string;
  type: 'initiation' | 'bidding' | 'contract';
  format: 'excel' | 'word' | 'pdf';
  size: number;
  source: 'manual' | 'sync';
  uploadTime: string;
  status: 'uploading' | 'extracting' | 'completed' | 'failed';
  extractionProgress: number;
}
```

### 结构化内容对象

```javascript
interface StructuredContent {
  projectId: string;
  budget: BudgetInfo;
  schedule: ScheduleInfo;
  deliverables: DeliverableInfo[];
  personnel: PersonnelInfo;
  dataSource: 'contract' | 'bidding' | 'initiation';
}

interface BudgetInfo {
  taxIncludedPrice: number;
  taxRate: number;
  taxExcludedPrice: number;
  vat: number;
  paymentTerms: PaymentTerm[];
  dataSource: string;
}

interface PaymentTerm {
  sequence: number;
  condition: string;
  amount: number;
  percentage: number;
  deadline: string;
  dataSource: string;
}

interface ScheduleInfo {
  startDate: string;
  totalDuration: number;
  milestones: Milestone[];
}

interface Milestone {
  name: string;
  date: string;
  dataSource: string;
}
```

### 合规性检查结果

```javascript
interface ComplianceCheckResult {
  projectId: string;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  issues: ComplianceIssue[];
}

interface ComplianceIssue {
  id: string;
  type: 'schedule_mismatch' | 'personnel_mismatch' | 'document_missing' | 'qualification_insufficient';
  severity: 'high' | 'medium' | 'low';
  description: string;
  details: {
    expected: string;
    actual: string;
    difference: string;
  };
  status: 'pending' | 'acknowledged' | 'ignored';
}
```

### 数据比对结果

```javascript
interface ComparisonResult {
  projectId: string;
  budgetComparison: BudgetComparisonResult;
  scheduleComparison: ScheduleComparisonResult;
  deliverableComparison: DeliverableComparisonResult;
  personnelComparison: PersonnelComparisonResult;
}

interface BudgetComparisonResult {
  priceConsistency: boolean;
  paymentStatus: 'normal' | 'materials_incomplete' | 'approved_not_paid' | 'overdue';
  paymentDetails: {
    sequence: number;
    amount: number;
    deadline: string;
    daysRemaining: number;
  };
}
```

### 预警对象

```javascript
interface Alert {
  id: string;
  projectId: string;
  projectName: string;
  type: 'schedule_delay' | 'payment_due' | 'deliverable_missing' | 'personnel_mismatch';
  level: 'reminder' | 'upcoming_delay' | 'delayed';
  content: string;
  timestamp: string;
  status: 'pending' | 'handled' | 'ignored';
  notificationChannels: ('platform' | 'yabanggong')[];
}
```


## 正确性属性

*属性是一个特征或行为,应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的形式化陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1: 文件格式验证

*对于任何* 上传的文件,如果文件格式不是 Excel、Word 或 PDF,则系统应该拒绝上传并显示错误提示

**验证: 需求 1.1, 1.8**

### 属性 2: 文件大小限制

*对于任何* 上传的文件,如果文件大小超过 50MB,则系统应该拒绝上传并显示错误提示

**验证: 需求 1.9**

### 属性 3: 数据来源优先级

*对于任何* 结构化内容字段,当存在多个数据来源时,系统应该按照"合同 > 招标 > 立项"的优先级显示数据

**验证: 需求 2.5, 2.6**

### 属性 4: 数据来源标注完整性

*对于任何* 显示的结构化内容字段,系统应该标注其数据来源(合同/招标/立项)

**验证: 需求 2.8**

### 属性 5: 交付物分组正确性

*对于任何* 交付物列表,系统应该按照阶段正确分组,每个交付物只属于一个阶段

**验证: 需求 4.2**

### 属性 6: CRUD 操作一致性

*对于任何* 交付物列表,添加操作后列表长度应该增加 1,删除操作后列表长度应该减少 1

**验证: 需求 4.6**

### 属性 7: 人员配置差异标注

*对于任何* 人员要求和实际配置,当两者不一致时,系统应该标注差异

**验证: 需求 5.10**

### 属性 8: 合规性检查一致性

*对于任何* 合同和招标文件,当项目进度要求不一致时,系统应该检测并报告差异

**验证: 需求 6.2**

### 属性 9: 问题项高亮显示

*对于任何* 合规性检查发现的不一致项,系统应该以红色高亮显示

**验证: 需求 6.6**

### 属性 10: 问题统计准确性

*对于任何* 合规性检查结果,显示的问题数量应该等于实际问题项的数量

**验证: 需求 6.9**

### 属性 11: 修改标记自动更新

*对于任何* 用户修改的字段,系统应该自动标记为"已人工校验"

**验证: 需求 7.5**

### 属性 12: 修改历史记录完整性

*对于任何* 字段修改操作,系统应该记录修改历史和修改人

**验证: 需求 7.6**

### 属性 13: 价格税率一致性检查

*对于任何* 项目,当比对价格税率时,系统应该正确判断是否一致

**验证: 需求 8.3**

### 属性 14: 人员数量达标检查

*对于任何* 项目,系统应该检查建设期驻场人员数量是否达到要求

**验证: 需求 8.14**

### 属性 15: 预警级别分类正确性

*对于任何* 预警列表,系统应该按照"提醒"、"即将延期"、"已延期"三个级别正确分类显示

**验证: 需求 9.2**

### 属性 16: 预警通知规则

*对于任何* 预警,当级别为"提醒"时应该仅发送平台消息,当级别为"即将延期"或"已延期"时应该发送平台消息和雅办公通知

**验证: 需求 9.3, 9.4, 9.5**

### 属性 17: 预警状态更新

*对于任何* 预警,用户标记为"已处理"或"忽略"后,状态应该正确更新

**验证: 需求 9.7**

### 属性 18: 语义相似度阈值

*对于任何* 两个交付物名称,当语义相似度超过 80% 时,系统应该标记为"可能相同"

**验证: 需求 10.2**

### 属性 19: 批量导入映射关系

*对于任何* 批量导入的映射关系,系统应该正确建立所有映射

**验证: 需求 10.9**


## 错误处理

### 文件上传错误

1. **格式不支持**: 显示 toast 提示"不支持的文件格式,请上传 Excel、Word 或 PDF 文件"
2. **文件过大**: 显示 toast 提示"文件大小超过 50MB,请压缩后重试"
3. **网络错误**: 显示 toast 提示"上传失败,请检查网络连接"
4. **服务器错误**: 显示 toast 提示"服务器错误,请稍后重试"

### 数据同步错误

1. **生产管理系统不可用**: 显示提示信息"生产管理系统暂时不可用,请使用手动上传功能"
2. **同步超时**: 显示 toast 提示"同步超时,请稍后重试"
3. **权限不足**: 显示 toast 提示"您没有权限访问生产管理系统"

### 数据提取错误

1. **提取失败**: 显示文档状态为"提取失败",提供"重新提取"按钮
2. **置信度过低**: 以红色边框标注低置信度字段,提示用户人工校验

### 数据比对错误

1. **外部系统不可用**: 显示提示信息"外部系统暂时不可用,比对结果可能不完整"
2. **数据缺失**: 显示提示信息"部分数据缺失,无法完成比对"

### 预警通知错误

1. **雅办公通知失败**: 记录日志,显示提示信息"雅办公通知发送失败,已发送平台消息"
2. **通知服务不可用**: 记录日志,稍后重试

## 测试策略

### 单元测试

使用 Jest 进行单元测试,覆盖以下内容:

1. **工具函数测试**
   - 文件格式验证函数
   - 文件大小验证函数
   - 数据来源优先级函数
   - 语义相似度计算函数

2. **组件测试**
   - 文档上传组件
   - 结构化内容展示组件
   - 合规性检查组件
   - 数据比对组件
   - 预警管理组件

### 集成测试

使用 Cypress 进行端到端测试,覆盖以下场景:

1. **文档上传流程**
   - 手动上传文档
   - 从生产管理系统同步文档
   - 文档提取和校验

2. **数据展示流程**
   - 查看结构化内容
   - 切换不同模块
   - 编辑和保存数据

3. **合规性检查流程**
   - 查看检查结果
   - 标记问题为已知
   - 进入人工校验

4. **数据比对流程**
   - 查看比对结果
   - 建立映射关系
   - 导出报告

5. **预警管理流程**
   - 查看预警列表
   - 筛选预警
   - 处理预警

### 属性测试

使用 fast-check 进行属性测试,每个测试运行至少 100 次迭代:

1. **属性 1-2**: 文件验证属性
2. **属性 3-4**: 数据来源属性
3. **属性 5-6**: 交付物管理属性
4. **属性 7-10**: 合规性检查属性
5. **属性 11-14**: 数据比对属性
6. **属性 15-17**: 预警管理属性
7. **属性 18-19**: 语义比对属性

每个属性测试应该标注:
```javascript
// Feature: workflow-optimization-frontend, Property 1: 文件格式验证
```

## 性能考虑

### 文件上传优化

1. **分片上传**: 大文件分片上传,支持断点续传
2. **并发限制**: 限制同时上传的文件数量为 3 个
3. **压缩**: 客户端压缩后上传

### 数据渲染优化

1. **虚拟滚动**: 长列表使用虚拟滚动
2. **懒加载**: 标签页内容懒加载
3. **防抖**: 搜索和筛选使用防抖

### 数据缓存

1. **本地缓存**: 使用 localStorage 缓存结构化内容
2. **缓存失效**: 文档更新后清除相关缓存

## 安全考虑

### 文件上传安全

1. **文件类型验证**: 前后端双重验证
2. **文件大小限制**: 防止 DoS 攻击
3. **病毒扫描**: 后端进行病毒扫描

### 数据安全

1. **权限控制**: 基于角色的访问控制
2. **数据加密**: 敏感数据传输加密
3. **审计日志**: 记录所有数据修改操作

### XSS 防护

1. **输入验证**: 验证所有用户输入
2. **输出转义**: 转义所有输出内容
3. **CSP**: 配置内容安全策略

