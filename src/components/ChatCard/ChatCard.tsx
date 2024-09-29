"use client"
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Button,
} from "@/components/ui/button"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Chat {
  id:           string,
  title:        string,
  description:  string,
  date:         string,
  activated:    boolean,
}
interface ChatCardProps {
  chat_item: Chat,  
}
export const ChatCard: React.FC<ChatCardProps> = ({
  chat_item,
}) => {
  return(
    <div
      className={cn(
        "flex flex-col w-full h-[15vh] items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
      )}
    >
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-2xl font-semibold">{chat_item.title}</h1>
        <h1 className="text-lg font-thin">{chat_item.date}</h1>
      </div>
      <div className="flex flex-row w-full ">
        <p className="text-base font-normal">{chat_item.description}</p> 
      </div>
      <div className="flex flex-row w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="" asChild>
            <Button variant="outline" size="icon"><DotsVerticalIcon /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs leading-none text-muted-foreground">
                   Options 
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
