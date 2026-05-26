import { typeIcon } from "@/app/types/typeIcon";

export default function GoogleIcon({ size = 24, className }: typeIcon) {
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Google</title>
      {/* Azul */}
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.26-2.08 3.57-5.15 3.57-8.85z"
      />
      {/* Verde */}
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3c-1.07.72-2.44 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.26v3.12A12 12 0 0 0 12 24z"
      />
      {/* Amarelo */}
      <path
        fill="#FBBC05"
        d="M5.25 14.28A7.2 7.2 0 0 1 4.88 12c0-.79.14-1.56.37-2.28V6.6H1.26A12 12 0 0 0 0 12c0 1.93.46 3.76 1.26 5.4l3.99-3.12z"
      />
      {/* Vermelho */}
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.6l3.99 3.12C6.2 6.89 8.86 4.77 12 4.77z"
      />
    </svg>
  );
}
