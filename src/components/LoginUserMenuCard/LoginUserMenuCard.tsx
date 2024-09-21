import React from 'react';
import { UserInfo } from "./UserInfo.tsx";
import { Card } from "@/components/ui/card";

interface LoginUserMenuCardProps {
}
export const LoginUserMenuCard: React.FC<LoginUserMenuCardProps> = ({
}) => {
  return(
    <Card className="h-[11vh]">
      <UserInfo />
    </Card>
  );
}
