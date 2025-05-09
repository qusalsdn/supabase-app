import { cookies } from "next/headers";
import { verifyJwt } from "./auth";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyJwt(token ?? "");

  if (!user) {
    cookieStore.delete("token");
    return null;
  }

  return user;
}
