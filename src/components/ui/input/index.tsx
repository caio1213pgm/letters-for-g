"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../button";
import { Label } from "../label";
import { InputDefault } from "./input";

export type InputProps = {
  placeholder?: string;
  label: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
} & React.ComponentProps<"input">;

export function Input({
  placeholder,
  label,
  value,
  onChange,
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <div className="flex">
        <InputDefault
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={showPassword ? "text" : type}
          {...props}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <EyeOff className="h-4 w-4 text-zinc-500" />
            ) : (
              <Eye className="h-4 w-4 text-zinc-500" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
