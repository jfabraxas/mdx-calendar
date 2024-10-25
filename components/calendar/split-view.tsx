"use client"

import { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import { CalendarView } from './calendar-view';
import { MDXEditor } from '@/components/editor/mdx-editor';
import { useCalendarStore } from '@/lib/store';
import { convertICSToMDX } from '@/lib/ics-to-mdx';

export function SplitView() {
  const [showEditor, setShowEditor] = useState(false);
  const events = useCalendarStore((state) => state.events);
  const setContent = useCalendarStore((state) => state.setContent);

  useEffect(() => {
    if (showEditor) {
      const mdxContent = convertICSToMDX(events);
      setContent(mdxContent);
    }
  }, [showEditor, events, setContent]);

  if (!showEditor) {
    return (
      <div className="h-full relative">
        <CalendarView />
        <button
          onClick={() => setShowEditor(true)}
          className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg hover:bg-primary/90 transition-colors"
        >
          Open Editor
        </button>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={50} minSize={30}>
        <CalendarView />
      </ResizablePanel>
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="h-full relative">
          <MDXEditor />
          <button
            onClick={() => setShowEditor(false)}
            className="absolute top-4 right-4 text-sm text-muted-foreground hover:text-foreground"
          >
            Close Editor
          </button>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}