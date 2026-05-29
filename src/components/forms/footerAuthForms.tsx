"use client";

import { useRouter } from "next/navigation";

type FooterAuthFormsProps = {
  label: string;
  path: string;
};
export default function FooterAuthForms({ label, path }: FooterAuthFormsProps) {
  const router = useRouter();
  return (
    <>
      <p
        className="mx-auto text-muted-foreground hover:text-foreground hover:cursor-pointer transition-all duration-200"
        onClick={() => router.push(path)}
      >
        {label}
      </p>
    </>
  );
}
