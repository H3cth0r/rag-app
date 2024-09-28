"use client"

import React, { useState } from 'react';
import { 
  TooltipProvider 
} from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { 
  Separator 
} from  "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { OptionsMenu } from "./OptionsMenu"

import { ChatCard } from "@/components";

interface DashboardProps {
  defaultLayout: number[];
  navCollapsedSize: number;
  defaultCollapsed?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  defaultLayout = [20, 32, 48],
  navCollapsedSize,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [selectedOption, setSelectedOption] = useState("Chat");
  const [rightPanelContent, setRightPanelContent] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setRightPanelContent(null); // Reset right panel content when a new option is selected
  };

  const handleContentSelect = (content: string) => {
    setRightPanelContent(content);
  };

  return (
    <TooltipProvider delayDuration={0} >
      <Separator />
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full items-stretch bg-green-300"
      > 
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`
          }}
          onExpand={() => {
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
          <OptionsMenu 
            isCollapsed={isCollapsed} 
            onSelect={handleOptionSelect}
            selectedOption={selectedOption}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          <div className="h-full overflow-y-auto p-4 bg-red-400">
            <h2 className="text-2xl font-bold mb-4">{selectedOption}</h2>
            {selectedOption === "Chat" && (
              <div>
                <p>Chat content goes here</p>
                <button onClick={() => handleContentSelect("Chat Details")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                  Open Chat Details
                </button>
                <ChatCard />
              </div>
            )}
            {selectedOption === "Files" && (
              <div>
                <p>Files content goes here</p>
                <button onClick={() => handleContentSelect("File Details")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                  Open File Details
                </button>
              </div>
            )}
            {selectedOption === "Repositories" && (
              <div>
                <p>Repositories content goes here</p>
                <button onClick={() => handleContentSelect("Repository Details")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                  Open Repository Details
                </button>
              </div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          minSize={30}
        >
          <div className="h-full overflow-y-auto p-4">
            {rightPanelContent ? (
              <h2 className="text-2xl font-bold mb-4">{rightPanelContent}</h2>
            ) : (
              <p>Select an item from the center panel to view details</p>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
