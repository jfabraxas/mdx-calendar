"use client";

import { useEffect, useRef, useState } from "react";
import { useCalendarStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save } from "lucide-react";
import { toast } from "sonner";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DatePickerOverlay } from "./editor/date-picker-overlay";
import { getDateMentionPosition, formatDate } from "@/lib/editor-utils";
import type { editor } from "monaco-editor";

export function MDXEditor() {
  const { currentContent, setContent, isDirty, markSaved } = useCalendarStore();
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [datePickerPosition, setDatePickerPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentMentionRange, setCurrentMentionRange] = useState<editor.IRange | null>(null);

  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentContent, isDirty]);

  const handleSave = async () => {
    try {
      markSaved();
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;
    
    monaco.editor.defineTheme("mdxTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e1e1e",
      },
    });

    monaco.editor.setTheme("mdxTheme");

    editor.onDidChangeCursorPosition((e) => {
      const mentionData = getDateMentionPosition(editor, e.position);
      
      if (mentionData) {
        const { triggerPosition } = mentionData;
        const coords = editor.getScrolledVisiblePosition(triggerPosition);
        const editorDomNode = editor.getDomNode();

        if (coords && editorDomNode) {
          const { top, left } = editorDomNode.getBoundingClientRect();
          setDatePickerPosition({
            x: left + coords.left,
            y: top + coords.top + 20,
          });
          setCurrentMentionRange(mentionData.mentionRange);
        }
      } else {
        setDatePickerPosition(null);
        setCurrentMentionRange(null);
      }
    });
  };

  const handleDateSelect = (date: Date) => {
    if (editorRef.current && currentMentionRange) {
      const formattedDate = formatDate(date);
      editorRef.current.executeEdits("date-mention", [{
        range: currentMentionRange,
        text: formattedDate,
      }]);
      setDatePickerPosition(null);
      setCurrentMentionRange(null);
      editorRef.current.focus();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">MDX Editor</h2>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={!isDirty}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50}>
          <div className="h-full relative">
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={currentContent}
              onChange={(value) => setContent(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                quickSuggestions: {
                  other: true,
                  comments: true,
                  strings: true,
                },
                suggestOnTriggerCharacters: true,
              }}
              onMount={handleEditorDidMount}
            />
            <DatePickerOverlay
              position={datePickerPosition}
              onSelect={handleDateSelect}
              onClose={() => {
                setDatePickerPosition(null);
                setCurrentMentionRange(null);
              }}
            />
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="h-full p-4">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {currentContent}
              </ReactMarkdown>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}