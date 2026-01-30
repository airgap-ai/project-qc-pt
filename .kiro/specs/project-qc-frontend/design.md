# 设计文档 - 项目质控助手前端界面

## 概述

本文档描述了项目质控助手前端界面的技术设计方案。系统采用现代化的单页应用（SPA）架构，使用 React + TypeScript 技术栈，配合 Tailwind CSS 实现响应式设计。

前端系统包含以下核心页面：
- 主导航框架与项目总览仪表板
- AI 校对工作台（HITL Workbench）
- 项目详情与阶段流转页
- 任务中心异步处理界面

## 架构设计

### 技术栈选择

**前端框架：** React 18+ with TypeScript
- 理由：组件化开发、强类型支持、丰富的生态系统

**状态管理：** Zustand
- 理由：轻量级、简单易用、TypeScript 友好

**路由管理：** React Router v6
- 理由：声明式路由、支持嵌套路由和面包屑导航

**UI 组件库：** Tailwind CSS + Headless UI
- 理由：高度可定制、原子化 CSS、无样式冲突

**HTTP 客户端：** Axios
- 理由：拦截器支持、请求取消、错误处理

**表单管理：** React Hook Form
- 理由：性能优秀、验证灵活、TypeScript 支持

**PDF 预览：** react-pdf
- 理由：支持 PDF 渲染、缩放、旋转

**通知系统：** react-hot-toast
- 理由：轻量级、可定制、动画流畅

### 应用架构

```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件（Button, Input, Modal等）
│   ├── layout/         # 布局组件（Header, Sidebar, Breadcrumb）
│   └── features/       # 功能组件（DocumentViewer, StageProgress等）
├── pages/              # 页面组件
│   ├── Dashboard/      # 项目总览仪表板
│   ├── ProjectDetail/  # 项目详情页
│   ├── TaskCenter/     # 任务中心
│   └── HITLWorkbench/  # AI 校对工作台
├── stores/             # Zustand 状态管理
│   ├── authStore.ts    # 用户认证状态
│   ├── projectStore.ts # 项目数据状态
│   ├── taskStore.ts    # 任务数据状态
│   └── notificationStore.ts # 通知状态
├── services/           # API 服务层
│   ├── api.ts          # Axios 实例配置
│   ├── projectService.ts
│   ├── documentService.ts
│   └── taskService.ts
├── hooks/              # 自定义 Hooks
│   ├── usePolling.ts   # 轮询 Hook
│   ├── useWebSocket.ts # WebSocket Hook
│   └── useNotification.ts # 通知 Hook
├── types/              # TypeScript 类型定义
│   ├── project.ts
│   ├── document.ts
│   └── task.ts
└── utils/              # 工具函数
    ├── formatters.ts   # 格式化函数
    └── validators.ts   # 验证函数
```

## 组件设计与接口

### 1. 主导航框架

#### Header 组件

```typescript
interface HeaderProps {
  user: User;
  notifications: Notification[];
  onLogout: () => void;
}

interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
```

**功能：**
- 显示系统 Logo 和主菜单
- 显示用户信息和下拉菜单
- 显示通知图标和未读计数
- 点击通知图标展开通知列表

#### Breadcrumb 组件

```typescript
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}
```

**功能：**
- 显示当前页面路径
- 支持点击导航到上级页面

### 2. 项目总览仪表板

#### ProjectCard 组件

```typescript
interface ProjectCardProps {
  project: Project;
  onClick: (projectId: string) => void;
}

interface Project {
  id: string;
  name: string;
  currentStage: 'planning' | 'bidding' | 'implementation' | 'acceptance';
  status: 'normal' | 'warning' | 'delayed';
  manager: string;
  startDate: Date;
  endDate: Date;
  progress: number;
}
```

**功能：**
- 显示项目基本信息
- 显示状态指示器（红/黄/绿灯）
- 点击卡片导航到项目详情页

#### StatisticsCard 组件

