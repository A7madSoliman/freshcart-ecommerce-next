export const TOKEN_KEY = "token";

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${TOKEN_KEY}=${token}; path=/`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  const match = document.cookie.match(
    new RegExp("(^| )" + TOKEN_KEY + "=([^;]+)")
  );

  return match ? match[2] : null;
}

export function removeToken() {
  if (typeof window === "undefined") return;
  document.cookie = `${TOKEN_KEY}=; Max-Age=0; path=/`;
}
