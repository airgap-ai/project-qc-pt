# 需求文档 - 合同结构化提取与进度监测

## 简介

本文档定义了项目质控助手的核心功能：**合同结构化提取与项目节点进度监测**。该功能旨在通过AI技术自动化提取合同、会议纪要等文档中的关键信息，并基于提取的信息实现项目全生命周期的自动化监测和预警，提升项目管理效率，降低合规风险。

## 术语表

- **System（系统）**: 项目质控助手系统
- **Extraction_Engine（提取引擎）**: 负责从文档中提取结构化信息的AI引擎
- **Monitoring_Engine（监测引擎）**: 负责项目进度监测和预警的引擎
- **Document（文档）**: 包括合同、会议纪要、履约保证函等项目相关文档
- **Milestone（里程碑）**: 项目建设过程中的关键时间节点
- **Alert（预警）**: 当检测到风险或异常时发出的通知
- **Structured_Data（结构化数据）**: 从文档中提取的、以标准格式存储的关键信息
- **Payment_Condition（付款条件）**: 合同中约定的付款触发条件和时间要求
- **Deliverable（交付物）**: 项目各阶段需要提交的文档和成果
- **Compliance_Tracking（合规跟踪）**: 对合同约定义务的履行情况进行监测

## 需求

### 需求 1：合同价格与付款条件提取

**用户故事：** 作为项目管理人员，我希望系统能够自动提取合同中的价格和付款条件信息，以便准确掌握项目财务安排和付款节点。

#### 验收标准

1. WHEN 用户上传包含签约合同价的合同文档 THEN THE Extraction_Engine SHALL 提取含税价格、税率、不含税价格和增值税金额
2. WHEN 合同文档包含付款条件描述 THEN THE Extraction_Engine SHALL 提取每次付款的触发条件、付款比例和所需材料
3. WHEN 合同文档包含付款期限约定 THEN THE Extraction_Engine SHALL 提取付款期限的具体天数要求
4. WHEN 提取的价格信息包含大写和小写金额 THEN THE Extraction_Engine SHALL 验证大小写金额的一致性
5. WHEN 付款条件包含多个阶段 THEN THE Extraction_Engine SHALL 按照时间顺序结构化存储每个付款阶段的完整信息
6. WHEN 提取完成后 THEN THE System SHALL 将结构化数据存储到数据库中供后续监测使用

### 需求 2：项目建设里程碑时间节点提取

**用户故事：** 作为项目管理人员，我希望系统能够自动识别并提取项目各阶段的时间节点，以便建立项目进度监测基准。

#### 验收标准

1. WHEN 用户上传包含项目时间安排的合同文档 THEN THE Extraction_Engine SHALL 提取项目开始时间和总体项目周期
2. WHEN 合同文档描述项目各阶段时间安排 THEN THE Extraction_Engine SHALL 提取需求调研、方案设计、开发上线、试运行、初验、终验和运维的时间节点
3. WHEN 时间描述使用相对时间（如"合同签订后X个月"） THEN THE Extraction_Engine SHALL 计算并转换为绝对日期
4. WHEN 时间节点存在依赖关系 THEN THE Extraction_Engine SHALL 识别并记录节点之间的依赖关系
5. WHEN 提取的时间节点与付款条件相关联 THEN THE System SHALL 建立时间节点与付款条件的关联关系
6. WHEN 合同中存在特殊时间调整条款（如试运行期重新计算） THEN THE Extraction_Engine SHALL 提取并标记这些特殊规则

### 需求 3：项目交付物内容提取

**用户故事：** 作为项目管理人员，我希望系统能够识别各阶段需要提交的交付物清单，以便跟踪交付物的完整性。

#### 验收标准

1. WHEN 用户上传包含交付物要求的合同文档 THEN THE Extraction_Engine SHALL 按项目阶段分类提取交付物清单
2. WHEN 交付物清单包含文档名称 THEN THE Extraction_Engine SHALL 提取每个交付物的标准名称
3. WHEN 不同阶段有不同的交付物要求 THEN THE Extraction_Engine SHALL 将交付物与对应的项目阶段关联
4. WHEN 交付物清单来自多个文档（合同、会议纪要） THEN THE System SHALL 合并并去重交付物清单
5. WHEN 交付物有特殊要求（如第三方测试报告） THEN THE Extraction_Engine SHALL 提取并标记这些特殊要求
6. WHEN 提取完成后 THEN THE System SHALL 为每个交付物创建跟踪记录

