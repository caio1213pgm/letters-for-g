"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuDefault,
} from "@/components/ui/dropdown/dropdown-menu";
import { Button } from "../buttons/button";
import { EllipsisIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownArrayProps = {
  id: number | string;
  label: string;
  onClick: () => void;
  separator?: boolean;
  icon?: React.ReactNode;
  variant?: "destructive";
  disabled?: boolean;
};

type DropdownMenuProps = {
  trigger?: React.ReactNode;
  arrayContent: DropdownArrayProps[];
};

export default function DropdownMenu({
  trigger,
  arrayContent,
}: DropdownMenuProps) {
  return (
    <DropdownMenuDefault>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="secondary" className="cursor-pointer">
            <EllipsisIcon />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {arrayContent?.map((item) => {
          return (
            <div key={item.id}>
              <DropdownMenuItem
                className={cn(
                  "rounded-md px-2 flex justify-between cursor-pointer",
                  item.variant && "text-red-400 hover:text-red-400",
                )}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.label}
                <span>{item.icon}</span>
              </DropdownMenuItem>
              {item.separator && <DropdownMenuSeparator />}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenuDefault>
  );
}
