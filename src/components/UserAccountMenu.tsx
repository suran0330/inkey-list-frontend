"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Package, Heart, Settings, Crown } from "lucide-react";
import Link from "next/link";

export default function UserAccountMenu() {
  const { state, logout, openLoginModal, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="p-2 hover:bg-[#efeff0]"
        onClick={openLoginModal}
      >
        <User className="h-5 w-5" />
      </Button>
    );
  }

  const user = state.user!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 hover:bg-[#efeff0] relative">
          <User className="h-5 w-5" />
          {user.isInsider && (
            <Crown className="h-3 w-3 absolute -top-1 -right-1 text-[#746cad]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-inter">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-[#1c1c22]">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-[#747474]">
              {user.email}
            </p>
            {user.isInsider && (
              <div className="flex items-center space-x-1 mt-1">
                <Crown className="h-3 w-3 text-[#746cad]" />
                <span className="text-xs text-[#746cad] font-medium">INKEY Insider</span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/account" className="cursor-pointer font-inter">
            <User className="mr-2 h-4 w-4" />
            <span>My Account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/orders" className="cursor-pointer font-inter">
            <Package className="mr-2 h-4 w-4" />
            <span>Order History</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/wishlist" className="cursor-pointer font-inter">
            <Heart className="mr-2 h-4 w-4" />
            <span>Wishlist</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="cursor-pointer font-inter">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer font-inter text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
