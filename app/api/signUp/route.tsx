import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const body = await request.json();
  const { error } = await supabase.from("user").insert([body]);

  return Response.json({ success: error ? false : true, message: error?.code === "23505" ? "이메일이 중복됩니다." : "" });
}
