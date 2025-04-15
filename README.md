/
├── app/                    # 核心路由目录（App Router）
│   ├── layout.tsx          # 全局布局文件（所有页面共享）
│   ├── page.tsx            # 首页路由（对应 /）
│   ├── (auth)/             # 分组路由（URL中不显示括号内容）
│   │   ├── login/page.tsx  # /login 页面
│   │   └── signup/page.tsx # /signup 页面
│   ├── blog/[slug]/page.tsx # 动态路由（参数slug）
│   └── api/                # API路由（可选，推荐独立API目录）
│       └── hello/route.ts  # API端点 /api/hello
├── public/                 # 静态资源（图片、字体等）
│   └── logo.png
├── components/             # 可复用组件（可选组织方式）
│   ├── Button.tsx
│   └── Header.tsx
├── lib/                    # 工具函数/第三方库封装
│   └── utils.ts
├── styles/                 # 全局CSS（可选）
│   └── globals.css
├── types/                  # TypeScript类型定义
│   └── index.d.ts
├── .env.local              # 环境变量（服务端用）
├── next.config.js          # Next.js 配置
├── package.json
└── tsconfig.json           # TypeScript配置
