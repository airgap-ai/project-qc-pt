---
inclusion: always
---

# 项目质控助手 - 设计系统规则

本文档定义了项目质控助手的设计系统规范，用于指导 Figma 设计到代码的转换过程。

## 1. 设计 Token 定义

### 1.1 颜色系统

#### 主色（Primary）
- **Blue 600** (`#2563eb`) - 主要按钮、链接、导航激活状态
- **Blue 700** (`#1d4ed8`) - 悬停状态
- **Blue 100** (`#dbeafe`) - 背景色
- **Blue 50** (`#eff6ff`) - 浅背景

#### 状态色（Status）

**成功（Success）**
- **Green 600** (`#16a34a`) - 成功按钮、成功状态
- **Green 500** (`#22c55e`) - 绿灯指示器
- **Green 100** (`#dcfce7`) - 成功背景

**警告（Warning）**
- **Yellow 600** (`#ca8a04`) - 警告按钮
- **Yellow 500** (`#eab308`) - 黄灯指示器
- **Yellow 100** (`#fef9c3`) - 警告背景

**错误/危险（Error/Danger）**
- **Red 600** (`#dc2626`) - 错误按钮、危险操作
- **Red 500** (`#ef4444`) - 红灯指示器
- **Red 100** (`#fee2e2`) - 错误背景
- **Red 50** (`#fef2f2`) - 低置信度背景

#### 中性色（Neutral）
- **Gray 900** (`#111827`) - 主标题
- **Gray 700** (`#374151`) - 正文文本
- **Gray 600** (`#4b5563`) - 次要文本
- **Gray 300** (`#d1d5db`) - 边框
- **Gray 100** (`#f3f4f6`) - 页面背景
- **Gray 50** (`#f9fafb`) - 卡片背景

### 1.2 字体系统

**字体家族**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**字号与字重**
- 页面主标题: `text-4xl` (36px) / `font-bold` (700)
- 区块标题: `text-3xl` (30px) / `font-bold` (700)
- 卡片标题: `text-2xl` (24px) / `font-bold` (700)
- 小标题: `text-xl` (20px) / `font-semibold` (600)
- 列表标题: `text-lg` (18px) / `font-semibold` (600)
- 正文文本: `text-base` (16px) / `font-normal` (400)
- 次要文本: `text-sm` (14px) / `font-normal` (400)
- 辅助文本: `text-xs` (12px) / `font-normal` (400)

### 1.3 间距系统

使用 Tailwind 的 4px 基础单位系统：
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px

**使用建议**
- 组件内部间距: `p-4` 或 `p-6`
- 卡片间距: `gap-4` 或 `gap-6`
- 区块间距: `mb-6` 或 `mb-8`
- 页面边距: `px-4 sm:px-6 lg:px-8`

## 2. 组件库

### 2.1 组件位置
所有 UI 组件定义在 `frontend/` 目录下的 HTML 文件中：
- `frontend/components.html` - 组件样式库
- `frontend/design-system.html` - 设计规范文档
- `frontend/dashboard.html` - 仪表板页面
- `frontend/task-center.html` - 任务中心
- `frontend/hitl-workbench.html` - AI 校对工作台
- `frontend/project-detail.html` - 项目详情
- `frontend/rule-config.html` - 规则配置

### 2.2 组件架构
- 使用原生 HTML + Tailwind CSS
- 交互逻辑在 `frontend/interactions.js` 中实现
- 无框架依赖，纯静态页面

### 2.3 核心组件样式

#### 按钮（Buttons）

**主要按钮（Primary）**
```html
<button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow transition">
    主要操作
</button>
```

**次要按钮（Secondary）**
```html
<button class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
    次要操作
</button>
```

**危险按钮（Danger）**
```html
<button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow transition">
    删除操作
</button>
```

**幽灵按钮（Ghost）**
```html
<button class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition">
    幽灵按钮
</button>
```

#### 输入框（Input）