### 需求 4：履约保证函内容提取

**用户故事：** 作为项目管理人员，我希望系统能够提取履约保证函的关键信息，以便监控履约担保的提交和退还。

#### 验收标准

1. WHEN 用户上传履约保证函文档 THEN THE Extraction_Engine SHALL 提取投标时间、担保金额和担保有效期
2. WHEN 履约保证函包含赔偿条款 THEN THE Extraction_Engine SHALL 提取赔偿金赔付条件和支付时限
3. WHEN 履约保证函包含提交和退还时间要求 THEN THE Extraction_Engine SHALL 提取履约担保提交时间和保证金退还时间要求
4. WHEN 担保金额包含大写和小写 THEN THE Extraction_Engine SHALL 验证金额的一致性
5. WHEN 担保有效期使用多种表述方式 THEN THE Extraction_Engine SHALL 识别并统一为标准日期格式
6. WHEN 提取完成后 THEN THE System SHALL 创建履约担保的监测任务

### 需求 5：乙方权利义务内容提取

**用户故事：** 作为项目管理人员，我希望系统能够提取合同中乙方的义务要求，以便监控乙方的履约情况。

#### 验收标准

1. WHEN 用户上传包含乙方义务的合同文档 THEN THE Extraction_Engine SHALL 提取漏洞整改时间节点要求
2. WHEN 合同包含人员配置要求 THEN THE Extraction_Engine SHALL 提取各阶段的人员数量、岗位和资质要求
3. WHEN 人员要求包含地域分布 THEN THE Extraction_Engine SHALL 提取人员在不同地点的分布要求
4. WHEN 人员要求包含证书和社保要求 THEN THE Extraction_Engine SHALL 提取资质证书类型和社保缴纳期限要求
5. WHEN 不同项目阶段有不同的人员配置要求 THEN THE Extraction_Engine SHALL 按阶段分类存储人员要求
6. WHEN 提取完成后 THEN THE System SHALL 创建人员配置的合规监测任务

### 需求 6：合同谈判会议纪要内容提取

**用户故事：** 作为项目管理人员，我希望系统能够提取会议纪要中的补充条款，以便完善合同监测规则。

#### 验收标准

1. WHEN 用户上传合同谈判会议纪要 THEN THE Extraction_Engine SHALL 识别并提取试运行阶段的补充条款
2. WHEN 会议纪要包含知识产权交付物要求 THEN THE Extraction_Engine SHALL 提取软件著作权、论文和专利的数量和时间要求
3. WHEN 会议纪要包含违约条款 THEN THE Extraction_Engine SHALL 提取项目人员变更的违约金计算方式
4. WHEN 会议纪要包含合同开始时间的补充说明 THEN THE Extraction_Engine SHALL 提取服务起始日期的计算规则
5. WHEN 会议纪要的内容与合同内容存在补充或修改关系 THEN THE System SHALL 更新相关的监测规则
6. WHEN 提取完成后 THEN THE System SHALL 将补充条款与原合同条款关联存储

### 需求 7：付款进度自动监测

**用户故事：** 作为项目管理人员，我希望系统能够自动监测付款进度，在临近付款节点时提前预警，以便及时准备付款材料。

#### 验收标准

1. WHEN 距离付款节点还有15天 AND 系统未检测到付款材料上传 THEN THE Monitoring_Engine SHALL 发出付款材料提交预警
2. WHEN 付款流程审批通过 AND 距离约定付款时间还有5天 AND 系统未检测到付款完成 THEN THE Monitoring_Engine SHALL 发出付款预警
3. WHEN 超出约定付款时间 AND 付款未完成 THEN THE Monitoring_Engine SHALL 记录风险事件并通知相关人员
4. WHEN 付款材料不齐全 THEN THE Monitoring_Engine SHALL 识别缺失的材料并在预警中列出
5. WHEN 付款条件的前置任务未完成 THEN THE Monitoring_Engine SHALL 在预警中说明未完成的前置任务
6. WHEN 发出预警后 THEN THE System SHALL 记录预警历史并支持预警状态的更新

