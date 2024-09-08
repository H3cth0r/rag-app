import React from 'react';
import { ModeToggle } from '@/components';

interface NavBarProps {
}
export const NavBar: React.FC<NavBarProps> = ({
}) => {
  return(
    <div class="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ModeToggle />
    </div>
  );
}
