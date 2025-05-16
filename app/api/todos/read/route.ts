import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) return Response.json({}, { status: 401 });

  const today = new Date().toISOString().split("T")[0];

  try {
    const {
      data: [{ user_id }],
    }: any = await supabase.from("user").select("user_id").eq("name", user?.name);
    const { data } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user_id)
      .filter("created_at", "gte", `${today}T00:00:00`)
      .filter("updated_at", "lt", `${today}T23:59:59.999`);
    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return Response.json({ data: null, message: "서버에 오류가 발생하였습니다." }, { status: 500 });
  }
}
