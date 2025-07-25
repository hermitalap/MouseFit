# 小鼠笼位管理系统开发文档

## 项目概述

本项目旨在开发一个用于实验室内部管理小鼠笼位、鼠只信息及生命周期的轻量级管理系统。系统侧重笼位管理，小鼠的流动性较大，以笼位为核心进行管理。适用于条件性敲除小鼠的配种实验管理，提供针对性提醒功能，适合在桌面端与移动端使用，部署于实验室服务器，支持多人访问。

## 核心功能模块

### 1. 笼位管理

* 笼位唯一编号
* 可视化NxN笼架布局管理，支持拖拽式交互（尤其针对移动端优化）
* 自定义笼位状态标签（如配对中、隔离中、待鉴定、已怀孕、临产等）

### 2. 鼠只管理

* 记录鼠只基础信息：
  * 耳标号
  * 品系
  * 性别
  * 出生日期
  * 父母耳标号
* 鼠只基因型鉴定状态（待鉴定/已鉴定，录入基因型）
* 备注信息（可选）

### 3. 生命周期与提醒

* 生命周期关键节点记录：
  * 出生日期
  * 断乳日期
  * 可配种年龄提醒
  * 已衰老鼠只提醒
* 提醒功能：
  * 断乳日期提前提醒
  * 鼠只达到配种年龄提醒
  * 鼠只老龄提醒
  * 出生鼠只基因型待鉴定提醒

### 4. 数据管理与备份

* 本地 JSON 存储数据，易于迁移和维护
* 数据导出功能（JSON或CSV格式）
* 定期自动创建数据备份（每隔N天）
* 提供数据恢复接口

### 5. 用户与权限管理

* 用户登录及认证
* 管理员与普通用户权限区分
* 管理员账号权限包括数据管理、备份恢复及用户权限管理

### 6. 后续扩展功能（预留）

* 鼠只繁殖与配种效率统计
* 品系统计和可视化

## 前端实现要求

* 桌面端与移动端自适应设计，Material Design 3风格
* 针对移动端特别优化拖动交互体验
* 技术选型推荐：React + Material UI

## 部署方式

* 部署在实验室内部服务器
* 多人可同时访问与管理

## 预期开发阶段

### 第一阶段（核心功能开发）

* 完成笼位、鼠只信息管理功能
* 完成生命周期管理与提醒功能
* 完成用户登录认证及管理员权限管理
* 完成数据存储（JSON）、导出与备份

### 第二阶段（增强功能开发，暂缓）

* 完成统计图表功能
* 增强鼠只繁殖统计分析

## 数据结构示例

```json
{
  "cages": [{
    "id": "C001",
    "position": {"rack": 1, "row": 1, "col": 1},
    "status": "配对中",
    "mice": ["M001", "M002"]
  }],
  "mice": [{
    "id": "M001",
    "ear_tag": "001",
    "strain": "C57BL/6",
    "gender": "F",
    "birth_date": "2024-06-01",
    "parents": {"father": "M010", "mother": "M011"},
    "genotype_status": "待鉴定",
    "notes": ""
  }]
}
```

## 环境配置

```bash
# 创建项目根目录
mkdir MouseFit
cd MouseFit

# 初始化npm项目
npm init -y

# 安装React及相关依赖
npm install react react-dom
npm install --save-dev @types/react @types/react-dom typescript vite

# 安装Material UI 及 Material Design 3 风格依赖
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

# 安装路由和状态管理（可选）
npm install react-router-dom zustand

# 创建项目结构
mkdir -p src/components src/pages src/hooks src/assets src/utils src/data

# 创建入口文件
cat > src/main.tsx << EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
EOF

# 创建App组件
cat > src/App.tsx << EOF
import React from 'react';

function App() {
  return (
    <div>
      <h1>欢迎使用MouseFit小鼠笼位管理系统</h1>
    </div>
  );
}

export default App;
EOF

# 创建基础HTML文件
mkdir public
cat > public/index.html << EOF
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MouseFit</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# 初始化TypeScript配置
npx tsc --init

# 创建启动脚本
cat >> package.json << EOF
,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
EOF
```