import { randomBytes } from "crypto";

export function generateSlug(title: string): string {
  const base = title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50)
    .replace(/-+$/g, "");

  const suffix = randomBytes(4).toString("hex");

  return base ? `${base}-${suffix}` : suffix;
}
