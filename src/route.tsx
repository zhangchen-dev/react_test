import React from "react";
import { createHashRouter, RouteObject } from "react-router-dom";
import App from "./App";
import MyTreeSelect from "./components/my-tree-selector/MyTreeSelector";

// 定义路由配置
const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "tree",
        element: <MyTreeSelect />,
      },
    ],
  },
];

// 使用 hash 路由模式
const router = createHashRouter(routes);

export default router;
