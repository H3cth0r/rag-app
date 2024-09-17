import React from 'react';
import { ModeToggle, MenuToggle } from '@/components';

interface NavBarProps {
}
export const NavBar: React.FC<NavBarProps> = ({
}) => {
  return(
    <div class="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="flex flex-row h-[6vh] items-center justify-between">
        <div class="ml-8">
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight ">
            RagApp
          </h2>
        </div>
        <div class="mr-8">
          <ModeToggle />
          <MenuToggle />
        </div>
      </div>
    </div>
  );
}
