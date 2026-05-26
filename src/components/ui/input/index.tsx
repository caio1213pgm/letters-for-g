"use client";
import { Label } from "../label";
import { InputDefault } from "./input";

export type InputProps = {
  placeholder?: string;
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"input">;

export function Input({
  placeholder,
  label,
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <InputDefault
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
