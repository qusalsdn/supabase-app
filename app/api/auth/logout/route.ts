import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).delete("token");

  return Response.json({ success: true, message: "로그아웃에 실패하였습니다." });
}
