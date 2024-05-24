"use client";

import { forwardRef, useEffect, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import { $createCodeNode } from "@lexical/code";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { HeadingTagType } from "@lexical/rich-text";
import {
  $createParagraphNode,
  $isRangeSelection,
  LexicalEditor,
} from "lexical";

const Toolbar = forwardRef(({ editorRef }: { editorRef: any }) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const formatHeading = () => {
    activeEditor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode("h1"));
    });
    // const root = $getRoot();
    // const heading = $createHeadingNode("h1");
    // heading.append($createTextNode("Welcome to the playground"));
    // root.append(heading);
  };

  // const updateFontSizeInSelection = useCallback(
  //   (newFontSize: string | null, updateType: any) => {
  //     const getNextFontSize = (prevFontSize: string | null): string => {
  //       if (!prevFontSize) {
  //         prevFontSize = `16px`;
  //       }
  //       prevFontSize = prevFontSize.slice(0, -2);
  //       const nextFontSize = calculateNextFontSize(
  //         Number(prevFontSize),
  //         updateType
  //       );
  //       return `${nextFontSize}px`;
  //     };

  //     editor.update(() => {
  //       if (editor.isEditable()) {
  //         const selection = $getSelection();
  //         if (selection !== null) {
  //           $patchStyleText(selection, {
  //             "font-size": newFontSize || getNextFontSize,
  //           });
  //         }
  //       }
  //     });
  //   },
  //   [editor]
  // );
  useEffect(() => {
    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        // $updateToolbar();
        console.log("HKJH IKJHSADs");
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        // $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  return (
    <div className="toolbar">
      {/* <BlockFormatDropDown /> */}
      <button onClick={formatHeading}>Heading 1</button>
    </div>
  );
});
export default Toolbar;

function BlockFormatDropDown({
  editor,
  blockType,
  rootType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
    }
  };

  return (
    <button
      onClick={() => {
        formatHeading("h1");
      }}
    >
      Heading 1
    </button>
    // <DropdownMenu
    // >
    //   <DropdownMenuContent
    //     className={"item " + }
    //     onClick={formatParagraph}
    //   >
    //     <span className="text">Normal</span>
    //   </DropdownMenuContent>
    //   <DropDownItem
    //     className={"item " + dropDownActiveClass(blockType === "h1")}
    //     onClick={() => formatHeading("h1")}
    //   >
    //     <i className="icon h1" />
    //     <span className="text">Heading 1</span>
    //   </DropDownItem>
    //  <DropDownItem
    //     className={"item " + dropDownActiveClass(blockType === "h2")}
    //     onClick={() => formatHeading("h2")}
    //   >
    //     <i className="icon h2" />
    //     <span className="text">Heading 2</span>
    //   </DropDownItem>
    //   <DropDownItem
    //     className={"item " + dropDownActiveClass(blockType === "h3")}
    //     onClick={() => formatHeading("h3")}
    //   >
    //     <i className="icon h3" />
    //     <span className="text">Heading 3</span>
    //   </DropDownItem>
    //   <DropDownItem
    //     className={"item " + dropDownActiveClass(blockType === "bullet")}
    //     onClick={formatBulletList}
    //   >
    //     <i className="icon bullet-list" />
    //     <span className="text">Bullet List</span>
    //   </DropDownItem>
    //   <DropDownItem
    //     className={"item " + dropDownActiveClass(blockType === "number")}
    //     onClick={formatNumberedList}
    //   >
    //     <i className="icon numbered-list" />
    //     <span className="text">Numbered List</span>
    //   </DropDownItem>
  );
}

function Divider(): JSX.Element {
  return <div className="divider" />;
}
