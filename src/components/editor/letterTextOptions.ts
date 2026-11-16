export type FontOption = {
  label: string;
  // Valor gravado no HTML da carta. As variáveis CSS vêm do next/font em app/layout.tsx,
  // então a mesma fonte aparece no editor e na página de leitura.
  value: string;
};

export const FONT_OPTIONS: FontOption[] = [
  { label: "Inter", value: "var(--font-sans), sans-serif" },
  { label: "Instrument Sans", value: "var(--font-heading), sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "Times New Roman, Times, serif" },
  { label: "Lora", value: "var(--font-lora), serif" },
  { label: "Geist Mono", value: "var(--font-geist-mono), monospace" },
  { label: "Caveat", value: "var(--font-caveat), cursive" },
  { label: "Dancing Script", value: "var(--font-dancing), cursive" },
];

// Mesma escala do Word, de 8 a 24 pontos
export const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24];

export const toFontSizeValue = (size: number) => `${size}pt`;

export type ColorOption = {
  label: string;
  value: string;
};

export const COLOR_OPTIONS: ColorOption[] = [
  { label: "Preto", value: "#18181b" },
  { label: "Cinza", value: "#71717a" },
  { label: "Vermelho", value: "#dc2626" },
  { label: "Laranja", value: "#ea580c" },
  { label: "Amarelo", value: "#ca8a04" },
  { label: "Verde", value: "#16a34a" },
  { label: "Turquesa", value: "#0d9488" },
  { label: "Azul", value: "#2563eb" },
  { label: "Roxo", value: "#7c3aed" },
  { label: "Rosa", value: "#db2777" },
];

// O navegador reescreve o font-family ao ler o HTML (aspas, espaços),
// então a comparação ignora essas diferenças
export function normalizeFontFamily(value: string) {
  return value.replace(/["']/g, "").replace(/\s*,\s*/g, ",").trim().toLowerCase();
}

export function findFontOption(current: string | null | undefined) {
  if (!current) return undefined;
  const normalized = normalizeFontFamily(current);
  return FONT_OPTIONS.find(
    (font) => normalizeFontFamily(font.value) === normalized,
  );
}