**正常状态**
```html
<input type="text" 
       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
```

**错误状态**
```html
<input type="text" 
       class="w-full px-3 py-2 border-2 border-red-500 bg-red-50 rounded-md">
```

**禁用状态**
```html
<input type="text" disabled
       class="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed">
```

#### 徽章（Badges）
```html
<span class="px-2 py-1 text-xs font-semibold rounded-full bg-{color}-100 text-{color}-800">
    状态文本
</span>
```

状态颜色映射：
- 已完成: `bg-green-100 text-green-800`
- 进行中: `bg-blue-100 text-blue-800`
- 预警: `bg-yellow-100 text-yellow-800`
- 延期: `bg-red-100 text-red-800`
- 待处理: `bg-gray-100 text-gray-800`

#### 卡片（Cards）

**基础卡片**
```html
<div class="bg-white rounded-lg shadow p-6">
    <!-- 卡片内容 -->
</div>
```

**可交互卡片**
```html
<div class="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
    <!-- 卡片内容 -->
</div>
```

#### 进度条（Progress）
```html
<div class="w-full bg-gray-200 rounded-full h-2">
    <div class="bg-blue-600 h-2 rounded-full" style="width: {percent}%"></div>
</div>
```

## 3. 框架与库

### 3.1 UI 框架
- **无框架** - 使用原生 HTML/CSS/JavaScript

### 3.2 样式库
- **Tailwind CSS** (CDN 版本) - 通过 `<script src="https://cdn.tailwindcss.com"></script>` 引入

### 3.3 构建系统
- **无构建系统** - 纯静态 HTML 文件，直接在浏览器中运行

## 4. 资源管理

### 4.1 资源存储
- 所有静态资源内联在 HTML 文件中
- 使用 Heroicons SVG 图标（内联）
- 无外部图片或视频资源

### 4.2 资源优化
- 使用 Tailwind CDN 进行样式优化
- SVG 图标直接内联，减少 HTTP 请求

### 4.3 CDN 配置
- Tailwind CSS CDN: `https://cdn.tailwindcss.com`

## 5. 图标系统

### 5.1 图标库
使用 **Heroicons** 作为图标库，保持视觉一致性

### 5.2 图标存储
图标以 SVG 格式内联在 HTML 中

### 5.3 图标使用
```html
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="..." />
</svg>
```

### 5.4 尺寸规范
- 小图标: `h-4 w-4` (16px)
- 常规图标: `h-5 w-5` (20px) 或 `h-6 w-6` (24px)
- 大图标: `h-8 w-8` (32px)

### 5.5 图标命名约定
使用 Heroicons 的标准命名，如：
- `bell` - 通知
- `check-circle` - 完成
- `exclamation-triangle` - 警告
- `search` - 搜索

## 6. 样式方法

### 6.1 CSS 方法论
- **Utility-First CSS** - 使用 Tailwind CSS 的实用类

### 6.2 全局样式
少量自定义样式定义在 `<style>` 标签中：
```css
.color-swatch {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.code-block {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    overflow-x: auto;
}
```

### 6.3 响应式设计
使用 Tailwind 的响应式断点：
- `sm:` - 640px 及以上
- `md:` - 768px 及以上
- `lg:` - 1024px 及以上
- `xl:` - 1280px 及以上

## 7. 项目结构

```
frontend/
├── components.html              # 组件样式库
├── design-system.html           # 设计规范文档
├── dashboard.html               # 仪表板页面
├── task-center.html             # 任务中心
├── hitl-workbench.html          # AI 校对工作台
├── project-detail.html          # 项目详情
├── project-detail-initiation.html    # 项目详情-立项阶段
├── project-detail-bidding.html       # 项目详情-招标阶段
├── project-detail-acceptance.html    # 项目详情-验收阶段
├── rule-config.html             # 规则配置
├── template-edit.html           # 模板编辑
└── interactions.js              # 交互脚本
```

## 8. Figma 集成指南

