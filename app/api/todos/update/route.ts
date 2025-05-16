import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const { id, content } = await request.json();

  const user = await getAuthenticatedUser();

  if (!user) return Response.json({}, { status: 401 });

  try {
    const {
      data: [{ user_id }],
    }: any = await supabase.from("user").select("user_id").eq("name", user.name);

    await supabase.from("todos").update({ content, updated_at: new Date() }).eq("id", id).eq("user_id", user_id);

    return Response.json({ message: "수정완료!" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "서버에 오류가 발생하였습니다." }, { status: 500 });
  }
}
