"use client"
import React from 'react';
import { cn } from "@/lib/utils";

interface Chat {
  id: string,
  title: string,
  description: string,
  date: string,
}
// https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/mail/components/mail-list.tsx#L22
interface ChatCardProps {
  chat_item: Chat,  
}
export const ChatCard: React.FC<ChatCardProps> = ({
  chat_item,
}) => {
  return(
    <button
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
      )}
    >
    </button>
  );
}