### 需求 8：项目实施进度自动监测

**用户故事：** 作为项目管理人员，我希望系统能够自动监测项目实施进度，在临近里程碑节点时提前预警，以便及时推进项目进展。

#### 验收标准

1. WHEN 距离项目实施节点还有15天 AND 系统未检测到该环节已完成 THEN THE Monitoring_Engine SHALL 发出实施进度预警
2. WHEN 项目实施环节超出约定完成时间 THEN THE Monitoring_Engine SHALL 记录延期事件并统计延期天数
3. WHEN 实施环节存在依赖关系 AND 前置环节未完成 THEN THE Monitoring_Engine SHALL 在预警中说明依赖关系
4. WHEN 试运行期间出现重大故障 THEN THE Monitoring_Engine SHALL 自动重新计算试运行开始时间
5. WHEN 项目进度发生调整 THEN THE System SHALL 支持手动更新里程碑时间并重新计算后续节点
6. WHEN 发出预警后 THEN THE System SHALL 生成进度报表供管理层查看

### 需求 9：项目交付物完整性监测

**用户故事：** 作为项目管理人员，我希望系统能够自动监测交付物的提交情况，确保各阶段交付物的完整性。

#### 验收标准

1. WHEN 距离项目实施节点还有15天 AND 系统未检测到所需交付物上传 THEN THE Monitoring_Engine SHALL 发出交付物提交预警
2. WHEN 交付物已上传但未完成审批 THEN THE Monitoring_Engine SHALL 在预警中标注审批状态
3. WHEN 交付物已审批但未完成归档 THEN THE Monitoring_Engine SHALL 发出归档提醒
4. WHEN 实施环节缺少完整交付物 THEN THE Monitoring_Engine SHALL 统计缺失的交付物清单
5. WHEN 交付物有特殊要求（如第三方测试报告） THEN THE Monitoring_Engine SHALL 验证交付物是否满足特殊要求
6. WHEN 发出预警后 THEN THE System SHALL 支持交付物状态的实时更新

### 需求 10：履约担保进度监测

**用户故事：** 作为项目管理人员，我希望系统能够自动监测履约担保的提交和退还，确保履约担保的合规性。

#### 验收标准

1. WHEN 距离约定的履约担保函提交日期还有3天 AND 系统未检测到担保函提交 THEN THE Monitoring_Engine SHALL 发出履约担保函提交预警
2. WHEN 距离约定的履约保证金缴纳日期还有3天 AND 系统未检测到保证金缴纳 THEN THE Monitoring_Engine SHALL 发出保证金缴纳预警
3. WHEN 超过约定期限未提交履约担保函 THEN THE Monitoring_Engine SHALL 记录违约事件
4. WHEN 超过约定期限未缴纳履约保证金 THEN THE Monitoring_Engine SHALL 记录违约事件
5. WHEN 项目验收合格 AND 距离保证金退还申请提交期限还有3天 THEN THE Monitoring_Engine SHALL 提醒提交退还申请
6. WHEN 保证金退还申请已提交 AND 超过约定退还期限 THEN THE Monitoring_Engine SHALL 发出退还延期预警

### 需求 11：乙方义务履行质量监测

**用户故事：** 作为项目管理人员，我希望系统能够自动监测乙方的人员配置和响应时效，确保乙方履约质量。

#### 验收标准