```typescript
interface StatisticsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}
```

**功能：**
- 显示统计数据（进行中项目数、待验收数、预警数）
- 显示趋势指示器

### 3. AI 校对工作台

#### DocumentViewer 组件

```typescript
interface DocumentViewerProps {
  documentUrl: string;
  fileType: 'pdf' | 'image';
  boundingBoxes: BoundingBox[];
  stamps: StampDetection[];
  onPageChange: (page: number) => void;
}

interface BoundingBox {
  id: string;
  fieldName: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

interface StampDetection {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}
```

**功能：**
- 渲染 PDF 或图片文档
- 支持缩放、旋转、拖拽
- 高亮显示定位框
- 滚动到指定区域

#### DataForm 组件

```typescript
interface DataFormProps {
  fields: FormField[];
  onFieldClick: (fieldName: string) => void;
  onSubmit: (data: Record<string, any>) => void;
  onReject: () => void;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'toggle';
  value: any;
  confidence: number;
  required: boolean;
  readonly: boolean;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
}
```

**功能：**
- 渲染结构化数据表单
- 根据置信度显示不同样式（高置信度/低置信度/空值）
- 点击字段触发文档定位
- 表单验证和提交

### 4. 项目详情与阶段流转页

#### StageProgress 组件

```typescript
interface StageProgressProps {
  stages: Stage[];
  currentStageId: string;
}

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'blocked' | 'pending';
  startDate?: Date;
  endDate?: Date;
  actualEndDate?: Date;
}
```

**功能：**
- 显示箭头状进度条
- 根据状态显示不同颜色和图标
- 高亮当前阶段

#### DocumentList 组件

```typescript
interface DocumentListProps {
  documents: Document[];
  onUpload: () => void;
  onReview: (documentId: string) => void;
  onPreview: (documentId: string) => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'processing' | 'need_review' | 'completed';
  uploadTime: Date;
  reviewer?: string;
  errorMessage?: string;
}
```

**功能：**
- 显示文档清单
- 显示文档状态（待上传/解析中/需补录/已完成）
- 提供上传、校对、预览操作

#### DiagnosticCard 组件

```typescript
interface DiagnosticCardProps {
  risk: Risk;
  onAction: (actionType: string) => void;
}

interface Risk {
  id: string;
  type: 'delay' | 'missing_document' | 'compliance';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  actions: Action[];
}

interface Action {
  type: string;
  label: string;
  icon?: string;
}
```

**功能：**
- 显示风险诊断信息
- 提供整改建议和操作按钮

### 5. 任务中心

#### TaskList 组件

```typescript
interface TaskListProps {
  tasks: Task[];
  filters: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onTaskAction: (taskId: string, action: string) => void;
}

interface Task {
  id: string;
  fileName: string;
  projectId: string;
  projectName: string;
  uploadTime: Date;
  status: 'queued' | 'processing' | 'need_review' | 'completed' | 'failed';
  progress?: number;
  errorMessage?: string;
}

interface TaskFilter {
  status?: string;
  searchQuery?: string;
}
```

**功能：**
- 显示任务列表
- 显示任务状态和进度
- 提供筛选和搜索功能
- 提供操作按钮（去校对、查看详情）

#### TaskNotification 组件

```typescript
interface TaskNotificationProps {
  tasks: Task[];
  onDismiss: (taskId: string) => void;
  onNavigate: (taskId: string) => void;
}
```

**功能：**
- 显示悬浮通知
- 显示正在处理的任务数量
- 任务完成时弹出通知

## 数据模型

### 项目数据模型

```typescript
interface ProjectDetail extends Project {
  description: string;
  budget: number;
  contractAmount: number;
  paidAmount: number;
  stages: StageDetail[];
  documents: Document[];
  risks: Risk[];
}

interface StageDetail extends Stage {
  requiredDocuments: string[];
  completedDocuments: string[];
  delayDays?: number;
}
```

### 文档数据模型

