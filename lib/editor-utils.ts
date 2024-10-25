import type { editor } from "monaco-editor";

export interface Position {
  lineNumber: number;
  column: number;
}

export function getDateMentionPosition(
  editor: editor.IStandaloneCodeEditor,
  position: Position
): { triggerPosition: Position; mentionRange: editor.IRange } | null {
  const model = editor.getModel();
  if (!model) return null;

  const line = model.getLineContent(position.lineNumber);
  const wordUntilPosition = line.substring(0, position.column);
  const match = /@date\b/.exec(wordUntilPosition);

  if (!match) return null;

  const startColumn = match.index + 1;
  const endColumn = startColumn + 4;

  return {
    triggerPosition: {
      lineNumber: position.lineNumber,
      column: startColumn,
    },
    mentionRange: {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn,
      endColumn,
    },
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}