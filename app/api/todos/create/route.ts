import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const { todo } = await request.json();
  const user = await getAuthenticatedUser();

  if (!user) return Response.json({}, { status: 401 });

  try {
    const {
      data: [{ user_id }],
    }: any = await supabase.from("user").select("user_id").eq("name", user.name);

    await supabase.from("todos").insert({ user_id, content: todo });

    return Response.json({ message: "작성완료!" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "서버에 오류가 발생하였습니다." }, { status: 500 });
  }
}
