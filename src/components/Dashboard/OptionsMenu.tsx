"use client";
import React from 'react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  buttonVariants,
} from "@/components/ui/button"
import { 
  ChatBubbleIcon,
  FilePlusIcon,
  Link1Icon,
} from "@radix-ui/react-icons";

interface LinkType {
  title: string;
  label?: string;
  icon: React.ComponentType<any>;
}

interface OptionsMenuProps {
  isCollapsed: boolean;
  links?: LinkType[];
  onSelect: (option: string) => void;
  selectedOption: string;
}

const defaultLinks: LinkType[] = [
  {
    title: "Chat",
    label: "Chat",
    icon: ChatBubbleIcon,
  },
  {
    title: "Files",
    label: "Files",
    icon: FilePlusIcon,
  },
  {
    title: "Repositories",
    label: "Repositories",
    icon: Link1Icon,
  },
];

export const OptionsMenu: React.FC<OptionsMenuProps> = ({
  links = defaultLinks,
  isCollapsed,
  onSelect,
  selectedOption,
}) => {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link) => {
          const isSelected = link.title === selectedOption;
          const variant = isSelected ? "default" : "ghost";
          
          return isCollapsed ? (
            <Tooltip key={link.title} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => onSelect(link.title)}
                  className={cn(
                    buttonVariants({ variant, size: "icon" }),
                    "h-9 w-9",
                    isSelected &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={link.title}
              href="#"
              onClick={() => onSelect(link.title)}
              className={cn(
                buttonVariants({ variant, size: "sm" }),
                isSelected &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    isSelected && "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
