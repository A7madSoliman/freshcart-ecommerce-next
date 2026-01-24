import { getToken } from "@/lib/auth/token";

type JwtPayload = {
  id?: string;
  _id?: string;
  userId?: string;
};

export function getUserIdFromToken(): string | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payloadPart = token.split(".")[1];
    const decoded = JSON.parse(atob(payloadPart)) as JwtPayload;

    return decoded.id || decoded._id || decoded.userId || null;
  } catch {
    return null;
  }
}
