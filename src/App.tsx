import React from "react";
// import MyTreeSelect from "./components/my-tree-selector/MyTreeSelector";
import TiptapEditor from "./components/tiptap-editor/TiptapEditor";

function App() {
  return (
    <div className="App">
      {/* 默认路由显示 MyTreeSelect 组件 */}
      {/* <MyTreeSelect /> */}
      {/* 子路由出口 */}
      <TiptapEditor />
    </div>
  );
}

export default App;
