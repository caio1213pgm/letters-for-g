import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const ACCESS_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type LetterAccessSource = {
  id: string;
  slug: string;
  passwordLetter: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET não configurado");
  return secret;
}

function cookieName(letterId: string) {
  return `letter-access-${letterId}`;
}

// O token depende do hash da senha: se a senha mudar, o acesso antigo deixa de valer
function createAccessToken(letter: LetterAccessSource) {
  return createHmac("sha256", getSecret())
    .update(`${letter.id}:${letter.passwordLetter}`)
    .digest("hex");
}

export async function hasLetterAccess(letter: LetterAccessSource) {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName(letter.id))?.value;
  if (!token) return false;

  const expected = Buffer.from(createAccessToken(letter));
  const received = Buffer.from(token);
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export async function grantLetterAccess(letter: LetterAccessSource) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName(letter.id), createAccessToken(letter), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_MAX_AGE_SECONDS,
    path: `/letter/${letter.slug}`,
  });
}
