import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const { id } = await request.json();

  const user = await getAuthenticatedUser();

  if (!user) return Response.json({}, { status: 401 });

  try {
    await supabase.from("todos").delete().eq("id", id);
    return Response.json({ message: "삭제완료!" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "서버에 오류가 발생하였습니다." }, { status: 500 });
  }
}
