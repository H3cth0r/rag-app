import React from 'react';
import {
  Card
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"

interface PromptBoxProps {
}
export const PromptBox:  React.FC<PromptBoxProps>  = ({
}) => {
  return(
    <Card className="w-full h-full bg-green-300">
      <Textarea placeholder="Type your message here." /> 
    </Card>
  );
}
