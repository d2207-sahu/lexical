import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faHeading,
  faItalic,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $wrapNodes } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DIVYANSHUHEADING1,
  DIVYANSHUHEADING2,
  DIVYANSHUHEADING3,
  DIVYANSHUHEADING4,
  DIVYANSHUHEADING5,
  DIVYANSHUHEADING6,
} from "../Commands/HeadingCommands";

const LowPriority = 1;

function Divider() {
  return <hr className="border-blue-900 "></hr>;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // update here
    }
  }, []);

  const $updateHeadings = useCallback((payload: HeadingTagType) => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      console.log(selection, payload);
      $wrapNodes(selection, () => $createHeadingNode(payload));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
          $updateHeadings("h1");
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        DIVYANSHUHEADING1,
        (_payload: HeadingTagType, _newEditor) => {
          $updateHeadings(_payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        DIVYANSHUHEADING2,
        (_payload: HeadingTagType, _newEditor) => {
          $updateHeadings(_payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        DIVYANSHUHEADING3,
        (_payload: HeadingTagType, _newEditor) => {
          $updateHeadings(_payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        DIVYANSHUHEADING4,
        (_payload: HeadingTagType, _newEditor) => {
          $updateHeadings(_payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        DIVYANSHUHEADING5,
        (_payload: HeadingTagType, _newEditor) => {
          $updateHeadings(_payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        DIVYANSHUHEADING6,
        (_payload: HeadingTagType, _newEditor) => {
          $updateHeadings(_payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar, $updateHeadings]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="p-2 px-4 m-2 "
        aria-label="Undo"
      >
        UNDO
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="p-2 px-4 m-2 "
        aria-label="Redo"
      >
        REDO
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Format Bold"
      >
        <FontAwesomeIcon icon={faBold} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Format Italics"
      >
        <FontAwesomeIcon icon={faItalic} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Format Underline"
      >
        <FontAwesomeIcon icon={faUnderline} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Format Strikethrough"
      >
        <FontAwesomeIcon icon={faStrikethrough} />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(DIVYANSHUHEADING1, "h1");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Left Align"
      >
        <FontAwesomeIcon icon={faHeading} /> 1
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(DIVYANSHUHEADING2, "h2");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Left Align"
      >
        <FontAwesomeIcon icon={faHeading} /> 2
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(DIVYANSHUHEADING3, "h3");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Left Align"
      >
        <FontAwesomeIcon icon={faHeading} /> 3
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(DIVYANSHUHEADING4, "h4");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Left Align"
      >
        <FontAwesomeIcon icon={faHeading} /> 4
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(DIVYANSHUHEADING5, "h5");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Left Align"
      >
        <FontAwesomeIcon icon={faHeading} /> 5
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(DIVYANSHUHEADING6, "h6");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Left Align"
      >
        <FontAwesomeIcon icon={faHeading} /> 6
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Left Align"
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Center Align"
      >
        <FontAwesomeIcon icon={faAlignCenter} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Right Align"
      >
        <FontAwesomeIcon icon={faAlignRight} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="p-2 px-4 m-2 "
        aria-label="Justify Align"
      >
        <FontAwesomeIcon icon={faAlignJustify} />
      </button>{" "}
    </div>
  );
}
