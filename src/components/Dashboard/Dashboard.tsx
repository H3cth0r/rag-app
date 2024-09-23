"use client"

import React, { useState } from 'react';
import { 
  TooltipProvider 
} from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn } from "@/lib/utils"


interface DashboardProps {
  defaultLayout: number[];
  navCollapsedSize: number;
  defaultCollapsed?: boolean;
}
export const Dashboard : React.FC<DashboardProps> = ({
  defaultLayout = [20, 32, 48],
  navCollapsedSize,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayour={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      > 
        <ResizablePanel
          defaultsize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapsable={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
        asdf
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultsize={defaultLayout[1]}
          minSize={30}
        >
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultsize={defaultLayout[2]}
          minSize={30}
        >
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