```typescript
interface DocumentDetail extends Document {
  fileUrl: string;
  fileSize: number;
  pageCount: number;
  ocrResult: OCRResult;
  extractedFields: Record<string, ExtractedField>;
  auditStatus: 'pending' | 'pass' | 'reject' | 'force_pass';
  auditReason?: string;
}

interface OCRResult {
  text: string;
  boundingBoxes: BoundingBox[];
  stamps: StampDetection[];
  confidence: number;
}

interface ExtractedField {
  value: any;
  confidence: number;
  boundingBox?: BoundingBox;
}
```

### 任务数据模型

```typescript
interface TaskDetail extends Task {
  documentId?: string;
  startTime?: Date;
  endTime?: Date;
  processingLog: ProcessingLog[];
}

interface ProcessingLog {
  timestamp: Date;
  stage: string;
  message: string;
  status: 'info' | 'success' | 'error';
}
```

## 错误处理

### HTTP 错误处理

```typescript
// Axios 拦截器配置
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转登录页
          router.push('/login');
          break;
        case 403:
          // 无权限
          toast.error('您没有权限执行此操作');
          break;
        case 404:
          // 资源不存在
          toast.error('请求的资源不存在');
          break;
        case 500:
          // 服务器错误
          toast.error('服务器错误，请稍后重试');
          break;
        default:
          toast.error(error.response.data.message || '请求失败');
      }
    } else if (error.request) {
      // 网络错误
      toast.error('网络连接失败，请检查网络');
    }
    return Promise.reject(error);
  }
);
```

### 表单验证错误

```typescript
// 使用 React Hook Form 的验证
const formSchema = {
  signingDate: {
    required: '签署日期为必填项',
    validate: (value: string) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return '请输入有效的日期';
      }
      if (date > new Date()) {
        return '签署日期不能晚于今天';
      }
      return true;
    }
  }
};
```

### 文件上传错误

```typescript
const handleFileUpload = async (file: File) => {
  // 文件大小验证
  if (file.size > 50 * 1024 * 1024) {
    toast.error('文件大小不能超过 50MB');
    return;
  }
  
  // 文件类型验证
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    toast.error('仅支持 PDF、JPG、PNG 格式');
    return;
  }
  
  try {
    await uploadDocument(file);
    toast.success('文件上传成功');
  } catch (error) {
    toast.error('文件上传失败，请重试');
  }
};
```

## 测试策略

### 单元测试

使用 Jest + React Testing Library 进行组件单元测试：

**测试范围：**
- 组件渲染测试
- 用户交互测试（点击、输入）
- 状态变化测试
- Props 传递测试

**示例：**
```typescript
describe('ProjectCard', () => {
  it('应该显示项目名称和状态', () => {
    const project = {
      id: '1',
      name: '智慧园区二期',
      status: 'warning',
      // ...
    };
    render(<ProjectCard project={project} onClick={jest.fn()} />);
    expect(screen.getByText('智慧园区二期')).toBeInTheDocument();
  });
  
  it('点击卡片应该触发 onClick 回调', () => {
    const onClick = jest.fn();
    render(<ProjectCard project={mockProject} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('1');
  });
});
```

### 集成测试

测试多个组件协同工作：

**测试范围：**
- 页面路由跳转
- 表单提交流程
- API 调用和数据更新
- 状态管理集成

**示例：**
```typescript
describe('AI 校对工作台流程', () => {
  it('应该完成完整的校对流程', async () => {
    render(<HITLWorkbench />);
    
    // 点击字段，验证文档高亮
    fireEvent.click(screen.getByLabelText('签署日期'));
    expect(screen.getByTestId('bounding-box-active')).toBeInTheDocument();
    
    // 修改字段值
    fireEvent.change(screen.getByLabelText('签署日期'), {
      target: { value: '2026-01-07' }
    });
    
    // 提交表单
    fireEvent.click(screen.getByText('保存并校验'));
    
    // 验证 API 调用
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        signingDate: '2026-01-07'
      });
    });
  });
});
```

