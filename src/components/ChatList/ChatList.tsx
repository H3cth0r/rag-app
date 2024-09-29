"use client"
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatCard } from "@/components";

const example_chat = [
  {
    id: "f423f",
    title: "Random chat",
    description: "This is a simple example of what this thing look like.This is a simple example of what this thing look like.This is a simple example of what this thing look like.",
    date: "10/09/2020"
  }
];
interface Chat {
  id: string,
  title: string,
  description: string,
  date: string,
}
interface ChatListProps {
  chat_items?: Chat[]
}
export const ChatList: React.FC<ChatListProps> = ({
  chat_items=example_chat,
}) => {
  return(
    <ScrollArea 
      className="h-full w-full"
    >
      {chat_items.map((item) => (
        <ChatCard chat_item={item} />
      ))}
    </ScrollArea>
  );
}
