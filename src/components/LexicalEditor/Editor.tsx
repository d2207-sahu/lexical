import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { EditorState } from "lexical";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import TreeViewPlugin from "./Plugins/TreeViewPlugin";

const theme = {
  // Theme styling goes here
  //...
  heading: {
    h1: "text-4xl font-bold text-blue-500", // Tailwind CSS classes for h1
    h2: "text-3xl font-bold text-blue-400", // Tailwind CSS classes for h1
    h3: "text-2xl font-bold text-blue-300", // Tailwind CSS classes for h1
  },
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
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