### E2E 测试

使用 Playwright 进行端到端测试：

**测试场景：**
- 用户登录流程
- 项目创建和查看流程
- 文档上传和校对流程
- 任务状态更新流程

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的正式陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1: 导航一致性

*对于任何*页面和任何导航操作，执行导航后，面包屑应该准确反映当前页面路径，并且所有面包屑链接应该可以导航回上级页面

**验证需求: 1.11, 3.2, 3.4, 4.2, 5.1**

### 属性 2: 状态颜色一致性

*对于任何*显示状态的组件（项目卡片、阶段进度、任务列表），相同的状态值应该始终使用相同的颜色编码（绿色=成功/完成，蓝色=进行中，红色=错误/延期，黄色=警告，灰色=待处理）

**验证需求: 2.3, 2.4, 2.5, 4.3, 4.4, 4.5, 5.8, 5.9, 5.10, 5.11, 6.1**

### 属性 3: 字段置信度显示

*对于任何*提取的字段，如果置信度高于阈值（如 80%），应该显示为正常样式；如果置信度低于阈值或为空，应该显示为红色警告样式并标记"[需确认]"

**验证需求: 3.5, 3.6**

### 属性 4: 必填字段验证

*对于任何*表单，如果存在未填写的必填字段，提交操作应该被阻止，并在相应字段附近显示错误提示

**验证需求: 3.8, 7.8**

### 属性 5: 文档定位同步

*对于任何*校对工作台中的字段，点击该字段后，文档预览区应该滚动到对应的定位框位置，并高亮显示该定位框

**验证需求: 3.2**

### 属性 6: 任务状态转换

*对于任何*文档解析任务，状态转换应该遵循以下顺序：排队中 → OCR 识别中 → (待人工校验 或 已完成 或 解析失败)，不应该出现逆向转换或跳跃转换

**验证需求: 5.8, 5.9, 5.10, 5.11**

### 属性 7: 通知触发时机

*对于任何*文档解析任务，当状态从"OCR 识别中"转换为"待人工校验"或"已完成"时，系统应该触发一次且仅一次通知

**验证需求: 5.4**

### 属性 8: 阶段状态与文档状态一致性

*对于任何*项目阶段，如果该阶段的所有必需文档都处于"已完成"状态，则该阶段应该显示为"已完成"（绿色）；如果存在任何"需补录"或"待上传"的文档，则该阶段不应该显示为"已完成"

**验证需求: 4.2, 4.7**

### 属性 9: 日期格式一致性

*对于任何*显示日期的位置，日期格式应该统一为 YYYY-MM-DD 格式

**验证需求: 7.4**

### 属性 10: 货币格式一致性

*对于任何*显示货币金额的位置，格式应该统一为带千位分隔符的格式（¥ 1,000,000.00）

**验证需求: 7.5**

### 属性 11: 权限控制一致性

*对于任何*需要管理员权限的操作（如"强制通过本阶段"），只有当用户角色为 admin 时，相关按钮才应该可见和可操作

**验证需求: 4.12**

### 属性 12: 搜索结果准确性

*对于任何*搜索查询，返回的结果应该只包含文件名或项目名称中包含查询关键词的任务或项目

**验证需求: 2.8, 5.15**

### 属性 13: 进度条准确性

*对于任何*显示进度的任务，进度条的百分比应该与任务的实际完成百分比一致，且范围应该在 0-100 之间

**验证需求: 5.9**

### 属性 14: 徽章计数准确性

*对于任何*显示计数徽章的位置（如"需人工处理"标签），徽章显示的数字应该等于对应状态的任务实际数量

**验证需求: 5.14**

### 属性 15: 表单数据持久化

*对于任何*用户在表单中输入的数据，在页面刷新或意外关闭前，数据应该被保存（通过 localStorage 或状态管理），刷新后应该能够恢复

**验证需求: 7.7**
