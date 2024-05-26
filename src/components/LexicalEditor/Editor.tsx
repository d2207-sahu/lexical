import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { EditorState, EditorThemeClasses } from "lexical";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import TreeViewPlugin from "./Plugins/TreeViewPlugin";

const theme: EditorThemeClasses = {
  heading: {
    h1: "text-4xl font-bold text-blue-300",
    h2: "text-3xl font-bold text-blue-400",
    h3: "text-2xl font-bold text-blue-500",
    h4: "text-xl font-bold text-blue-600",
    h5: "text-lg font-bold text-blue-700",
    h6: "text-sm font-bold text-blue-800",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

function onError(error: any) {
  console.error(error);
}

function Editor() {
  const initialConfig: InitialConfigType = {
    namespace: "Divyanshu Editor",
    theme,
    nodes: [HeadingNode],
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="border-2 w-1/2 h-screen border-black p-4 rounded-lg m-10 h-min[" />
        }
        placeholder={<div>Divyanshu Editor...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin
        onChange={(editorState: EditorState) => {
          return;
        }}
      />
      <TreeViewPlugin />
    </LexicalComposer>
  );
}

export { Editor };
