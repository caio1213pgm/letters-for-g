export type LetterPreviewType = {
  slug: string;
  authorName: string;
  passwordHint: string;
};

export type UnlockedLetterType = {
  title: string;
  text: string;
  authorName: string;
  readerName: string;
  createdAt: string;
};

export type UnlockLetterResult =
  | { status: "ok"; letter: UnlockedLetterType }
  | { status: "invalid"; remainingAttempts: number }
  | { status: "blocked"; retryInMinutes: number }
  | { status: "not_found" };

// Resultado genérico da conferência de senha: o autor não tem contador de tentativas
// e não recebe a carta de volta
export type LetterPasswordResult =
  | { status: "ok"; letter?: UnlockedLetterType }
  | { status: "invalid"; remainingAttempts?: number }
  | { status: "blocked"; retryInMinutes: number }
  | { status: "not_found" };
