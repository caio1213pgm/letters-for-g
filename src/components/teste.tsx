"use client";
import { useSession } from "next-auth/react";
import Tiptap from "./editor/Tiptap";

export default function TesteLogOff() {
  const { data } = useSession();
  return (
    <div className="flex gap-4 w-full">
      <div className="border px-4 py-2 bg-gray-300 rounded-lg">
        <Tiptap />
      </div>
    </div>
  );
}