### 8.1 从 Figma 到代码的转换规则

当使用 Figma MCP 工具生成代码时，遵循以下规则：

1. **保留 Tailwind 类名** - Figma MCP 输出的 Tailwind 类名应直接使用
2. **颜色映射** - 将 Figma 中的颜色映射到本项目的颜色 token
3. **字体映射** - 使用本项目定义的字号和字重
4. **间距调整** - 使用 Tailwind 的间距单位（4px 基础）
5. **组件复用** - 优先使用现有组件样式，而不是创建新的

### 8.2 颜色映射表

| Figma 颜色 | 项目 Token | Tailwind 类 |
|-----------|-----------|------------|
| Primary Blue | Blue 600 | `bg-blue-600` `text-blue-600` |
| Success Green | Green 600 | `bg-green-600` `text-green-600` |
| Warning Yellow | Yellow 600 | `bg-yellow-600` `text-yellow-600` |
| Error Red | Red 600 | `bg-red-600` `text-red-600` |
| Text Primary | Gray 900 | `text-gray-900` |
| Text Secondary | Gray 600 | `text-gray-600` |
| Border | Gray 300 | `border-gray-300` |
| Background | Gray 50 | `bg-gray-50` |

### 8.3 组件映射

| Figma 组件 | 项目组件 | 样式类 |
|-----------|---------|--------|
| Primary Button | 主要按钮 | `px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow transition` |
| Secondary Button | 次要按钮 | `px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition` |
| Input Field | 输入框 | `w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500` |
| Card | 卡片 | `bg-white rounded-lg shadow p-6` |
| Badge | 徽章 | `px-2 py-1 text-xs font-semibold rounded-full bg-{color}-100 text-{color}-800` |

### 8.4 布局规范

**容器宽度**
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 内容 -->
</div>
```

**网格系统**
```html
<!-- 1列 -> 2列 -> 3列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- 网格项 -->
</div>
```

### 8.5 交互规范

**悬停效果**
- 按钮: `hover:bg-{color}-700`
- 卡片: `hover:shadow-lg`
- 链接: `hover:text-{color}-900`
- 所有交互元素添加 `transition` 类

**焦点状态**
```html
focus:ring-2 focus:ring-blue-500 focus:border-blue-500
```

**动画时长**
- 快速交互: 150ms
- 标准交互: 300ms
- 慢速交互: 500ms

## 9. 代码示例

### 9.1 完整页面结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题 - 项目质控助手</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- 顶部导航 -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <!-- 导航内容 -->
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 页面内容 -->
    </div>

    <!-- 交互脚本 -->
    <script src="interactions.js"></script>
</body>
</html>
```

### 9.2 项目卡片示例
```html
<a href="project-detail.html" class="block">
    <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
        <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">智慧园区二期工程</h3>
            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center">
                <span class="font-medium mr-2">当前阶段:</span>
                <span>实施阶段</span>
            </div>
            <div class="flex items-center">
                <span class="font-medium mr-2">项目经理:</span>
                <span>张三</span>
            </div>
        </div>
    </div>
</a>
```

## 10. 最佳实践

### 10.1 从 Figma 生成代码时
1. 使用 `get_design_context` 工具获取设计上下文
2. 检查生成的 Tailwind 类是否符合项目规范
3. 替换不符合规范的颜色和间距
4. 复用现有组件样式
5. 确保响应式设计正确实现

### 10.2 代码质量
1. 保持 HTML 结构清晰
2. 使用语义化的 HTML 标签
3. 确保可访问性（ARIA 标签、alt 文本等）
4. 保持一致的命名约定
5. 添加必要的注释

### 10.3 性能优化
1. 最小化内联样式
2. 使用 Tailwind 的实用类而不是自定义 CSS
3. 优化 SVG 图标
4. 减少不必要的 DOM 嵌套

---

**文档版本**: 1.0  
**最后更新**: 2026-01-08  
**维护者**: 项目质控助手团队
