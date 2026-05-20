"use client";
import { Label } from "../label";
import { InputDefault } from "./input";

export type InputProps = {
  placeholder?: string;
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ placeholder, label, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <InputDefault
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
