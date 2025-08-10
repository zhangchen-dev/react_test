import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, EditorContext, useCurrentEditor } from "@tiptap/react";
// @ts-ignore
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import History from "@tiptap/extension-history";
import { BackgroundColor, Color, FontSize, TextStyle } from "@tiptap/extension-text-style";

// 引入 CSS Modules 样式
import styles from "./TiptapEditor.less";

// 引入 Ant Design 图标
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  CodeOutlined,
  TableOutlined,
  UndoOutlined,
  RedoOutlined,
  BlockOutlined,
  FontSizeOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";

// 工具栏组件
const Toolbar = () => {
  const { editor } = useCurrentEditor();
  const [currentFontSize, setCurrentFontSize] = useState<string>("");
  const [currentFontColor, setCurrentFontColor] = useState<string>("#000000");
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState<string>("#ffffff");

  // 更新样式状态
  const updateStyles = useCallback(() => {
    if (editor) {
      const attrs = editor.getAttributes("textStyle");
      setCurrentFontSize(attrs.fontSize || "");
      setCurrentFontColor(attrs.color || "#000000");
      setCurrentBackgroundColor(attrs.backgroundColor || "#ffffff");
    }
  }, [editor]);

  // 监听编辑器变化
  useEffect(() => {
    if (editor) {
      editor.on("transaction", updateStyles);
      return () => {
        editor.off("transaction", updateStyles);
      };
    }
  }, [editor, updateStyles]);

  // 格式化操作处理函数
  const handleFormat = useCallback(
    (command: string, value?: any) => {
      if (editor) {
        const commands = editor.commands as any;
        const can = editor.can() as any;
        if (can[command]) {
          commands[command](value);
        }
      }
    },
    [editor]
  );

  // 设置字体大小
  const handleSetFontSize = useCallback(
    (fontSize: string) => {
      if (editor) {
        editor.chain().focus().setFontSize(fontSize).run();
      }
    },
    [editor]
  );

  // 设置字体颜色
  const handleSetFontColor = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().setColor(color).run();
      }
    },
    [editor]
  );

  // 设置背景色
  const handleSetHighlight = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().setBackgroundColor(color).run();
      }
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  // 链接处理函数
  const handleLink = () => {
    const url = prompt("请输入链接地址:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  // 图片处理函数
  const handleImage = () => {
    const url = prompt("请输入图片地址:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={styles.editorToolbar}>
      <div className={styles.toolbarGroup}>
        <button onClick={() => handleFormat("toggleBold")} className={editor.isActive("bold") ? styles.active : ""} title="加粗">
          <BoldOutlined />
        </button>
        <button onClick={() => handleFormat("toggleItalic")} className={editor.isActive("italic") ? styles.active : ""} title="斜体">
          <ItalicOutlined />
        </button>
        <button onClick={() => handleFormat("toggleUnderline")} className={editor.isActive("underline") ? styles.active : ""} title="下划线">
          <UnderlineOutlined />
        </button>
        <button onClick={() => handleFormat("toggleStrike")} className={editor.isActive("strike") ? styles.active : ""} title="删除线">
          <StrikethroughOutlined />
        </button>
      </div>
      <div className={styles.toolbarGroup}>
        <select
          value={editor.isActive("heading", { level: 1 }) ? "1" : editor.isActive("heading", { level: 2 }) ? "2" : editor.isActive("heading", { level: 3 }) ? "3" : ""}
          onChange={(e) => {
            const level = parseInt(e.target.value, 10);
            if (level) {
              handleFormat("setHeading", { level });
            } else {
              handleFormat("setParagraph");
            }
          }}
          title="标题"
        >
          <option value="">正文</option>
          <option value="1">标题 1</option>
          <option value="2">标题 2</option>
          <option value="3">标题 3</option>
        </select>
      </div>

      <div className={styles.toolbarGroup}>
        <FontSizeOutlined />
        <select
          value={currentFontSize}
          onChange={(e) => {
            setCurrentFontSize(e.target.value);
            handleSetFontSize(e.target.value);
          }}
          title="字体大小"
        >
          <option value="">默认</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
          <option value="48px">48px</option>
        </select>
      </div>

      <div className={styles.toolbarGroup}>
        <FontColorsOutlined />
        <input
          type="color"
          value={currentFontColor}
          onChange={(e) => {
            setCurrentFontColor(e.target.value);
            handleSetFontColor(e.target.value);
          }}
          title="字体颜色"
        />
      </div>

      <div className={styles.toolbarGroup}>
        <BgColorsOutlined />
        <input
          type="color"
          value={currentBackgroundColor}
          onChange={(e) => {
            setCurrentBackgroundColor(e.target.value);
            handleSetHighlight(e.target.value);
          }}
          title="背景颜色"
        />
      </div>

      <div className={styles.toolbarGroup}>
        <button onClick={() => handleFormat("toggleBulletList")} className={editor.isActive("bulletList") ? styles.active : ""} title="无序列表">
          <UnorderedListOutlined />
        </button>
        <button onClick={() => handleFormat("toggleOrderedList")} className={editor.isActive("orderedList") ? styles.active : ""} title="有序列表">
          <OrderedListOutlined />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        <button onClick={handleLink} title="插入链接">
          <LinkOutlined />
        </button>
        <button onClick={handleImage} title="插入图片">
          <PictureOutlined />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        <button onClick={() => handleFormat("toggleBlockquote")} className={editor.isActive("blockquote") ? styles.active : ""} title="引用">
          <BlockOutlined />
        </button>
        <button onClick={() => handleFormat("setCodeBlock")} className={editor.isActive("codeBlock") ? styles.active : ""} title="代码块">
          <CodeOutlined />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        <button onClick={() => handleFormat("insertTable", { rows: 2, cols: 3, withHeaderRow: true })} title="插入表格">
          <TableOutlined />
        </button>
      </div>

      <div className={styles.toolbarGroup}>
        <button onClick={() => handleFormat("undo")} disabled={!editor.can().undo()} title="撤销">
          <UndoOutlined />
        </button>
        <button onClick={() => handleFormat("redo")} disabled={!editor.can().redo()} title="重做">
          <RedoOutlined />
        </button>
      </div>
    </div>
  );
};

// 主编辑器组件
const TiptapEditor = ({ initialContent = "<p>开始编辑...</p>", onChange, className = "" }: { initialContent?: string; onChange?: (content: string) => void; className?: string }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        heading: false,
        bold: false,
        italic: false,
        underline: false,
        strike: false,
        link: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        undoRedo: false, // 禁用 undoRedo 扩展以避免冲突
      }),
      Bold,
      TextStyle,
      Color,
      FontSize,
      BackgroundColor,
      Italic,
      Underline,
      Strike,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: true,
      }),
      Image.configure({
        allowBase64: true,
      }),
      Table,
      TableCell,
      TableHeader,
      TableRow,
      CodeBlock,
      Blockquote,
      HorizontalRule,
      History, // 添加 History 扩展，它包含了 Undo 和 Redo 功能
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    autofocus: true,
  });

  if (!editor) {
    return <div className={styles.editorLoading}>加载中...</div>;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className={`${styles.tiptapEditor} ${className}`}>
        {/* 头部菜单栏 */}
        <Toolbar />
        {/* 中间编辑区域 */}
        <div className={styles.editorContentWrapper}>
          <EditorContent editor={editor} className={styles.editorContent} />
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default TiptapEditor;
