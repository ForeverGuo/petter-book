"use client";

import { ThemeToggle } from "components/theme/themeToggle";
// import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

export default function UserMenu({ user }: { user?: { name: string; image?: string } }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mr-3">
        {/* 切换主题按钮 */}
        <ThemeToggle></ThemeToggle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || "/images/default-avatar.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.name || "访客"}
              </span>
            </div>
          </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
}
