import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const body = await request.json();
  const { error } = await supabase.from("user").insert([body]);

  let message = "";
  if (error?.details.includes("email")) message = "이메일이 중복됩니다.";
  else if (error?.details.includes("name")) message = "이름이 중복됩니다.";

  return Response.json({ success: error ? false : true, message });
}
