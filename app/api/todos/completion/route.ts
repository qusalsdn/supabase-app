import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const { id, completion } = await request.json();

  const user = await getAuthenticatedUser();

  if (!user) return Response.json({}, { status: 401 });

  try {
    await supabase.from("todos").update({ completion, updated_at: new Date() }).eq("id", id);
    return Response.json({ message: "할 일 완료!" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "서버에 오류가 발생하였습니다." }, { status: 500 });
  }
}
