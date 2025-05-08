import { signJwt } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const { data } = await supabase.from("user").select("*").eq("email", email);
  let success = false;

  if (data && data.length !== 0) {
    if (email === data[0].email && bcrypt.compareSync(password, data[0].password)) {
      success = true;
      const token = signJwt({ name: data[0].name });
      (await cookies()).set("token", token);
    }
  }

  return Response.json({ success });
}