1. WHEN 系统同步考勤数据 AND 检测到现场人员数量低于合同要求 THEN THE Monitoring_Engine SHALL 发出人员配置不足预警
2. WHEN 系统检测到人员资质不符合合同要求 THEN THE Monitoring_Engine SHALL 发出人员资质不合规预警
3. WHEN 系统检测到人员未提供社保证明或社保缴纳期限不足 THEN THE Monitoring_Engine SHALL 发出社保合规预警
4. WHEN 系统检测到项目核心人员变更 AND 未获得甲方书面同意 THEN THE Monitoring_Engine SHALL 记录违约事件并计算违约金
5. WHEN 系统检测到安全漏洞报告 AND 超过48小时未完成整改 THEN THE Monitoring_Engine SHALL 发出整改超期预警
6. WHEN 发出预警后 THEN THE System SHALL 生成履约质量报告供管理层查看

### 需求 12：知识产权成果监测

**用户故事：** 作为项目管理人员，我希望系统能够监测知识产权成果的完成情况，确保在项目验收前完成所有知识产权交付。

#### 验收标准

1. WHEN 距离项目终验还有60天 AND 软件著作权申请数量不足3项 THEN THE Monitoring_Engine SHALL 发出软件著作权申请预警
2. WHEN 距离项目终验还有60天 AND 中文核心论文录用通知书不足3篇 THEN THE Monitoring_Engine SHALL 发出论文发表预警
3. WHEN 距离项目终验还有60天 AND 发明专利受理通知书不足2项 THEN THE Monitoring_Engine SHALL 发出专利申请预警
4. WHEN 知识产权成果已提交 THEN THE System SHALL 验证成果的真实性和有效性
5. WHEN 论文发表时 THEN THE System SHALL 验证甲方是否具有优先署名权
6. WHEN 项目终验时 AND 知识产权成果不完整 THEN THE System SHALL 阻止验收流程并发出警告

### 需求 13：数据同步与集成

**用户故事：** 作为系统管理员，我希望系统能够与其他业务系统进行数据同步，以便获取实时的项目执行数据。

#### 验收标准

1. WHEN 系统启动时 THEN THE System SHALL 建立与数字化项目管理系统的数据同步连接
2. WHEN 系统启动时 THEN THE System SHALL 建立与财务系统的数据同步连接
3. WHEN 系统启动时 THEN THE System SHALL 建立与考勤系统的数据同步连接
4. WHEN 外部系统数据更新时 THEN THE System SHALL 在5分钟内同步最新数据
5. WHEN 数据同步失败时 THEN THE System SHALL 记录错误日志并发出系统预警
6. WHEN 同步的数据格式不符合预期时 THEN THE System SHALL 进行数据清洗和格式转换

### 需求 14：预警通知与报表

**用户故事：** 作为项目管理人员，我希望系统能够通过多种方式发送预警通知，并生成可视化报表，以便及时了解项目风险。

#### 验收标准

1. WHEN 系统生成预警时 THEN THE System SHALL 通过站内消息通知相关责任人
2. WHEN 预警级别为高风险时 THEN THE System SHALL 同时通过邮件和短信通知相关责任人
3. WHEN 用户查看预警列表时 THEN THE System SHALL 按照预警级别和时间排序显示预警信息
4. WHEN 用户处理预警后 THEN THE System SHALL 支持预警状态的更新和处理记录的添加
5. WHEN 用户需要查看项目整体情况时 THEN THE System SHALL 生成包含进度、风险、合规性的综合报表
6. WHEN 用户需要导出报表时 THEN THE System SHALL 支持PDF和Excel格式的报表导出

### 需求 15：提取准确性与可信度

**用户故事：** 作为项目管理人员，我希望系统能够提供提取结果的可信度评分，并支持人工校验，以确保提取信息的准确性。

#### 验收标准

1. WHEN 提取引擎完成信息提取时 THEN THE System SHALL 为每个提取字段计算可信度评分
2. WHEN 提取字段的可信度低于80% THEN THE System SHALL 标记该字段需要人工校验
3. WHEN 用户进行人工校验时 THEN THE System SHALL 显示原文档的相关段落供用户参考
4. WHEN 用户修正提取结果时 THEN THE System SHALL 记录修正历史并用于模型优化
5. WHEN 提取结果存在逻辑冲突（如大小写金额不一致）时 THEN THE System SHALL 自动标记为需要人工校验
6. WHEN 提取完成后 THEN THE System SHALL 生成提取质量报告显示整体准确率

