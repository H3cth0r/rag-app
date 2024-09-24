"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { PlusCircledIcon } from "@radix-ui/react-icons"

interface Team {
  label: string
  id: string
  icon: string
}

interface ProjectSwitcherProps {
  isCollapsed?: boolean
  teams?: Team[]
}

const defaultTeams: Team[] = [
  {
    label: "Acme Corp",
    id: "acme-corp",
    icon: "https://github.com/shadcn.png",
  },
  {
    label: "Globex Inc",
    id: "globex-inc",
    icon: "https://github.com/shadcn.png",
  },
  {
    label: "Umbrella LLC",
    id: "umbrella-llc",
    icon: "https://github.com/shadcn.png",
  },
]

export const ProjectSwitcher: React.FC<ProjectSwitcherProps> = ({
  isCollapsed = false,
  teams = defaultTeams,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0].id)

  const handleValueChange = (value: string) => {
    if (value === "add-new-team") {
      console.log("Add a new team option selected")
      // You can add more logic here to handle the "Add a new team" action
    } else {
      setSelectedTeam(value)
    }
  }

  return (
    <Select 
      defaultValue={selectedTeam}
      onValueChange={handleValueChange}
    >
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed
            ? "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
            : "w-[200px]" // Adjust this width as needed
        )}
        aria-label="Select Team"
      >
        <SelectValue placeholder="Select a Team">
          <Avatar className="h-6 w-6">
            <AvatarImage src={teams.find((team) => team.id === selectedTeam)?.icon} alt={teams.find((team) => team.id === selectedTeam)?.label} />
            <AvatarFallback>{teams.find((team) => team.id === selectedTeam)?.label.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {teams.find((team) => team.id === selectedTeam)?.label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {teams.map((team) => (
          <SelectItem 
            key={team.id} 
            value={team.id}
          >
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={team.icon} alt={team.label} />
                <AvatarFallback>{team.label.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {team.label}
            </div>
          </SelectItem>
        ))}
        <SelectItem value="add-new-team">
          <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
            <PlusCircledIcon />
            Add a new team
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
